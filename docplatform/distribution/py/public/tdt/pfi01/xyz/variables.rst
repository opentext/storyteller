=========
Variables
=========

:Author: Petr Filipsky

Test case definition
====================

Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance Split

   <data>
	 <value>var=3</value>
	 <value>var=5</value>
	 <value>var=7</value>
   </data>


Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source Split

   <data>
	 <value>3</value>
	 <value>5</value>
	 <value>7</value>
   </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template Split

   <data>
     <value>?</value>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Tokenize

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/">
       <tdt:value key="$var">'var'</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/value">
       <tdt:value key=".">/data/value</tdt:value>
       <tdt:value key="$var">concat( $var, '=', . )</tdt:value>
       <tdt:value key="text()">$var</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


