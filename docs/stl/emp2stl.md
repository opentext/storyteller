# EMP2STL Conversion

## Overview

This document describes a process of reverse-engineering the Empower JSON format
and converting it to StoryTeller Layout (STL).

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

![Empower editor](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/editor.png)

Thanks to the interactive editor it was relatively easy to reverse-engineer at least some
of the features of Empower JSON format and convert them to STL. On the other hand it would
be really complicated to implement the opposite direction without deeper knowledge
of the Empower JSON format. There are still too many fields we do not understand
and some of them point outside the JSON persistence (there are some database indexes,
resource package identifiers, etc).

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
    -   parses empower JSON fragment and generates corresponding STL fragment

All the parsing and translation is implemented inside this module, except low-level writing
the resulting STL XML, we use the 3rd party [XMLWriter](http://github.com/touv/node-xml-writer)
implementation published under MIT software licence.

The current `emp2stl` implementation is available
[here](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/emp2stl.js),
usage example is visible in a test module
[empower.js](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/empower.js)
which is used in two STL based regression tests
[basic.xml](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/basic.xml)
and [complex.xml](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/complex.xml).
It is worth to mention that both mentioned STL-based tests were also used for generating STL fragments and rasters of all examples for this documentation.

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

## Text Fragments

### Empty Fragment

At the very beginning we start with an empty text fragment.
Even though it contains no visible content, the initial JSON boilerplate is relatively verbose -
see [empty.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json).

The generated STL is much more concise.

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

### Hello

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

### Colors

Let's look at the text colors. If we make the middle `ell` characters of the word `Hello` red, green and blue
we can see changes in `m_Colors`, `m_cChars` and `m_sXPos` arrays.

If we compare the new [hello_colors.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_colors.json) with [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

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
        0,
        72,
+       2,   // color index #2
        101,
+       3,   // color index #3
        108,
+       4,   // color index #4
        108,
+       0,
        111,
        0
      ],
      "m_sXPos": [
        -244,
        0,
        -62,
        -63,  // color change
        0,
+       -63,  // color change
        0,
+       -63,  // color change
        0,
+       -63,  // color change
        0,
+       -63,  // color change
        0,
        -64
      ],
```

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_colors.json">hello_colors.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_colors.json">hello_colors.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_colors.xml">hello_colors.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_colors.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_colors.png"/></td>
  </tr>
</table>

### Non ASCII Characters

Let's try to insert a character outside the ASCII range,
for example the [€ symbol](http://www.fileformat.info/info/unicode/char/20ac/index.htm).

If we compare the new [hello_euro.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_euro.json) with [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

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
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_euro.json">hello_euro.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_euro.json">hello_euro.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_euro.xml">hello_euro.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_euro.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_euro.png"/></td>
  </tr>
</table>

### Change Font

And what if we change the font - the only available alternative to _Lato_ is _Wingdings_, so let's try that:

If we compare the new [hello_font.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_font.json) with [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

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
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_font.json">hello_font.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_font.json">hello_font.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_font.xml">hello_font.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_font.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_font.png"/></td>
  </tr>
</table>

Note that there is a difference between the two renders. For some reason the Empower engine seems to render
the "Hello" text, but I believe that the StoryTeller output is correct
(you can consult the [Wingdings Translator](https://lingojam.com/wingdingstranslator) ).

### Font sizes

OK, _Wingdings_ font is not very readable, let's experiment with font sizes instead.

If we compare the new [hello_sizes.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_sizes.json) with previous [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

```js
      "m_TextFonts": [
	    ...
+       {       // a new font specs - Lato 11pt, 12pt, 13pt ...
+         "oiFont": 103,
+         "strName": "Lato",
+         "iTracking": 0,
+         "clrFontColor": {
+           "m_eColorModel": 0,
+           "m_lColor": 0
+         },
+         "iFontHeight10X": 110,
+         "bBold": false,
+         "bUnderline": false,
+         "bItalic": false,
+         "bStrikeThru": false,
+         "uUnderWgt": 0,
+         "sUnderPos": -32768,
+         "iAscent": 45,
+         "iDescent": 10,
+         "iLeading": 0
+       },
+       ...
      ],
        ...
      "m_cChars": [
        0,
        0,
        1,
        0,
        72,
+       2,     // Font index #2
        101,
+       3,     // Font index #3
        108,
+       4,     // Font index #4
        108,
+       5,     // Font index #5
        111,
        0
      ],
      "m_sXPos": [
        -244,
        0,
        -62,    // font change
        -63,    // color change
        0,
+       -62,    // font change
        0,
+       -62,    // font change
        0,
+       -62,    // font change
        0,
+       -62,    // font change
        0,
        -64
      ],
```

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_sizes.json">hello_sizes.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_sizes.json">hello_sizes.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_sizes.xml">hello_sizes.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_sizes.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_sizes.png"/></td>
  </tr>
</table>

### Superscript & Subscript

Another possibility is to change text decoration to superscript or subscript.

If we compare the new [hello_sub_super_script.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_sub_super_script.json) with previous [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

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
+       0,
+       0,
+       50,   // chr(50) == '2'
+       0,
+       0,
+       0,
+       51,   // chr(51) == '3'
+       0,
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
+       -240, // superscript start
+       0,
+       0,
+       -59,  // superscript end
+       -239, // subscript start
+       0,
+       0,
+       -58,  // subscript end
        -64
      ],
```


<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_sub_super_script.json">hello_sub_super_script.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_sub_super_script.json">hello_sub_super_script.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_sub_super_script.xml">hello_sub_super_script.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_sub_super_script.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_sub_super_script.png"/></td>
  </tr>
</table>

### Hyperlink

Let's append a hyperlink - a text "hyperlink" with [http://www.opentext.com](http://www.opentext.com) address.

If we compare the new [hello_hyperlink.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_hyperlink.json) with previous [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

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
+       104,  // chr(111) == 'h'
+       121,  // chr(111) == 'y'
+       112,  // chr(111) == 'p'
+       101,  // chr(111) == 'e'
+       114,  // chr(111) == 'r'
+       108,  // chr(111) == 'l'
+       105,  // chr(111) == 'i'
+       110,  // chr(111) == 'n'
+       107,  // chr(111) == 'k'
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
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_hyperlink.json">hello_hyperlink.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_hyperlink.json">hello_hyperlink.diff</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_hyperlink.xml">hello_hyperlink.xml</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_hyperlink.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_hyperlink.png"/></td>
  </tr>
</table>

## Graphical Fragments
