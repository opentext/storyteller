======
UC-003
======

:Author: Vladimir Lavicka

Use case definition
===================

**User wants to fill value of specific edit control from list of 
property/value records selecting the one that has property key = "name"**



**Example:**

.. code:: xml
   :number-lines:

    <data>
        <message>
            <prop>one</prop>
            <prop>two</prop>
            … 
            <prop>N</prop>
        </message>
    </data>

**Result:**

.. code:: xml
   :number-lines:
   
    <control>
        <choice selected="false">one</choice>
        <choice selected="true">two</choice>
        … 
        <choice selected="false">N</choice>
    </control>


Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-003

    <page size='300,150'>
        <text pos='10,10' brush='1' size='280,130'>
            <rep xpath="/data/control/choice">
                <p>selected(<subst xpath="@selected"/>) -> value = <subst xpath="."/></p>
            </rep>
        </text>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-003

    <data>
        <control>
            <choice selected="false">one</choice>
            <choice selected="true">two</choice>
            <choice selected="false">three</choice>
        </control>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-003

    <data>
        <message>
            <selected>two</selected>
            <prop>one</prop>
            <prop>two</prop>
            <prop>three</prop>
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-003

    <data>
        <control>
            <choice selected="?">?</choice>
        </control>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-003

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/control/choice">
       <tdt:value key=".">/data/message/prop</tdt:value>
       <tdt:value key="text()">text()</tdt:value>
       <tdt:value key="@selected">text() = /data/message/selected</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-003

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <data>
            <control>
                <xsl:for-each select="/data/message/prop">
                    <choice selected="{text() = /data/message/selected}">
                        <xsl:value-of select="."/>
                     </choice>
                </xsl:for-each>
            </control>
        </data>
    </xsl:template>
    </xsl:stylesheet>


