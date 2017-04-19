================
Enumerate Change
================

:Author: Petr Filipsky

Overview
========

This example is a slight extension of the `plain enumeration example <../enumerate_all/index.html>`_.

In some situation it is desirable to copy some complicated data structure while 
change some of the elements or attributes.

Fortunately it is possible to utilize the ``enumerate`` special form while still 
changing some of the copied data.   
 
Test case definition
====================

Source Data
-----------

.. code:: xml
   :number-lines:
   :name: source EnumerateChange

   <data>
     <message>
       <employee>
         <name>John Smelter</name>
         <address>
           <street>Witham Hall</street>
           <number>100</number>
           <zipcode>1GH 423</zipcode>
           <city>London</city>
         </address>
         <department>Forestry Department</department>
         <university>Education University</university>
       </employee>
       <employee>
         <name>John Smith</name>
         <department>Foreign Department</department>
         <university>Foreign University</university>
         <address>
           <city>Washington DC</city>
           <street>Williams Hall</street>
           <number>111</number>
           <zipcode>20001-111</zipcode>
         </address>
       </employee>
     </message>
   </data>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance EnumerateChange

   <data>
     <employee title="professor">
       <first_name>John</first_name>
       <last_name>Smelter</last_name>
       <address>
         <street>Witham Hall 100</street>
         <zipcode>1GH 423</zipcode>
         <city>London</city>
       </address>
       <university>Education University</university>
     </employee>
     <employee title="professor">
       <first_name>John</first_name>
       <last_name>Smith</last_name>
       <university>Foreign University</university>
       <address>
         <city>Washington DC</city>
         <street>Williams Hall 111</street>
         <zipcode>20001-111</zipcode>
       </address>
     </employee>
   </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template EnumerateChange

   <data>
     <employee title='?'>
       <first_name>?</first_name>
       <last_name>?</last_name>
       <university>?</university>
       <address>
         <street>?</street>
         <city>?</city>
         <zipcode>?</zipcode>
       </address>
     </employee>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation EnumerateChange

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/employee">
	   <tdt:value key=".">/data/message/employee</tdt:value>
	   <tdt:value key="enumerate">.</tdt:value>
	   <tdt:value key="@title">'professor'</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/employee/first_name">
	   <tdt:value key=".">name</tdt:value>
	   <tdt:value key="text()">substring-before(text(), ' ')</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/employee/last_name">
	   <tdt:value key=".">name</tdt:value>
	   <tdt:value key="text()">substring-after(text(), ' ')</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/employee/address/street">
	   <tdt:value key="text()">concat(../street, ' ', ../number)</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


