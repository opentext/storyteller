============
tdt:concat()
============

:Author: Petr Filipsky

Overview
========

This example demonstrates the ``tdt:concat()`` function.

:Signature:

   ``<string> tdt:concat( <node-set> [, <string> ] )``

This function is similar to the `str:concat() <http://www.exslt.org/str/functions/concat/>`_ function 
defined in `EXSLT <http://www.exslt.org/>`_.

The ``tdt:concat()`` function takes a node set and a string separator and returns the concatenation 
of the string values of the nodes in that node set. 
If the node set is empty, it returns an empty string.
If the separator is an empty string then strings are concatenated without a separator.

Test case definition
====================

Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source Concat

   <data>
      <message>
        <word>We</word>
        <word>are</word>
        <word>having</word>
        <word>fun</word>
      </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template Concat

   <data>
      <sentence>?</sentence>
    </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Concat

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data/sentence">
        <tdt:value key="text()">tdt:concat( /data/message/word, ' ' )</tdt:value>
      </tdt:rule>
    </tdt:transformation>



Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance Concat

   <data>
      <sentence>We are having fun</sentence>
    </data>



