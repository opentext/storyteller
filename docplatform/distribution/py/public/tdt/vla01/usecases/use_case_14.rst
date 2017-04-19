======
UC-014
======

:Author: Vladimir Lavicka

Use case definition
===================


.. admonition:: Use case definition
   
    User wants to add a choice selector on his transaction table row. 
    
    - Each selection control name will be a concatenation of *select_* + *id* 
      field from repeated data.

    - Choice value will be a number from 1-5.

    - Choice value is optional.

    - Choices are represented by static set of options with values and texts 
      defined in design time.

    - Only option that matches the value in transaction record will be selected. 

    - If no value is specified, selection has to be presented to end user as undefined.


**Example:**

.. code:: xml
   :number-lines:

    <!-- example from use case definition -->


**Result:**


.. code:: xml
   :number-lines:
   
    <data>
        <tablerow>
        </tablerow>
    </data>



Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-004

    <page size='300,150'>
        <text pos='10,10' brush='1' size='280,130'>
            <!-- content -->
        </text>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-004

    <data>
        <!-- result -->
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-004

    <data>
        <message>
            <!-- message data -->
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-004

    <data>
        <!-- data template definition -->
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-004

    <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
        <!--
        <tdt:rule path="">
            <tdt:value key="."></tdt:value>
            <tdt:value key="text()"></tdt:value>
        </tdt:rule>
        -->
    </tdt:transformation>
