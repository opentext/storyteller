======
UC-018
======

:Author: Vladimir Lavicka

Use case definition
===================

.. admonition:: Use case definition

    Select list of predefined choices based on a message field values.






**Example:**

#. From list of 10 statically defined products select:
    - first 3 every time
    - 4 through 7th only if age >= 18 **and** 5th exclusively for gender="M" **and** 6 exclusively for gender="F"

#. Option 8,9,10 are included for users with state=Golden".

.. csv-table:: **combinations**
   :header: gender, age, state
   :widths: 10, 10, 10
   :class: narrow-table

    M, < 18, Aluminious
    M, < 18, Golden
    M, >= 18, Aluminious
    M, >= 18, Golden
    F, < 18, Aluminious
    F, < 18, Golden
    F, >= 18, Aluminious
    F, >= 18, Golden



.. code:: xml
   :number-lines:

    <data>
        <person gender="?" age="?" status="?">
            <list>
                <item selected="false">P1 - every time</item>
                <item selected="false">P2 - every time</item>
                <item selected="false">P3 - every time</item>
                <item selected="false">P4 - age >= 18</item>
                <item selected="false">P5 - age >= 18 and male</item>
                <item selected="false">P6 - age >= 18 </item>
                <item selected="false">P7 - age >= 18 and female</item>
                <item selected="false">P8 - state = "Golden"</item>
                <item selected="false">P9 - state = "Golden"</item>
                <item selected="false">P10 - state = "Golden"</item>
            </list>
        <person>
    </data>

    <data>
        <message>
            <person gender="M" age="17" status="Aluminious"/>
            <person gender="M" age="17" status="Golden"/>
            <person gender="M" age="18" status="Aluminious"/>
            <person gender="M" age="18" status="Golden"/>
            <person gender="F" age="17" status="Aluminious"/>
            <person gender="F" age="17" status="Golden"/>
            <person gender="F" age="18" status="Aluminious"/>
            <person gender="F" age="18" status="Golden"/>
        </message>
    </data>


**Result:**

*See* expected result



Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-018

    <story>
        <style name="Arial" bold="True"/>
        <p>From list of 10 statically defined products select:</p>
        <style name="Arial" size="10.0"/>
        <p list_text="·&#9;" name="Symbol">first 3 every time</p>
        <p list_text="·&#9;" name="Symbol">
            4 through 7th only if age &gt;= 18 and 5th exclusively for 
            gender="M" and 6 exclusively for gender="F"</p>
        <p list_text="·&#9;" name="Symbol">
            option 8,9,10 are included for users with state=Golden"
        </p>
        <p spacing_before="12" spacing_after="12">
        <rep xpath="/data/person">
            <text size="230,160">
                Gender: <subst xpath="@gender"/>,
                Age: <subst xpath="@age"/>,
                Status: <subst xpath="@status"/><br/>
                <interactive datalink="."
                             brush_rgb="250,200,100,255" 
                             pen_rgb="0,0,0,255" shape_rescale="resourcesapi.RM_FIXED" 
                             controltype="listbox" translate="0,58.35" 
                             texttype="text" size="200,140">
                    <iistyle name="Arial" size="10.0"/>
                </interactive>
            </text>
        </rep>
        </p>
    </story>
    <page>
        <text storyindex="0" translate="10,10" size="600,750"/>
    </page>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-018

    <data>
        <message>
            <person gender="M" age="17" status="Aluminious"/>
            <person gender="M" age="17" status="Golden"/>
            <person gender="M" age="18" status="Aluminious"/>
            <person gender="M" age="18" status="Golden"/>
            <person gender="F" age="17" status="Aluminious"/>
            <person gender="F" age="17" status="Golden"/>
            <person gender="F" age="18" status="Aluminious"/>
            <person gender="F" age="18" status="Golden"/>
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-018

    <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
        <person gender="?" age="?" status="?">
            <dpii:input-group disabled="false" multiselect="true"
                              name="usage_period" readonly="false">
                <item>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="?">1</dpii:choice>
                    <dpii:label>P1 - every time</dpii:label>
                </item>
                <item>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="?">2</dpii:choice>
                    <dpii:label>P2 - every time</dpii:label>
                </item>
                <item>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="?">3</dpii:choice>
                    <dpii:label>P3 - every time</dpii:label>
                </item>
                <item>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="?">4</dpii:choice>
                    <dpii:label>P4 - age >= 18</dpii:label>
                </item>
                <item>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="?">5</dpii:choice>
                    <dpii:label>P5 - age >= 18 and male</dpii:label>
                </item>
                <item>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="?">6</dpii:choice>
                    <dpii:label>P6 - age >= 18 </dpii:label>
                </item>
                <item>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="?">7</dpii:choice>
                    <dpii:label>P7 - age >= 18 and female</dpii:label>
                </item>
                <item>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="?">8</dpii:choice>
                    <dpii:label>P8 - state = "Golden"</dpii:label>
                </item>
                <item>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="?">9</dpii:choice>
                    <dpii:label>P9 - state = "Golden"</dpii:label>
                </item>
                <item>
                    <dpii:choice disabled="false" readonly="false"
                                 selected="?">10</dpii:choice>
                    <dpii:label>P10 - state = "Golden"</dpii:label>
                </item>
            </dpii:input-group>
        </person>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-018

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <!-- person info -->
	 <tdt:rule path="/data/person">
       <tdt:value key=".">/data/message/person</tdt:value>
       <tdt:value key="$gender">@gender</tdt:value>
       <tdt:value key="$age">@age</tdt:value>
       <tdt:value key="$status">@status</tdt:value>
       <tdt:value key="@gender">$gender</tdt:value>
       <tdt:value key="@age">$age</tdt:value>
       <tdt:value key="@status">$status</tdt:value>
	 </tdt:rule>
	 <!-- selection -->
	 <tdt:rule path="/data/person/dpii:input-group/item[1]/dpii:choice">
       <tdt:value key="@selected">'true'</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/person/dpii:input-group/item[2]/dpii:choice">
       <tdt:value key="@selected">'true'</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/person/dpii:input-group/item[3]/dpii:choice">
       <tdt:value key="@selected">'true'</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/person/dpii:input-group/item[4]/dpii:choice">
       <tdt:value key="@selected">$age >= 18</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/person/dpii:input-group/item[5]/dpii:choice">
       <tdt:value key="@selected">$age >= 18 and $gender = 'M'</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/person/dpii:input-group/item[6]/dpii:choice">
       <tdt:value key="@selected">$age >= 18</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/person/dpii:input-group/item[7]/dpii:choice">
       <tdt:value key="@selected">$age >= 18 and $gender = 'F'</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/person/dpii:input-group/item[8]/dpii:choice">
       <tdt:value key="@selected">$status = 'Golden'</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/person/dpii:input-group/item[9]/dpii:choice">
       <tdt:value key="@selected">$status = 'Golden'</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/person/dpii:input-group/item[10]/dpii:choice">
       <tdt:value key="@selected">$status = 'Golden'</tdt:value>
	 </tdt:rule>
   </tdt:transformation>



:XSLT:

.. code:: xml
   :number-lines:
   :name: xslt UC-018

    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
            <xsl:for-each select="/data/message/person">
                <person age="{@age}" gender="{@gender}" status="{@status}">
                    <dpii:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
                        <item><dpii:choice disabled="false" readonly="false" selected="true">1</dpii:choice><dpii:label>P1 - every time</dpii:label></item>
                        <item><dpii:choice disabled="false" readonly="false" selected="true">2</dpii:choice><dpii:label>P2 - every time</dpii:label></item>
                        <item><dpii:choice disabled="false" readonly="false" selected="true">3</dpii:choice><dpii:label>P3 - every time</dpii:label></item>
                        <item><dpii:choice disabled="false" readonly="false" selected="{@age = 18}">4</dpii:choice><dpii:label>P4 - age >= 18</dpii:label></item>
                        <item><dpii:choice disabled="false" readonly="false" selected="{@age = 18 and @gender = 'M'}">5</dpii:choice><dpii:label>P5 - age >= 18 and male</dpii:label></item>
                        <item><dpii:choice disabled="false" readonly="false" selected="{@age = 18}">6</dpii:choice><dpii:label>P6 - age >= 18 </dpii:label></item>
                        <item><dpii:choice disabled="false" readonly="false" selected="{@age = 18 and @gender = 'F'}">7</dpii:choice><dpii:label>P7 - age >= 18 and female</dpii:label></item>
                        <item><dpii:choice disabled="false" readonly="false" selected="{@status = 'Golden'}">8</dpii:choice><dpii:label>P8 - state = "Golden"</dpii:label></item>
                        <item><dpii:choice disabled="false" readonly="false" selected="{@status = 'Golden'}">9</dpii:choice><dpii:label>P9 - state = "Golden"</dpii:label></item>
                        <item><dpii:choice disabled="false" readonly="false" selected="{@status = 'Golden'}">10</dpii:choice><dpii:label>P10 - state = "Golden"</dpii:label></item>
                    </dpii:input-group>
                </person>
            </xsl:for-each>
        </data>
    </xsl:template>
    </xsl:stylesheet>


**Expected result**

.. code:: xml
   :number-lines:
   :name: instance UC-018

    <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
        <person age="17" gender="M" status="Aluminious">
            <dpii:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
                <item><dpii:choice disabled="false" readonly="false" selected="true">1</dpii:choice><dpii:label>P1 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">2</dpii:choice><dpii:label>P2 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">3</dpii:choice><dpii:label>P3 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">4</dpii:choice><dpii:label>P4 - age >= 18</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">5</dpii:choice><dpii:label>P5 - age >= 18 and male</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">6</dpii:choice><dpii:label>P6 - age >= 18 </dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">7</dpii:choice><dpii:label>P7 - age >= 18 and female</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">8</dpii:choice><dpii:label>P8 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">9</dpii:choice><dpii:label>P9 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">10</dpii:choice><dpii:label>P10 - state = "Golden"</dpii:label></item>
            </dpii:input-group>
        </person>
        <person age="17" gender="M" status="Golden">
            <dpii:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
                <item><dpii:choice disabled="false" readonly="false" selected="true">1</dpii:choice><dpii:label>P1 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">2</dpii:choice><dpii:label>P2 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">3</dpii:choice><dpii:label>P3 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">4</dpii:choice><dpii:label>P4 - age >= 18</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">5</dpii:choice><dpii:label>P5 - age >= 18 and male</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">6</dpii:choice><dpii:label>P6 - age >= 18 </dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">7</dpii:choice><dpii:label>P7 - age >= 18 and female</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">8</dpii:choice><dpii:label>P8 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">9</dpii:choice><dpii:label>P9 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">10</dpii:choice><dpii:label>P10 - state = "Golden"</dpii:label></item>
            </dpii:input-group>
        </person>
        <person age="18" gender="M" status="Aluminious">
            <dpii:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
                <item><dpii:choice disabled="false" readonly="false" selected="true">1</dpii:choice><dpii:label>P1 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">2</dpii:choice><dpii:label>P2 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">3</dpii:choice><dpii:label>P3 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">4</dpii:choice><dpii:label>P4 - age >= 18</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">5</dpii:choice><dpii:label>P5 - age >= 18 and male</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">6</dpii:choice><dpii:label>P6 - age >= 18 </dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">7</dpii:choice><dpii:label>P7 - age >= 18 and female</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">8</dpii:choice><dpii:label>P8 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">9</dpii:choice><dpii:label>P9 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">10</dpii:choice><dpii:label>P10 - state = "Golden"</dpii:label></item>
            </dpii:input-group>
        </person>
        <person age="18" gender="M" status="Golden">
            <dpii:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
                <item><dpii:choice disabled="false" readonly="false" selected="true">1</dpii:choice><dpii:label>P1 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">2</dpii:choice><dpii:label>P2 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">3</dpii:choice><dpii:label>P3 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">4</dpii:choice><dpii:label>P4 - age >= 18</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">5</dpii:choice><dpii:label>P5 - age >= 18 and male</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">6</dpii:choice><dpii:label>P6 - age >= 18 </dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">7</dpii:choice><dpii:label>P7 - age >= 18 and female</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">8</dpii:choice><dpii:label>P8 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">9</dpii:choice><dpii:label>P9 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">10</dpii:choice><dpii:label>P10 - state = "Golden"</dpii:label></item>
            </dpii:input-group>
        </person>
        <person age="17" gender="F" status="Aluminious">
            <dpii:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
                <item><dpii:choice disabled="false" readonly="false" selected="true">1</dpii:choice><dpii:label>P1 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">2</dpii:choice><dpii:label>P2 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">3</dpii:choice><dpii:label>P3 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">4</dpii:choice><dpii:label>P4 - age >= 18</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">5</dpii:choice><dpii:label>P5 - age >= 18 and male</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">6</dpii:choice><dpii:label>P6 - age >= 18 </dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">7</dpii:choice><dpii:label>P7 - age >= 18 and female</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">8</dpii:choice><dpii:label>P8 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">9</dpii:choice><dpii:label>P9 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">10</dpii:choice><dpii:label>P10 - state = "Golden"</dpii:label></item>
            </dpii:input-group>
        </person>
        <person age="17" gender="F" status="Golden">
            <dpii:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
                <item><dpii:choice disabled="false" readonly="false" selected="true">1</dpii:choice><dpii:label>P1 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">2</dpii:choice><dpii:label>P2 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">3</dpii:choice><dpii:label>P3 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">4</dpii:choice><dpii:label>P4 - age >= 18</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">5</dpii:choice><dpii:label>P5 - age >= 18 and male</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">6</dpii:choice><dpii:label>P6 - age >= 18 </dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">7</dpii:choice><dpii:label>P7 - age >= 18 and female</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">8</dpii:choice><dpii:label>P8 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">9</dpii:choice><dpii:label>P9 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">10</dpii:choice><dpii:label>P10 - state = "Golden"</dpii:label></item>
            </dpii:input-group>
        </person>
        <person age="18" gender="F" status="Aluminious">
            <dpii:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
                <item><dpii:choice disabled="false" readonly="false" selected="true">1</dpii:choice><dpii:label>P1 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">2</dpii:choice><dpii:label>P2 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">3</dpii:choice><dpii:label>P3 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">4</dpii:choice><dpii:label>P4 - age >= 18</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">5</dpii:choice><dpii:label>P5 - age >= 18 and male</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">6</dpii:choice><dpii:label>P6 - age >= 18 </dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">7</dpii:choice><dpii:label>P7 - age >= 18 and female</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">8</dpii:choice><dpii:label>P8 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">9</dpii:choice><dpii:label>P9 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">10</dpii:choice><dpii:label>P10 - state = "Golden"</dpii:label></item>
            </dpii:input-group>
        </person>
        <person age="18" gender="F" status="Golden">
            <dpii:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
                <item><dpii:choice disabled="false" readonly="false" selected="true">1</dpii:choice><dpii:label>P1 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">2</dpii:choice><dpii:label>P2 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">3</dpii:choice><dpii:label>P3 - every time</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">4</dpii:choice><dpii:label>P4 - age >= 18</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="false">5</dpii:choice><dpii:label>P5 - age >= 18 and male</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">6</dpii:choice><dpii:label>P6 - age >= 18 </dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">7</dpii:choice><dpii:label>P7 - age >= 18 and female</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">8</dpii:choice><dpii:label>P8 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">9</dpii:choice><dpii:label>P9 - state = "Golden"</dpii:label></item>
                <item><dpii:choice disabled="false" readonly="false" selected="true">10</dpii:choice><dpii:label>P10 - state = "Golden"</dpii:label></item>
            </dpii:input-group>
        </person>
    </data>


