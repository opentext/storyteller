Enumerate
=========

:Author: Petr Filipsky

Overview
========

This test demonstrates the identity transformation.
If we set the ``enumerate`` keyword to the document node rule then the transformation copies all
the elements specified in the *Data Template* in *Data order*. 


Test case definition
====================

Source Data
-----------

Let's say we have the following input data:

.. code:: xml
   :number-lines:
   :name: source Enumerate

   <data>
     <message>
       <employee>
         <name>John Smelter</name>
         <address>
           <city>London</city>
           <street>Witham Hall</street>
           <number>100</number>
           <zipcode>1GH 423</zipcode>
         </address>
         <department>Forestry Department</department>
         <university>Education University</university>
       </employee>
       <employee>
         <name>John Smith</name>
         <university>Foreign University</university>
         <address>
           <street>Williams Hall</street>
           <number>111</number>
           <zipcode>20001-111</zipcode>
           <city>Washington DC</city>
         </address>
         <department>Foreign Department</department>
       </employee>
     </message>
   </data>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance Enumerate

   <data>
     <message>
       <employee>
         <name>John Smelter</name>
         <address>
           <city>London</city>
           <street>Witham Hall</street>
           <number>100</number>
           <zipcode>1GH 423</zipcode>
         </address>
         <department>Forestry Department</department>
         <university>Education University</university>
       </employee>
       <employee>
         <name>John Smith</name>
         <university>Foreign University</university>
         <address>
           <street>Williams Hall</street>
           <number>111</number>
           <zipcode>20001-111</zipcode>
           <city>Washington DC</city>
         </address>
         <department>Foreign Department</department>
       </employee>
     </message>
   </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template Enumerate

   <data>
     <message>
       <employee>
         <name>?</name>
         <department>?</department>
         <university>?</university>
         <address>
           <street>?</street>
           <number>?</number>
           <city>?</city>
           <zipcode>?</zipcode>
         </address>
       </employee>
     </message>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Enumerate

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
     <tdt:rule path="/">
       <tdt:value key="enumerate">.</tdt:value>
     </tdt:rule>
   </tdt:transformation>


