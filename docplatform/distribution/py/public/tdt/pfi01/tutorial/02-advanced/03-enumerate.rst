==============
03 - Enumerate
==============

:Author: Petr Filipsky

Overview
========

As ``union`` specification is relatively cumbersome process, an ``enumerate`` special form
is supported. It's effect is very similar to the one of the
`recurse keyword <../01-recurse/index.html>`_, except it respects 
the original order of source elements. 

 
Test case definition
====================

Transformation
--------------

We specify ``enumerate`` keyword for the ``/data/page/heading/address`` element rule:

.. code:: xml
   :number-lines:
   :name: transformation pfi01/tutorial/02-advanced/03-enumerate

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data">
        <tdt:value key="$chars">/data/character</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/index/key">
        <tdt:value key=".">tdt:nodeset( "TOC", tdt:concat( $chars/name, ', ' ), tdt:concat( $chars/accessories/accessory, ', '), "Index" )</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page">
        <tdt:value key=".">$chars</tdt:value>
        <tdt:value key="$acc">accessories/accessory</tdt:value>
        <tdt:value key="@number">position()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/body">
        <tdt:value key="@total">sum( $acc/@price )</tdt:value>
        <tdt:value key="@rows">count( $acc )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/body/row">
        <tdt:value key=".">$acc</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading">
        <tdt:value key="recurse">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address">
        <tdt:value key="enumerate">.</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    




Compiled Transformation
-----------------------

We can see that the ``union`` was generated for us automatically:

.. code:: xml
   :number-lines:
   :name: compiled pfi01/tutorial/02-advanced/03-enumerate

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data">
        <tdt:value key="$chars">/data/character</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/index/key">
        <tdt:value key=".">tdt:nodeset( "TOC", tdt:concat( $chars/name, ', ' ), tdt:concat( $chars/accessories/accessory, ', '), "Index" )</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page">
        <tdt:value key=".">$chars</tdt:value>
        <tdt:value key="$acc">accessories/accessory</tdt:value>
        <tdt:value key="@number">position()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/body">
        <tdt:value key="@total">sum( $acc/@price )</tdt:value>
        <tdt:value key="@rows">count( $acc )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/body/row">
        <tdt:value key=".">$acc</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address">
        <tdt:value key=".">address</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/city">
        <tdt:value key="union">*[self::streetnr|self::street|self::city|self::state]</tdt:value>
        <tdt:value key=".">self::city</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/state">
        <tdt:value key="union">*[self::streetnr|self::street|self::city|self::state]</tdt:value>
        <tdt:value key=".">self::state</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/street">
        <tdt:value key="union">*[self::streetnr|self::street|self::city|self::state]</tdt:value>
        <tdt:value key=".">self::street</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/streetnr">
        <tdt:value key="union">*[self::streetnr|self::street|self::city|self::state]</tdt:value>
        <tdt:value key=".">self::streetnr</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/name">
        <tdt:value key=".">name</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    




Expected Result
---------------

We can see that the order of the address sub-elements in *Data Instance* 
respects the order of original *Source Data* elements:

.. code:: xml
   :number-lines:
   :name: instance pfi01/tutorial/02-advanced/03-enumerate

   <data>
      <page number="1">
        <heading>
          <name>Freddy Kruger</name>
          <address>
            <streetnr>1428</streetnr>
            <street>Elm Street</street>
            <city>Springwood</city>
            <state>Ohio</state>
          </address>
        </heading>
        <body rows="4" total="84">
          <row>Hat</row>
          <row>Glove</row>
          <row>Hammer</row>
          <row>Spare Razors</row>
        </body>
      </page>
      <page number="2">
        <heading>
          <name>Homer J. Simpson</name>
          <address>
            <street>Evergreen Terrace</street>
            <streetnr>742</streetnr>
            <state>Massachusetts</state>
            <city>Springfield</city>
          </address>
        </heading>
        <body rows="2" total="7">
          <row>Donut</row>
          <row>Duff Beer</row>
        </body>
      </page>
      <index>
        <key>TOC</key>
        <key>Freddy Kruger, Homer J. Simpson</key>
        <key>Hat, Glove, Hammer, Spare Razors, Donut, Duff Beer</key>
        <key>Index</key>
      </index>
    </data>
    



Data Template
-------------

No difference in *Data Template*:

.. code:: xml
   :number-lines:
   :name: template pfi01/tutorial/02-advanced/03-enumerate

   <data>
      <page number="?">
        <heading>
          <name>?</name>
          <address>
            <streetnr>?</streetnr>
            <street>?</street>
            <city>?</city>
            <state>?</state>
          </address>
        </heading>
        <body rows="?" total="?">
          <row>?</row>
        </body>
      </page>
      <index>
        <key>?</key>
      </index>
    </data>
    





Source data
-----------

.. code:: xml
   :number-lines:
   :name: source pfi01/tutorial/02-advanced/03-enumerate

   <data>
      <character>
        <name>Freddy Kruger</name>
        <address>
          <streetnr>1428</streetnr>
          <street>Elm Street</street>
          <city>Springwood</city>
          <state>Ohio</state>
        </address>
        <accessories>
          <accessory price="39">Hat</accessory>
          <accessory price="22">Glove</accessory>
          <accessory price="17">Hammer</accessory>
          <accessory price="6">Spare Razors</accessory>
        </accessories>
      </character>
      <character>
        <name>Homer J. Simpson</name>
        <address>
          <street>Evergreen Terrace</street>
          <streetnr>742</streetnr>
          <state>Massachusetts</state>
          <city>Springfield</city>
        </address>
        <accessories>
          <accessory price="3">Donut</accessory>
          <accessory price="4">Duff Beer</accessory>
        </accessories>
      </character>
    </data>
    



