==============
tdt:template()
==============

:Author: Petr Filipsky

Overview
========

This example demonstrates the ``tdt:template()`` function.

:Signature:

   ``<document> tdt:template()``

This function provides us with access to *Data Template* hierarchy.

We can for example create a simple lookup functionality with it.


Test case definition
====================


Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source tdt-template

   <data>
      <message>
        <issue id="123" status="i"/>
        <issue id="456" status="r"/>
        <issue id="789" status="f"/>
        <issue id="007" status="c"/>
      </message>
    </data>



Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template tdt-template

   <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
      <statusmap>
        <status value="n">New</status>
        <status value="o">Open</status>
        <status value="i">In Progress</status>
        <status value="f">Resolved</status>
        <status value="r">Reopened</status>
        <status value="c">Closed</status>
      </statusmap>
      <issues>
        <issue id="?"/>
      </issues>
    </data>



Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation tdt-template

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data/issues/issue">
        <tdt:value key=".">/data/message/issue</tdt:value>
        <tdt:value key="$status">@status</tdt:value>
        <tdt:value key="@id">@id</tdt:value>
        <tdt:value key="text()">tdt:template()/data/statusmap/status[@value = $status]</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/statusmap">
        <tdt:value key=".">tdt:nodeset()</tdt:value>
      </tdt:rule>
    </tdt:transformation>





Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance tdt-template

   <data>
      <issues>
        <issue id="123">In Progress</issue>
        <issue id="456">Reopened</issue>
        <issue id="789">Resolved</issue>
        <issue id="007">Closed</issue>
      </issues>
    </data>
