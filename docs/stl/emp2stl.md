# EMP2STL Conversion

## Text Fragments

### Empty

At the very beginning we start with an empty text fragment.
Even though it contains no visible content, the initial JSON boilerplate is relatively verbose.
The generated STL is much more concise.

- [JSON](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/input/empty.json)
- [STL](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/pfdesigns/docbuilder/empower/output/empty.xml)

### Hello

Now we start to insert a plain text just with default styling.
The only difference is in two parallel arrays `m_cChars` containing character codes
and `m_sXPos` containing some kinds of commands.

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
we can see changes in `m_Colors`, `m_cChars` and `m_sXPos` arrays:

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
          "m_eColorModel": 0,
          "m_lColor": 255
+       },
+       {
+         "m_eColorModel": 0,
+         "m_lColor": 65280
+       },
+       {
+         "m_eColorModel": 0,
+         "m_lColor": 16711680
        }
      ],
      "m_cChars": [
        0,
        0,
        1,
        0,
        72,
+       2,   // color index 2
        101,
+       3,   // color index 3
        108,
+       4,   // color index 4
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

Let's try to insert a character outside the ASCII range, for example the € symbol.

```
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
+       1,    // font index 1
+       0,    // color index 0
+       8364, // euro character code
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


## Graphical Fragments
