=============
Group & Total
=============

:Author: Petr Filipsky

Overview
========

Very often incoming *message* contains a continuous sequence of record elements.

User typically wants to *group* the original *records* based on one or more particular *attributes*.

Often user wants to *compute a total* for each such group.

Test case definition
====================

Source Data
-----------

Each incoming ``<record>`` has several attributes.

User wants to *group* the records based on a value of attribute ``@batch``.

For each ``batch`` he wants to compute a total of all values of attribute ``@squantity``.

.. code:: xml
   :number-lines:
   :name: source Batches

   <data>
     <message>
       <record batch="A" serial="S001" mdate="21/6/2014" edate="21/1/2016" squantity="10" iquantity="12"/>
       <record batch="A" serial="S002" mdate="21/6/2014" edate="21/1/2016" squantity="12" iquantity="12"/>
       <record batch="A" serial="S003" mdate="21/6/2014" edate="21/1/2016" squantity="14" iquantity="12"/>
       <record batch="A" serial="S004" mdate="21/6/2014" edate="21/1/2016" squantity="20" iquantity="12"/>
       <record batch="A" serial="S005" mdate="21/6/2014" edate="21/1/2016" squantity="20" iquantity="12"/>
       <record batch="A" serial="S006" mdate="21/6/2014" edate="21/1/2016" squantity="20" iquantity="12"/>
       <record batch="A" serial="S007" mdate="21/6/2014" edate="21/1/2016" squantity="12" iquantity="12"/>
       <record batch="B" serial="S100" mdate="24/5/2004" edate="2/9/2010" squantity="60" iquantity="10"/>
       <record batch="B" serial="S101" mdate="24/5/2004" edate="2/9/2010" squantity="125" iquantity="10"/>
       <record batch="B" serial="S102" mdate="24/5/2004" edate="2/9/2010" squantity="550" iquantity="10"/>
       <record batch="B" serial="S103" mdate="24/5/2004" edate="2/9/2010" squantity="12" iquantity="10"/>
       <record batch="B" serial="S104" mdate="24/5/2004" edate="2/9/2010" squantity="99" iquantity="10"/>
     </message>
   </data>


Expected result
---------------

User expects two groups ``A`` and ``B`` - synthesized elements called ``<batch>``, 
each containing corresponding ``<record>s`` .

There is no need to repeat ``@batch`` attribute for every grouped ``record``. 
The ``@batch`` attribute is moved to the ``batch`` element and renamed to ``@name``.
All other attributes are preserved in each record.

Then there is a new ``@total`` attribute containing computed *sum* of all records' ``@squantity`` values.

.. code:: xml
   :number-lines:
   :name: instance Batches

   <data>
     <batch name="A" total="108">
       <record edate="21/1/2016" iquantity="12" mdate="21/6/2014" serial="S001" squantity="10"/>
       <record edate="21/1/2016" iquantity="12" mdate="21/6/2014" serial="S002" squantity="12"/>
       <record edate="21/1/2016" iquantity="12" mdate="21/6/2014" serial="S003" squantity="14"/>
       <record edate="21/1/2016" iquantity="12" mdate="21/6/2014" serial="S004" squantity="20"/>
       <record edate="21/1/2016" iquantity="12" mdate="21/6/2014" serial="S005" squantity="20"/>
       <record edate="21/1/2016" iquantity="12" mdate="21/6/2014" serial="S006" squantity="20"/>
       <record edate="21/1/2016" iquantity="12" mdate="21/6/2014" serial="S007" squantity="12"/>
     </batch>
     <batch name="B" total="846">
       <record edate="2/9/2010" iquantity="10" mdate="24/5/2004" serial="S100" squantity="60"/>
       <record edate="2/9/2010" iquantity="10" mdate="24/5/2004" serial="S101" squantity="125"/>
       <record edate="2/9/2010" iquantity="10" mdate="24/5/2004" serial="S102" squantity="550"/>
       <record edate="2/9/2010" iquantity="10" mdate="24/5/2004" serial="S103" squantity="12"/>
       <record edate="2/9/2010" iquantity="10" mdate="24/5/2004" serial="S104" squantity="99"/>
     </batch>
   </data>  


Data template
-------------

*Data template* is very simple.
There are just two nested repeatable elements: ``batch`` and ``record``. 

The template definition looks as follows:

.. code:: xml
   :number-lines:
   :name: template Batches

   <data>
     <batch name="?" total="?">
       <record serial="?" mdate="?" edate="?" squantity="?" iquantity="?"/>
     </batch>
   </data>


Transformation
--------------

The transformation is relatively straightforward.

* Each ``batch`` is created by grouping the ``records`` based on a ``@batch`` attribute value

  * The ``@name`` attribute is based on the value of original ``@batch`` attribute
  * The ``@total`` value is computed as a *sum* of records' ``@squantity`` attribute values

* Each ``record`` is created based on each superior group records

    * All record's attribute values are comped from original attributes of the same names   



The formal definition looks as follows:

.. code:: xml
   :number-lines:
   :name: transformation Batches

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/batch">
       <tdt:value key=".">tdt:group( /data/message/record, '@batch' )</tdt:value>
       <tdt:value key="$records">tdt:ungroup()</tdt:value>
       <tdt:value key="@name">tdt:key[@key='@batch']</tdt:value>
       <tdt:value key="@total">sum( $records/@squantity )</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/batch/record">
       <tdt:value key=".">$records</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
	 </tdt:rule>
   </tdt:transformation>



