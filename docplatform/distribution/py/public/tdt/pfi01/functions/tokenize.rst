==============
tdt:tokenize()
==============

:Author: Petr Filipsky

Overview
========

This example demonstrates the ``tdt:tokenize()`` function.

:Signature:

   ``<node-set> tdt:tokenize( <node-set>, <string> )``

This function is similar to the `str:tokenize() <http://www.exslt.org/str/functions/tokenize/>`_ function 
defined in `EXSLT <http://www.exslt.org/>`_.

The ``tdt:tokenize`` function splits up given strings and returns a node set of token elements, 
each containing one token from the string.

The first argument is one or more strings to be tokenized. 
The second argument is a string consisting of a number of characters. 
Each character in this string is taken as a delimiting character. 
The strings given by the first argument are split at any occurrence of any of these characters.

Test case definition
====================

Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source Tokenize

   <data/>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template Tokenize

   <data>
	 <tokenize>?</tokenize>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Tokenize

   <tdt:transformation version="1.0" xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt">
	 <tdt:rule path="/data/tokenize">
       <tdt:value key=".">tdt:tokenize( '2001-06-03T11:40:23', '-T:' )</tdt:value>
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
   </tdt:transformation>



Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance Tokenize

   <data>
	 <tokenize>2001</tokenize>
	 <tokenize>06</tokenize>
	 <tokenize>03</tokenize>
	 <tokenize>11</tokenize>
	 <tokenize>40</tokenize>
	 <tokenize>23</tokenize>
   </data>



