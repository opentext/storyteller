======
UC-016
======

:Author: Vladimir Lavicka

Use case definition
===================


.. admonition:: Use case definition

    Designer wants to switch choices presentation from check boxes to 
    multi-selection pull-down in case when there is more than 4 choices in the 
    list:

    - Example: Which you your family members should be included in insurance?


.. note:: no example available


Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-016

    <story>
      <rep xpath="/data/selections">
        <swi xpath="count(dpii:input-group/choices)>=3">
          <case key="false">
            <p>
            Only <subst xpath="count(dpii:input-group/choices)"/> items, 
            using radio buttons:<br/>
              <tab/>

              <table brush_rgb="250,200,100,255" dim="1,2" size="100,15.75" 
                     widths="15;85" thickness="inf" shape_rescale="resourcesapi.RM_FIXED" 
                     mode="inline">
                <body>
                  <rep xpath="dpii:input-group/choices">
                    <row index="0">
                      <cell alignment_mode="resourcesapi.AM_VERTICAL" v_alignment="0.5" 
                            thickness="inf" shape_rescale="resourcesapi.RM_FIXED">
                        <style name="Arial" size="10.0"/>
                        <p>
                          <interactive datalink="."
                                       size="12,12"
                                       buttontype="submit"
                                       controltype="checkbox">
                            <iistyle name="Arial" size="10.0"/>
                          </interactive>
                        </p>
                     </cell>
                      <cell alignment_mode="resourcesapi.AM_VERTICAL" v_alignment="0.5" 
                            thickness="inf" shape_rescale="resourcesapi.RM_FIXED">
                        <style name="Arial" size="10.0"/>
                        <p> 
                          <subst xpath="dpii:label/text()" mask="" texttype="0"/>
                        </p>
                      </cell>
                    </row>
                  </rep>
                </body>
              </table>
            </p>
          </case>
          <case key="true">
            More than 2 items, using drop down:<br/>
            <tab/>
            <interactive datalink="."
                         translate="0,58.35"
                         size="72,15"
                         texttype="text"
                         buttontype="submit" 
                         controltype="dropdown" 
                         pen_rgb="0,0,0,255"
                         brush_rgb="250,200,100,255" 
                         shape_rescale="resourcesapi.RM_FIXED">
              <iistyle name="Arial" size="10.0"/>
            </interactive>
          </case>
        </swi>
      </rep>
    </story>

    <page size='300,150'>
      <text storyindex="0" pos='10,10' brush='1' size='280,130'/>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-016

    <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
        <selections>
            <dpii:input-group disabled="false" multiselect="true"
                              name="usage_period" readonly="false">
                <choices>
                    <dpii:choice disabled="false" readonly="false" 
                                 selected="true">1</dpii:choice>
                    <dpii:label>one</dpii:label>
                </choices>
                <choices>
                    <dpii:choice disabled="false" readonly="false" 
                                 selected="false">2</dpii:choice>
                    <dpii:label>two</dpii:label>
                </choices>
            </dpii:input-group>
        </selections>
        <selections>
            <dpii:input-group disabled="false" multiselect="true" 
                              name="usage_period" readonly="false">
                <choices>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="true">1</dpii:choice>
                    <dpii:label>one</dpii:label>
                </choices>
                <choices>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="false">2</dpii:choice>
                    <dpii:label>two</dpii:label>
                </choices>
                <choices>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="false">3</dpii:choice>
                    <dpii:label>three</dpii:label>
                </choices>
            </dpii:input-group>
        </selections>
    </data>



Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-016

    <data>
        <message>
            <example>
                <choice id="1">one</choice>
                <choice id="2">two</choice>
            </example>
            <example>
                <choice id="1">one</choice>
                <choice id="2">two</choice>
                <choice id="3">three</choice>
            </example>
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-016

    <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
        <selections>
            <dpii:input-group disabled="false" readonly="false"
                              multiselect="true" name="usage_period">
                <choices>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="false">?</dpii:choice>
                    <dpii:label>?</dpii:label>
                </choices>
            </dpii:input-group>
        </selections>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-016

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/selections">
       <tdt:value key=".">/data/message/example</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/selections/dpii:input-group/choices">
       <tdt:value key=".">choice</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/selections/dpii:input-group/choices/dpii:label">
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/selections/dpii:input-group/choices/dpii:choice">
       <tdt:value key="text()">@id</tdt:value>
       <tdt:value key="@selected">position() = 1</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-016

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
            <xsl:for-each select="/data/message/example">
                <selections>
                    <dpii:input-group disabled="false" multiselect="true"
                                      name="usage_period" readonly="false">
                        <xsl:for-each select="choice">
                            <choices>
                                <dpii:choice disabled="false" readonly="false"
                                             selected="{position() = 1}">
                                    <xsl:value-of select="@id"/>
                                </dpii:choice>
                                <dpii:label>
                                    <xsl:value-of select="."/>
                                </dpii:label>
                            </choices>
                        </xsl:for-each>
                    </dpii:input-group>
                </selections>
            </xsl:for-each>
        </data>
    </xsl:template>
    </xsl:stylesheet>


