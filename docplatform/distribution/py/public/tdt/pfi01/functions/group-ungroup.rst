===========================
tdt:group() + tdt:ungroup()
===========================

:Author: Petr Filipsky

Overview
========

This example demonstrates the ``tdt:group()`` and ``tdt:ungroup()`` functions.

:Signature:

   ``<node-set> tdt:group( <node-set> [ , <string>, ... ] )``
   ``<node-set> tdt:ungroup( <node> )``

These functions allow to group given nodes based on given grouping criteria.

Grouping criteria are represented one or mode strings containing relative XPaths
optionally prefixed with '~' aggregation prefix.

.. note:: The ``tdt:group()`` is similar to the `uniq <http://en.wikipedia.org/wiki/Uniq>`_ filter in Unix. 
		  It generates a break or new group every time the value of of the keys changes 
		  (which is why it is often necessary to add aggregate prefix if data is not already aggregated or sorted). 
		  That behavior differs from SQL’s GROUP BY which aggregates common elements regardless of their input order.

When a user calls this function then several steps are performed:

  - Input Node-Set is enumerated
  - All given XPaths are evaluated in context of each element
  - Aggregation is performed based on given aggregation keys
  - Grouping is performed based on equality
  - For each resulting group a synthesized tdt:group element is created
  - Node-Set of all synthesized "group" elements is returned

Each synthesized ``tdt:group`` element contains summary information about grouping operation,
number of grouped nodes etc. but does not contain actual *grouped nodes*.

The access to those is possible via the ``tdt:ungroup()`` function.
This function accepts the synthetic *tdt:group* node as an argument and returns 
a Node-Set of grouped original nodes.

A product of the ``tdt:group()`` function call is a nodeset of "synthesized" ``tdt:group`` nodes.
Every ``tdt:group`` node represents a single group - but does not contain grouped nodes directly.
It has several "synthesized" sub-nodes and attributes instead.

The synthesized structure is the following:

.. code:: xml

	<tdt:group size="?" id="?">
	  <tdt:key key="?">?</tdt:key>
	</tdt:group>


where:

    - ``@size`` ... represents number of nodes in the group
    - ``@id`` ... identifies the group (is internal and should not be documented)
	- ``tdt:key`` ... one child for every grouping argunment
	  - ``@key`` ... string xpath used for grouping (optionally prefixed with '~' aggregation prefix)
	  - ``text()`` ... actual result data value of the xpath (used for grouping)


For example the first synthesized ``tdt:group`` node in the example below looks as follows:

.. code:: xml

  <tdt:group size="2" id="...">
    <tdt:key key="~@cls">A</tdt:key>
    <tdt:key key="~@num">10</tdt:key>
  </tdt:group>


Then user can call the ``tdt:ungroup()`` with a ``tdt:group`` node as a parameter to retrieve actual 
grouped nodes from an original source.

This relatively complicated description can be easily demonstrated on the following example.


Test case definition
====================

Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source Grouping

   <data>
	 <message>
       <r cls="A" num="10">1</r>
       <r cls="A" num="5">2</r>
       <r cls="B" num="10">3</r>
       <r cls="B" num="5">4</r>
       <r cls="B" num="10">5</r>
       <r cls="A" num="5">6</r>
       <r cls="A" num="10">7</r>
       <r cls="B" num="5">8</r>
       <r cls="B" num="10">9</r>
	 </message>
   </data>


Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance Grouping

   <data>
	 <message>
       <cls cls="A" num="10" size="2">
		 <r>1</r>
		 <r>7</r>
       </cls>
       <cls cls="A" num="5" size="2">
		 <r>2</r>
		 <r>6</r>
       </cls>
       <cls cls="B" num="10" size="3">
		 <r>3</r>
		 <r>5</r>
		 <r>9</r>
       </cls>
       <cls cls="B" num="5" size="2">
		 <r>4</r>
		 <r>8</r>
       </cls>
	 </message>
   </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template Grouping

   <data>
	 <message>
       <cls size="?" cls="?" num="?">
		 <r>?</r>
       </cls>
	 </message>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Grouping

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/message">
       <tdt:value key=".">/data/message</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/message/cls">
       <tdt:value key=".">tdt:group( r, '~@cls', '~@num' )</tdt:value>
       <tdt:value key="@size">@size</tdt:value>
       <tdt:value key="@cls">tdt:key[@key='~@cls']</tdt:value>
       <tdt:value key="@num">tdt:key[2]</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/message/cls/r">
       <tdt:value key=".">tdt:ungroup()</tdt:value>
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


