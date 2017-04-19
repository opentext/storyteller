==================
04 - TDT Functions
==================

:Author: Petr Filipsky

Overview
========

To extend the possibilities even more - TDT provides several custom XPath functions.
This part shows some of them in action.

Let's say we want to split characters' names to ``firstname`` and ``lastname`` attributes.
And then we need to create an ``index`` containing a list of all ``characters``, ``accessories``
and possibly some more information.

Not that it would not be possible with plaing *XPath 1.0 functions* but *TDT extension functions* 
can help us to make the transformation relatively straightforward.
  
Test case definition
====================

Data Template
-------------

We simply add two new attributes ``firstname`` and ``lastname`` to the ``name`` element.

Then we add a new ``index`` element and ``key`` sub-element.
.. code:: xml
   :number-lines:
   :name: template pfi01/tutorial/01-basic/04-tdt-functions

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

For easily split the character's ``name`` we use the ``tdt:split()`` function.

For ``index`` creation we use a combination of ``tdt:concat()`` and ``tdt:nodeset()``
TDT functions.

.. code:: xml
   :number-lines:
   :name: transformation pfi01/tutorial/01-basic/04-tdt-functions

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data/page">
        <tdt:value key=".">/data/character</tdt:value>
        <tdt:value key="@number">position()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/name">
        <tdt:value key="text()">name</tdt:value>
        <tdt:value key="@firstname">tdt:split( name, ' ' )[1]</tdt:value>
        <tdt:value key="@lastname">tdt:split( name, ' ' )[last()]</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/heading/address">
        <tdt:value key="text()">
		  concat( address/streetnr, ' ', address/street, ', ', address/city, ', ', address/state )
		</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/body">
        <tdt:value key="@total">sum( accessories/accessory/@price )</tdt:value>
        <tdt:value key="@rows">count( accessories/accessory )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/page/body/row">
        <tdt:value key=".">accessories/accessory</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/index/key">
        <tdt:value key=".">
		  tdt:nodeset( "TOC", 
		               tdt:concat( /data/character/name, ', ' ), 
					   tdt:concat( /data/character/accessories/accessory, ', '), 
					   "Index" )
		</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    


Expected Result
---------------

In the resulting *Data Instance* we can see the filled in ``name`` attributes 
and also the newly generated ``index``.

It is worth noting that ``index`` structure does not follow the structure 
of input data but instead creates a separate view, which is orthogonal 
to the input ``character`` - ``accessory`` hierarchy.

.. code:: xml
   :number-lines:
   :name: instance pfi01/tutorial/01-basic/04-tdt-functions

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
   :name: source pfi01/tutorial/01-basic/04-tdt-functions

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
    



