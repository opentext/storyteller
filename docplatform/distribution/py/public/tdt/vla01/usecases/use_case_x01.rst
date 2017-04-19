==============
Extra use case
==============

:Author: Vladimir Lavicka

Description
===========

<TODO>


Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content eUC-002

    <story name="Story 1" fmt_mode="docapi.DO_NOT_FIT_ERROR">
      <style name="Arial" size="10.0"/>
      <p>
        <table dim="5,2" brush_rgb="255,255,255,255" widths="22.5;504.0" pen_rgb="255,255,255,255" 
               thickness="inf" shape_rescale="resourcesapi.RM_FIXED" mode="paragraph" 
               translate="0,-7.62939e-06" size="526.5,0">
          <body>
            <style name="Arial" size="10.0"/>
            <rep xpath="/data/content//*[normalize-space(@text) != '']">
              <style name="Arial" size="9.0"/>
              <row index="1" shape_h_growth="0.0" height="12.0" shape_h_shrink="0.0" shape_rescale="resourcesapi.RM_FREE" shape_v_shrink="0.0">
                <cell brush_rgb="255,255,255,255" pen_rgb="255,255,255,255" thickness="inf" shape_rescale="resourcesapi.RM_FIXED" size="22.5,12">
                  <p>
                  <swi xpath="@level">
                    <case>
                      <p>
                        <interactive datalink="/data/tablerow/dpii:input-group/choices[1]" controltype="checkbox" shape_rescale="resourcesapi.RM_FIXED" size="25,15"
                                     texttype="text" translate="0,58.35">
                            <iistyle name="Arial" size="10.0"/>
                        </interactive>
                      </p>
                    </case>
                    <case key="0">
                      <p/>
                    </case>
                  </swi>
                  </p>
                </cell>
                <cell brush_rgb="255,255,255,255" pen_rgb="255,255,255,255" thickness="inf" shape_rescale="resourcesapi.RM_FIXED" translate="22.5,0" size="504,12">
                  <p>
                    <swi xpath="@level">
                      <case key="0">
                        <p>
                          <subst xpath="normalize-space(./@text)" sample="&lt;empty&gt;" mask="" texttype="0">
                            <modification value="@bold" key="@ISubstitution/CharacterStyle/Bold"/>
                          </subst>
                        </p>
                      </case>
                      <case key="1">
                        <p line_spacing="1.2" left_indent="17.9999980927" list_text="●&#9;" alignment="resourcesapi.AL_LEFT" first_indent="-9.0000038147">
                          <subst xpath="normalize-space(./@text)" sample="&lt;empty&gt;" mask="" texttype="0"/>
                        </p>
                      </case>
                      <case key="2">
                        <p line_spacing="1.2" left_indent="35.9999961853" list_text="○&#9;" alignment="resourcesapi.AL_LEFT" first_indent="-9.0000038147">
                          <subst xpath="normalize-space(./@text)" sample="&lt;empty&gt;" mask="" texttype="0"/>
                        </p>
                      </case>
                      <case key="3">
                        <p line_spacing="1.2" left_indent="53.9999923706" list_text="■&#9;" alignment="resourcesapi.AL_LEFT" first_indent="-9.0000038147">
                          <subst xpath="normalize-space(./@text)" sample="&lt;empty&gt;" mask="" texttype="0"/>
                        </p>
                      </case>
                      <case><p/></case>
                    </swi>
                  </p>
                  <rep xpath="current()[@level = 0 or (count(current()/item) = 0 and count(following-sibling::item) = 0)]"><p/></rep>
                </cell>
              </row>
            </rep>
          </body>
        </table>
      </p>
    </story>
    <page name="Page 1">
      <text storyindex="0" alignment_mode="resourcesapi.AM_VERTICAL" thickness="0.0" shape_rescale="resourcesapi.RM_FIXED" translate="31.5,31.5" size="526.5,769.5"/>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance eUC-002

    <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
        <content>
            <item bold="0" level="0" text="Create new interactive controls on a page or in a story" />
            <item bold="0" level="0" text="User should be able to create, setup and manipulate interactive objects in StoryTeller." />
            <item bold="0" level="0" text="">
                <item bold="0" level="1" text="Edit box" />
                <item bold="0" level="1" text="Check box" />
                <item bold="0" level="1" text="List box" />
            </item>
            <item bold="1" level="0" text="Acceptance criteria" />
            <item bold="0" level="0" text="">
                <item bold="0" level="1" text="All required object types from above list" />
                <item bold="0" level="1" text="WYSIWYG - render the interactive objects in StoryTeller similar to how they would look like in output" />
                <item bold="0" level="1" text="">
                    <item bold="0" level="2" text="Reflect size, borders, colors, fonts, indents, margins, default values" />
                </item>
                <item bold="0" level="1" text="Property grid with smart display of properties from multiple selected objects" />
            </item>
            <item bold="0" level="0" text="">
                <item bold="0" level="1" text="Value editing" />
                <item bold="0" level="1" text="">
                    <item bold="0" level="2" text="It should be possible to edit longer texts for labels - (Check box associated with paragraph(s) of text)" />
                    <item bold="0" level="2" text="It should be user friendly to edit text properties in general - tree node name or small edit box in property grid may not be precisely easy to use" />
                </item>
            </item>
            <item bold="0" level="0" text="">
                <item bold="0" level="1" text="Choice editor" />
                <item bold="0" level="1" text="">
                    <item bold="0" level="2" text="There can be multiple choices for single interactive object" />
                    <item bold="0" level="2" text="There needs to be a reasonably simple editor that allows creation of new choices from one panel" />
                </item>
            </item>
            <item bold="0" level="0" text="">
                <item bold="0" level="1" text="Clipboard" />
                <item bold="0" level="1" text="">
                    <item bold="0" level="2" text="Copy object with all properties that belong to the object - scripts, modifications" />
                    <item bold="0" level="2" text="Copy from one StoryTeller application to another" />
                    <item bold="0" level="2" text="When object is copied, it is obvious for user which properties belong to object and which belong to linked objects" />
                    <item bold="0" level="2" text="">
                        <item bold="0" level="3" text="User expects that when he changes properties of object that he just pasted he does not edit the original object" />
                    </item>
                    <item bold="0" level="2" text="Partial object copy (Could)" />
                    <item bold="0" level="2" text="">
                        <item bold="0" level="3" text="At some point it may be helping the user to copy just choice list from one existing interactive object to another without overwriting other properties" />
                    </item>
                    <item bold="0" level="2" text="Cut/Paste, same as move, in current document and same context should work without modification" />
                </item>
            </item>
            <item bold="0" level="0" text="">
                <item bold="0" level="1" text="Import" />
                <item bold="0" level="1" text="">
                    <item bold="0" level="2" text="Select document by URL" />
                </item>
            </item>
            <item bold="0" level="0" text="">
                <item bold="0" level="1" text="Undo/Redo" />
                <item bold="0" level="1" text="">
                    <item bold="0" level="2" text="Single UI action modifying the document definition will be reversible with single step of undo and returnable with single step of redo" />
                </item>
            </item>
        </content>
        <tablerow>
            <dpii:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
                <choices>
                    <dpii:choice disabled="false" readonly="false" selected="false">0</dpii:choice>
                    <dpii:label />
                </choices>
            </dpii:input-group>
        </tablerow>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source eUC-002

    <data>
      <div class="user-content-block">
        <p>Create new interactive controls on a page or in a story</p>
        <p>User should be able to create, setup and manipulate interactive objects in StoryTeller.</p>
        <ul>
          <li>Edit box</li>
          <li>Check box</li>
          <li>List box</li>
        </ul>
        <p><b>Acceptance criteria</b></p>
        <ul>
          <li>All required object types from above list</li>
          <li>WYSIWYG - render the interactive objects in StoryTeller similar to how they would look like in output</li>
          <ul>
            <li>Reflect size, borders, colors, fonts, indents, margins, default values</li>
          </ul>
          <li>Property grid with smart display of properties from multiple selected objects</li>
        </ul>
        <ul>
          <li>Value editing</li>
          <ul>
            <li>It should be possible to edit longer texts for labels - (Check box associated with paragraph(s) of text)</li>
            <li>It should be user friendly to edit text properties in general - tree node name or small edit box in property grid may not be precisely easy to use</li>
          </ul>
        </ul>
        <ul>
          <li>Choice editor</li>
          <ul>
            <li>There can be multiple choices for single interactive object</li>
            <li>There needs to be a reasonably simple editor that allows creation of new choices from one panel</li>
          </ul>
        </ul>
        <ul>
          <li>Clipboard</li>
          <ul>
            <li>Copy object with all properties that belong to the object - scripts, modifications</li>
            <li>Copy from one StoryTeller application to another</li>
            <li>When object is copied, it is obvious for user which properties belong to object and which belong to linked objects</li>
            <ul>
              <li>User expects that when he changes properties of object that he just pasted he does not edit the original object</li>
            </ul>
            <li>Partial object copy (Could)</li>
            <ul>
              <li>At some point it may be helping the user to copy just choice list from one existing interactive object to another without overwriting other properties</li>
            </ul>
            <li>Cut/Paste, same as move, in current document and same context should work without modification</li>
          </ul>
        </ul>
        <ul>
          <li>Import</li>
          <ul>
            <li>Select document by URL</li>
          </ul>
        </ul>
        <ul>
          <li>Undo/Redo</li>
          <ul>
            <li>Single UI action modifying the document definition will be reversible with single step of undo and returnable with single step of redo</li>
          </ul>
        </ul>
      </div>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template eUC-002

    <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
      <content>
        <item level="0" bold="0" text="?">
          <item level="1" bold="0" text="?">
            <item level="2" bold="0" text="?">
              <item level="3" bold="0" text="?"/>
            </item>
          </item>
        </item>
      </content>
      <tablerow>
        <dpii:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
            <choices>
                <dpii:choice disabled="false" readonly="false" selected="false">0</dpii:choice>
                <dpii:label></dpii:label>
            </choices>
        </dpii:input-group>
      </tablerow>
    </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation eUC-002

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
     <!-- level 0 records -->
         <tdt:rule path="/data/content/item">
       <tdt:value key=".">/data/div/*</tdt:value>
       <tdt:value key="@bold">count(child::b)</tdt:value>
       <tdt:value key="@text">normalize-space(self::p)</tdt:value>
         </tdt:rule>
     <!-- level 1 records -->
         <tdt:rule path="/data/content/item/item">
       <tdt:value key=".">self::ul/*</tdt:value>
       <tdt:value key="@text">normalize-space(text()[1])</tdt:value>
         </tdt:rule>
     <!-- level 2 records -->
         <tdt:rule path="/data/content/item/item/item">
       <tdt:value key=".">self::ul/*</tdt:value>
       <tdt:value key="@text">normalize-space(text()[1])</tdt:value>
         </tdt:rule>
     <!-- level 3 records -->
         <tdt:rule path="/data/content/item/item/item/item">
       <tdt:value key=".">self::ul/*</tdt:value>
       <tdt:value key="@text">normalize-space(text()[1])</tdt:value>
         </tdt:rule>
   </tdt:transformation>

