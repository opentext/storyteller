Table of Contents
=================

  * [Implementation](#implementation)
     * [StoryTeller](#storyteller)
     * [HTML](#html)
  * [Markup](#markup)
     * [Explicit hierarchy](#explicit-hierarchy)
     * [Implicit hierarchy](#implicit-hierarchy)
     * [Bullets](#bullets)
  * [Conclusion](#conclusion)

# STL Bullets & Numbering

This document describes a proposal for *bullets & numbering* definition in STL markup.

A primary design goal is to provide users with declarative and relatively friendly way to define
*bullets & numbering* in *STL definition markup* which would be relatively easily convertible 
to *StoryTeller Document* (in *DocBuilder++* component), but also directly convertible 
to HTML (via the *STL2HTML* component).

As there are notable differences between *StoryTeller implementation* and *HTML implementation* 
of *bullets & numbering* it soon became clear that meating the goals stated above would not be easy. 
While we originally tried to find a standard CSS definition we unfortunately quickly realized that 
such approach would make it very hard to convert to *StoryTeller definition*. 
Similarly a *StoryTeller-like* definition would be nearly impossible to convert to HTML/CSS. 
After some initial experiments we decided to look for a middle ground - try to define a markup 
which is proprietary, but relatively easily convertible to both destination formats.   

## Implementation

For advanced (multi-level) numbering there is always a set of *integer counters* representing
a current state of the numbering hierarchy. 

### StoryTeller

In *Storyteller* we represent the state as a *vector of integers* and call it `NumberingRegistry`. 
It is then possible to define a *numbering mask* - a string specifying how a current `NumberingRegistry` 
transforms to a presentation string.

For example if we use a formatting mask `"%0!R.%1!1 %2!a) "` then formatter converts a 
`NumberingRegistry` equal to `[4, 1, 2]` to the `"IV.1 b) "` presentation string.

### HTML

While there is also a possibility to represent multi-dimensional counters in *HTML/CSS*
(see [this example](https://www.w3schools.com/css/tryit.asp?filename=trycss_counters3)), 
unfortunately *counter dimensions* are tightly connected to hierarchy of corresponding *HTML elements* 
(e. g. `<ol>` or `<li>`) and also it's formatting is limited compared to *StoryTeller*:

  - All levels of a multi-level counter are formatted in a single format
    - e.g. `[4, 1, 2]` transforms to `"4.1.2"` if we use `counters(my-counter, ".", decimal)` 
    - or `"IV.I.II"` if we use `counters(my-counter, ".", upper-roman)`

So to avoid these limitations we decided to transform a single *vector counter* definition to several 
corresponding *scalar counters*. 

For example when user defines a single *vector counter* called `counter` then the *STL2HTML* 
component converts it to a set of corresponding counters:

  - `counter-0`
  - `counter-1`
  - `counter-2` 
  - ... 

and this way we can convert a sophisticated mask like  `"%0!R.%1!1 %2!a) "` to the following 
corresponding CSS [content definition](https://www.w3schools.com/cssref/pr_gen_content.asp):

`counter(counter-0,upper-roman) "." counter(counter-1) " " counter(counter-2,lower-alpha) ") "`

## Markup

Whenever a user wants to present a numbering, he has to define 
a [vendor prefixed](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) set of CSS properties 
`-stl-list-...`. The properties associate the correponding *element* with a numbering *counter* and 
also define a *format mask* specifying how the *counter* should be formatted to dynamic *marker content*.

Optionally it is also possible to modify *formatting style* of the *numbering marker*, if user wants it different
from the current *character style*. That can be done through a special `::marker` pseudo-element in the CSS
stylesheet. This approach is inspired by the experimental 
[CSS marker](https://developer.mozilla.org/en-US/docs/Web/CSS/::marker) technology. 

There are basically two numbering scenarios which differ in a way how *document markup* maps to a *numbering counter*:

### Explicit hierarchy

In this scenario a *numbering counter* directly maps to a corresponding *markup hierarchy* 
of XML (or HTML) elements.

#### Markup

It means that we need to map a *multi-level counter* to a *multi-level list*, like:

```xml
      <stl:list>
        <stl:p class="item">Category</stl:p>
        <stl:list>
          <stl:p class="item">Item</stl:p>
          <stl:p class="item">Item</stl:p>
          <stl:list>
            <stl:p class="item">Subitem</stl:p>
            <stl:p class="item">Subitem</stl:p>
          </stl:list>
        </stl:list>
      </stl:list>
```

In HTML it roughly corresponds to [this example](https://www.w3schools.com/css/tryit.asp?filename=trycss_counters3).

It is visible that in STL the multi-level list structure is formed by a hierarchy of `stl:list` elements.
In *DocBuilder++* each nested `stl:list` elements automatically increments the internal *list-level* variable.
It means that there is no need to specify `-stl-list-level` property explicitly, it is implicitly defined by 
the nesting depth inside the hierarchy (however it can be explicitly overriden, if user needs to alter the default 
behavior). Also the current `padding-left` property is incremented by `1em` value in order to make /DocBuilder++/ 
behavior similar to HTML.

#### Style

In order to associate such hierarchy of `<stl:p>` elements we can define a CSS class 
(e.g. `item`) with a specified `-stl-list` property as follows (we can optionally add a `::marker` pseudo-element 
and change the style of the dynamically generated *marker content*):

```css
    .item {
      -stl-list-counter: counter;
      -stl-list-mask: "%0!R. " "%0!R.%1!1 " "%0!R.%1!1 %2!a) ";
    }
    .item::marker {
      color: red;
    }
``` 

The `-stl-list` definitions have the following meaning:

 - `-stl-list-counter` ... an *identifier* representing numbering *vector counter*
 - `-stl-list-mask` ... a sequence of string *formatting masks* for individual *numbering levels*

As most of the numbering masks are cummulative (each level contains also all the previous levels)
we introduce a shorthand form of the mask. Instead of the following mask sequence:

{% raw %}
	-stl-list-mask: "%0!R. " "%0!R.%1!1 " "%0!R.%1!1 %2!a) ";
{% endraw %}

... user can use the following shorthand notation:

{% raw %}
	-stl-list-mask: "{%0!R.}{%1!1}{ %2!a)} ";
{% endraw %}

The idea is that the mask definition gets preprocessed for each numbering level and each part 
of the mask enclosed in curly braces disappears if it's index is higher than current numbering 
level. 

It means that the `{% raw %}"{%0!R.}{%1!1}{ %2!a)} "{% endraw %}` definition generates:

  - `"%0!R. "` for numbering level 0
  - `"%0!R.%1!1 "` for numbering level 1
  - `"%0!R.%1!1 %2!a) "` for all remaining levels. 

Users can use backslash character for escaping in case they want to use curly braces inside a mask 
formatting string (e.g. `{% raw %}"{%0!R.}{%1!1}{ \{%2!a\}} "{% endraw %}`).

#### Example

We believe that with some changes in *Document platform* it will be possible to convert such definition 
to *StoryTeller document definition* (it will also mean a significant effort in *DocBuilder++* implementation, 
*CSS parser* framework and *DocWriter* component).

At the same time we believe that it is possible to reasonably and directly convert the definition to corresponding 
HTML/CSS definition which behaves according to definition.

The idea is that the following STL markup:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/numbering/lists.xml?footer=minimal"></script>

... will be formatted by StoryTeller formatter as follows:

![Explicit hierarchy](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/regr_output/pfdesigns/docbuilder/numbering/lists-xml_000-m.png)

... and converted to the corresponding HTML markup by the *STL2HTML* component:

<script async src="//jsfiddle.net/filodej/ksshewmL/embed/result,html,css/"></script>

### Implicit hierarchy

In this scenario a *numbering counter* maps to an *implicit hierarchy* of XML (or HTML) elements.
By *implicit* we mean some kind of rather *semantic* (as opposed to *syntactic*) rules, like 
a "hierarchy" of `<h1>`, `<h2>`, `<h3>`, ... elements in HTML.

#### Markup

In STL such hierarchy can be formed for example as follows:
 
```xml
      <stl:p class="h1">Chapter</stl:p>
      <stl:p class="h2">Section</stl:p>
      <stl:p class="h2">Section</stl:p>
      <stl:p class="h3">Subsection</stl:p>
      <stl:p class="h3">Subsection</stl:p>
      <stl:p class="h1">Chapter</stl:p>
      <stl:p class="h2">Section</stl:p>
```

In HTML it roughly corresponds to [this example](https://www.w3schools.com/css/tryit.asp?filename=trycss_counters2).

#### Style

In order to associate such hierarchy of `<stl:p>` elements we can define a set of CSS classes 
(e.g. `h1`, `h2`, `h3`, ...) and specify corresponding `-stl-list-...` properties 
as follows (we can optionally define `::marker` pseudo-element selectors and change style of 
dynamically generated *marker content*):

```css
    .h1 {
      -stl-list-counter: counter;
      -stl-list-level: 0;
      -stl-list-mask: "%0!R. ";
    }
    .h2 {
      -stl-list-counter: counter;
      -stl-list-level: 1;
      -stl-list-mask: "%0!R.%1!1 ";
    }
    .h3 {
      -stl-list-counter: counter;
      -stl-list-level: 2;
      -stl-list-mask: "%0!R.%1!1 %2!a) ";
    }
    .h1::marker, .h2::marker, .h3::marker {
      color: red;
    }
```

This form of `-stl-list-...` definitions associate just with a particular *level* of a *multi-dimensional counter* 
and so have the following meaning:

  - `-stl-list-counter` ... an *identifier* representing numbering vector counter
  - `-stl-list-level` ... an *integer* representing a level (an *index* representing single slot inside the *counter*)
  - `-stl-list-mask` ... a *string* used for marker content formatting

(compare it with the "multi-level" form of the same property described in the previous section).

#### Basic Example 

Again we believe that it is possible to reasonably and directly convert the *STL definition* 
to corresponding *HTML/CSS definition* which behaves according to definition.

It means that the following STL markup:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/numbering/headings.xml?footer=minimal"></script>

... will be formatted by StoryTeller formatter as follows:

![Explicit hierarchy](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/regr_output/pfdesigns/docbuilder/numbering/headings-xml_000-m.png)

... and converted to the corresponding HTML markup by the *STL2HTML* component:

<script async src="//jsfiddle.net/filodej/186t94Lx/embed/result,html,css/"></script>

#### Fragments example

There is a frequent use case when users create many fragments and want to share 
a single numbering sequence throughout the whole story (across all the fragments' 
content).

It can be solved in a user friendly manner if we share a single CSS definition 
of an implicit numbering hierarchy among all the fragments. We can even generate 
fragments dynamically based on input data and still follow a single numbering
sequence.

In the following example we define a single CSS stylesheet (`link:/stylesheet.css`):

```css
    .section, .chapter, .body {
      font-family: Arial;
      margin-top: 4pt;
    }
    .section {
      font-size: 14pt;
      font-weight: bold;
      -stl-list-counter: counter;
      -stl-list-level: 0;
      -stl-list-mask: "%0!R. ";
    }
    .chapter {
      font-weight: bold;
      -stl-list-counter: counter;
      -stl-list-level: 1;
      -stl-list-mask: "%0!R.%1!1 ";
    }
    .section::marker, .chapter::marker {
      color: red;
    }
``` 

... and define a single fragment template (`link:/template.xml`):

```xml
{% raw %}
    <stl:stl xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
      <stl:style src="link:/stylesheet.css"/>
      <stl:document>
        <stl:story>
          <stl:p class="section">{{id}}</stl:p>
          {{chapter}}
          <stl:p class="chapter">{{name}}</stl:p>
          {{paragraph}}
          <stl:p class="body">{{.}}</stl:p>
          {{/paragraph}}
          {{/chapter}}
        </stl:story>
      </stl:document>
    </stl:stl>
{% endraw %}
```

We have the following sample data:

```xml
      <book>
        <section id="Introduction to Biology">
          <chapter name="Getting Started">
            <paragraph>First paragraph</paragraph>
            <paragraph>Second paragraph</paragraph>
          </chapter>
          <chapter name="Introduction">
            <paragraph>Single paragraph</paragraph>
          </chapter>
          ...
        </section>
        <section id="More advanced stuff">
          ...
        </section>
      </book>
```
... and use the following script to convert each section to an STL fragment:

```js
    var item = require('layout').item();
    var repo = require('repo');
    var data = require( 'data' );
    var Mark = require('markup-js');
    var section = data.js('.').section;
    var template = repo.load("link:/template.xml");
    var stl = Mark.up(template, section);
    item.Uri = repo.upload(stl);
``` 

Here is the full STL definition:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/numbering/fragments.xml?footer=minimal"></script>

Which gets converted to following document:

![Dynamic fragments](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/regr_output/pfdesigns/docbuilder/numbering/fragments-xml_000-m.png)

As you can see, all the generated fragments share single numbering sequence as desired.

### Bullets

Bullets are specified in a very similar way, except in this case we do not need a `counter` associated.

#### Style

So there is no `-stl-list-counter` specified:

```css
    .item {
      -stl-list-mask: "♥ " "♠ " "♦ " "♣ ";
    }
```

... of for implicit hierarchy:

```css
    .h1 {
      -stl-list-level: 0;
      -stl-list-mask: "♥ ";
    }
    .h2 {
      -stl-list-level: 1;
      -stl-list-mask: "♠ ";
    }
    ...
```

For more convenience we could also add a support for `default` bullet sequence,
which could be utilized as follows:

```css
    .item {
      -stl-list-mask: default;
    }
```

... and correspondingly:

```css
    .h1 {
      -stl-list-level: 0;
      -stl-list-mask: default;
    }
    .h2 {
      -stl-list-level: 1;
      -stl-list-mask: default;
    }
    ...
```

... or even more simplified version:

```css
    .h1 {
      -stl-list-level: 0;
    }
    .h2 {
      -stl-list-level: 1;
    }
    ...
```

#### Example

It means that the following STL markup:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/numbering/bullets.xml?footer=minimal"></script>

... will be formatted by StoryTeller formatter as follows:

![Explicit hierarchy](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/regr_output/pfdesigns/docbuilder/numbering/bullets-xml_000-m.png)

... and converted to the corresponding HTML markup by the *STL2HTML* component:

<script async src="//jsfiddle.net/filodej/qr6x9dwr/embed/result,html,css/"></script>

## Conclusion

As it is relatively difficult to get two distinct numbering implementations "under one roof"
we had a hard time to reach an acceptable solution.

While the proposed approach has some disadvantages:

  - Vendor specific proprietary CSS property
  - The *STL2HTML* route relies on modern web browsers
  - ...

... we are relatively happy with this proposal, as it has many nice properties:

  - Conversion to both destination formats is relatively straightforward
  - Supports both *explicit* & *implicit* hierarchies
  - It is releatively user friendly
    - Provides a helpful indirection for centralized numbering definition
    - For simple cases (no custom marker styling) supports inline definition inside `style` attribute
  - STL markup gets simplified
    - `list-class` and `list-style` attributes no longer necessary (replaced with `::marker` pseudo-element)
    - `<stl:li>` element no longer necessary (`<stl:p>` is good enough)
  - Is not STL specific (same approach can be used for HTML filter fragments)
  - ...
