# STL bullets & numbering

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

While there is also a possibility to represent multidimensional counters in *HTML/CSS*
(see [this example](https://www.w3schools.com/css/tryit.asp?filename=trycss_counters3)), 
unfortunately *counter dimensions* are tightly connected to hierarchy of corresponding *HTML elements* 
(e. g. `<ol>` or `<li>`) and also it's formatting is limited compared to *StoryTeller*:

  - All levels of a multi-level counter are formatted in a single format
    - e.g. `[4, 1, 2]` transforms to `"4.1.2"` if we use `counters(my-counter, ".", decimal)` 
    - or `"IV.I.II"` if we use `counters(my-counter, ".", upper-roman)`

So to avoid these limitations we decided to transform a single *vector counter* definition to several 
corresponding *scalar counters*. 

For example when user defines a single *vector counter* called `my-counter` then the `STL2HTML` 
component converts it to a set of corresponding counters:

  - `my-counter-0`
  - `my-counter-1`
  - `my-counter-2` 
  - ... 

and this way we can convert a sophisticated mask like  `"%0!R.%1!1 %2!a) "` to the following 
corresponding CSS [content definition][(https://www.w3schools.com/cssref/pr_gen_content.asp):

`counter(my-counter-0, upper-roman) "." counter(my-counter-1) " " counter(my-counter-2, lower-alpha) ") "`. 

## Markup

Whenever a user wants to present a numbering, he has to define 
a [vendor prefixed](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) CSS property 
`-stl-counter`. The property associates the correponding element with a numbering *counter* and also specifies 
a format mask how the counter should be formatted to the marker content.

Optionally it is also possible to modify formatting style of the numbering marker, if user wants it different
from the current paragraph style. That can be done through a special `::marker` pseudo-element in the CSS
stylesheet. This approach is inspired by the experimental 
[CSS marker](https://developer.mozilla.org/en-US/docs/Web/CSS/::marker) technology. 

There are basically two numbering scenarios which differ in a way how markup maps to a numbering hierarchy:

### Explicit hierarchy

In this scenario a numbering hierarchy directly maps to a corresponding hierarchy of same XML (or HTML) elements.

It means that we need to map a multi-level numbering to hierarchy of lists, like:

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

In order to associate such hierarchy of `<stl:p>` elements we can define a CSS class 
(e.g. `item`) with specified `-stl-counter` property as follows
(we can optionally add a `::marker` pseudo-element and change the style of the dynamically 
generated *marker content*):

```css
    .item {
      -stl-counter: counter "%0!R. " "%0!R.%1!1 " "%0!R.%1!1 %2!a) ";
    }
    .item::marker {
      color: red;
    }
``` 

The `-stl-counter` definition has the following format:

-   `-stl-counter: <counter> <mask-level1> <mask-level2> <mask-level3> ...`
    - `counter` ... `identifier` representing numbering vector counter
    - `mask-level?` ... a sequence of formatting masks for individual numbering levels

We believe that with some changes in *Document platform* it will be possible to convert such definition 
to *StoryTeller document definition* (it will also mean a significant effort in *DocBuilder++* implementation, 
CSS parsing framework and *DocWriter* component).

At the same time we believe that it is possible to reasonably and directly convert the definition to corresponding 
HTML/CSS definition which behaves according to definition.

The idea is that the following STL markup:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/numbering/lists.xml?footer=minimal"></script>

... will be converted to the following HTML in STL2HTML component:

<script async src="//jsfiddle.net/filodej/ksshewmL/embed/result,html,css/"></script>

### Implicit hierarchy

In this scenario a numbering hierarchy maps to an implicit hierarchy of XML (or HTML) elements.
By implicit we mean some kind of rather semantic (as opposed to syntactic) rules, like a "hierarchy"
of `<h1>`, `<h2>`, `<h3>`, ... elements in HTML.

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

In order to associate such hierarchy of `<stl:p>` elements we can define a set of CSS classes 
(e.g. `h1`, `h2`, `h3`, ...) and specify corresponding `-stl-counter` properties 
as follows (we can optionally define `::marker` pseudo-element selectors and change style of 
dynamically generated *marker content*):

```css
    .h1 {
      -stl-counter: counter 0 "%0!R. ";
    }
    .h2 {
      -stl-counter: counter 1 "%0!R.%1!1 ";
    }
    .h3 {
      -stl-counter: counter 2 "%0!R.%1!1 %2!a) ";
    }
    .h1::marker, .h2::marker, .h3::marker {
      color: red;
	}
```

This form of `-stl-counter` definition associates just with a single level of a *multidimensional counter* 
and so has the following format:

-   `-stl-counter: <counter> <level> <mask>`
    - `counter` ... `identifier` representing numbering vector counter
    - `level` ... `integer` representing a level (an index representing single slot of the `counter`)
    - `mask` ... a string used for marker content formatting

(compare it with the "multi-level" form of the same property described in the previous section).

Again we believe that it is possible to reasonably and directly convert the definition to corresponding 
HTML/CSS definition which behaves according to definition.

It means that the following STL markup:

<script src="//gist-it.appspot.com/github/opentext/storyteller/raw/master/docplatform/distribution/py/pfdesigns/docbuilder/numbering/headings.xml?footer=minimal"></script>

... will be converted to the following HTML in STL2HTML component:

<script async src="//jsfiddle.net/filodej/186t94Lx/embed/result,html,css/"></script>

### Bullets

Bullets are specified in a very similar way, except in this case we do not need a `counter` associated.

So for the name of the counter user can use a special keyword `none` as follows:

```css
    .item {
      -stl-counter: none "♥ " "♣ " "♦ " "♣ ";
    }
```

... of for implicit hierarchy:

```css
    .h1 {
      -stl-counter: counter 0 "♥ ";
    }
    .h2 {
      -stl-counter: counter 1 "♣ ";
    }
    ...
```

For more convenience we could also add a support for `default` bullet sequence,
which could be utilized as follows:

```css
    .item {
      -stl-counter: none default;
    }
```

... and correspondingly:

```css
    .h1 {
      -stl-counter: counter 0 default;
    }
    .h2 {
      -stl-counter: counter 1 default;
    }
    ...
```

## Conclusion

As it is relatively difficult to get two distinct numbering implementations "under one roof"
we had a hard time to reach an acceptable solution.

While the proposed approach has some disadvantages:

  - Vendor specific proprietary CSS property
  - ...

... we are relatively happy with this proposal, as it has some nice properties:

  - Conversion to both destination formats is relatively straightforward
  - Supports both *explicit* & *implicit* hierarchies
  - Is releatively easy for users
    - Provides a helpful indirection for centralized numbering definition
    - For simple cases (no custom marker styling) supports inline definition inside `style` attribute
  - STL markup gets simplified
    - `list-class` and `list-style` attributes no longer necessary (replaced with `::marker` pseudo-element)
    - `<stl:li>` element no longer necessary (`<stl:p>` is good enough)

