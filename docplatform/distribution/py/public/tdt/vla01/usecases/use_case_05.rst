======
UC-005
======

:Author: Vladimir Lavicka


Use case definition
===================


**User wants to associate a value from root level field with a list control, 
so that the static choice would be preselected → (UC-05)**


**Example:**

.. code:: xml
   :number-lines:

    <data>
        <message>
            <gender>F</gender>
        </message>
    </data>


**Result:**


.. code:: xml
   :number-lines:
   
    <data>
        <select>
            <option value="M">Male</option>
            <option selected value="F">Female</option>
        </select>
    </data>
    


Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-005

    <page size='300,150'>
        <text pos='10,10' brush='1' size='280,130'>
            <rep xpath="/data/select/option">
                <p>
                    <subst xpath="."/> (<subst xpath="@value"/>)
                    ?Female -> <subst xpath="@selected"/>
                </p>
            </rep>
        </text>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-005

    <data>
        <select>
            <option selected="false" value="M">Male</option>
            <option selected="true" value="F">Female</option>
        </select>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-005

    <data>
        <message>
            <gender>F</gender>
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-005

    <data>
        <select>
            <option selected="?" value="M">Male</option>
            <option selected="?" value="F">Female</option>
        </select>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-005

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/select">
       <tdt:value key="$gender">/data/message/gender</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/select/option[1]">
       <tdt:value key="@selected">$gender = 'M'</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/select/option[2]">
       <tdt:value key="@selected">$gender = 'F'</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-005

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <data>
            <select>
                <option selected="{/data/message/gender = 'M'}" value="M">Male</option>
                <option selected="{/data/message/gender = 'F'}" value="F">Female</option>
            </select>
        </data>
    </xsl:template>
    </xsl:stylesheet>


.. note:: Result of **XSLT** does not have to contain nodes ``/data/gender`` 
   and ``/data/selection``.  It is here due to comparison both transformation 
   with expected result.
   
