=============================
01 - Text Data and Attributes
=============================

:Author: Petr Filipsky

Overview
========

Here we demonstrate basic retrieval of text data and XML attributes.

This example is fairly trivial and just demonstrates a possibility 
to ignore almost all incoming data and pick just few bits of information 
we actually need for presentation.

Test case definition
====================

Source data
-----------

Source data contain a lot of information but we are just interested 
in names of individual *characters*. 

Identical *Source Data* are used throughout the tutorial.

.. code:: xml
   :number-lines:
   :name: source pfi01/tutorial/01-basic/01-text-attrs

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

The *Data Template* represents structure of data we actually need for presentation.

It represents *Data interface* of the design and may not necessary share the naming 
of *Source Data*.
 
Here we want to present each *character* on its own ``page`` and each ``page`` contains a dynamic 
``heading`` customized by character's ``name``.

.. code:: xml
   :number-lines:
   :name: template pfi01/tutorial/01-basic/01-text-attrs

   <data>
      <page number="?">
        <heading>?</heading>
      </page>
    </data>
    


Transformation
--------------

There are just two *Transformation Rules* - first one repeats ``pages`` (one for each ``character``)
and the second one fills the ``heading`` text data with character's ``name``.

.. code:: xml
   :number-lines:
   :name: transformation pfi01/tutorial/01-basic/01-text-attrs

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data/page">
        <tdt:value key=".">/data/character</tdt:value>
        <tdt:value key="@number">position()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading">
        <tdt:value key="text()">name</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    


Expected Result
---------------

We have two ``characters`` in input data and thus we get two ``pages`` with corresponding 
character ``names`` as ``headings``.

.. code:: xml
   :number-lines:
   :name: instance pfi01/tutorial/01-basic/01-text-attrs

   <data>
      <page number="1">
        <heading>Freddy Kruger</heading>
      </page>
      <page number="2">
        <heading>Homer J. Simpson</heading>
      </page>
    </data>
    




