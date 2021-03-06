# Empower Integration

# Table of Contents

   * [Overview](#overview)
   * [Implementation](#implementation)
      * [Language](#language)
      * [Interface](#interface)
      * [Usage](#usage)
      * [Libraries](#libraries)
      * [Source code](#source-code)
      * [Tests](#tests)
   * [Technical details](#technical-details)
      * [Content Fragments](#content-fragments)
         * [Single-line Text](#single-line-text)
         * [Multi-line Text](#multi-line-text)
         * [Lists](#lists)
         * [Objects](#objects)
         * [Variables](#variables)
      * [Canvas Fragments](#canvas-fragments)
         * [Flat Objects](#flat-objects)
         * [Nested Objects](#nested-objects)
   * [Conclusion](#conclusion)
      * [Fixes](#fixes)
      * [Optimizations](#optimizations)
      * [Follow-up](#follow-up)

# Overview

This document describes a process of reverse-engineering the _Empower JSON_ format
and converting it to _StoryTeller Layout_ (_STL_) and back.

![STL integration schema](docbuilder-pipeline.png)

An important thing to note is that we got no documentation of the input format,
every insight is gained by interactively editing a fragment and comparing
the changes in persistence developed by changes in editor.

The _Empower JSON_ format is not very readable, it is clearly not designed to be a human readable
exchange format, instead it feels like a direct dump of internal implementation structures.
It means for example that all enumerations are just numbers, instead of strings, all lengths
are just integers in a decimal format with no units, a text is just a sequence
of unicode code points, etc. This complicates the conversion, makes the whole process
more brittle and prone to future inconsistencies when the JSON format changes.

There is also a big question whether the _Empower_ JSON format is meant to be backward
compatible and thus suitable for this kind of job. It would be too hard to update
the conversion whenever the input format changes. However as in the _Content Authoring_
solution JSON fragments are persisted as _CAS Resources_ we believe that there must be
some kind of backward compatibility guarantee. Anyway, this kind of questions must be
answered before we promote this solution for production.

On the other hand the Empower WYSIWYG editor looks very nice and it is relatively easy
to create a nice looking content. It reasonably limits the complexity of the fragments
(e.g. there are only two levels of object nesting) and thus makes our job easier.

The editor window looks as follows:

![Empower editor](empower-editor.png)

The goal for this POC is to implement a convertor supporting a reasonable subset of the
functionality. Instead of trying to cover the formats 100% at all costs we try to find
features for which there is a reasonable match between the formats and which are most
valuable for end users. That way we could utilize the _Empower Web Editor_ for editting
_STL fragments_ (as an alternative for a [Native STL Editor](editor/) which does not
completely exist yet).

The current implementation of the conversion supports features of _Content Fragments_
and _Canvas Fragments_ which look as follows (you can compare _Empower_ and _StoryTeller_
rendered variants side-by-side):

<table style="background-color:#fff49c">
  <tr><td colspan="2"><h3>Character styles</h3></td></tr>
  <tr>
	<td colspan="2">
		Empower JSON render:<br/>
		<img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_char.png"/>
		<a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_char.json" target="_blank">Open JSON »</a>
	</td>
  </tr>
  <tr>
	<td colspan="2">
		StoryTeller STL render:<br/>
		<img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/styles_char.png"/>
		<a class="try-it-btn" href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_char.json&css=1" target="_blank">Try in STLEditor »</a>
	</td>
  </tr>
  
  <tr><td colspan="2"><h3>Paragraph styles</h3></td></tr>
  <tr>
	<td>
		Empower JSON render:<br/>
	   	<img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_par.png"/>
		<a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_par.json" target="_blank">Open JSON »</a>
	</td>
  	<td>
		StoryTeller STL render:<br/>
		<img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/styles_par.png"/>
		<a class="try-it-btn" href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_par.json&css=1" target="_blank">Try in STLEditor »</a>
	</td>
  </tr>

  <tr><td colspan="2"><h3>Table styles</h3></td></tr>
  <tr>
	<td>
		Empower JSON render:<br/>
		<img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_table.png"/>
		<a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_table.json" target="_blank">Open JSON »</a>
	</td>
  	<td>
		StoryTeller STL render:<br/>
		<img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/styles_table.png"/>
		<a class="try-it-btn" href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_table.json&css=1" target="_blank">Try in STLEditor »</a>
	</td>
  </tr>

  <tr><td colspan="2"><h3>Canvas</h3></td></tr>
  <tr>
	<td>
		Empower JSON render:<br/>
   	   <img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_canvas.png"/>
		<a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_canvas.json" target="_blank">Open JSON »</a>
	</td>
  	<td>
		StoryTeller STL render:<br/>
		<img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/styles_canvas.png"/>
		<a class="try-it-btn" href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/styles_canvas.json&css=1" target="_blank">Try in STLEditor »</a>
	</td>
  </tr>
</table>

# Implementation

This section contains some implementation related details and decisions.

## Language

We decided to implement the conversion in javascript.

There are several reasons why currently the javascript seems like a best choice:

  - It is a language for rapid prototyping and development (much faster than in C++)
  - It can form a dual-environment solution:
    - It can work as part of _StoryTeller_ scripting environment
	  (this way we can test it easily as well as provide it to our users relatively soon as a javascript module extension).
	- It can also work in browser as a part of _Opentext_ web applications like _StoryBoard_
	  (in principle we could utilize the _Empower editor_ as a _Web STL fragment editor_)

It is possible that we decide to reimplement the conversion in C++ (only if we find really
good reasons), but for now we consider javascript the best choice.

## Interface

Right now the interface is really simple, it is a module called `empower` containing two methods `emp2stl`
and `stl2emp` with following signatures:

- `emp2stl( input: string|stream [, options: object] ) : string|stream` ... Parses _Empower JSON_ fragment and generates corresponding _STL_ fragment
    - `input` ... input string or stream containing _Empower JSON_
    - `options` ... following options are currently supported:
      - `output` ... optional output stream to be filled with resulting _STL_
      - `css` ... `false` => inline styles, `true` => internal stylesheet, `stream` => external stylesheet
      - `indent` ... bool, string, number (of spaces) or a function(tag, tags, is_start) used for indentation
      - `page` ... bool determining whether page type should be generated
      - `resources` ... optional object representing resources (typically parsed from `designpack.json`)
      - `maps` ... object containing hooks for mapping various entities
        - `font` ... optional remap callback for font
        - `xpath` ... optional remap callback for XPath
        - `uri` ... optional remap callback for URI
    - `@return` ... output stream (if provided as `options.output`) or string

- `stl2emp( input: string|stream [, options: object] ) : string|stream` ... Parses _STL_ document and generates corresponding _Empower JSON_ fragment
    - `input` ... input string or stream containing _STL_
    - `options` ... following options are currently supported:
      - `output` ... output stream to be filled with resulting _Empower JSON_
      - `indent` ... bool, string or a number (of spaces) used for indentation
      - `permissive` ... determines whether the conversion fails or ignores unsupported constructs
      - `resources` ... optional object representing resources (typically parsed from `designpack.json`)
      - `maps` ... object containing hooks for mapping various entities
        - `font` ... optional remap callback for font
        - `xpath` ... optional remap callback for XPath
        - `uri` ... optional remap callback for URI
    - `@return` ... output stream (if provided as `options.output`) or string

This way we would have a complete (two-way) conversion which could be
used to solve very interesting use-cases.

The interface is optionally _stream-based_ - this decision has a potential to provide
some efficiency advantages in case we create a C++ implementation. 

## Usage

The usage of `emp2stl` conversion is very simple and looks as follows:

```js
    var streams = require('streams');
    var empower = require('empower');
    // create src stream
    var json = streams.stream('wd:/input/hello.json');
    // convert Empower JSON to STL 
    var stl = empower.emp2stl(json);
    // log the resulting STL
    console.log(stl);
```

This is an empty fragment generated by default (via `emp2stl(json)` call):

```xml
<stl:stl xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1"><stl:document><stl:story name="Main" w="8.5in"/></stl:document></stl:stl>
```

This is how it looks indented (via `emp2stl(json, {indent: '  '})` call):

```xml
<stl:stl xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:document>
    <stl:story name="Main" w="8.5in"/>
  </stl:document>
</stl:stl>
```

And we can also generate a page & text boilerplate (via `emp2stl(json, {indent: '  ', page: true})` call):

```xml
<stl:stl xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:document>
    <stl:story name="Main" w="8.5in"/>
  </stl:document>
  <stl:page w="8.5in" h="1in">
    <stl:text w="8.5in" h="1in" style="-stl-shape-resize: free 0pt max 0pt max" story="Main"/>
  </stl:page>
</stl:stl>
```

We can enable internal CSS stylesheet (via `emp2stl(json, {indent: '  ', page: true, css: true})` call):

```xml
<stl:stl xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:style>
    .text1 {
      -stl-shape-resize: free 0pt max 0pt max
    }
  </stl:style>
  <stl:document>
    <stl:story name="Main" w="8.5in">
      <stl:p/>
    </stl:story>
    <stl:page w="8.5in" h="1in">
      <stl:text w="8.5in" h="1in" story="Main" class="text1"/>
    </stl:page>
  </stl:document>
</stl:stl>
```

... or an external CSS stylesheet (via `emp2stl(json, {indent: '  ', page: true, css: cssOutStream})` call):

```xml
<stl:stl xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:style src="wd:/output/empty.css"/>
  <stl:document>
    <stl:story name="Main" w="8.5in">
      <stl:p/>
    </stl:story>
    <stl:page w="8.5in" h="1in">
      <stl:text w="8.5in" h="1in" story="Main" class="text1"/>
    </stl:page>
  </stl:document>
</stl:stl>
```

The usage of `stl2emp` conversion is also very simple and looks as follows:

```js
    var streams = require('streams');
    var empower = require('empower');
    // create src stream
    var stl = streams.stream('wd:/input/hello.xml');
    // convert STL to Empower JSON
    var json = empower.stl2emp(stl);
    // log the resulting JSON
    console.log(json);
```

## Libraries

All the parsing and translation is implemented inside this module, except for XML parsing we are using the
[sax.js](https://github.com/isaacs/sax-js) which is already included in StoryTeller Javascript modules.

So the implementation has very few dependencies and can be easily ported to browser javascript environment
as is demonstrated in this simple [online converter](https://rawgit.com/opentext/storyteller/master/docplatform/code/javascript/empower/index.html).

## Source code

The current implementation is available in the 
[empower.js](https://github.com/opentext/storyteller/blob/master/docplatform/forsetup/js/tools/empower.js).
For JSON creation we use a configuration file [empower.json](https://github.com/opentext/storyteller/blob/master/docplatform/forsetup/js/tools/empower.json) containing variety of JSON skeletons for individual objects and structures. All generic STL parsing related
functionality goes to a separate module called [stl.js](https://github.com/opentext/storyteller/blob/master/docplatform/forsetup/js/tools/stl.js)
(that area of functionality is not _Empower_ specific, it is also used for the [Dynamic HTML](https://opentext.github.io/storyteller/stl/usecases.html#dynamic-html) usecase in the [stl2html.js](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/stl2html/stl2html.js) javascript filter.

## Tests

For development testing we use several (_STL_ based) regression tests:

The [basic.xml](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/basic.xml) demonstrates a dynamic conversion of _content fragments_ (in Empower called _text messages_).
There is a _repeater_ over input file names which repeats a _content substitution_ (`stl:content` element)
dynamically modified by a script.
The script calls the `emp2stl` conversion, creates an _STL definition_, uploads it and modifies the substitution URI.

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/basic.xml?footer=minimal"></script>

The [canvas.xml](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/canvas.xml) demonstrates a dynamic conversion of _page fragments_ (in Empower called _graphical messages_).
There is a _repeater_ over input file names which repeats a _fragment reference_ (`stl:fragment` element)
dynamically modified by a script.
The script calls the `emp2stl` conversion, creates an _STL definition_, uploads it and modifies the fragment URI.

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/canvas.xml?footer=minimal"></script>

The [complex.xml](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/complex.xml) demonstrates a combination of the above. You can see that the `emp2stl` conversion detects
a type of the input JSON (whether the message is _textual_ or _graphical_) and creates an appropriate
_STL definition_.

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/complex.xml?footer=minimal"></script>

It is worth to mention that the listed STL-based tests were also used for generating _STL_ fragments
and rasters for all examples within this documentation.

All the tests above use common helper module [emptools.js](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/emptools.js):

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/emptools.js?footer=minimal"></script>

# Technical details

This section will contain several examples of text and graphical fragments
starting from trivial ones to more complex ones. The icremental manner helps
us to locate individual features in JSON file as well as distinguish
between individual enumeration values and codes.  

## Content Fragments

Text fragments represent an implicit text object as a top of hierarchy of objects.
They typically grow horizontally with content. In the _Empower_ environment they
are called _Text Messages_.

### Single-line Text

We start with single-line texts, in order to determine simple constructs
and individual _character style_ equivalents.

#### Empty Fragment

At the very beginning we start with an absolutely empty _text fragment_.
Even though it contains no visible content, the initial JSON boilerplate is relatively verbose -
see [empty.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json).

##### Resulting STL

The generated _STL_ is much more concise:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/empty.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json" target="_blank">input/empty.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json&css=1" target="_blank">output/empty.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/empty.json" target="_blank">output/empty.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/empty.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/empty.png"/></td>
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

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json" target="_blank">input/hello.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json" target="_blank">empty.json vs. hello.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&css=1" target="_blank">output/hello.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello.json" target="_blank">output/hello.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello.json" target="_blank">input vs. output</a></td>
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
          "clrFontColor": { "m_eColorModel": 0, "m_lColor": 0 },
          "iFontHeight10X": 100,
          "bBold": false,
          "bItalic": false,
          "bUnderline": false
        },
        {
          "oiFont": 95,
          "strName": "Lato",
          "iTracking": 0,
          "clrFontColor": { "m_eColorModel": 0, "m_lColor": 0 },
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
+         "clrFontColor": { "m_eColorModel": 0, "m_lColor": 0 },
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

It is obvious that font and typeface metrics are stored as part of font specification -
there are `uUnderWgt`, `sUnderPos`, `iAscent`, `iDescent` and `iLeading` properties
which are clearly not part of the font specification - it should not be necessary
to persist them as all the values can be dynamically retrieved from an associated
_Font Manager_ instance. We believe that such information is reduntant, too specific
and also very brittle - it can be changed with a new typeface version etc.

That's why we do not store such kind of information to _STL definition file_.

On the other hand during the _STL_ to _Empower_ conversion we would have to retrieve
such information from somewhere, but ideally we would like to avoid any dependence on
a _Font Manager_ instance, we would prefere to convert the formats statically with
a minimal dependencies.

Thankfully it seems that the font metrics are not necessary, only optional inside
the _Empower JSON_ format. If we omit all the metrics the generated JSON file
still opens succesfully in _Empower Web Editor_ with no obvious issues.

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/font.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/font.json" target="_blank">input/font.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/font.json" target="_blank">hello.json vs. font.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/font.json&css=1" target="_blank">output/font.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/font.json" target="_blank">output/font.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/font.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/font.json" target="_blank">input vs. output</a></td>
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

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/euro.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/euro.json" target="_blank">input/euro.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/euro.json" target="_blank">hello.json vs. euro.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/euro.json&css=1" target="_blank">output/euro.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/euro.json" target="_blank">output/euro.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/euro.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/euro.json" target="_blank">input vs. output</a></td>
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

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_opentext.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json" target="_blank">input/hello_opentext.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json" target="_blank">hello.json vs. hello_opentext.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json&css=1" target="_blank">output/hello_opentext.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_opentext.json" target="_blank">output/hello_opentext.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_opentext.json" target="_blank">input vs. output</a></td>
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
+          "clrFontColor": { "m_eColorModel": 0, "m_lColor": 0 },
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
+          "clrFontColor": { "m_eColorModel": 0, "m_lColor": 0 },
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
+       2,      // Font index #2
        79,
        112,
        101,
        110,
+       3,      // Font index #3
        116,
        101,
        120,
        116,
+       1,      // Font index #1
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
+       -62,    // font change
        0,
        0,
        0,
        0,
+       -62,    // font change
        0,
        0,
        0,
        0,
+       -62,    // font change
        0,
        -64
      ],
```

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/sizes.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/sizes.json" target="_blank">input/sizes.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/sizes.json" target="_blank">hello_opentext.json vs. sizes.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/sizes.json&css=1" target="_blank">output/sizes.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/sizes.json" target="_blank">output/sizes.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/sizes.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/sizes.json" target="_blank">input vs. output</a></td>
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
        { "m_eColorModel": 0, "m_lColor": 0 },
        { "m_eColorModel": 0, "m_lColor": 12648192 },
        { "m_eColorModel": 0, "m_lColor": 255 },       // RGB color model, red (#ff0000)
+       { "m_eColorModel": 0, "m_lColor": 65280 },     // RGB color model, green (#00ff00)
+       { "m_eColorModel": 0, "m_lColor": 16711680 }   // RGB color model, blue (#0000ff)
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

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/colors.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/colors.json" target="_blank">input/colors.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/colors.json" target="_blank">hello_opentext.json vs. colors.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/colors.json&css=1" target="_blank">output/colors.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/colors.json" target="_blank">output/colors.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/colors.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/colors.json" target="_blank">input vs. output</a></td>
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
+          "clrFontColor": { "m_eColorModel": 0, "m_lColor": 0 },
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
+       -240,  // superscript start
+       0,     // padding ?
        0,
        0,
        0,
        0,
+       -59,   // superscript end
+       -239,  // subscript start
+       0,     // padding ?
        0,
        0,
        0,
        0,
+       -58,   // subscript end
        0,
        -64
      ],
```


##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/valign.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/valign.json" target="_blank">input/valign.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/valign.json" target="_blank">hello_opentext.json vs. valign.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/valign.json&css=1" target="_blank">output/valign.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/valign.json" target="_blank">output/valign.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/valign.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/valign.json" target="_blank">input vs. output</a></td>
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

If we compare the new [hyperlink.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hyperlink.json) with previous [hello_opentext.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json) we get the following differences:

```js
      ...
      "m_TextFonts": [
	    ...
+       {  // new font spec #2 (underline)
+         "oiFont": 95,
+         "strName": "Lato",
+         "iTracking": 0,
+         "clrFontColor": { "m_eColorModel": 0, "m_lColor": 0 },
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
        { "m_eColorModel": 0, "m_lColor": 12845056 } // new color spec #3 (blue #0000c4)
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
        32,
+       0,    // link index #0
+       0,    // padding zero
+       2,    // font index #2
+       3,    // color index #3
        79,
        112,
        101,
        110,
        116,
        101,
        120,
        116,
+       1,    // font index #1
+       0,    // color index #0
+       0,    // padding zero
+       0,    // padding zero
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
+       -252, // hyperlink start
        0,
+       -62,  // font change
+       -63,  // color change
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
+       -62,  // font change
+       -63,  // color change
+       -109, // hyperlink end
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

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hyperlink.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hyperlink.json" target="_blank">input/hyperlink.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hyperlink.json" target="_blank">hello_opentext.json vs. hyperlink.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hyperlink.json&css=1" target="_blank">output/hyperlink.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hyperlink.json" target="_blank">output/hyperlink.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hyperlink.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hyperlink.json" target="_blank">input vs. output</a></td>
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

### Multi-line Text

Multi-line texts help us to understand a concept of _paragraphs_ and associated
_paragraph styles_ as well as _lists_ (_bullets_ and _numbering_). 

#### Plain Paragraphs

Now instead of just a single line of text we can split the "Hello Opentext!" phrase
to several paragraphs. This way we can investigate concept of _paragraphs_ along with
associated _paragraph style_ properties.

If we compare the new [paragraphs.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json) with previous [hello_opentext.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json) we get the following differences:

```js
      "m_ParaValues": [
        {
          "m_iEditAreaNdx": -1,
          "iNumbering": 0,
          "iDefaultTab": 250,
          "iBulletFont": -1
        },
+       {
+         "m_iEditAreaNdx": -1,
+         "iNumbering": 0,
+         "iDefaultTab": 250,
+         "iBulletFont": -1,
+         "eUserSetNumber": 0
+       },
+       {
+         "m_iEditAreaNdx": -1,
+         "iNumbering": 0,
+         "iDefaultTab": 250,
+         "iBulletFont": -1,
+         "eUserSetNumber": 0
+       }
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
+       0,     // padding zero
+       0,     // padding zero
         79,
        112,
        101,
        110,
        116,
        101,
        120,
        116,
+       0,     // padding zero
+       0,     // padding zero
        33,
        0
      ],
      "m_sXPos": [
        -244,  // paragraph break
        0,     // paragraph style spec #0
        -62,
        -63,
        0,
        0,
        0,
        0,
        0,
+       -244,  // paragraph break
+       1,     // paragraph style spec #1 
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
+       -244,  // paragraph break
+       2,     // paragraph style spec #2
        0,
        -64
      ],
``` 

It means that _paragraph styles_ are not shared like other kinds of specs
(_fonts_ or _colors_) - each paragraph has its own _paragraph style spec_
even though the specs are identical. We do not know if that is a property
of the JSON format itself, or just a current behavior of the _Empower editor_.

##### Resulting STL

The _emp2stl_ convertor generates the following STL equivalent:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/paragraphs.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json" target="_blank">input/paragraphs.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_opentext.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json" target="_blank">hello_opentext.json vs. paragraphs.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json&css=1" target="_blank">output/paragraphs.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/paragraphs.json" target="_blank">output/paragraphs.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/paragraphs.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/paragraphs.png"/></td>
  </tr>
</table>

#### Font Color

Let's investigate how font color changes interact with paragraph breaks.
What if we select all three paragraphs of text and set the font color to red?

If we compare the new [par_color.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_color.json) with previous [paragraphs.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json) we get the following differences:

```js
      "m_Colors": [
        { "m_eColorModel": 0, "m_lColor": 0 },
        { "m_eColorModel": 0, "m_lColor": 12648192 },
        { "m_eColorModel": 0, "m_lColor": 255 }
      ],
      "m_cChars": [
        0,
        0,
        1,
+       2,  // color index #2
        72,
        101,
        108,
        108,
        111,
        0,
        0,
         79,
        112,
        101,
        110,
        116,
        101,
        120,
        116,
        0,
        0,
        33,
        0
      ],
```

The only change is the color index at the start of the text content. It means that cyurrent color spans
across all the three paragraphs - there is no need to reestablish the font color for each individual
paragraph separately.

Another interesting thing is that unlike the _paragraph specs_ the
_color specs_ are reused - a red color spec already existed so there
were no need to append another `m_Color` item - the color index #2
was reused.

##### Resulting STL

The _emp2stl_ convertor generates the following STL equivalent:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_color.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_color.json" target="_blank">input/par_color.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_color.json" target="_blank">paragraphs.json vs. par_color.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_color.json&css=1" target="_blank">output/par_color.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_color.json" target="_blank">output/par_color.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_color.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_color.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_color.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_color.png"/></td>
  </tr>
</table>

#### Horizontal Alignment

Now let's look at a paragraph style  property - alignment. What if we
change the _Horizontal Alignment_ of the individual paragraphs
to _Full_, _Right_ and _Center_ respectively?

If we compare the new [par_color.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_color.json) with previous [paragraphs.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json) we get the following differences:

```js
      "m_ParaValues": [
        {
          "m_iEditAreaNdx": -1,
          "iNumbering": 0,
          "iDefaultTab": 250,
          "iBulletFont": -1,
+         "iJustification": 3  // full alignment
        },
        {
          "m_iEditAreaNdx": -1,
          "iNumbering": 0,
          "iDefaultTab": 250,
          "iBulletFont": -1,
          "eUserSetNumber": 0,
+         "iJustification": 1  // right alignment
        },
        {
          "m_iEditAreaNdx": -1,
          "iNumbering": 0,
          "iDefaultTab": 250,
          "iBulletFont": -1,
          "eUserSetNumber": 0,
+         "iJustification": 2  // center alignment
        }
      ],
```

... so we see that the only property changes is the `iJustification` member
of _paragraph style spec_.

##### Resulting STL

The _emp2stl_ convertor generates the following STL equivalent:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_halign.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_halign.json" target="_blank">input/par_halign.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_halign.json" target="_blank">paragraphs.json vs. par_halign.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_halign.json&css=1" target="_blank">output/par_halign.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_halign.json" target="_blank">output/par_halign.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_halign.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_halign.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_halign.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_halign.png"/></td>
  </tr>
</table>


#### Indent

The similar situation is when we modify _Indentation_ of individual paragraphs:

If we compare the new [par_color.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_color.json) with previous [paragraphs.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json) we get the following differences:

```js
      "m_ParaValues": [
        {                        // no indent
          "m_iEditAreaNdx": -1,
          "iNumbering": 0,
          "iDefaultTab": 250,
          "iBulletFont": -1
        },
        {
          "m_iEditAreaNdx": -1,
          "iNumbering": 0,
          "iDefaultTab": 250,
          "iBulletFont": -1,
          "eUserSetNumber": 0,
+         "iLeftIndent": 250    // indent 0.25 in 
        },
        {
          "m_iEditAreaNdx": -1,
          "iNumbering": 0,
          "iDefaultTab": 250,
          "iBulletFont": -1,
          "eUserSetNumber": 0,
+         "iLeftIndent": 500   // indent 0.5 in
        }
      ],
      ],
```

... so we see that the only property changes is the `iJustification` member
of _paragraph style spec_.

##### Resulting STL

The _emp2stl_ convertor generates the following STL equivalent:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_indent.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_indent.json" target="_blank">input/par_indent.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_indent.json" target="_blank">paragraphs.json vs. par_indent.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_indent.json&css=1" target="_blank">output/par_indent.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_indent.json" target="_blank">output/par_indent.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_indent.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_indent.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_indent.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_indent.png"/></td>
  </tr>
</table>


### Lists

This section investigates a very popular construct for which was the _STL syntax_
largely updated relatively recently - lists. It includes _bullets_ as well as single-level
and multi-level _numbering_.

#### Bullets

We'll start with bullets at they are stateless and relatively simple - there is no counter
associated.

If we compare the new [par_bullets.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_bullets.json) with previous [paragraphs.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json) we get the following differences:

```js
      "m_ParaValues": [
        {
          "m_iEditAreaNdx": -1,
+         "iNumbering": 1,
          "iDefaultTab": 250,
+         "iBulletFont": 2,    // font index #2
+         "iNumberIndent": 1,
+         "iLeftIndent": 250,
+         "pszNumberString": 168,
+         "bUserSetType": false,
+         "iNumberColor": 0
        },
        {
          "m_iEditAreaNdx": -1,
+         "iNumbering": 1,
          "iDefaultTab": 250,
+         "iBulletFont": 2,   // font index #2
          "eUserSetNumber": 0,
+         "iNumberIndent": 1,
+         "iLeftIndent": 250,
+         "pszNumberString": 168,
+         "bUserSetType": false,
+         "iNumberColor": 0
        },
        {
          "m_iEditAreaNdx": -1,
+         "iNumbering": 1,
          "iDefaultTab": 250,
+         "iBulletFont": 2,   // font index #2
          "eUserSetNumber": 0,
+         "iNumberIndent": 1,
+         "iLeftIndent": 250,
+         "pszNumberString": 168,
+         "bUserSetType": false,
+         "iNumberColor": 0
        }
      ],
      "m_TextFonts": [
	    ...
        {
          "strName": "Lato",
          "iTracking": 0,
          "clrFontColor": { "m_eColorModel": 0, "m_lColor": 0 },
          "iFontHeight10X": 100,
          "bBold": false,
          "bItalic": false,
          "bUnderline": false
        },
        {
          "oiFont": 95,
          "strName": "Lato",
          "iTracking": 0,
          "clrFontColor": { "m_eColorModel": 0, "m_lColor": 0 },
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
        },
+       {                      // font spec #2 used for bullets
+         "oiFont": 79,
+         "strName": "Lato",
+         "iTracking": 0,
+         "clrFontColor": { "m_eColorModel": 0, "m_lColor": 0 },
+         "iFontHeight10X": 80,
+         "bBold": false,
+         "bUnderline": false,
+         "bItalic": false,
+         "bStrikeThru": false,
+         "uUnderWgt": 0,
+         "sUnderPos": -32768,
+         "iAscent": 33,
+         "iDescent": 7,
+         "iLeading": 0
+       }
      ],

```

##### Resulting STL

The _emp2stl_ convertor generates the following STL equivalent:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_bullets.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_bullets.json" target="_blank">input/par_bullets.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/paragraphs.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_bullets.json" target="_blank">paragraphs.json vs. par_bullets.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_bullets.json&css=1" target="_blank">output/par_bullets.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_bullets.json" target="_blank">output/par_bullets.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_bullets.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_bullets.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_bullets.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_bullets.png"/></td>
  </tr>
</table>

#### Numbering

Now we use _numbering_ instead of _bullets_ and let's see how it changes the JSON poersistence.

If we compare the new [par_numbering.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering.json) with previous [par_bullets.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_bullets.json) we get the following differences:

```js
      "m_ParaValues": [
        {
          "m_iEditAreaNdx": -1,
+         "iNumbering": 2,
          "iDefaultTab": 250,
+         "iBulletFont": -1,
          "iNumberIndent": 1,
          "iLeftIndent": 250,
+         "pszNumberString": [ 49, 46 ],
          "bUserSetType": false,
+         "iNumberColor": 0,
+         "bUserSetColor": false,
+         "eNumberType": 0,
+         "eUserSetNumber": 0,
+         "iNumberValue": 1
        },
        {
          "m_iEditAreaNdx": -1,
+         "iNumbering": 2,
          "iDefaultTab": 250,
+         "iBulletFont": -1,
          "eUserSetNumber": 0,
          "iNumberIndent": 1,
          "iLeftIndent": 250,
+         "pszNumberString": [ 50, 46 ],
          "bUserSetType": false,
+         "iNumberColor": 0,
+         "bUserSetColor": false,
+         "eNumberType": 0,
+         "iNumberValue": 2
        },
        {
          "m_iEditAreaNdx": -1,
+         "iNumbering": 2,
          "iDefaultTab": 250,
+         "iBulletFont": -1,
          "eUserSetNumber": 0,
          "iNumberIndent": 1,
          "iLeftIndent": 250,
+         "pszNumberString": [ 51, 46 ],
          "bUserSetType": false,
+         "iNumberColor": 0,
+         "bUserSetColor": false,
+         "eNumberType": 0,
+         "iNumberValue": 3
        }
      ],
```
... we can se that the content did not change at all, the only changed properties
are inside the paragraph style specs. One interesting aspect is that numbering values
(the `iNumberValue` field) including the formatted marker text (the `pszNumberString`field)
are part of the persistence. It seems like the numbering is pre-computed
and is not changed in runtime. That would significantly reduce usability of this feature,
so we believe that there would be some other numbering mode which was not revealed
in our experiments. For now we just use predefined masks for individual numbering
levels and let _StoryTeller_ do it's numbering. Such approach, we believe, is most reasonable,
even though it leads to a different numbering behavior.

##### Resulting STL

The _emp2stl_ convertor generates the following STL equivalent:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_numbering.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering.json" target="_blank">input/par_numbering.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_bullets.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering.json" target="_blank">par_bullets.json vs. par_numbering.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering.json&css=1" target="_blank">output/par_numbering.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_numbering.json" target="_blank">output/par_numbering.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_numbering.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_numbering.png"/></td>
  </tr>
</table>

#### Nested Numbering

Now we can try numbering nested in multiple levels.

If we compare the new [par_numbering_indent.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering_indent.json) with previous [par_numbering.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering.json) we get the following differences:

```js
      "m_ParaValues": [
        {
          "m_iEditAreaNdx": -1,
          "iNumbering": 2,
          "iDefaultTab": 250,
          "iBulletFont": -1,
          "iNumberIndent": 1,
          "iLeftIndent": 250,
          "pszNumberString": [ 49, 46 ],
          "bUserSetType": false,
          "iNumberColor": 0,
          "bUserSetColor": false,
          "eNumberType": 0, // numbering type decimal
          "eUserSetNumber": 0,
          "iNumberValue": 1
        },
        {
          "m_iEditAreaNdx": -1,
          "iNumbering": 2,
          "iDefaultTab": 250,
          "iBulletFont": -1,
          "eUserSetNumber": 0,
+         "iNumberIndent": 2,
+         "iLeftIndent": 500,
+         "pszNumberString": [ 49, 46 ],
          "bUserSetType": false,
          "iNumberColor": 0,
          "bUserSetColor": false,
          "eNumberType": 0, // numbering type decimal
+         "iNumberValue": 1
        },
        {
          "m_iEditAreaNdx": -1,
          "iNumbering": 2,
          "iDefaultTab": 250,
          "iBulletFont": -1,
          "eUserSetNumber": 0,
+         "iNumberIndent": 3,
+         "iLeftIndent": 750,
+         "pszNumberString": [ 105, 46 ],
          "bUserSetType": false,
          "iNumberColor": 0,
          "bUserSetColor": false,
+         "eNumberType": 5, // numbering type lower-roman
+         "iNumberValue": 1
        }
      ],
```
... so we can see that the level of numbering is defined in the `iNumberIndent`
field, there is also independent `iLeftIndent` field defining the indentation
and then there is `iNumberValue` field defining the actual numbering value along
with the `pszNumberString` representing the resulting formatted numbering marker.

The `iNumberValue` property stores statically a current numbering value. 

We can also figure out that not only there is a formatted string for the numbering
marker (`pszNumberString` property), but there is also a numbering type definition
represented as enumeration stored in the `eNumberType` property. Following
lookup can be used for numbering masks we have determined so far:

```js
const numbering = {
  0: '1.', // decimal
  2: 'A.', // upper-alpha
  3: 'a.', // lower-alpha
  4: 'R.', // upper-roman
  5: 'r.', // lower-roman
  6: '1)',
  7: 'A)',
  8: 'a)',
  9: 'R)',
  10: 'r)',
  15: '(1)',
  16: '(A)',
  17: '(a)',
  18: '(R)',
  19: '(r)',
};

```

The important thing is that when we generate the _Empower JSON_ back from an _STL_ fragment
then neither storing a static value of the `iNumberValue` property nor computing the
presentation string stored in the `pszNumberString` property is not necessary. It is OK
to persist just a numbering definition (`iNumbering`, `eNumberType` and `iNumberIndent`
properties) and the rest is computed in the web editor.

##### Resulting STL

The _emp2stl_ convertor generates the following STL equivalent:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_numbering_indent.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering_indent.json" target="_blank">input/par_numbering_indent.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering_indent.json" target="_blank">par_numbering.json vs. par_numbering_indent.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering_indent.json&css=1" target="_blank">output/par_numbering_indent.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_numbering_indent.json" target="_blank">output/par_numbering_indent.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering_indent.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_numbering_indent.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/par_numbering_indent.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/par_numbering_indent.png"/></td>
  </tr>
</table>

### Objects

In this section we will investigate insertion of nested objects like
_image_, _text frame_ and _table_.

#### Image

Image feels like the simplest of the three objects, so we will start with it.

If we compare the new [image.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/image.json) with previous [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

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
+       32,  // space character
+       0,
+       0,
+       0,
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
+       0,
+       -251,    // object start
+       0,       // object index #0
+       -106,    // object end
+       0,
        -64
      ],
      "m_oiLayer": 0,
+     "m_pObjs": [
+       {                      // image spec #0 
+         "m_oiID": 4,
+         "m_UNITSPERINCH": 1000,
+         "m_bPen": 0,
+         "m_pDbBitmap": { "m_oiDB": 3, "m_strCASId": "Y3hyOi8_aWQ9Y2ZlMDkwN2Ut...OGZhYw==" },
+         "m_oiLayer": 0,
+         "m_rectPosition": { "left": 0, "top": 0, "bottom": 708, "right": 3802 }
+       }
+     ],
+     "m_Objs": [
+       { "m_iObjType": 6, "m_eAnchor": 6 } // object type 6 => image
+     ],
```
We can see that there is an object reference in the content stream
and then there is an object specification which says that the type
of the object is _image_ (`m_iObjType` = 6) and there is _CAS Resource ID_
stores in the `m_strCASId` field.

##### Resulting STL

The _emp2stl_ convertor generates the following STL equivalent:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/image.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/image.json" target="_blank">input/image.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/image.json" target="_blank">hello.json vs. image.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/image.json&css=1" target="_blank">output/image.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/image.json" target="_blank">output/image.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/image.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/image.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/image.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/image.png"/></td>
  </tr>
</table>

#### Text Frame

Now we try to replace the image with a nested text frame.

If we compare the new [text.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/text.json) with previous [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

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
+       32, // space
+       0,
+       0,
+       0,
+       0,
+       33, // exclamation mark
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
+       -251, // object start
+       0,    // object index #0
+       -106, // object end
+       0,
+       0,
        -64
      ],
      "m_pObjs": [
+       {        // text spec #0 
+         "m_bAutoSizeX": false,
+         "m_bAutoSizeY": true,
+         "m_rectPosition": { ... },
+         "m_pEditableProps": { ... },
+         ...
+         "m_ParaValues": [ ... ],
+         "m_TextFonts": [ ... ],
+         "m_Colors": [ ... ],
+         "m_cChars": [ ... ],
+         "m_sXPos": [ ... ],
+         ...
+       }
      ],
     "m_Objs": [
+       { "m_iObjType": 14, "m_eAnchor": 6 } // object type 14 => text
      ],
```
Note that the structure of the nested text object is quite similar
to the top level structure of the whole content fragment.

##### Resulting STL

The _emp2stl_ convertor generates the following STL equivalent:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/text.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/text.json" target="_blank">input/text.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/image.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/text.json" target="_blank">image.json vs. text.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/text.json&css=1" target="_blank">output/text.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/text.json" target="_blank">output/text.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/text.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/text.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/text.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/text.png"/></td>
  </tr>
</table>

#### Table

The last object type is _table_. Presumably it will be most advanced structure,
so let's look into the details.

If we compare the new [table.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/table.json) with previous [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

```js
      "m_ParaValues": [
        {
          "m_iEditAreaNdx": -1,
          "iNumbering": 0,
          "iDefaultTab": 250,
          "iBulletFont": -1
        },
+       {  // second paragraph spec
+         "m_iEditAreaNdx": -1,
+         "iNumbering": 0,
+         "iDefaultTab": 250,
+         "iBulletFont": -1,
+         "eUserSetNumber": 0
+       },
+       {  // third paragraph spec
+         "m_iEditAreaNdx": -1,
+         "iNumbering": 0,
+         "iDefaultTab": 250,
+         "iBulletFont": -1,
+         "eUserSetNumber": 0
+       }
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
+       0, // padding zeros
+       0,
+       0,
+       0,
+       0,
+       0,
+       0,
+       0,
+       33, // exclamation mark
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
+       -244, // paragraph break
+       1,    // paragraph style #1
+       -251, // object start
+       0,    // object id #0
+       -106, // object end
+       0,
+       -244, // paragraph break
+       2,    // paragraph style #2
+       0,
        -64
      ],
      "m_pObjs": [
+      {         // table spec #0
+         "iDbDrawObjVersion": -174,
+         "m_oiID": 2,
+         "m_rectPosition": { ... },
+         ...
+         "m_pEditableProps": { ... },
+         ...
+         "m_Cells": [
+           {
+             "m_pTextDraw": { ... }
+             "m_iColumn": 0,
+             "m_iRow": 0,
+             ...
+           },
+           {
+             "m_pTextDraw": { ... }
+             "m_iColumn": 1,
+             "m_iRow": 0,
+             ...
+           }
+         ],
+         "m_Columns": [ ... ],
+         "m_Rows": [ ... ],
+         ...
+       }
      ],
      "m_Objs": [
+       { "m_iObjType": 5, "m_eAnchor": 6 } // object type 5 => table
      ],
	  ...
```

We can see that each table contains _Column_ definitions, _Row_ definitions and
_Cell_ definitions, where each cell contains a single _text_ - a structure
very similar to _text frame_ known from previous sections.

##### Resulting STL

The _emp2stl_ convertor generates the following STL equivalent:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/table.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/table.json" target="_blank">input/table.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/table.json" target="_blank">hello.json vs. table.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/table.json&css=1" target="_blank">output/table.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/table.json" target="_blank">output/table.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/table.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/table.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/table.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/table.png"/></td>
  </tr>
</table>

### Variables

Let's add two variables to a content - write the following text containing two variables:

    Hello {Supplier Name} and {Car Dealer Name}!

And look what corresponding JSON structures got created:

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
        32,   // chr(32)  == ' '
+       0,
+       0,
+       0,
+       0,
+       0,
+       0,
        32,   // chr(32)  == ' '
        97,   // chr(97)  == 'a'
        110,  // chr(97)  == 'n'
        100,  // chr(97)  == 'd'
        32,   // chr(32)  == ' '
+       0,
+       0,
+       0,
+       0,
+       0,
+       0,
        33,   // chr(111) == '!'
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
+       -384, // varaible start
+       501,  // variable id
+       0,    // padding zero
+       1,    // var props index+1 (#0)
+       -111, // variable end
+       0,    // padding zero
        0,
        0,
        0,
        0,
        0,
+       -384, // varaible start
+       580,  // variable id
+       0,    // padding zero
+       2,    // var props index+1 (#1)
+       -111, // variable end
+       0,    // padding zero
        0,
        -64
      ],
      "m_VarProps": [
+       {
+         "iArrayUse": 0,
+         "iArrayNdx": 0,
+         "iFormat": 1,
+         "msCustom": "",
+         "iNumDigits": 2,
+         "iConvMask": 0,
+         "bConvYen": false,
+         "iLength": 0,
+         "eJustify": 0,
+         "ePadChar": 0,
+         "iSizeType": 0,
+         "iHeight": 0,
+         "iWidth": 0,
+         "iOffset": 0,
+         "m_eEncoding": 0,
+         "msDisplay": "",
+         "iFrameStyle": 0,
+         "iFrameWt": 0,
+         "clrFrameLine": {
+           "m_eColorModel": 0,
+           "m_lColor": 0
+         },
+         "iFrameLineStyle": 0,
+         "iRotate": 0,
+         "oiLocSearchKey": 0,
+         "eSubstitutionTime": -1,
+         "eAggregateDataVarUse": 0,
+         "m_eFitting": 0,
+         "m_oiFittingVar": 0,
+         "m_eAlignFrom": 0,
+         "m_oiAlignFromVar": 0,
+         "m_bSnapBoundingBoxToImage": false,
+         "m_bUseAspectRatio": false
+       },
+       {
+         "iArrayUse": 0,
+         "iArrayNdx": 0,
+         "iFormat": 1,
+         "msCustom": "",
+         "iNumDigits": 2,
+         "iConvMask": 0,
+         "bConvYen": false,
+         "iLength": 0,
+         "eJustify": 0,
+         "ePadChar": 0,
+         "iSizeType": 0,
+         "iHeight": 0,
+         "iWidth": 0,
+         "iOffset": 0,
+         "m_eEncoding": 0,
+         "msDisplay": "",
+         "iFrameStyle": 0,
+         "iFrameWt": 0,
+         "clrFrameLine": {
+           "m_eColorModel": 0,
+           "m_lColor": 0
+         },
+         "iFrameLineStyle": 0,
+         "iRotate": 0,
+         "oiLocSearchKey": 0,
+         "eSubstitutionTime": -1,
+         "eAggregateDataVarUse": 0,
+         "m_eFitting": 0,
+         "m_oiFittingVar": 0,
+         "m_eAlignFrom": 0,
+         "m_oiAlignFromVar": 0,
+         "m_bSnapBoundingBoxToImage": false,
+         "m_bUseAspectRatio": false
+       }
      ],
```

The problem is that there is not enough information in the input JSON file.
There is only a varaible `id` (`501` and `580`) along with a set of `m_VarProps`
properties, but no variable name or sample data.

That means that under such circumstances the converter only synthesizes variable name
as `$empower_variable_<id>` and can add no more user friendly information:

```xml
<stl:stl xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:document>
    <stl:story name="Main" w="8.5in">
      <stl:p>
        <stl:span style="font-family: Lato; font-size: 10pt">Hello <stl:span/></stl:span>
        <stl:field xpath="string($empower_variable_501)"/>
        <stl:span style="font-family: Lato; font-size: 10pt"><stl:span/> and <stl:span/></stl:span>
        <stl:field xpath="string($empower_variable_580)"/>
        <stl:span style="font-family: Lato; font-size: 10pt">!</stl:span>
      </stl:p>
    </stl:story>
  </stl:document>
</stl:stl>
```

Thankfully besides individual JSON fragments there is an additional JSON file
representing all associated resources:
[resources.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/resources.json).
It contains additional information about _fonts_, _colors_, _variables_, etc.

If we have such file then we can parse it and provide the resulting object
to the converter as `resources` property of the `options` parameter:

```js
  var json = streams.stream('wd:/input.json');
  var resources = streams.stream('wd:/resources.json');
  var stl = empower.emp2stl(json, {resources: JSON.parse(resources.read())});
```
With such additional source of information the converter produces following (much better) alternative:

```xml
<stl:stl xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:document>
    <stl:story name="Main" w="8.5in">
      <stl:p>
        <stl:span style="font-family: Lato; font-size: 10pt">Hello <stl:span/></stl:span>
        <stl:field xpath="string($UB_SupplierName_S)" sample="Supplier Name"/>
        <stl:span style="font-family: Lato; font-size: 10pt"><stl:span/> and <stl:span/></stl:span>
        <stl:field xpath="string($UB_FordDealer_S)" sample="Car Dealer Name"/>
        <stl:span style="font-family: Lato; font-size: 10pt">!</stl:span>
      </stl:p>
    </stl:story>
  </stl:document>
</stl:stl>
```

Similar holds for the opposite `stl2emp` conversion.

If no `resources` are involved then converter can convert a variable `$empower_variable_<id>`
back to corresponding `id`, but unable to convert actual variable names like `$UB_SupplierName_S`.
Such variable names are converted correctly to a corresponding `id` only with a proper `resources`
option passed as a parameter. Otherwise a conversion error is raised.

```js
  var stl = streams.stream('wd:/input.xml');
  var resources = streams.stream('wd:/resources.json');
  var json = empower.stl2emp(stl, {resources: JSON.parse(resources.read())});
```

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/variables.json" target="_blank">input/variables.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/variables.json" target="_blank">hello.json vs. variables.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/variables.json&resources=https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/resources.json&css=1" target="_blank">output/variables.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/variables.json" target="_blank">output/variables.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/variables.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/variables.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/variables.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/variables.png"/></td>
  </tr>
</table>

## Canvas Fragments

This type of fragments represents a canvas area containing one or more absolutely positioned
objects like _images_, _tables_ or _text frames_. In the _Empower_ environment they are called
_Graphical Messages_.

### Flat Objects

First we test a simple scenario: an empty canvas or a canvas with one or more
children of various types.

#### Empty fragment

Again we start with an empty canvas fragment.
In this case the boilerplate for the empty canvas fragment is reasonably brief -
see [g_empty.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_empty.json).

##### Resulting STL

The generated _STL_ looks as follows:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_empty.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_empty.json" target="_blank">input/g_empty.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_empty.json&css=1" target="_blank">output/g_empty.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_empty.json" target="_blank">output/g_empty.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_empty.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_empty.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_empty.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_empty.png"/></td>
  </tr>
</table>

#### Text Frame

Now we can insert a single absolutely positioned _text frame_.

The only difference (except the canvas height) is in the `contents.m_DrawFront` array
containing the newly created _text frame_.

If we compare the new [g_text.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text.json) with previous [g_empty.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_empty.json) we get the following differences:

```js
{
  "m_lTableNumber": 21,
  "m_strName": "",
  "m_ePageType": 1,
  "m_iDesignResolution": 1000,
  "m_Size": {
    "width": 3600,
    "height": 1000
  },
  "m_bSendDefault": true,
  "m_refUsageRule": 0,
  "m_scopedMessageTemplate": 1,
  "contents": {
    "m_lResolution": 1000,
    "m_bTextOnly": false,
    "m_lWidth": 3600,
    "m_lHeight": 1000,
    "m_lTopMargin": 0,
    "m_lBottomMargin": 0,
    "m_lGrowMaxY": 1000,
    "m_bHasDynamicBottom": false,
    "m_bAllStatic": false,
    "m_bHasStatic": false,
    "m_iGrowth": 0,
+   "m_DrawFront": [
+     {
+       "m_eComponentType": 14, // object type: text
+       "m_eDynamic": 40,
+       "m_pDrawObj": { ... }   // object definition
+     }
    ],
    "m_FrontRelNdx": [],
    "m_iFrontBottomMin": 101,
    "m_iFrontStaticBottom": 750,
    "m_iFrontDynBottom": 750,
    "m_bHasFlowLists": false,
    "m_FrontFlowControls": []
  },
  "rule": null
}		
```

The `contents.m_DrawFront.m_pDrawObj` definition is similar to a definition
of an _inline text object_ we already know from the previous [Text Frame](#text-frame) section.

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text.json" target="_blank">input/g_text.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_empty.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text.json" target="_blank">g_empty.json vs. g_text.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text.json&css=1" target="_blank">output/g_text.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text.json" target="_blank">output/g_text.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text.png"/></td>
  </tr>
</table>

#### Text, Image and Table

Now instead of just a single object we insert all types of objects currently supported.

The `contents.m_DrawFront` array should now contain three items instead of one.

If we compare the new [g_text_image_table.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_table.json) with previous [g_empty.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_empty.json) we get the following differences:

```js
{
  "m_lTableNumber": 21,
  "m_strName": "",
  "m_ePageType": 1,
  "m_iDesignResolution": 1000,
  "m_Size": {
    "width": 3600,
    "height": 2500
  },
  "m_bSendDefault": true,
  "m_refUsageRule": 0,
  "m_scopedMessageTemplate": 1,
  "contents": {
    "m_lResolution": 1000,
    "m_bTextOnly": false,
    "m_lWidth": 3600,
    "m_lHeight": 2500,
    "m_lTopMargin": 0,
    "m_lBottomMargin": 0,
    "m_lGrowMaxY": 2500,
    "m_bHasDynamicBottom": false,
    "m_bAllStatic": false,
    "m_bHasStatic": false,
    "m_iGrowth": 0,
    "m_DrawFront": [
      {
        "m_eComponentType": 14, // object type 14 => text
        "m_eDynamic": 40,
        "m_pDrawObj": { ... },  // text object definition
      },
      {
        "iVersion": 1101,
        "m_eComponentType": 6,  // object type 6 => image
        "m_eDynamic": 168,
        "m_pDrawObj": { ... }   // image object definition
      },
      {
        "m_eComponentType": 5,  // object type 5 => table
        "m_eDynamic": 41,
        "m_pDrawObj": { ... }   // table object definition
      }
    ],
    "m_FrontRelNdx": [],
    "m_iFrontBottomMin": 101,
    "m_iFrontStaticBottom": 750,
    "m_iFrontDynBottom": 750,
    "m_bHasFlowLists": false,
    "m_FrontFlowControls": []
  },
  "rule": null
}
```
... the good news is that _canvas object types_ stored in the `m_eComponentType`
are represented as the same anumeration like the _inline object types_ stored
in the `m_iObjType` field.

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_image_table.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_table.json" target="_blank">input/g_text_image_table.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_empty.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_table.json" target="_blank">g_empty.json vs. g_text_image_table.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_table.json&css=1" target="_blank">output/g_text_image_table.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_image_table.json" target="_blank">output/g_text_image_table.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_table.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_image_table.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_table.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_image_table.png"/></td>
  </tr>
</table>

### Nested Objects

Now we can proceed to a more advanced examples - nested object hierarchies.

#### Image inside a Text

First we insert an image inside a text frame.

If we compare the new [g_text_image_nested.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_nested.json) with previous [g_text.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text.json) we get the following differences:

```js
{
  ...
  "contents": {
    ...  
    "m_DrawFront": [
      {
        "m_eComponentType": 14, // object type 14 => text
        "m_eDynamic": 40,
        "m_pDrawObj": {
          "m_bAutoSizeX": false,
+         "m_bAutoSizeY": true,
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
+           32,
+           0,    // object index #0
+           0,
+           0,
+           0,
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
+           0,
+           -251,  // object start
+           0,
+           -106,  // object end
+           0,
            -64
          ],
          "m_oiLayer": 0,
          "m_pObjs": [
+           {                 // nested image
+             "m_oiID": 5,
+             "m_UNITSPERINCH": 1000,
+             "m_bPen": 0,
+             "m_pDbBitmap": { "m_oiDB": 4, "m_strCASId": "Y3hyOi8_aWQ...yOGZhYw==" },
+             "m_oiLayer": 0,
+             "m_rectPosition": { "left": 0, "top": 0, "bottom": 177, "right": 979 }
+           }
          ],
          "m_Objs": [
+           { "m_iObjType": 6, "m_eAnchor": 6 }  // object type 6 => image
          ],
          "m_Links": [],
          "m_oiID": 0,
          "m_VarProps": [],
          "m_ppEditableAreas": [],
          "m_Rules": []
        }
      }
    ],
    ...
  },
  "rule": null
}
```

... so we can see that the outside of the text frame is identical, the only changes
are inside the text frame:  the `m_cChars` and `m_sXPos` content arrays
and `m_pObjs` plus `m_Objs` arrays are changed.

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_image_nested.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_nested.json" target="_blank">input/g_text_image_nested.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_nested.json" target="_blank">g_text.json vs. g_text_image_nested.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_nested.json&css=1" target="_blank">output/g_text_image_nested.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_image_nested.json" target="_blank">output/g_text_image_nested.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_nested.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_image_nested.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_image_nested.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_image_nested.png"/></td>
  </tr>
</table>

#### Table inside a Text

Now we try to insert a _table_ instead of an _image_ inside a _text frame_.

If we compare the new [g_text_table_nested.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_table_nested.json) with previous [g_text.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text.json) we get the following differences:

```js
{
  ...
  "contents": {
    ...  
    "m_DrawFront": [
      {
        "m_eComponentType": 14, // object type 14 => text
        "m_eDynamic": 40,
        "m_pDrawObj": {
          "m_bAutoSizeX": false,
+         "m_bAutoSizeY": true,
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
+           0,    // object index #0
+           0,
+           0,
+           0,
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
+           -251,  // object start
+           0,
+           -106,  // object end
+           0,
            -64
          ],
          "m_oiLayer": 0,
          "m_pObjs": [
+           {                 // nested table
+              ...
+           }
          ],
          "m_Objs": [
+           { "m_iObjType": 5, "m_eAnchor": 6 }  // object type 5 => table
          ],
          "m_Links": [],
          "m_oiID": 0,
          "m_VarProps": [],
          "m_ppEditableAreas": [],
          "m_Rules": []
        }
      }
    ],
    ...
  },
  "rule": null
}
```

... so we can see that again everything is very similar, the only changes
are inside the top level _text frame_:  the `m_cChars` and `m_sXPos`
content arrays and `m_pObjs` plus `m_Objs` arrays are changed.

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_table_nested.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_table_nested.json" target="_blank">input/g_text_table_nested.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_table_nested.json" target="_blank">g_text.json vs. g_text_table_nested.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_table_nested.json&css=1" target="_blank">output/g_text_table_nested.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_table_nested.json" target="_blank">output/g_text_table_nested.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_table_nested.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_table_nested.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_text_table_nested.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_text_table_nested.png"/></td>
  </tr>
</table>

#### Text and Image inside a Table

In the final test we will insert a _text frame_ and an _image_ inside a _table_. 

The resulting JSON can be seen in the [g_table_text_image_nested.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_table_text_image_nested.json).

##### Resulting STL

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_table_text_image_nested.xml?footer=minimal"></script>

##### Summary

<table style="background-color:#fff49c">
  <tr>
	<td>JSON input:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_table_text_image_nested.json" target="_blank">input/g_table_text_image_nested.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_empty.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_table_text_image_nested.json" target="_blank">g_empty.json vs. g_table_text_image_nested.json</a></td>
  </tr>
  <tr>
	<td>STL output:</td>
	<td><a href="editor/?emp=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_table_text_image_nested.json&css=1" target="_blank">output/g_table_text_image_nested.xml</a></td>
  </tr>
  <tr>
	<td>JSON output:</td>
	<td><a href="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_table_text_image_nested.json" target="_blank">output/g_table_text_image_nested.json</a></td>
  </tr>
  <tr>
    <td>JSON diff:</td>
	<td><a href="http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_table_text_image_nested.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_table_text_image_nested.json" target="_blank">input vs. output</a></td>
  </tr>
  <tr>
    <td colspan="2">Empower JSON render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/g_table_text_image_nested.png"/></td>
  </tr>
  <tr>
    <td colspan="2">StoryTeller STL render:</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 0.4rem"><img src="https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/g_table_text_image_nested.png"/></td>
  </tr>
</table>


# Conclusion

Thanks to the interactive editor it was relatively easy to reverse-engineer at least some
of the features of _Empower JSON_ format and convert them to _STL_. On the other hand
it would be really complicated to implement the opposite direction without deeper
knowledge of the _Empower JSON_ format. There are still too many fields we do not
understand and some of them point outside the JSON persistence (there are some database
indexes, resource package identifiers, etc).

We believe that this document can serve as further demonstration of strengths and advantages
of _StoryTeller Layout (STL)_ exchange format. The fact that it is carefully designed
to be human readable and understandable makes a conversion from different formats
a relatively quick and straightforward task.

## Fixes

This proof of concept helped to fix few minor issues in _DocBuilder_ implementation
(incorrect brush propagation, lack of support for vertical alignment, inline tables, ...),
but other than that the _STL_ format proved to be mature enough to support
almost all the features necessary for this non-trivial task.

## Optimizations

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

## Follow-up

It is hard to tell without a documentation and more experience with _Empower product_,
but we believe that the _Empower Editor_ used for this proof of concept was a stripped
down version, which is relatively limited in comparison with full web-based editor.
The only types of objects were _text frames_, _tables_ and _images_. It is likely
that we extend the current implementation of the conversion with more object types
like _barcodes_ etc. in near future.

As the _Empower JSON_ format is clearly not designed for document exchange between products
and probably it is not guaranteed to be backward compatible, we can consider an alternative
to bypass the JSON serialization and implement _STL_ import and export directly to the
_Empower web editor_. That way we would get rid of an unnecessary level of indirection
and could achieve more stable and maintainable code. On the other hand the JSON intercode
serves as an important persistence layer which helps the components to be more
independent (we can test our _Emp2STL_ conversion as a separate component independently
of the web editor or other components of the _Empower_ infrastructure). So the final
decision about the arrangement is yet to come.

