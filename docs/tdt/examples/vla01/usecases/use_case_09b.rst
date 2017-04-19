=======
UC-009b
=======

:Author: Vladimir Lavicka

Overview
========

This is part two of use case dealing with sub-blocks of different types in significant order.


Use case definition
===================

.. admonition:: Use case definition

    User wants to add a check box on his transaction table row. Each check box 
    value will be a value of id field from repeated data.

    - Transaction row can have many fields of which only one is relevant to check box
    - Transaction data can contain sub-blocks of different types and significant order



**Example:**

.. code:: xml
   :number-lines:

    <data>
      <records>
        <call number="+4207654321" duration="125"/>
        <sms number="+4201234567" text="Hello!"/>
        <sms number="+4207654321" text="Hi!"/>
        <mms number="+4201234567" size="5KB"/>
        <sms number="+4201234567" text="Cheers!"/>
        <call number="+4207654321" duration="67"/>
        <sms number="+4201234567" text="Good bye!"/>
      </records>
    </data>





Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-009b

    <story name="main">
      <table size='450, 20' dim='2,4' mode='paragraph'>
        <body>
          <row index='0'>
            <cell><p>no.</p></cell>
            <cell><p>number</p></cell>
            <cell><p>type</p></cell>
            <cell><p>info</p></cell>
          </row>
          <rep xpath='/data/message/event/*'>
            <row index='1'>
              <cell><p><subst xpath="position()"/></p></cell>
              <cell><p><subst xpath="../@number"/></p></cell>
              <cell><p><subst xpath="../@type"/></p></cell>
              <cell><p>
                <swi xpath="name()">
                  <case><p><subst xpath="name()"/></p></case>
                  <case key="call"><p>duration = <subst xpath="@duration"/></p></case>
                  <case key="sms"><p>text = <subst xpath="@text"/></p></case>
                  <case key="mms"><p>size = <subst xpath="@size"/></p></case>
                </swi>
              </p></cell>
            </row>
          </rep>
        </body>
      </table>
    </story>
    <page size='500,200'>
        <text storyref="main" pos='10,10' brush='1' size='480,180'/>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-009b

    <data>
      <message>
        <event number="+4207654321" type="call">
          <call duration="125"/>
        </event>
        <event number="+4201234567" type="sms">
          <sms text="Hello!"/>
        </event>
        <event number="+4207654321" type="sms">
          <sms text="Hi!"/>
        </event>
        <event number="+4201234567" type="mms">
          <mms size="5KB"/>
        </event>
        <event number="+4201234567" type="sms">
          <sms text="Cheers!"/>
        </event>
        <event number="+4207654321" type="call">
          <call duration="67"/>
        </event>
        <event number="+4201234567" type="sms">
          <sms text="Good bye!"/>
        </event>
      </message>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-009b

    <data>
      <records>
        <call number="+4207654321" duration="125"/>
        <sms number="+4201234567" text="Hello!"/>
        <sms number="+4207654321" text="Hi!"/>
        <mms number="+4201234567" size="5KB"/>
        <sms number="+4201234567" text="Cheers!"/>
        <call number="+4207654321" duration="67"/>
        <sms number="+4201234567" text="Good bye!"/>
      </records>
    </data>


**Data template**

.. code:: xml
   :number-lines:
   :name: template UC-009b

    <data>
      <message>
        <event type="?" number="?">
          <call duration="?"/>
          <sms text="?"/>
          <mms size="?"/>
        </event>
      </message>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-009b

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/message/event">
       <tdt:value key=".">/data/records/*</tdt:value>
       <tdt:value key="@type">local-name()</tdt:value>
       <tdt:value key="@number">@number</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/message/event/call">
       <tdt:value key=".">self::call</tdt:value>
       <tdt:value key="@duration">@duration</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/message/event/sms">
       <tdt:value key=".">self::sms</tdt:value>
       <tdt:value key="@text">@text</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/message/event/mms">
       <tdt:value key=".">self::mms</tdt:value>
       <tdt:value key="@size">@size</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-009b

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
            <xsl:for-each select="/data/message/item">
                <tablerow>
                    <dpii:input-group disabled="false" multiselect="true" 
                                      name="usage_period" readonly="false">
                        <choices>
                            <dpii:choice disabled="false" readonly="false" selected="true">
                                <xsl:value-of select="@id"/>
                            </dpii:choice>
                            <dpii:label></dpii:label>
                        </choices>
                    </dpii:input-group>
                    <column1><xsl:value-of select="column[1]"/></column1>
                    <column2><xsl:value-of select="column[2]"/></column2>
                </tablerow>
            </xsl:for-each>
        </data>
    </xsl:template>
    </xsl:stylesheet>


