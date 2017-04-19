=============
04 - Grouping
=============

:Author: Petr Filipsky


Overview
========

Very often *Source Data* contain a continuous sequence of items and sometimes 
user wants *group* the original *items* based on some criteria 
(be it a value of one particular *attribute* or possibly some more sophisticated condition). 

In this example we will demonstrate how to group the character's ``accessories`` based 
on their price. In particular we will distribute the ``accessories`` to virtual buckets
with price limit of $10, $25 and $50 respectively.

Test case definition
====================

Source data
-----------

We can see that each piece of ``accessory`` has associated price - our grouping criteria
will be based on that:

.. code:: xml
   :number-lines:
   :name: source pfi01/tutorial/02-advanced/04-grouping

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

In *Data Template* we crate a ``pricelist`` containing ``price`` based "buckets"
containing corresponding ``accessory`` items: 

.. code:: xml
   :number-lines:
   :name: template pfi01/tutorial/02-advanced/04-grouping

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
      <pricelist>
        <price size="?" limit="?">
          <accessory price="?" owner="?">?</accessory>
        </price>
      </pricelist>
    </data>
    




Transformation
--------------

For grouping we first create a ``nodeset`` with values ``0``, ``10``, ``25`` and ``50`` and then use the
following grouping expression: ``$limits[. >= current()/@price][1]``. As the ``accessory`` items are not
sorted by price we use the aggregation prefix ``~``.

Then we simply enumerate the created groups (use the ``@size`` attribute for groups size and the 
``tdt:key[1]`` sub-element for visualizing price limit) and for each such group we enumerate
all grouped ``accessory`` items (retrieved via the ``tdt:ungroup()`` call.   
 
.. code:: xml
   :number-lines:
   :name: transformation pfi01/tutorial/02-advanced/04-grouping

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data">
        <tdt:value key="$chars">/data/character</tdt:value>
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
      <tdt:rule path="/data/pricelist">
        <tdt:value key="$limits">tdt:nodeset( 0,10,25,50 )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/pricelist/price">
        <tdt:value key=".">tdt:group( $chars/accessories/accessory, '~$limits[. &gt;= current()/@price][1]' )</tdt:value>
        <tdt:value key="$pos">position()</tdt:value>
        <tdt:value key="@limit">tdt:key[1]</tdt:value>
        <tdt:value key="@size">@size</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/pricelist/price/accessory">
        <tdt:value key=".">tdt:ungroup(.)</tdt:value>
        <tdt:value key="@owner">../../name</tdt:value>
        <tdt:value key="recurse">.</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    




Compiled Transformation
-----------------------

.. code:: xml
   :number-lines:
   :name: compiled pfi01/tutorial/02-advanced/04-grouping

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data">
        <tdt:value key="$chars">/data/character</tdt:value>
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
      <tdt:rule path="/data/pricelist">
        <tdt:value key="$limits">tdt:split( '0,10,25,50', ',' )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/pricelist/price">
        <tdt:value key=".">tdt:group( $chars/accessories/accessory, '~$limits[. &gt;= current()/@price][1]' )</tdt:value>
        <tdt:value key="$pos">position()</tdt:value>
        <tdt:value key="@limit">tdt:key[1]</tdt:value>
        <tdt:value key="@size">@size</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/pricelist/price/accessory">
        <tdt:value key=".">tdt:ungroup(.)</tdt:value>
        <tdt:value key="@owner">../../name</tdt:value>
        <tdt:value key="@price">@price</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    




Expected Result
---------------

We can see that all three buckets contain items with appropriate price:

.. code:: xml
   :number-lines:
   :name: instance pfi01/tutorial/02-advanced/04-grouping

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
      <pricelist>
        <price size="1" limit="50">
          <accessory price="39" owner="Freddy Kruger">Hat</accessory>
        </price>
        <price size="2" limit="25">
          <accessory price="22" owner="Freddy Kruger">Glove</accessory>
          <accessory price="17" owner="Freddy Kruger">Hammer</accessory>
        </price>
        <price size="3" limit="10">
          <accessory price="6" owner="Freddy Kruger">Spare Razors</accessory>
          <accessory price="3" owner="Homer J. Simpson">Donut</accessory>
          <accessory price="4" owner="Homer J. Simpson">Duff Beer</accessory>
        </price>
      </pricelist>
    </data>
    




