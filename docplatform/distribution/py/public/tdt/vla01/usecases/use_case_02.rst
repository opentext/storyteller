======
UC-002
======

:Author: Vladimir Lavicka

Use case definition
===================

**User wants to set label, name and value of dynamic number of edit fields with data 
from repeated blocks → (UC-02)**

    - Drag and drop expectation


**Example:**

.. code:: xml
   :number-lines:

    <data>
        <message>
            <prop>
                <key>name</key>
                <value>SMITH</value>
            </prop>
            <prop>
                <key>age</key>
                <value>37</value>
            </prop>
        </message>
    </data>


**Result:**

.. code:: xml
   :number-lines:
   
    <label>name
        <input name="name" value="SMITH"/>
    </label>
    <label>age
        <input name="age" value="37"/>
    </label>


Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-002

    <page>
        <text pos='100,100' brush='1' size='400,179'>
            <rep xpath="/data/label">
            <p>
                - label(<subst xpath="."/>), 
                  key(<subst xpath="input/@name"/>), 
                  value(<subst xpath="input/@value"/>)
            </p>
            </rep>
        </text>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-002

    <data>
        <label><text>name</text><input name="name" value="SMITH"/></label>
        <label><text>age</text><input name="age" value="37"/></label>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-002

    <data>
        <message>
            <prop>
                <key>name</key>
                <value>SMITH</value>
            </prop>
            <prop>
                <key>age</key>
                <value>37</value>
            </prop>
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-002

    <data>
        <label>
            <text>?</text>
            <input name="?" value="?"/>
        </label>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-002

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/label">
       <tdt:value key=".">/data/message/prop</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/label/text">
       <tdt:value key="text()">key/text()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/label/input">
       <tdt:value key="@name">key/text()</tdt:value>
       <tdt:value key="@value">value/text()</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-002

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <data>
            <xsl:for-each select="/data/message/prop">
                <label>
                    <text><xsl:value-of select="key"/></text>
                    <input name="{key}" value="{value}"/>
                </label>
            </xsl:for-each>
        </data>
    </xsl:template>
    </xsl:stylesheet>


