========
Multiple
========

:Author: Petr Filipsky

Overview
========

In this example we demonstrate the situation when multiple elements of the same name (and XPath) 
can be beneficial.

Let's say a user wants to append elements from several sources to a single sequence.
Then for each such source he can create a separate element (of the same name) along with its specific rule.
 
Test case definition
====================

Source Data
-----------

The input data contains two sets of ``node`` elements, the first set in ``/data/message`` 
and the second set in ``/data/message/group``.

.. code:: xml
   :number-lines:
   :name: source Multiple

   <data>
	 <message>
       <item value="value1">id1</item>
       <item value="value2">id2</item>
       <item value="value3">id3</item>
	   <group>
		 <item value="value4">id4</item>
		 <item value="value5">id5</item>
		 <item value="value6">id6</item>
	   </group>
	 </message>
   </data>


Expected result
---------------

In resulting *Data Instance* we expect that all the nodes are concatenated at single place - ``/data``.

.. code:: xml
   :number-lines:
   :name: instance Multiple

   <data>
	 <node id="id1">value1</node>
	 <node id="id2">value2</node>
	 <node id="id3">value3</node>
	 <node id="id4">value4</node>
	 <node id="id5">value5</node>
	 <node id="id6">value6</node>
   </data>


Data template
-------------

We create a template containing two elements of the same name and path: ``/data/node``.

.. code:: xml
   :number-lines:
   :name: template Multiple

   <data>
	 <node id="?">?</node>
	 <node id="?">?</node>
   </data>


Transformation
--------------

In the *Data Transformation* we create a separate rule for each ``node`` (the first for ``/data/node[1]`` 
and the second for ``/data/node[2]``):

.. code:: xml
   :number-lines:
   :name: transformation Multiple

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/node[1]">
       <tdt:value key=".">/data/message/item</tdt:value>
       <tdt:value key="@id">text()</tdt:value>
       <tdt:value key="text()">@value</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/node[2]">
       <tdt:value key=".">/data/message/group/item</tdt:value>
       <tdt:value key="@id">text()</tdt:value>
       <tdt:value key="text()">@value</tdt:value>
	 </tdt:rule>
   </tdt:transformation>

