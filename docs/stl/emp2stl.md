# EMP2STL Conversion

## Text Fragments

### Empty

At the very beginning we start with an empty text fragment.
Even though it contains no visible content, the initial JSON boilerplate is relatively verbose -
see [empty.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json).

The generated STL is much more concise:

- [STL](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/empty.xml)

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

- [JSON](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json)
- [Diff](http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json)
- [STL](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello.xml)

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

- [JSON](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_colors.json)
- [Diff](http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_colors.json)
- [STL](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_colors.xml)

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

- [JSON](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_euro.json)
- [Diff](http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_euro.json)
- [STL](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_euro.xml)

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

- [JSON](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_font.json)
- [Diff](http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_font.json)
- [STL](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_font.xml)

### Font sizes

OK, _Wingdings_ font is not very readable, let's experiment with font sizes instead.

If we compare the new [hello_sizes.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_sizes.json) with previous [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

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

- [JSON](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_sizes.json)
- [Diff](http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_sizes.json)
- [STL](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_sizes.xml)

### Hyperlink

Let's append a hyperlink - a text "hyperlink" with address http://www.opentext.com.

If we compare the new [hello_hyperlink.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_hyperlink.json) with previous [hello.json](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json) we get the following differences:

```js
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
      "m_oiLayer": 0,
      "m_pObjs": [],
      "m_Objs": [],
      "m_Links": [
+       {          // link spec #0
+         "eLinkType": 0,
+         "msLink": "http://www.opentext.com",
+         "oiVariable": -1,
+         "bNewWindow": true
+       }
      ],
```

- [JSON](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_hyperlink.json)
- [Diff](http://benjamine.github.io/jsondiffpatch/demo/index.html?left=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello.json&right=https://raw.githubusercontent.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/hello_hyperlink.json)
- [STL](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/hello_hyperlink.xml)

## Graphical Fragments
