=======
Recurse
=======

:Author: Petr Filipsky

Overview
========

Let's say that during the *Data Transformation* a user wants to copy some sub-tree 
verbatim, exactly as it is, without any changes.

First he starts creating a *Data template* which exactly matches the source data structure.
And then he would like to create a transformation which just copies all the values one-by-one.

It would be very brittle and time consuming to create all the rules for all the sub-elements 
and attributs.

For simplifying this relatively frequent situation the *Processor* supports a special form
called ``recurse``. When user specifies ``recurse`` keyword (along with a *base xpath*) 
inside a *transformation rule* then the rule starts to behave like a "meta-rule" generating
automatically corresponding rules for whole *Data Template* subtree. 

If user wants to make some minor changes to the *element* structure then it is still possible 
to combine such rules with the ``recurse`` special form. 
Such situation is described in the `recurse change example <../recurse_change/index.html>`_.


Test case definition
====================

Source Data
-----------

Let's say we have the following input data:

.. code:: xml
   :number-lines:
   :name: source Recurse

   <data>
     <message>
       <employee>
         <name>John Smelter</name>
         <department>Forestry Department</department>
         <university>Education University</university>
         <address>
           <street>Witham Hall</street>
           <number>100</number>
           <city>London</city>
           <zipcode>1GH 423</zipcode>
         </address>
       </employee>
       <employee>
         <name>John Smith</name>
         <department>Foreign Department</department>
         <university>Foreign University</university>
         <address>
           <street>Williams Hall</street>
           <number>111</number>
           <city>Washington DC</city>
           <zipcode>20001-111</zipcode>
         </address>
       </employee>
     </message>
   </data>


Expected result
---------------

And all we want is just to copy all the ``employee`` data to the output:

.. code:: xml
   :number-lines:
   :name: instance Recurse

   <data>
     <employee>
       <name>John Smelter</name>
       <department>Forestry Department</department>
       <university>Education University</university>
       <address>
         <street>Witham Hall</street>
         <number>100</number>
         <city>London</city>
         <zipcode>1GH 423</zipcode>
       </address>
     </employee>
     <employee>
       <name>John Smith</name>
       <department>Foreign Department</department>
       <university>Foreign University</university>
       <address>
         <street>Williams Hall</street>
         <number>111</number>
         <city>Washington DC</city>
         <zipcode>20001-111</zipcode>
       </address>
     </employee>
   </data>


Data template
-------------

First we define a corresponding *Data Template* containing expected data structure:

.. code:: xml
   :number-lines:
   :name: template Recurse

   <data>
     <employee>
       <name>?</name>
       <department missing_attribute="?">?</department>
       <university>?</university>
       <address>
         <street>?</street>
         <number>?</number>
         <city>?</city>
         <zipcode>?</zipcode>
       </address>
     </employee>
   </data>


Transformation
--------------

When we specify a *Transformation Rule* for the ``employee`` element, we just add 
the ``recurse`` keyword with ``tdt:current()`` base XPath specified:

.. code:: xml
   :number-lines:
   :name: transformation Recurse

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
     <tdt:rule path="/data/employee">
       <tdt:value key=".">/data/message/employee</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
   </tdt:transformation>


