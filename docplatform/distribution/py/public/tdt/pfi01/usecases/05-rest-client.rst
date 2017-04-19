============================
05 - REST Client Integration
============================

:Author: Petr Filipsky

Overview
========

This example demonstrates ability of *TDT Transformation* to integrate with any REST
service providing XML data.

In this example thare are no data present in *Data Source*, all presented data 
is retrieved from the `Thomas Bayer's <http://www.thomas-bayer.com>`_ sample 
`REST service <http://www.thomas-bayer.com/sqlrest>`_.

In this particular example we list all the provided `CUSTOMERS <http://www.thomas-bayer.com/sqlrest/CUSTOMER>`_
with their respective ``names`` and ``addresses``. 

Test case definition
====================

Source data
-----------

No data in the main *Data Source*:

.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/05-rest-client

   <data/>



Data Template
-------------

*Data Template* contains a list of ``customers`` with names and addresses:

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/05-rest-client

   <data>
      <customers>
        <customer>
          <ID>?</ID>
          <FIRSTNAME>?</FIRSTNAME>
          <LASTNAME>?</LASTNAME>
          <STREET>?</STREET>
          <CITY>?</CITY>
        </customer>
      </customers>
    </data>



Transformation
--------------

*Data Transformation* retrieves a list of ``CUSTOMER`` IDs from `<http://www.thomas-bayer.com/sqlrest/CUSTOMER>`_
and recursively copies the first three:

.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/05-rest-client

   <dptr:transformation xmlns:dptr="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <dptr:rule path="/data">
        <dptr:value key="$baseuri">'http://www.thomas-bayer.com/sqlrest'</dptr:value>
      </dptr:rule>
      <dptr:rule path="/data/customers">
        <dptr:value key="$iuri">concat( $baseuri, '/CUSTOMER' )</dptr:value>
        <dptr:value key="$cindex">dptr:document($iuri)</dptr:value>
      </dptr:rule>
      <dptr:rule path="/data/customers/customer">
        <dptr:value key=".">$cindex/CUSTOMERList/CUSTOMER[position()&lt;=3]</dptr:value>
        <dptr:value key="$curi">concat( $iuri, '/', text() )</dptr:value>
        <dptr:value key="$cxml">dptr:document($curi)</dptr:value>
        <dptr:value key="recurse">$cxml/CUSTOMER</dptr:value>
      </dptr:rule>
    </dptr:transformation>



Compiled Transformation
-----------------------

*Compiled Transformation* demonstrates the ``recurse`` effect - it automatically generates 
rules for ``ID``, ``FIRSTNAME``, ``LASTNAME``, ``STREET`` and ``CITY`` sub-elements:

.. code:: xml
   :number-lines:
   :name: compiled pfi01/usecases/05-rest-client

   <dptr:transformation xmlns:dptr="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <dptr:rule path="/data">
        <dptr:value key="$baseuri">'http://www.thomas-bayer.com/sqlrest'</dptr:value>
      </dptr:rule>
      <dptr:rule path="/data/customers">
        <dptr:value key="$iuri">concat( $baseuri, '/CUSTOMER' )</dptr:value>
        <dptr:value key="$cindex">dptr:document($iuri)</dptr:value>
      </dptr:rule>
      <dptr:rule path="/data/customers/customer">
        <dptr:value key=".">$cindex/CUSTOMERList/CUSTOMER[position()&lt;=3]</dptr:value>
        <dptr:value key="$curi">concat( $iuri, '/', text() )</dptr:value>
        <dptr:value key="$cxml">dptr:document($curi)</dptr:value>
      </dptr:rule>
      <dptr:rule path="/data/customers/customer/CITY">
        <dptr:value key=".">$cxml/CUSTOMER/CITY</dptr:value>
        <dptr:value key="text()">text()</dptr:value>
      </dptr:rule>
      <dptr:rule path="/data/customers/customer/FIRSTNAME">
        <dptr:value key=".">$cxml/CUSTOMER/FIRSTNAME</dptr:value>
        <dptr:value key="text()">text()</dptr:value>
      </dptr:rule>
      <dptr:rule path="/data/customers/customer/ID">
        <dptr:value key=".">$cxml/CUSTOMER/ID</dptr:value>
        <dptr:value key="text()">text()</dptr:value>
      </dptr:rule>
      <dptr:rule path="/data/customers/customer/LASTNAME">
        <dptr:value key=".">$cxml/CUSTOMER/LASTNAME</dptr:value>
        <dptr:value key="text()">text()</dptr:value>
      </dptr:rule>
      <dptr:rule path="/data/customers/customer/STREET">
        <dptr:value key=".">$cxml/CUSTOMER/STREET</dptr:value>
        <dptr:value key="text()">text()</dptr:value>
      </dptr:rule>
    </dptr:transformation>



Expected Result
---------------

Here we can see the first three retrieved ``CUSTOMERs`` with their respective
data:

.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/05-rest-client

   <data>
      <customers>
        <customer>
          <ID>0</ID>
          <FIRSTNAME>Laura</FIRSTNAME>
          <LASTNAME>Steel</LASTNAME>
          <STREET>429 Seventh Av.</STREET>
          <CITY>Dallas</CITY>
        </customer>
        <customer>
          <ID>1</ID>
          <FIRSTNAME>Susanne</FIRSTNAME>
          <LASTNAME>King</LASTNAME>
          <STREET>366 - 20th Ave.</STREET>
          <CITY>Olten</CITY>
        </customer>
        <customer>
          <ID>2</ID>
          <FIRSTNAME>Anne</FIRSTNAME>
          <LASTNAME>Miller</LASTNAME>
          <STREET>20 Upland Pl.</STREET>
          <CITY>Lyon</CITY>
        </customer>
      </customers>
    </data>


