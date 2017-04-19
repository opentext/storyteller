======
UC-010
======

:Author: Vladimir Lavicka

Use case definition
===================

.. admonition:: Use case definition

    Same as above, but user wants to generate the checkbox value as a sequence 
    number of the repeated item. There is no id field in repeated record


.. note:: Previous explanation reference this

    User wants to add a check box on his transaction table row. Each check box
    value will be a value of id field from repeated data. 

    - Transaction row can have many fields of which only one is relevant to check box
    - Transaction data can contain sub-blocks of different types and significant order


**Example:**

.. code:: xml
   :number-lines:

    <data>
        <message>
            <item>
                <column>text 1</column>
                <column>text 2</column>
            </item>
            <item>
                <column>text 3</column>
                <column>text 4</column>
            </item>
        </message>
    </data>


**Result:**

.. code:: xml
    :number-lines:

    <data>
        <tablerow>
            <checkbox value="1"/>
            <column1>text 1</column1>
            <column2>text 2</column2>
        </tablerow>
        <tablerow>
            <checkbox value="2"/>
            <column1>text 3</column1>
            <column2>text 4</column2>
        </tablerow>
    </data>



Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-010

    <story name="main">
        <table size='250, 20' dim='1,4' mode='paragraph'>
            <body>
                <rep xpath='/data/tablerow'>
                    <row index='0'>
                        <cell><p><subst xpath="position()"/></p></cell>
                        <cell><p><subst xpath="column1"/></p></cell>
                        <cell><p><subst xpath="column2"/></p></cell>
                        <cell><p>
                            <interactive datalink="dpii:input-group/choices[1]"
                                         
                                         shape_rescale="resourcesapi.RM_FIXED" 
                                         controltype="checkbox" translate="0,58.35" 
                                         texttype="text" size="25,15">
                                <iistyle name="Arial" size="10.0"/>
                            </interactive><br/>
                        </p></cell>
                    </row>
                </rep>
            </body>
        </table>
    </story>
    <page size='300,150'>
        <text storyref="main" pos='10,10' brush='1' size='280,130'/>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-010

    <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
        <tablerow>
            <dpii:input-group disabled="false" multiselect="true" 
                              name="usage_period" readonly="false">
                <choices>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="true">1</dpii:choice>
                </choices>
            </dpii:input-group>
            <column1>text 1</column1>
            <column2>text 2</column2>
        </tablerow>
        <tablerow>
            <dpii:input-group disabled="false" multiselect="true" 
                              name="usage_period" readonly="false">
                <choices>
                    <dpii:choice disabled="false" readonly="false" 
                                 selected="true">2</dpii:choice>
                </choices>
            </dpii:input-group>
            <column1>text 3</column1>
            <column2>text 4</column2>
        </tablerow>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-010

    <data>
        <message>
            <item>
                <column>text 1</column>
                <column>text 2</column>
            </item>
            <item>
                <column>text 3</column>
                <column>text 4</column>
            </item>
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-010

    <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
        <tablerow>
            <dpii:input-group disabled="false" multiselect="true" 
                              name="usage_period" readonly="false">
                <choices>
                    <dpii:choice disabled="false" readonly="false" 
                                 selected="true">?</dpii:choice>
                </choices>
            </dpii:input-group>
            <column1>?</column1>
            <column2>?</column2>
        </tablerow>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-010

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/tablerow">
       <tdt:value key=".">/data/message/item</tdt:value>
       <tdt:value key="$row">position()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/tablerow/dpii:input-group/choices/dpii:choice">
       <tdt:value key="text()">$row</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/tablerow/column1">
       <tdt:value key="text()">column[1]</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/tablerow/column2">
       <tdt:value key="text()">column[2]</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-010

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
            <xsl:for-each select="/data/message/item">
                <tablerow>
                    <dpii:input-group disabled="false" multiselect="true"
                                      name="usage_period" readonly="false">
                        <choices>
                            <dpii:choice disabled="false" readonly="false" 
                                         selected="true">
                                <xsl:value-of select="position()"/>
                            </dpii:choice>
                        </choices>
                    </dpii:input-group>
                    <column1><xsl:value-of select="column[1]"/></column1>
                    <column2><xsl:value-of select="column[2]"/></column2>
                </tablerow>
            </xsl:for-each>
        </data>
    </xsl:template>
    </xsl:stylesheet>

