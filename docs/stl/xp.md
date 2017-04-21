# XML Processor

## Overview

During the development of *DocBuilder++* we identified a necessity of embedding various streams
to a single STL definition file. STL definition can reference external streams, but sometimes it 
is beneficial to make it completely self-contained and itegrate all externalities to a single stream.

On the other hand there are cases when it is beneficial to include content which is physically stored 
in a separate stream and let the rest of the system act like the *included* content was present in a single
stream.

It is important to understand that both previous ideas can be combined together - we can *embed* a snippet 
to the STL definition file but *include* it at several places.

The described functionality became the part of the *DocBuilder++* and proved to be very usable. But we soon 
realized that it is not at all *DocBuilder++* specific, but can be beneficial in another contexts as well.
So we separated the implementation and introduced a new generally available service - *XML Processor*.

## STL Preprocessing

Before an *STL definition* file gets processed by *DocBuilder++* (or other kind of handler) it can be 
(and typically is) pre-processed.

Currently two complementary pre-processing directives are supported:

-   `xp:fixture` ... used for embedding arbitrary data inside XML file
    (embedded content is removed from the markup and uploaded to blob
    manager during preprocessing phase)
-   `xp:include` ... used for including externally stored data inside
    XML file (include directive is replaced by external content)

In future there can be more directives supported, for example `xp:if`,
`xp:repeat`, `xp:switch` etc.

Note that *XML Preprocessing* is completely independent step which can
be used for preprocessing of arbitrary XML file, it is by no means
specific to *STL definition* format.

For example if we extend *TDT processor* to support nested rules then we
could use *XML preprocessor* to avoid unnecessary repetition in *TDT
definition file*:

```xml
<tdt:transformation
    xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor" 
    xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
  <xp:fixture key="link:/address_rules.xml">
    <tdt:group>
      <tdt:rule path="city">
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="number">
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="street">
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="zipcode">
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
    </tdt:group>
  </xp:fixture>
  <tdt:rule path="/data/message/employee">
    <tdt:rule path="name">
      <tdt:value key="text()">text()</tdt:value>
    </tdt:rule>
    <tdt:rule path="address[@type='corporate']">
      <tdt:value key=".">corporate_address</tdt:value>
      <xp:include src="link:/address_rules.xml"/>
    </tdt:rule>
    <tdt:rule path="address[@type='mailing']">
      <tdt:value key=".">mailing_address</tdt:value>
      <xp:include src="link:/address_rules.xml"/>
    </tdt:rule>
    <tdt:rule path="address[@type='residential']">
      <tdt:value key=".">residential_address</tdt:value>
      <xp:include src="link:/address_rules.xml"/>
    </tdt:rule>
  </tdt:rule>
</tdt:transformation>
```

### Fixtures

Thanks to `xp:fixture` directive it is now possible to embed arbitrary
content inside the *STL File* (or more generally to arbitrary XML file),
associate a `link:` URI and use it later (either via an `xp:include`
preprocessor directive or via a *STL reference object* like
`stl:content`, `stl:fragment`, `stl:image`, etc.).

If the content is suitable for that purpose (typically an XML or a plain
text content), it is possible to embed it directly without additional
encoding:

```xml
<stl:stl xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor" 
         xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:fixtures>
    <xp:fixture key="link:/fragments/fragment.html">
      <html>
        <body>
          <p>This is an external <b>HTML</b> <i>fragment</i></p>
        </body>
      </html>
    </xp:fixture>
    <xp:fixture key="link:/fragments/fragment.rtf">
{\rtf1\ansi\deff3\adeflang1025
{\fonttbl{\f0\froman\fprq2\fcharset0 Times New Roman;}{\f1\froman\fprq2\fcharset2 Symbol;}{\f2\fswiss\fprq2\fcharset0 Arial;}...
{\colortbl;\red0\green0\blue0;\red0\green0\blue255;\red0\green255\blue255;\red0\green255\blue0;\red255\green0\blue255;\red255\green0\blue0;...
{\stylesheet{\s0\snext0\widctlpar\hyphpar0\cf0\kerning1\dbch\af5\langfe2052\dbch\af6\afs24\alang1081\loch\f3\fs24\lang1033 Normal;}
...
t}{\cf18\b\afs32\ab\rtlch \ltrch\loch\fs32
e}{\cf2\b\afs32\ab\rtlch \ltrch\loch\fs32
x}{\cf1\b\afs32\ab\rtlch \ltrch\loch\fs32
t}{\rtlch \ltrch\loch
.}
\par }    
    </xp:fixture>
    <xp:fixture key="link:/stylesheets/default.xml">
      <stylesheet name="First set of tests">
        <style selector="normal">
          <character>
            <foreground>RGB(0,0,128)</foreground>
            <font>
              <name>Arial</name>
              <pointsize>14</pointsize>
            </font>           
          </character>
        </style>
        ...
      </stylesheet>
    </xp:fixture>
    <xp:fixture key="link:/data/lookup.xml">
      <statusmap>
        <status value="n">New</status>
        <status value="o">Open</status>
        <status value="i">In Progress</status>
        <status value="f">Resolved</status>
        <status value="r">Reopened</status>
        <status value="c">Closed</status>
      </statusmap>
    </xp:fixture>
    ...
  </stl:fixtures>
  ...
</stl:stl>
```

A binary content cannot be embedded directly, but [Base64](https://en.wikipedia.org/wiki/Base64) encoding can be used instead:

```xml
<stl:stl xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor" 
         xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:fixtures>
    <xp:fixture key="link:/images/arrow.png" encoding="base64">
      iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACDElEQVQ4Ea1VPUsjURSdlw8nxTaLKJbiR7JgI7qFj
      ...
      FxCh5z+OW/2MPtDg2RXGY3xiRdu28+1+Af8B5Veuq3n4GT4AAAAASUVORK5CYII=
    </xp:fixture>
    <xp:fixture key="link:/fragments/fragment.pdf" encoding="base64">
      JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9Q
      ...
      cgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9GCg==
    </xp:fixture>
    ...
  </stl:fixtures>
  ...
</stl:stl>
```

Other than that it is also possible to link an external URI and make an
indirection on order to centralize and better organize external
resources used throughout the STL:

```xml
<stl:stl xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor" 
         xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:fixtures>
    <xp:fixture key="link:/images/ducks.png" src="file:///srv/shared/images/ducks.png"/>
    <xp:fixture key="link:/stylesheets/vw.xml" src="http:/www.volkswagen.de/apps/branding/stylesheet.xml"/>
    <xp:fixture key="link:/data/lookup.xml" src="wd:/data/xml/main-lookup.xml"/>
    ...
  </stl:fixtures>
  ...
</stl:stl>
```

#### Example

Folowing example demonstrates linked as well as embedded (plain and encoded) fixtures:

-   [STL](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/fixtures.xml)
-   [Resulting Document](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/regr_output/pfdesigns/docbuilder/fixtures-xml_000-m.png)

![Fixtures example](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/regr_output/pfdesigns/docbuilder/fixtures-xml_000-m.png)

### XML Include

To provide users with a choice to organize their *STL* files in appropriate granularity there is a possibility 
to *include* another XML file via an `xp:include` directive.

The `xp:include` directive is similar to [xi:include](https://www.w3.org/TR/xinclude-11/)
[extension](https://msdn.microsoft.com/en-us/library/aa302291.asp) with several notable limitations:

-   It does not support relative URIs (neither the `xml:base` attribute
    injection)
-   It does not support an `xi:fallback` equivalent (for anternative
    handling of missing streams)
-   For partial includes it supports `xpath` as opposed to `xpointer`
-   It does not support `encoding` attribute
-   It does not support content negotiation (`accept` and
    `accept-language` attributes)

#### Include a complete file

There is a `src` attribute specifying an URI of the stream to be included.

So user can for example define some story content once and use it
several times in the course of the *STL File* and even change it's
styling properties. This way usetrs can achieve a simple loading-time
styling without introducing runtime stylesheet machinery:

```xml
<stl:stl xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor" 
         xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:fixtures>
    <xp:fixture key="link:/included/content.xml">
      <stl:p>
        This story content is embedded as a 
        <stl:span style="background-color:yellow; font-weight:bold"> fixture </stl:span>
        and included several times.
      </stl:p>
    </xp:fixture>
  </stl:fixtures>
  <stl:document>
    <stl:page w="460pt" h="200pt">
      <!-- Content fixture is included inside text boxes (with a poor man's loading-time styling) -->
      <stl:text x="20pt" y="20pt" w="200pt" h="50pt" style="fill:burlywood">
        <stl:story>
          <stl:span style="font-family:Arial; color:blue">
            <xp:include src="link:/included/content.xml" />
          </stl:span>
        </stl:story>
      </stl:text>
      <stl:text x="20pt" y="80pt" w="200pt" h="50pt" style="fill:burlywood">
        <stl:story>
          <stl:span style="font-family:Courier New; color:green">
            <xp:include src="link:/included/content.xml" />
          </stl:span>
        </stl:story>
      </stl:text>
    </stl:page>
  </stl:document>
</stl:stl>
```

Note how the example above is different from a definition of two frames both sharing the story in runtime:

```xml
<stl:stl xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor" 
         xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:fixtures>
    <xp:fixture key="link:/included/content.xml">
      <stl:p>
        This story content is embedded as a 
        <span background="yellow" bold="true"> fixture </span>
        and included several times.
      </stl:p>
    </xp:fixture>
  </stl:fixtures>
  <stl:document>
    <!-- Content fixture is included inside a shared story -->
    <stl:story story="Shared">
      <xp:include src="link:/included/content.xml" />
    </stl:story>
    <stl:page w="460pt" h="200pt">
      <!-- Story is shared between two frames -->
      <stl:text x="240pt" y="20pt" w="200pt" h="20pt" story="Shared" style="fill:darkseagreen"/>
      <stl:text x="240pt" y="80pt" w="200pt" h="20pt" story="Shared" style="fill:darkseagreen" />
    </stl:page>
  </stl:document>
</stl:stl>
```

User can also use the `xp:include` directive to include an existing HTML
content inside an `stl:story` *STL definition* and let *DocBuilder* to
transform it to a native story content:

```xml
<!-- Let Preprocessor to include the content right inside the story -->
<stl:text x="20pt" y="140pt" w="200pt" h="40pt" style="fill:lightpink">
  <stl:story format="XHTML">
    <xp:include src="wd:/Fragment.html" />
  </stl:story>
</stl:text>
```

Note how that is different from the following code creating an *External Content Substitution* processing an HTML content in runtime:

```xml
<!-- Let DocBuilder to create external content substitution  -->
<stl:text x="240pt" y="140pt" w="200pt" h="40pt" style="fill:khaki">
  <stl:story>
    <stl:content src="wd:/Fragment.html" />
  </stl:story>
</stl:text>
```

#### Include text content

The included content is interpreted as an XML markup by default. The
parsing method is specified by a value of the `parse` attribute. It is
`xml` by default, but it is possible to change it to `text`, so that
included file is included directly as text data.

For example if you want to print an XML or HTML markup then you can
include it as a text from a separate file, because it would be otherwise
necessary to escape all XML significant characters (`<`, `>`, `&`):

```xml
<!-- Let Preprocessor include XHTML markup as text  -->
<stl:text x="20pt" y="240pt" w="500pt" h="70pt" style="fill:lightgreen">
  <stl:story format="XHTML">
    <html>
      <body>
        <pre><xp:include src="wd:/Fragment.html" parse="text"/></pre>
      </body>
    </html>
  </stl:story>
</stl:text>
```

#### Include a file subset

The previous examples included a whole XML file, but there is also a
possibility to narrow the selection with given `xpath` attribute. In
such case the given XPATH expression is evaluated and the resulting
*value*, *node* or *nodeset* is included:

```xml
<!-- Let Preprocessor to include the content right inside the story -->
<stl:text x="20pt" y="140pt" w="200pt" h="40pt" style="fill:lightpink">
  <stl:story format="XHTML">
    <html>
      <body>
        <xp:include src="wd:/Fragment.html" xpath="/html/body/p" />
      </body>
    </html>
  </stl:story>
</stl:text>
```

It can even be used for a loading time calculation like the following:

```xml
<!-- Let Preprocessor perform a loading-time data calculation -->
<stl:text x="240pt" y="190pt" w="200pt" h="40pt" style="fill:lightcyan">
  <stl:story>
    <stl:p>
      The length of the included text was:
      <stl:span style="font-weight:bold">
        <xp:include src="wd:/Fragment.html" xpath="string-length(/)" />
      </stl:span>
    </stl:p>
  </stl:story>
</stl:text>
```

Note that this concept is powerfull enough to replace *runtime substitutions* in some cases. Consider the following example:

```xml
<stl:stl xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor" 
         xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:data>
    <stl:template src="wd:/invoice-data.xml"/>
    <stl:transformation>
      <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0"/>
    </stl:transformation>
  </stl:data>
  <stl:document>
    <stl:page w="240pt" h="80pt">
      <stl:text x="20pt" y="20pt" w="200pt" h="45pt" style="fill:lightblue">
        <stl:story>
          <stl:p>
            <stl:span style="font-weight:bold">
              Phone: 
            </stl:span>
            <stl:tab/>
            <!-- Runtime (formatter realized) substitution -->
            <stl:datasource xpath="/root/customer-info/tel/text()"/>
          </stl:p>
        </stl:story>
      </stl:text>
    </stl:page>
  </stl:document>
</stl:stl>
```

Previous example creates a *runtime substitution* and lets formatter
evaluate the `/root/customer-info/tel/text()` xpath expression and print
resulting text to the output.

But for cases when it is appropriate - with `xp:include` we can realize
the substitution much sooner. As soon as in document design loading
time. We can even generate a fully static document and not attach the
*data island* at all:

```xml
<stl:stl xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor" 
         xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <stl:document>
    <stl:page w="240pt" h="80pt">
      <stl:text x="20pt" y="20pt" w="200pt" h="45pt" style="fill:lightblue">
        <stl:story>
          <stl:p>
            <stl:span style="font-weight:bold">
              Phone: 
            </stl:span>
            <stl:tab/>
            <!-- Loadtime (preprocessor realized) substitution -->
            <xp:include src="wd:/invoice-data.xml" xpath="/root/customer-info/tel/text()"/>
          </stl:p>
        </stl:story>
      </stl:text>
    </stl:page>
  </stl:document>
</stl:stl>
```

It is clear that this approach is not suitable in many cases, it is
often much more efficient to create a single *document design* and run
it many times with different data instances to produce customized
document instances.

On the other hand - there are cases when users use runtime objects only
due to easier design maintenance, but actual data are known at loading
time and do not change with every message. For such cases the
`xp:include` (as a *loading time substitution*) is a suitable tool and
maybe we could extend the concept with loading time *conditions*,
*repeaters* and *switches* in future.

#### Implementation notes

#####  SAX parsing

Whole file include (without hte `xpath` attribute) is realized via SAX stream parsing and so a whole XML document is never held in
memory.

#####  DOM parsing

Partial file include (with `xpath` attribute) on the other hand is
realized via DOM document instance (`IDataSourceWraper` interface
implementation based on [libxml2 library](http://xmlsoft.org/)) and
so whole document is loaded to memory. Such loaded instances are
kept in a cache during whole document design creation and so if
there are several `xp:include` directives sharing the same URI then
the document is loaded and parsed only once.

#####  Infinite recursion

With such powerfull tool it would be really easy to cause an infinite recursion.

Consider the following file, called `stack_overflow.xml`:

```xml
<stl:stl xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor" 
         xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <!-- Lets burn the preprocessor -->
  <xp:include src="wd:/stack_overflow.xml" />
</stl:stl>
```

Such seemingly innocent file would be able to cause a *stack overflow* or more likely *open too many file handles*.

To avoid such cases we introduced a maximum inclusion depth limit. Right now the limit is set to 20.

#####  Simple example

Following example demonstrates various `xp:inlcude` variants and compares it with their runtime alternatives:

-   [STL](https://github.com/opentext/storyteller/blob/master/docplatform/distribution/py/pfdesigns/docbuilder/include.xml)
-   [Resulting Document](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/regr_output/pfdesigns/docbuilder/include-xml_000-m.png)

![Include example](https://rawgit.com/opentext/storyteller/master/docplatform/distribution/py/regr_output/pfdesigns/docbuilder/include-xml_000-m.png)

##### Advanced example

User can also split an existing *STL File* to several parts and so make an application more efficient. 
That can be seen in following example:

Imagine a *Web Editor* allowing users to interactively modify the whole
*STL Definition*. If the definition is kept in a single XML file
containing all necessary information, then anytime user changes a single
bit of it's content then the whole document must be reuploaded in order
to reformat the document and refresh the editor's views.

######  Naive approach

For example let's imagine a very simple client-side formatting proxy implementation:

```javascript
function createProxy(storage, processor, doc_id) {
  var inputs = {design: 'link:/' + doc_id, symlinks: {}};

  // retrieves rasters and refresh client-side views 
  function refresh(result) {
    ...
  }
  // uploads data with given id and updates the internal symlink map
  function upload(id, data, type) {
    return storage.upload(data, {type: type || getMimeByExt(id)})
      .then( function(result) {
        inputs.symlinks['link:/' + id] = 'local:' + result.hash;
      });
  }
  // uploads given document definition, formats the document and refreshes client views
  function update(doc) {
    upload(doc_id, doc)
      .then(function() {
        return processor.format(inputs);
      })
      .then(refresh);
  }

  return {update: update};
}
```

... and whenever anything (even a single bit of the definition) changes, then we have to re-upload 
the whole definition and refresh the view:

```javascript
// initialization
var definition = loadFixture('document.xml'); // Complete STL definition
var proxy = createProxy(storage, processor, 'document.xml');
proxy.update(definition);

...

// whenever anything changes => re-generate and re-upload complete STL definition
updateXMLDefinition( definition );
proxy.update( definition );
```

... as you can imagine - this is far from effective solution of the problem.

######  Efficient approach

An alternative approach is to generalize the `upload` method implementation as follows:

```javascript
function createProxy(storage, processor, doc_id) {
  // inputs, refresh and upload exactly same as previous

  // uploads all given fraction definitions, formats the document and refreshes client views
  function update(fractions) {
    Q.all(_.map(fractions, function(fraction) {
      return upload(fraction.id, fraction.data, fraction.type);
    }))
    .then( function() {
      return processor.format(inputs);
    })
    .then(refresh);
  }
  return {update: update};
}
```

Now client can utilize the `xp:include` directive and create a well structured definition composed of several 
lower level *STL sub-definition files* like for example the following:

```xml
<stl:stl xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor" 
         xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
  <xp:include src="link:/fixtures.xml"/>
  <stl:data>
    <stl:source>
      <xp:include src="link:/data/source.xml"/>
    </stl:source>
    <stl:template>
      <xp:include src="link:/data/template.xml"/>
    </stl:template>
    <stl:transformation>
      <xp:include src="link:/data/tdt.xml"/>
    </stl:transformation>
  </stl:data>
  <stl:document>
    <stl:story name='main' format="XHTML">
      <xp:include src="link:/stories/main.html"/>
    </stl:story>
    <xp:include src="link:/pages/first.xml"/>
    <xp:include src="link:/pages/body.xml"/>
  </stl:document>
</stl:stl>
```

... and so make the client code refresh much more efficient as follows:

```javascript
// initialization (we upload all the fractions once and for all)
var proxy = createProxy( storage, processor, 'document.xml' );
var fractions = [ 
  'document.xml',
  'fixtures.xml',
  'data/source.xml',
  'data/template.xml',
  'data/tdt.xml',
  'stories/main.html',
  'pages/first.xml',
  'pages/body.xml',
].map( function( id ) { return { id: id, data: loadFixture( id ) }; } );
proxy.update( fractions );

...

// we track the changes and re-upload just fractions that have changed and nothing else
// e.g. [ { id: 'stories/main.html', data: '<html> ... </html>', type: 'text/html' } ]
var modifiedFractions = [];
fractions.forEach( function(fraction) {
  if ( isModified(fraction.id) ) {
    updateXMLDefinition(fraction);
    modifiedFractions.push(fraction);
  }
});
proxy.update( modifiedFractions );
```

Hopefully the example above demonstrated how this approach helps to keep the whole document definition 
at much finer granularity and optimizes necessary data transfers for partial definition changes.
