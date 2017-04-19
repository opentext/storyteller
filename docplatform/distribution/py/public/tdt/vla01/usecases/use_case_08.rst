======
UC-008 
======

:Author: Vladimir Lavicka

Use case definition
===================

**User wants to preselect multiple values in the multiselect list**

    - Say for example list of family members covered by insurance

.. note:: no example available


**Example:**

.. code:: xml
   :number-lines:

    <data>
        <message>
            <member insured="0">mom</member>
            <member insured="1">dad</member>
            <member insured="1">boy</member>
            <member insured="0">girl</member>
            <member insured="1">baby</member>
        </message>
    </data>


**Result:**


.. code:: xml
   :number-lines:
   
    <data>
        <choices>
            <choice selected="false">mom</choice>
            <choice selected="true">dad</choice>
            <choice selected="true">boy</choice>
            <choice selected="false">girl</choice>
            <choice selected="true">baby</choice>
        </choices>
    </data>
        

Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-008

    <page size='300,150'>
        <text pos='10,10' brush='1' size='280,130'>
            <rep xpath="/data/choices/choice">
                <p>
                    <style bold="1"/>
                        <subst xpath="."/>
                    <style bold="0"/>
                    <tab/>-_
                    <swi xpath="@selected">
                        <case key="true">insured</case>
                        <case key="false">uninsured</case>
                        <case>insurance info not available</case>
                    </swi>
                </p>
            </rep>
        </text>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-008

    <data>
        <choices>
            <choice selected="false">mom</choice>
            <choice selected="true">dad</choice>
            <choice selected="true">boy</choice>
            <choice selected="false">girl</choice>
            <choice selected="true">baby</choice>
        </choices>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-008

    <data>
        <message>
            <member insured="0">mom</member>
            <member insured="1">dad</member>
            <member insured="1">boy</member>
            <member insured="0">girl</member>
            <member insured="1">baby</member>
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-008

    <data>
        <choices>
            <choice selected="?">?</choice>
        </choices>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-008

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/choices/choice">
       <tdt:value key=".">/data/message/member</tdt:value>
       <tdt:value key="@selected">@insured=1</tdt:value>
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-008

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <data>
            <choices>
                <xsl:for-each select="/data/message/member">
                    <choice selected="{@insured=1}"><xsl:value-of select="."/></choice>
                </xsl:for-each>
            </choices>
        </data>
    </xsl:template>
    </xsl:stylesheet>


