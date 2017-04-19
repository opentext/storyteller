===========
tdt:split()
===========

:Author: Petr Filipsky

Overview
========

This example demonstrates the ``tdt:split()`` function.

:Signature:

   ``<node-set> tdt:split( <node-set>, <string> )``

This function is similar to the `str:split() <http://www.exslt.org/str/functions/split/>`_ function 
defined in `EXSLT <http://www.exslt.org/>`_.

The ``tdt:split()`` function splits up given strings and returns a node set of token elements, 
each containing one token from the string.

The first argument is one or more the string to be split. The second argument is a pattern string. 
The strings given by the first argument are split at any occurrence of this pattern.

Test case definition
====================

Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source Split

   <data/>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template Split

   <data>
	 <split>?</split>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Split

   <tdt:transformation version="1.0" xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt">
	 <tdt:rule path="/data/split">
       <tdt:value key=".">tdt:split( 'Hello World, Good Bye', ', ' )</tdt:value>
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
   </tdt:transformation>



Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance Split

   <data>
	 <split>Hello World</split>
	 <split>Good Bye</split>
   </data>



