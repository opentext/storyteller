=====================
02 - Nested Repeating
=====================

:Author: Petr Filipsky

Overview
========

This part demonstrates a possibility to make nested repeating.
As the *Data Transformer* maintains the data context hierarchically
as the *Data Template* hierarchy is traversed, it is very easy and 
natural to make nested data repeaters.

Let's say that for each ``page`` (presenting a single ``character``) we want to add 
a dynamic ``body`` listing all pieces of ``accessory`` of the particular ``character``.

Test case definition
====================

Data Template
-------------

For ``page`` structure we add a nested ``body`` containing ``row``.
This ``row`` will be repeated for each piece of ``accessory``.

.. code:: xml
   :number-lines:
   :name: template pfi01/tutorial/01-basic/02-nested-repeat

   <data>
      <page number="?">
        <heading>?</heading>
        <body>
          <row>?</row>
        </body>
      </page>
    </data>



Transformation
--------------

In *Data Transformation* we simply add a new rule for ``body`` rows, iterating over all ``accessories``.

.. code:: xml
   :number-lines:
   :name: transformation pfi01/tutorial/01-basic/02-nested-repeat

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data/page">
        <tdt:value key=".">/data/character</tdt:value>
        <tdt:value key="@number">position()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/body/row">
        <tdt:value key=".">accessories/accessory</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading">
        <tdt:value key="text()">name</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    



Expected Result
---------------

Now we can see that for each ``character`` we have a listing of all his ``accessories``:

.. code:: xml
   :number-lines:
   :name: instance pfi01/tutorial/01-basic/02-nested-repeat

   <data>
      <page number="1">
        <heading>Freddy Kruger</heading>
        <body>
          <row>Hat</row>
          <row>Glove</row>
          <row>Hammer</row>
          <row>Spare Razors</row>
        </body>
      </page>
      <page number="2">
        <heading>Homer J. Simpson</heading>
        <body>
          <row>Donut</row>
          <row>Duff Beer</row>
        </body>
      </page>
    </data>
    



Source data
-----------

.. code:: xml
   :number-lines:
   :name: source pfi01/tutorial/01-basic/02-nested-repeat

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



