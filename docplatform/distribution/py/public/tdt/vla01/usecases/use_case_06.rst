======
UC-006
======

:Author: Vladimir Lavicka

Use case definition
===================

**User wants to build list of choices based on static field set**
    
    - Invalid or empty entries are not listed


**Example:**

    Select an email address that we would use to communicate with you from list


.. code:: xml
   :number-lines:

    <data>
        <message>
            <email>account@our.net</email>
            <emailw1>X@X.X</emailw1>
            <emailw2></emailw2>
            <emailp1>Z@Z.Z</emailp1>
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
   :name: content UC-006

    <page size='300,150'>
        <text pos='10,10' brush='1' size='280,130'>
            <rep xpath="/data/select/option">
                <p>
                    <subst xpath="@value"/> -> <subst xpath="."/>
                </p>
            </rep>
            Invalid entries:_

            <!-- does not work -> create special case
            <rep xpath="/data/invalid/entry[position()&lt;last()]">
                <subst xpath="."/>, 
            </rep>  
            <subst xpath="/data/invalid/entry[position()=last()]"/>
            -->

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
   :name: instance UC-006

    <data>
        <select>
            <option value="email">account@our.net</option>
            <option value="emailw1">X@X.X</option>
            <option value="emailp1">Z@Z.Z</option>
        </select>
        <invalid>
            <entry>emailw2</entry>
            <entry>emailp2</entry>
        </invalid>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-006

    <data>
        <message>
            <email>account@our.net</email>
            <emailw1>X@X.X</emailw1>
            <emailw2></emailw2>
            <emailp1>Z@Z.Z</emailp1>
            <emailp2>email</emailp2>
        </message>
    </data>



Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-006

    <data>
        <select>
            <option value="?">?</option>
        </select>
        <invalid>
            <entry>?</entry>
        </invalid>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-006

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/select/option">
       <tdt:value key=".">/data/message/*[text() and contains(text(), '@')]</tdt:value>
       <tdt:value key="@value">name()</tdt:value>
       <tdt:value key="text()">.</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/invalid/entry">
       <tdt:value key=".">/data/message/*[not(text()) or not(contains(text(), '@'))]</tdt:value>
       <tdt:value key="text()">name()</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-006

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <data>
            <select>
                <xsl:for-each select="/data/message/*[text() and contains(text(), '@')]">
                    <option value="{name(.)}"><xsl:value-of select="."/></option>
                </xsl:for-each>
            </select>
            <invalid>
                <xsl:for-each select="/data/message/*[not(text()) or not(contains(text(), '@'))]">
                    <entry><xsl:value-of select="name(.)"/></entry>
                </xsl:for-each>
            </invalid>
        </data>
    </xsl:template>
    </xsl:stylesheet>

