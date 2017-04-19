==============
Recurse Change
==============

:Author: Petr Filipsky

Overview
========

This example is a slight extension of the `plain recurse example <../recurse/index.html>`_.

In some situation it is desirable to copy some complicated data structure while 
change some of the elements or attributes.

Fortunately it is possible to utilize the ``recurse`` special form while still 
changing some of the copied data.   
 
Test case definition
====================

Source Data
-----------

The input data are exactly same as in the previous *plain recurse* example:

.. code:: xml
   :number-lines:
   :name: source Recurse Change

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

In this example we want to copy the ``employee`` element with whole its sub-tree
but we would like to make slight changes to the data format:

#. Add a new ``@title`` attribute and fill it with the static value ``"professor"``
#. Split the ``name`` element to ``first_name`` and ``last_name`` elements
#. Omit the ``university`` sub-element completely
#. Merge ``address/street`` and ``address/number`` elements to a single one called ``address/street`` 

So the resulting data should look as follows:

.. code:: xml
   :number-lines:
   :name: instance Recurse Change

   <data>
     <employee title="professor">
       <first_name>John</first_name>
       <last_name>Smelter</last_name>
       <university>Education University</university>
       <address>
         <street>Witham Hall 100</street>
         <city>London</city>
         <zipcode>1GH 423</zipcode>
       </address>
     </employee>
     <employee title="professor">
       <first_name>John</first_name>
       <last_name>Smith</last_name>
       <university>Foreign University</university>
       <address>
         <street>Williams Hall 111</street>
         <city>Washington DC</city>
         <zipcode>20001-111</zipcode>
       </address>
     </employee>
   </data>


Data template
-------------

We create a *Data template* reflecting the desired changes:

#. Add ``@title`` attribute to the ``employee`` element
#. Add ``first_name`` and ``last_name`` sub-elements instead of just ``name``
#. Omit the ``department`` sub-element
#. Omit the ``address/number`` sub-element

.. code:: xml
   :number-lines:
   :name: template Recurse Change

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

In *Data Transformation* we use the ``recurse`` keyword as in the *plain recurse* example.

But also add several more rules for the desired changes:

#. Static value ``"professor"`` for the ``@title`` attribute 
#. Split ``name`` to ``first_name`` and ``last_name``
#. Concatenate ``address/street`` and ``address/number`` sub-elements

.. code:: xml
   :number-lines:
   :name: transformation Recurse Change

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/employee">
	   <tdt:value key=".">/data/message/employee</tdt:value>
	   <tdt:value key="recurse">.</tdt:value>
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


.. note:: We cannot just write the static value to the *Data Template* 
		  (strictly speaking - we can, but it is simply ignored), as the ``recurse`` special 
		  form generates a default rule looking for ``/data/message/employee/@title``. 
		  As there is no such attribute, the attribute is deleted. 

		  So in order to be able to introduce *anything* what is not present in the *source data* 
		  - we must always override the *default rule* generated by the ``recurse`` special form.
   
