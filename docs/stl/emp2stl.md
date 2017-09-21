# Empower to STL Conversion

## Table of Contents

  * [Overview](#overview)
  * [Implementation](#implementation)
  * [Examples](#examples)
     * [Text Fragments](#text-fragments)
     * [Graphical Fragments](#graphical-fragments)
  * [Conclusion](#conclusion)
 
## Overview

This document describes a process of reverse-engineering the _Empower JSON_ format
and converting it to _StoryTeller Layout_ (_STL_).

An important think to note is that we got no documentation of the input format,
every insight is gained by interactively editing a fragment and comparing
the changes in persistence developed by changes in editor.

The JSON format is not very readable, it is clearly not designed like human readable
exchange format, instead it feels like a direct dump of internal implementation structures.
It means that all enumeration are just numbers, instead of strings, all lengths
are just integers in a decimal format with no units, text is just a sequence
of unicode code points, etc. This complicates the conversion, makes the whole process
more brittle and more prone to future inconsistencies when the JSON format changes.

On the other hand the Empower WYSIWYG editor looks very nice and it is relatively easy
to create a nice looking content. It reasonably limits the complexity of the fragments
(e.g. there are only two levels of object nesting) and thus makes our job easier.

The editor window looks as follows:

![Empower editor](empower-editor.png)

## Implementation

We decided to implement the conversion in javascript.

There are several reasons why currently the javascript seems like a best choice:

  - It is a language for rapid prototyping and development (much faster than in C++)
  - It can form a dual-environment solution:
    - It can work as part of _StoryTeller_ scripting environment
	- It can also work in browser as a part of _Opentext_ web applications like _StoryBoard_

It is possible that we decide to reimplement the conversion in C++ (only if we find really
good reasons), but for now we consider javascript the best choice.

Right now the interface is really simple, it is a single-method module called `emp2stl`
which has the following interface:

-   `emp2stl( json: string ) : string`
    -   parses _Empower JSON_ fragment and generates corresponding _STL_ fragment

All the parsing and translation is implemented inside this module, except low-level writing
the resulting _STL XML_, for that purpose we use the 3rd party [XMLWriter](http://github.com/touv/node-xml-writer)
implementation published under MIT software licence.

The current `emp2stl` implementation is available
[here](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/emp2stl.js),
usage example is visible in a test module
[empower.js](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/empower.js)
which is used in two _STL_ based regression tests
[basic.xml](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/basic.xml)
and [complex.xml](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/complex.xml).
It is worth to mention that both mentioned STL-based tests were also used for generating _STL_ fragments and rasters of all examples for this documentation.

The usage of `emp2stl` conversion is very simple and looks as follows:

```js
    var streams = require('streams');
    var emp2stl = require('wd:/emp2stl');
    // read JSON input from a file
    var json = streams.stream('wd:/input/hello.json').read();
    // convert Empower JSON to STL 
    var stl = emp2stl(json);
    // write resulting STL to a file
    streams.stream('wd:/output/hello.xml').write(stl);
```

## Examples

This section will contain several examples of text and graphical fragments
starting from trivial ones to more complex ones. The icremental manner will
help us to locate individual features in JSON file as well as distinguish
between individual enumeration values and codes.  

### Text Fragments

Text fragments represent an implicit text object as a top of hierarchy of objects.
They typically grow with content.

#### Empty Fragment

At the very beginning we start with an empty text fragment.
Even though it contains no visible content, the initial JSON boilerplate is relatively verbose -
see [empty.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json).

The generated _STL_ is much more concise.

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json">empty.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/empty.xml">empty.xml</a></td>
  </tr>
</table>

#### Plain Text

Now we start to insert a plain text just with default styling.
The only difference is in two parallel arrays `m_cChars` containing character codes
and `m_sXPos` containing some kinds of commands.

If we compare the new [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) with previous [empty.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json) we get the following differences:

```js
  "m_cChars": [
    0,
    0,
    1,
    0,
+   72,   // chr(72)  == 'H'
+   101,  // chr(101) == 'e'
+   108,  // chr(108) == 'l'
+   108,  // chr(108) == 'l'
+   111,  // chr(111) == 'o'
    0
  ],
  "m_sXPos": [
    -244,
    0,
    -62,
    -63,
+   0,
+   0,
+   0,
+   0,
+   0,
    -64
  ],
```

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json">hello.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json">hello.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello.xml">hello.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello.png"/></td>
  </tr>
</table>

#### Font Change

And what if we change the font - the only available alternative to _Lato_ is _Wingdings_, so let's try that:

If we compare the new [font.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/font.json) with [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

```js
      "m_TextFonts": [
        {
          "strName": "Lato",
          "iTracking": 0,
          "clrFontColor": {
            "m_eColorModel": 0,
            "m_lColor": 0
          },
          "iFontHeight10X": 100,
          "bBold": false,
          "bItalic": false,
          "bUnderline": false
        },
        {
          "oiFont": 95,
          "strName": "Lato",
          "iTracking": 0,
          "clrFontColor": {
            "m_eColorModel": 0,
            "m_lColor": 0
          },
          "iFontHeight10X": 100,
          "bBold": false,
          "bUnderline": false,
          "bItalic": false,
          "bStrikeThru": false,
          "uUnderWgt": 0,
          "sUnderPos": -32768,
          "iAscent": 41,
          "iDescent": 9,
          "iLeading": 0
+       },
+       {             // a new font spec - Wingdings 12pt
+         "oiFont": 44,
+         "strName": "Wingdings",
+         "iTracking": 0,
+         "clrFontColor": {
+           "m_eColorModel": 0,
+           "m_lColor": 0
+         },
+         "iFontHeight10X": 120,
+         "bBold": false,
+         "bUnderline": false,
+         "bItalic": false,
+         "bStrikeThru": false,
+         "uUnderWgt": 0,
+         "sUnderPos": -32768,
+         "iAscent": 45,
+         "iDescent": 11,
+         "iLeading": 0
        }
      ],
      ...
      "m_cChars": [
        0,
        0,
+       2, // font index #2 (instead of #1)
        0,
        72,
        101,
        108,
        108,
        111,
        0
      ],
      "m_sXPos": [
        -244,
        0,
        -62,
        -63,
        0,
        0,
        0,
        0,
        0,
        -64
      ],
```

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/font.json">font.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/font.json">font.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/font.xml">font.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/font.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/font.png"/></td>
  </tr>
</table>

Note that there is a difference between the two renders. For some reason the Empower engine seems to render
the "Hello" text, but I believe that the StoryTeller output is correct
(you can consult the [Wingdings Translator](https://lingojam.com/wingdingstranslator) ).

#### Non ASCII Characters

Let's try to insert a character outside the ASCII range,
for example the [€ symbol](http://www.fileformat.info/info/unicode/char/20ac/index.htm).

If we compare the new [euro.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/euro.json) with [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

```js
      "m_cChars": [
        0,
        0,
        1,
        0,
        72,
        101,
        108,
        108,
        111,
+       32,   // space character
+       1,    // font index #1
+       0,    // color index #0
+       8364, // euro character code (&#8364;)
        0
      ],
      "m_sXPos": [
        -244,
        0,
        -62,
        -63,
        0,
        0,
        0,
        0,
        0,
+       0,
+       -62,  // font change
+       -63,  // color change
+       0,
        -64
      ],
```

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/euro.json">euro.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/euro.json">euro.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/euro.xml">euro.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/euro.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/euro.png"/></td>
  </tr>
</table>

#### More Plain Text

Now we add more plain text in order to have more characters available for our experiments.

Again the only difference is in two parallel arrays `m_cChars` containing character codes
and `m_sXPos` containing some kinds of commands.

If we compare the new [hello_opentext.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json) with previous [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

```js
  "m_cChars": [
        0,
        0,
        1,
        0,
        72,   // chr(72)  == 'H'
        101,  // chr(101) == 'e'
        108,  // chr(108) == 'l'
        108,  // chr(108) == 'l'
        111,  // chr(111) == 'o'
+       32,   // chr(32)  == ' '
+       79,   // chr(79)  == 'O'
+       112,  // chr(112) == 'p'
+       101,  // chr(101) == 'e'
+       110,  // chr(110) == 'n'
+       116,  // chr(116) == 't'
+       101,  // chr(101) == 'e'
+       120,  // chr(120) == 'x'
+       116,  // chr(116) == 't'
+       33,   // chr(111) == '!'
		 0
  ],
  "m_sXPos": [
    -244,
    0,
    -62,
    -63,
    0,
    0,
    0,
    0,
    0,
+   0,
+   0,
+   0,
+   0,
+   0,
+   0,
+   0,
+   0,
+   0,
+   0,
    -64
  ],
```

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json">hello_opentext.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json">hello_opentext.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_opentext.xml">hello_opentext.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_opentext.png"/></td>
  </tr>
</table>

#### Font Size

OK, _Wingdings_ font is not very readable, let's experiment with font sizes instead.

If we compare the new [sizes.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/sizes.json) with previous [hello_opentext.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json) we get the following differences:

```js
      "m_TextFonts": [
	    ...
+        },
+        {  // new font specs - Lato 12pt
+          "oiFont": 111,
+          "strName": "Lato",
+          "iTracking": 0,
+          "clrFontColor": {
+            "m_eColorModel": 0,
+            "m_lColor": 0
+          },
+          "iFontHeight10X": 120,
+          "bBold": false,
+          "bUnderline": false,
+          "bItalic": false,
+          "bStrikeThru": false,
+          "uUnderWgt": 0,
+          "sUnderPos": -32768,
+          "iAscent": 49,
+          "iDescent": 11,
+          "iLeading": 0
+        },
+        {  // new font specs - Lato 14pt
+          "oiFont": 127,
+          "strName": "Lato",
+          "iTracking": 0,
+          "clrFontColor": {
+            "m_eColorModel": 0,
+            "m_lColor": 0
+          },
+          "iFontHeight10X": 140,
+          "bBold": false,
+          "bUnderline": false,
+          "bItalic": false,
+          "bStrikeThru": false,
+          "uUnderWgt": 0,
+          "sUnderPos": -32768,
+          "iAscent": 57,
+          "iDescent": 12,
+          "iLeading": 0
+       }
      ],
        ...
      "m_cChars": [
        0,
        0,
        1,      // Font index #1
        0,
        72,
        101,
        108,
        108,
        111,
        32,
        2,      // Font index #2
        79,
        112,
        101,
        110,
        3,      // Font index #3
        116,
        101,
        120,
        116,
        1,      // Font index #1
        33,
      ],
      "m_sXPos": [
       -244,
        0,
        -62,    // font change
        -63,    // color change
        0,
        0,
        0,
        0,
        0,
        0,
        -62,    // font change
        0,
        0,
        0,
        0,
        -62,    // font change
        0,
        0,
        0,
        0,
        -62,    // font change
        0,
        -64
      ],
```

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/sizes.json">sizes.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/sizes.json">sizes.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/sizes.xml">sizes.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/sizes.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/sizes.png"/></td>
  </tr>
</table>

#### Text Colors

Let's look at the text colors. If we make the middle `ell` characters of the word `Hello` red, green and blue
we can see changes in `m_Colors`, `m_cChars` and `m_sXPos` arrays.

If we compare the new [colors.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/colors.json) with [hello_opentext.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json) we get the following differences:

```js
     "m_Colors": [
        {
          "m_eColorModel": 0,
          "m_lColor": 0
        },
        {
          "m_eColorModel": 0,
          "m_lColor": 12648192
        },
        {
          "m_eColorModel": 0,   // RGB color model
          "m_lColor": 255       // red (#ff0000)
+       },
+       {
+         "m_eColorModel": 0,   // RGB color model
+         "m_lColor": 65280     // red (#00ff00)
+       },
+       {
+         "m_eColorModel": 0,   // RGB color model
+         "m_lColor": 16711680  // blue (#0000ff)
        }
      ],
       "m_cChars": [
         0,
         0,
         1,
-        0,
+        2,    // color index #2
         72,
         101,
         108,
         108,
         111,
+        0,
         32,
+        3,    // color index #3
         79,
         112,
         101,
         110,
+        4,    // color index #4
         116,
         101,
         120,
         116,
+        0,    // color index #0
         33,
         0
      ],
      "m_sXPos": [
         -244,
         0,
         -62,
         -63,  // color change
         0,
         0,
         0,
         0,
         0,
+        -63,  // color change
         0,
+        -63,  // color change
         0,
         0,
         0,
         0,
+        -63,  // color change
         0,
         0,
         0,
         0,
+        -63,  // color change
         0,
         -64
      ],
```

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/colors.json">colors.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/colors.json">colors.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/colors.xml">colors.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/colors.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/colors.png"/></td>
  </tr>
</table>

#### Superscript & Subscript

Another feature to exploit is a change or _text decoration_ to _superscript_ or _subscript_.

If we compare the new [valign.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/valign.json) with previous [hello_opentext.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json) we get the following differences:

```js
      "m_TextFonts": [
	    ...
+        {  // new synthesized font specs - Lato 8pt
+          "oiFont": 79,
+          "strName": "Lato",
+          "iTracking": 0,
+          "clrFontColor": {
+            "m_eColorModel": 0,
+            "m_lColor": 0
+          },
+          "iFontHeight10X": 80,
+          "bBold": false,
+          "bUnderline": false,
+          "bItalic": false,
+          "bStrikeThru": false,
+          "uUnderWgt": 0,
+          "sUnderPos": -32768,
+          "iAscent": 33,
+          "iDescent": 7,
+          "iLeading": 0
         }
      ],
        ...
     "m_cChars": [
       0,
        0,
        1,
        0,
        72,
        101,
        108,
        108,
        111,
        32,
+       0,
+       0,
        79,
        112,
        101,
        110,
+       0,
+       0,
+       0,
        116,
        101,
        120,
        116,
+       0,
        33,
        0
      ],
      "m_sXPos": [
        -244,
        0,
        -62,
        -63,
        0,
        0,
        0,
        0,
        0,
        0,
        -240,  // superscript start
        0,
        0,
        0,
        0,
        0,
        -59,   // superscript end
        -239,  // subscript start
        0,
        0,
        0,
        0,
        0,
        -58,   // subscript end
        0,
        -64
      ],
```


<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/valign.json">valign.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/valign.json">valign.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/valign.xml">valign.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/valign.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/valign.png"/></td>
  </tr>
</table>

#### Hyperlink

Let's append a hyperlink - attach the [http://www.opentext.com](http://www.opentext.com) address to word "Opentext".

If we compare the new [hyperlink.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hyperlink.json) with previous [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

```js
      ...
      "m_TextFonts": [
	    ...
+       {  // new font spec #2 (underline)
+         "oiFont": 95,
+         "strName": "Lato",
+         "iTracking": 0,
+         "clrFontColor": {
+           "m_eColorModel": 0,
+           "m_lColor": 0
+         },
+         "iFontHeight10X": 100,
+         "bBold": false,
+         "bUnderline": true,
+         "bItalic": false,
+         "bStrikeThru": false,
+         "uUnderWgt": 0,
+         "sUnderPos": -32768,
+         "iAscent": 41,
+         "iDescent": 9,
+         "iLeading": 0
        }
      ],
      "m_Colors": [
	    ...
+       {  // new color spec #3 (blue #0000c4)
+         "m_eColorModel": 0,
+         "m_lColor": 12845056
+       }
      ],
      "m_cChars": [
        0,
        0,
        1,
        0,
        72,
        101,
        108,
        108,
        111,
+       32,
+       0,    // link index #0
+       0,
+       2,    // font index #2
+       3,    // color index #3
+       79,   // chr(79) == 'O'
+       112,  // chr(112) == 'p'
+       101,  // chr(101) == 'e'
+       110,  // chr(110) == 'n'
+       116,  // chr(116) == 't'
+       101,  // chr(101) == 'e'
+       120,  // chr(120) == 'x'
+       116,  // chr(116) == 't'
+       1,    // font index #1
+       0,    // color index #0
+       0,
+       0,
+       33,  // chr(111) == '!'
        0
      ],
      "m_sXPos": [
        -244,
        0,
        -62,
        -63,
        0,
        0,
        0,
        0,
        0,
+       0,
+       -252, // start hyperlink
+       0,
+       -62,  // font change
+       -63,  // color change
+       0,
+       0,
+       0,
+       0,
+       0,
+       0,
+       0,
+       0,
+       -62,  // font change
+       -63,  // color change
+       -109, // end hyperlink
+       0,
+       0,
        -64
      ],
	  ...
      "m_Links": [
+       {          // link spec #0
+         "eLinkType": 0,
+         "msLink": "http://www.opentext.com",
+         "oiVariable": -1,
+         "bNewWindow": true
+       }
      ],
```

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hyperlink.json">hyperlink.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hyperlink.json">hyperlink.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hyperlink.xml">hyperlink.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hyperlink.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hyperlink.png"/></td>
  </tr>
</table>

#### Paragraphs

@TBD

#### Lists

@TBD

#### Variables

@TBD

#### Image

@TBD

#### Text Frame

@TBD

#### Table

@TBD

### Graphical Fragments

Graphical fragments represent a canvas area containing one or more absolutely positioned
objects like images, tables and text frames.

@TBD

## Conclusion

Thanks to the interactive editor it was relatively easy to reverse-engineer at least some
of the features of _Empower JSON_ format and convert them to _STL_. On the other hand
it would be really complicated to implement the opposite direction without deeper
knowledge of the _Empower JSON_ format. There are still too many fields we do not
understand and some of them point outside the JSON persistence (there are some database
indexes, resource package identifiers, etc).

We believe that this document can serve as another demonstration of strengths and advantages
of _StoryTeller Layout (STL)_ exchange format. The fact that it is carefully designed
to be human readable and understandable makes a conversion from different formats
a relatively quick and straightforward task.

There is a non-trivial mapping between a flat sequence of font and color changes
in _Empower JSON_ and more general and powerful hierarchy of `span` elements in _STL_.
So far we did not complicate the implementation - the convertor only collects,
merges and matches CSS individual properties and generates a flat `span` sequence.

Of course we could make it more optimized and maintainable by heuristically
creating a synthesized `span` hierarchy when `span` elements could split to more
levels, coalesce by matching properties and form a hierarchy when more frequently
changed CSS properties deeper at the bottom and less frequently changed properties
at the top of the synthesized span hierarchy.

For example the following sub-optimal STL sequence:

```xml
<stl:p>
  <stl:span style="font-family: Arial; font-size: 10pt">H</stl:span>
  <stl:span style="font-family: Arial; font-size: 11pt">e</stl:span>
  <stl:span style="font-family: Arial; font-size: 12pt; font-weight: bold">l</stl:span>
  <stl:span style="font-family: Arial; font-size: 13pt; font-weight: bold">l</stl:span>
  <stl:span style="font-family: Arial; font-size: 14pt">o</stl:span>
</stl:p>
```

... could be transformed to the following `span` hierarchy:

```xml
<stl:p style="font-family: Arial">
  <stl:span style="font-size: 10pt">H</stl:span>
  <stl:span style="font-size: 11pt">e</stl:span>
  <stl:span style="font-weight: bold">
    <stl:span style="font-size: 12pt">l</stl:span>
    <stl:span style="font-size: 13pt">l</stl:span>
  </span>
  <stl:span style="font-size: 14pt">o</stl:span>
</stl:p>
```
Such optimization could be an interesting programming task, but we consider it
outside the scope of this document. It would be better to expose it as a completely
separate service independent on _emp2stl_ conversion - called something like _STL optimizer_.
