=============
tdt:nodeset()
=============

:Author: Petr Filipsky

Overview
========

This example demonstrates the ``tdt:nodeset()`` function.

:Signature:

   ``<node-set> tdt:nodeset( [ <object>, ... ] )``

This function accepts any number of arguments (0, 1 or more) of any type 
(*node-set*, *node*, *string*, *number*) and creates a single node-set as a result.
If an argument is a Node-Set then all the nodes it contains will appear 
flattened in the resulting Node-Set.

Test case definition
====================

Source Data
-----------

.. code:: xml
   :number-lines:
   :name: source Union

   <data>
	 <message>
       <name>Peter</name>
       <name>John</name>
       <name>Daniel</name>
	 </message>
   </data>


Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance Union

   <data>
	 <node>This</node>
	 <node>is</node>
	 <node>a</node>
	 <node>test</node>
	 <node>number</node>
	 <node>1</node>
	 <node>:</node>
	 <node>Peter</node>
	 <node>John</node>
	 <node>Daniel</node>
   </data>



Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template Union

   <data>
	 <node>?</node>
   </data>



Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Nodeset

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/node">
       <tdt:value key=".">
	   tdt:nodeset( "This", "is" ) 
	     | tdt:nodeset( "a", "test", "number", 1, ":", /data/message/name ) 
		 | tdt:nodeset()
	   </tdt:value>
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
   </tdt:transformation>

