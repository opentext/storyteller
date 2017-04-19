======
UC-001
======

:Author: Vladimir Lavicka

Use case definition
===================

**User wants to prefill value of edit control with root level message field "as is" without modification → (UC-01)**

    - Drag and drop expectation
    - XPath string available for editing and syntax validation
    - Re-browse functionality

**Example:**

.. code:: xml
   :number-lines:

    <data>
        <message>
            <name>SMITH</name>
        </message>
    </data>

**Result:**

.. code:: xml
   :number-lines:
   
    <input ... value="SMITH"/>

Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-001

    <page>
        <text pos='100,100' brush='1' size='200,179'>
            <subst xpath="/data/input/@value"/>
        </text>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-001

    <data>
      <input value="SMITH"/>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-001

    <data>
        <message>
            <name>SMITH</name>
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-001

    <data>
        <input value="?"/>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-001

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/input">
       <tdt:value key="@value">/data/message/name/text()</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-001

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
    <data>
        <input value="{data/message/name}"/>
    </data>
    </xsl:template>
    </xsl:stylesheet>
