====================
03 - XPath Functions
====================

:Author: Petr Filipsky

Overview
========

This part demonstrates that we have 
all `XPath 1.0 functions <http://en.wikipedia.org/wiki/XPath#Functions_and_operators>`_  at our disposal.

Let's imagine we want to present not only ``character's name`` but also his ``address``.
Moreover we would like to present number of ``accessories`` and sum of thei ``prices``. 

We shall see that *XPath functions* can help us to achive such goals.

As a result we get more sophisticated *Data Instance* containing not only data present 
in *Data Source* but also synthesized ones.

The great news is that subsequent presentation does not distinguish between former 
and latter pieces of data, *Data Instance* provides data values not matter of their origin.
This way we considerably reduce the overall design complexity - no matter how complicated
a data transformation is, once resulting data is in place nothing of this complexity 
is carried further down in the document production pipeline. 


Test case definition
====================

Data Template
-------------

In *Data Template* we extend the ``heading`` element so that we add ``name`` and ``address``
sub-elements.

We also add ``rows`` and ``total`` attributes the the ``body`` element.

.. code:: xml
   :number-lines:
   :name: template pfi01/tutorial/01-basic/03-xpath-functions

   <data>
      <page number="?">
        <heading>
          <name>?</name>
          <address>?</address>
        </heading>
        <body rows="?" total="?">
          <row>?</row>
        </body>
      </page>
    </data>
    




Transformation
--------------

We create a new rule for ``address`` and concatenate all parts of the source ``address`` 
(``streetnr``, ``street``, ``city`` and ``state``).

Then we create another rule for the ``body`` element to compute ``rows`` attribute as 
a ``count`` of accessories and ``total`` attribute as a ``sum`` of their ``prices``.  

.. code:: xml
   :number-lines:
   :name: transformation pfi01/tutorial/01-basic/03-xpath-functions

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data/page">
        <tdt:value key=".">/data/character</tdt:value>
        <tdt:value key="@number">position()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/body">
        <tdt:value key="@total">sum( accessories/accessory/@price )</tdt:value>
        <tdt:value key="@rows">count( accessories/accessory )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/body/row">
        <tdt:value key=".">accessories/accessory</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address">
        <tdt:value key="text()">
           concat( address/streetnr, ' ', address/street, ', ', address/city, ', ', address/state )
		 </tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/name">
        <tdt:value key="text()">name</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    



Expected Result
---------------

As we can see the resulting *Data Instance* contains not only the values present 
in *Data Source* but also synthesized ones:

.. code:: xml
   :number-lines:
   :name: instance pfi01/tutorial/01-basic/03-xpath-functions

   <data>
      <page number="1">
        <heading>
          <name>Freddy Kruger</name>
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
          <name>Homer J. Simpson</name>
          <address>742 Evergreen Terrace, Springfield, Massachusetts</address>
        </heading>
        <body rows="2" total="7">
          <row>Donut</row>
          <row>Duff Beer</row>
        </body>
      </page>
    </data>
    


Source data
-----------

.. code:: xml
   :number-lines:
   :name: source pfi01/tutorial/01-basic/03-xpath-functions

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
    




