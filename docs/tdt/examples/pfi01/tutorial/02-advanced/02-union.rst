==========
02 - Union
==========

:Author: Petr Filipsky

Overview
========

In this part we demonstrate the difference between *design driven* and *data driven* element ordering. 

By default the TDT is *template driven* - it means that it respects the order of different elements 
in *Data Template*.

This behavior can be changed with a special form called ``union``.


Test case definition
====================

Source data
-----------

You can see that the ordering of the address sub-elements 
(``streetnr``, ``street``, ``city`` and ``state``) is different for the two characters:

.. code:: xml
   :number-lines:
   :name: source pfi01/tutorial/02-advanced/02-union

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
    





Data Template
-------------

*Data Template* is exactly the same as in the previous example.
The important aspect is that the *data ordered* elements must be defined together
in the *Data Template*. All the remaining *magic* is then made in *Data Transformation*.

.. code:: xml
   :number-lines:
   :name: template pfi01/tutorial/02-advanced/02-union

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

For all the *data driven* elements we define a ``union`` key containing specification
of a primary selection. Keep in mind that the ``union`` specification string must be 
identical (for example strings ``*[self::city|self::state]`` and ``*[self::state|self::city]``
are not), a variable definition is a suitable tool for simplification. 

Then all the subsequent elements with identical ``union`` value are treated as 
a single *union*. It means that the ``union`` string is evaluated once and then 
a secondary xpath selector (specified as ``.`` value) is evaluated for each individual 
element. This way the original ordering of elements is preserved.
 
.. code:: xml
   :number-lines:
   :name: transformation pfi01/tutorial/02-advanced/02-union

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
      <!--v- Here starts the hand written union -v-->
      <tdt:rule path="/data/page/heading/address">
        <tdt:value key="$union">*[self::streetnr|self::street|self::city|self::state]</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/city">
        <tdt:value key="union">$union</tdt:value>
        <tdt:value key=".">self::city</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/state">
        <tdt:value key="union">$union</tdt:value>
        <tdt:value key=".">self::state</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/street">
        <tdt:value key="union">$union</tdt:value>
        <tdt:value key=".">self::street</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/streetnr">
        <tdt:value key="union">$union</tdt:value>
        <tdt:value key=".">self::streetnr</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <!--^- Here ends the hand written union -^-->
    </tdt:transformation>
    




Compiled Transformation
-----------------------

.. code:: xml
   :number-lines:
   :name: compiled pfi01/tutorial/02-advanced/02-union

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
        <tdt:value key="$union">*[self::streetnr|self::street|self::city|self::state]</tdt:value>
        <tdt:value key=".">address</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/city">
        <tdt:value key="union">$union</tdt:value>
        <tdt:value key=".">self::city</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/state">
        <tdt:value key="union">$union</tdt:value>
        <tdt:value key=".">self::state</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/street">
        <tdt:value key="union">$union</tdt:value>
        <tdt:value key=".">self::street</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address/streetnr">
        <tdt:value key="union">$union</tdt:value>
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

.. code:: xml
   :number-lines:
   :name: instance pfi01/tutorial/02-advanced/02-union

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
    


