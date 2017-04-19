============
01 - Recurse
============

:Author: Petr Filipsky

Overview
========

Let's say we want to copy some sub-tree verbatim, exactly as it is, without any changes.
The ``character/address`` would be a good candidate for that.

First we create *Data template* which exactly matches the source data structure.
Then we would like to create transformation rules which just copy all the values one-by-one
(``streetnr``, ``street``, ``city`` and ``state``).

It would be very brittle and time consuming to create all the rules for all the sub-elements 
and possibly attributes.

For simplifying this relatively frequent process there is a special form called ``recurse``
supported in the *TDT Processor*. When we specify ``recurse`` keyword (along with a *base xpath*) 
inside a *transformation rule* then the rule starts to behave like a "meta-rule" generating
automatically corresponding rules for whole *Data Template* subtree. 

Test case definition
====================

*Data Template* contains the ``character/address`` hierarchy placed under the ``page/heading``
element:    


Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template pfi01/tutorial/02-advanced/01-recurse

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
    




Transformation
--------------

For the ``/data/page/heading`` element we specify ``recurse`` keyword.
This way the character's ``name`` and ``address`` gets copied recursively - 
corresponding rules get created for all sub-elements, their attributes and 
text data present in *Data Template*.

.. code:: xml
   :number-lines:
   :name: transformation pfi01/tutorial/02-advanced/01-recurse

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
    </tdt:transformation>
    




Compiled Transformation
-----------------------

Here we can see what rules are automatically created based on the ``recurse`` specification:

.. code:: xml
   :number-lines:
   :name: compiled pfi01/tutorial/02-advanced/01-recurse

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
        <tdt:value key=".">city</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/state">
        <tdt:value key=".">state</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/street">
        <tdt:value key=".">street</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/streetnr">
        <tdt:value key=".">streetnr</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/name">
        <tdt:value key=".">name</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
    </tdt:transformation>




Expected Result
---------------

As you can see all the values of the character's ``name`` and ``address`` 
are copied as expected: 

.. code:: xml
   :number-lines:
   :name: instance pfi01/tutorial/02-advanced/01-recurse

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
            <streetnr>742</streetnr>
            <street>Evergreen Terrace</street>
            <city>Springfield</city>
            <state>Massachusetts</state>
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
    



Source data
-----------

.. code:: xml
   :number-lines:
   :name: source pfi01/tutorial/02-advanced/01-recurse

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

