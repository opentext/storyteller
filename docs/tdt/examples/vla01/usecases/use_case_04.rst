======
UC-004
======

:Author: Vladimir Lavicka


Use case definition
===================

**User wants to fill value of specific full name edit control from first, 
middle and last name fields in data, separating the non-empty name parts by 
space. Single name (e.g. company) can come in first or last name. → (UC-04)**



**Example:**

.. code:: xml
   :number-lines:

    <data>
        <message>
            <first>John</first>
            <middle/>
            <last>Smith</last>
        </message>
    </data>

**Result:**

.. code:: xml
   :number-lines:
   
    <input name="name" value="John Smith"/>


Test case definition
====================

**Document definition**

.. code:: xml
   :number-lines:
   :name: content UC-004

    <page size='300,150'>
        <text pos='10,10' brush='1' size='280,130'>
            <rep xpath="/data/input">
                Name: "<subst xpath="@value"/>"<br/>
            </rep>
        </text>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-004

    <data>
        <input name="name" value="John Smith"/>
        <input name="name" value="John Wilkes Booth"/>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-004

    <data>
        <message>
            <person>
                <first>John</first>
                <middle/>
                <last>Smith</last>
            </person>
            <person>
                <first>John</first>
                <middle>Wilkes</middle>
                <last>Booth</last>
            </person>
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-004

    <data>
        <input name="name" value="?"/>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-004

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/input">
       <tdt:value key=".">/data/message/person</tdt:value>
       <tdt:value key="@value">normalize-space(concat(first, ' ', middle, ' ', last))</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-004

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <data>
            <xsl:for-each select="/data/message/person">
                <input name="name" 
                       value="{normalize-space(concat(first, ' ', middle, ' ', last))}"/>
            </xsl:for-each>
        </data>
    </xsl:template>
    </xsl:stylesheet>


