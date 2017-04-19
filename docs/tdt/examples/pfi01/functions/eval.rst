==========
tdt:eval()
==========

:Author: Petr Filipsky

Overview
========

This example demonstrates the ``tdt:eval()`` function.

:Signature:

   ``<object> eval( <string> [, <node-set> ] )``

.. note:: This function is not published in the current version.

Test case definition
====================

Data Source
------------

.. code:: xml
   :number-lines:
   :name: source Eval

   <data>
     <message>
       <r cls="A" num="10">1</r>
       <r cls="A" num="5">2</r>
       <r cls="B" num="10">3</r>
       <r cls="B" num="5">4</r>
       <r cls="B" num="10">5</r>
     </message>
   </data>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance Eval

   <data>
     <eval>A:10:1</eval>
     <eval>A:5:2</eval>
     <eval>B:10:3</eval>
     <eval>B:5:4</eval>
     <eval>B:10:5</eval>
   </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template Eval

   <data>
     <eval>?</eval>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Eval

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
     <tdt:rule path="/data/eval">
       <tdt:value key=".">tdt:eval( 'concat( @cls, ":", @num, ":", text() )', /data/message/r )</tdt:value>
       <tdt:value key="text()">.</tdt:value>
     </tdt:rule>
   </tdt:transformation>


