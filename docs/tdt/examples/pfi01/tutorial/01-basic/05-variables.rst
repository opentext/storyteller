==============
05 - Variables
==============

:Author: Petr Filipsky

Overview
========

This part of the tutorial demonstrates a possibility to declare and use
*variables*. 

- User can declare any number of variables in any rule. 
- Declared variable is visible in whole sub-tree 
  (in any rule associated with a template sub-element)
- Value of a variable cannot be changed, but any variable can be overshadowed 
  by declaring a different variable with the same name

There can be many reasons why *variables* are used in a particular design:

- In this tutorial we use *variables* mostly as aliases to avoid repeating long XPath expressions.
- In some cases *variables* can eliminate a redundant XPath evaluation and so greatly reduce runtime cost.
- There are cases where variables facilitate an approach which would be very hard or impossible without *variables* 
  (e.g. fixing the position() for use in a nested filter expression). 

Test case definition
====================

Data Template
-------------

The *Data Template* remains exactly the same, we just simplify the transformation rules
using *variables*.

.. code:: xml
   :number-lines:
   :name: template pfi01/tutorial/01-basic/05-variables

   <data>
      <page number="?">
        <heading>
          <name firstname="?" lastname="?">?</name>
          <address>?</address>
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

Here we use variables mostly as aliases and maybe overuse the variables a bit.

It is a matter of preference how often and for which purposes are varaibles 
used by every user.
 
.. code:: xml
   :number-lines:
   :name: transformation pfi01/tutorial/01-basic/05-variables

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data">
        <tdt:value key="$chars">/data/character</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page">
        <tdt:value key=".">$chars</tdt:value>
        <tdt:value key="$acc">accessories/accessory</tdt:value>
        <tdt:value key="@number">position()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/name">
        <tdt:value key="text()">name</tdt:value>
        <tdt:value key="$name">tdt:split( name, ' ' )</tdt:value>
        <tdt:value key="@firstname">$name[1]</tdt:value>
        <tdt:value key="@lastname">$name[last()]</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address">
        <tdt:value key="$adr">address</tdt:value>
        <tdt:value key="text()">
		  concat( $adr/streetnr, ' ', $adr/street, ', ', $adr/city, ', ', $adr/state )
		</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/body">
        <tdt:value key="@total">sum( $acc/@price )</tdt:value>
        <tdt:value key="@rows">count( $acc )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/body/row">
        <tdt:value key=".">$acc</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/index/key">
        <tdt:value key=".">
		  tdt:nodeset( "TOC", 
		               tdt:concat( $chars/name, ', ' ), 
					   tdt:concat( $chars/accessories/accessory, ', '), 
					   "Index" )
		</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    


Expected Result
---------------

We can see that the result is exacly the same as in case without varaibles:

.. code:: xml
   :number-lines:
   :name: instance pfi01/tutorial/01-basic/05-variables

   <data>
      <page number="1">
        <heading>
          <name firstname="Freddy" lastname="Kruger">Freddy Kruger</name>
          <address>1428 Elm Street, Springwood, Ohio</address>
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
          <name firstname="Homer" lastname="Simpson">Homer J. Simpson</name>
          <address>742 Evergreen Terrace, Springfield, Massachusetts</address>
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
   :name: source pfi01/tutorial/01-basic/05-variables

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
    


