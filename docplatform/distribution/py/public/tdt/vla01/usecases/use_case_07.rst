======
UC-007
======

:Author: Vladimir Lavicka

Use case definition
===================


**User wants to build list of choices based on repeatable data**

    - Invalid or empty entries are not listed


**Example:**

Select an email address that we would use to communicate with you from list

.. code:: xml
   :number-lines:

    <data>
        <message>
            <email type="email">account@our.net</email>
            <email type="emailw1">X@X.X</email>
            <email type="emailw2"/>
            <email type="emailp1">Z@Z.Z</email>
        </message>
    </data>


**Result:**


.. code:: xml
   :number-lines:
   
    <select>
        <option value="email">account@our.net</option>
        <option value="emailw1">X@X.X</option>
        <option value="emailp1">Z@Z.Z</option>
    </select>



Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-007

    <page size='300,150'>
        <text pos='10,10' brush='1' size='280,130'>
            <rep xpath="/data/select/option">
                <p>
                    <subst xpath="@value"/> -> <subst xpath="."/>
                </p>
            </rep>
            Invalid entries:_
            <swi xpath="count(/data/invalid/entry)">
                <case key="0">none</case>
                <case key="1">
                    <subst xpath="/data/invalid/entry"/>
                </case>
                <case>
                    <rep xpath="/data/invalid/entry[position()&lt;last()]">
                        <subst xpath="."/>,
                    </rep>
                    <subst xpath="/data/invalid/entry[last()]"/>
                </case>
            </swi>
        </text>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-007

    <data>
        <select>
            <option value="email">account@our.net</option>
            <option value="emailw1">X@X.X</option>
            <option value="emailp1">Z@Z.Z</option>
        </select>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-007

    <data>
        <message>
            <email type="email">account@our.net</email>
            <email type="emailw1">X@X.X</email>
            <email type="emailw2"/>
            <email type="emailp1">Z@Z.Z</email>
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-007

    <data>
        <select>
            <option value="?">?</option>
        </select>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-007

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/select/option">
       <tdt:value key=".">/data/message/email[text()]</tdt:value>
       <tdt:value key="@value">@type</tdt:value>
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-007

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <data>
            <select>
                <xsl:for-each select="/data/message/*[text()]">
                    <option value="{@type}"><xsl:value-of select="."/></option>
                </xsl:for-each>
            </select>
        </data>
    </xsl:template>
    </xsl:stylesheet>


