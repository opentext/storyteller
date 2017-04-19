===========================
01 - Flatten HTML Hierarchy
===========================

:Author: Petr Filipsky

Test case definition
====================
Source data
-----------

.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/01-flatten-html

   <html>
      <div class="user-content-block">
        <p>
          <b>
            <i>Create new interactive controls on a page or in a story</i>
          </b>
        </p>
        <p>
          <b>User should be able to create, setup and manipulate interactive objects in StoryTeller.</b>
        </p>
        <ul>
          <li>Edit box</li>
          <li>Check box</li>
          <li>
            <i>List box</i>
          </li>
          <li>Multi-selection list box</li>
          <li>Multiline text area</li>
          <li>Radio control</li>
          <li>Button</li>
          <li>Date picker, Email, Telephone and some other HTML5 controls (Could)</li>
          <li>Edit box with data list (Could)</li>
        </ul>
        <p>
          <b>Acceptance criteria</b>
        </p>
        <ul>
          <li>All required object types from above list</li>
          <li>WYSIWYG - render the interactive objects in StoryTeller similar to how they would look like in output
    		 
            <ul><li>Reflect size, borders, colors, fonts, indents, margins, default values</li></ul>
          </li>
          <li>Property grid with smart display of properties from multiple selected objects</li>
        </ul>
        <ul>
          <li>
            <i>Value editing</i>
            <ul>
              <li>It should be possible to edit longer texts for labels - (Check box associated with paragraph(s) of text)</li>
              <li>It should be possible to edit multiline value (Multiline text area)</li>
              <li>It should be user friendly to edit text properties in general - tree node name or small edit box in property grid may not be precisely easy to use</li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <b>Choice editor</b>
            <ul>
              <li>There can be multiple choices for single interactive object</li>
              <li>There needs to be a reasonably simple editor that allows creation of new choices from one panel</li>
              <li>It has to be possible to modify the choice properties, move, delete and duplicate choices in the list</li>
              <li>It has to be possible to edit long and multiline texts for choices</li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <b>Clipboard</b>
            <ul>
              <li>Copy object with all properties that belong to the object - scripts, modifications</li>
              <li>Copy/paste single object</li>
              <li>Copy/paste more selected objects</li>
              <li>Copy/paste of multiple objects embedded in content or ancestor object, such as tables and groups</li>
              <li>Copy in scope of current document</li>
              <li>Copy from one document to another</li>
              <li>Copy from one StoryTeller application to another</li>
              <li>When object is copied, it is obvious for user which properties belong to object and which belong to linked objects
    		 
                <ul><li>User expects that when he changes properties of object that he just pasted he does not edit the original object</li><li>Clipboard will help the user rather than complicate his work in steps needed to reproduce already defined objects</li></ul>
              </li>
              <li>Partial object copy (Could)
    		 
                <ul><li>At some point it may be helping the user to copy just choice list from one existing interactive object to another without overwriting other properties</li></ul>
              </li>
              <li>Cut/Paste, same as move, in current document and same context should work without modification</li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <b>Import</b>
            <ul>
              <li>Select document by URL</li>
              <li>Select object(s) in loaded document structure - pages, child objects, stories, embedded object</li>
              <li>Paste selected object(s) into current document context position</li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <i>Undo/Redo</i>
            <ul>
              <li>Single UI action modifying the document definition will be reversible with single step of undo and returnable with single step of redo</li>
              <li>No residues will remain after the undo step in document definition</li>
              <li>Multiple undo and redo steps will be available after serie of UI actions</li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>Copy style
    		 
            <ul><li>Similar functionality will be provided for new objects as it is available for existing objects</li><li>Colors, border thickness, font, highlight</li><li>Content style vs. object style, see cell behavior</li></ul>
          </li>
        </ul>
        <ul>
          <li>
            <b>
              <i>Find functionality</i>
            </b>
            <ul>
              <li>Find objects by different criteria</li>
              <li>Object name, Input name</li>
              <li>Choice values</li>
              <li>Choice texts</li>
              <li>Hints, titles</li>
              <li>All XPath links used in the object properties</li>
              <li>All URLs used in object properties</li>
              <li>Colors, languages, etc. - see Find options</li>
            </ul>
          </li>
        </ul>
      </div>
    </html>
    




Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/01-flatten-html

   <data>
      <label bold="?" italic="?" level="?">?</label>
    </data>
    




Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/01-flatten-html

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data/label">
        <tdt:value key=".">//li|//p</tdt:value>
        <tdt:value key="@level">count(ancestor::ul)</tdt:value>
        <tdt:value key="@bold">count(descendant::b)&gt;0</tdt:value>
        <tdt:value key="@italic">count(descendant::i)&gt;0</tdt:value>
		<tdt:value key="text()">concat( normalize-space(node()), normalize-space(tdt:nodeset( descendant::i, descendant::b ) ) )</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    






Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/01-flatten-html

   <data>
      <label bold="true" italic="true" level="0">Create new interactive controls on a page or in a story</label>
      <label bold="true" italic="false" level="0">User should be able to create, setup and manipulate interactive objects in StoryTeller.</label>
      <label bold="false" italic="false" level="1">Edit box</label>
      <label bold="false" italic="false" level="1">Check box</label>
      <label bold="false" italic="true" level="1">List box</label>
      <label bold="false" italic="false" level="1">Multi-selection list box</label>
      <label bold="false" italic="false" level="1">Multiline text area</label>
      <label bold="false" italic="false" level="1">Radio control</label>
      <label bold="false" italic="false" level="1">Button</label>
      <label bold="false" italic="false" level="1">Date picker, Email, Telephone and some other HTML5 controls (Could)</label>
      <label bold="false" italic="false" level="1">Edit box with data list (Could)</label>
      <label bold="true" italic="false" level="0">Acceptance criteria</label>
      <label bold="false" italic="false" level="1">All required object types from above list</label>
      <label bold="false" italic="false" level="1">WYSIWYG - render the interactive objects in StoryTeller similar to how they would look like in output</label>
      <label bold="false" italic="false" level="2">Reflect size, borders, colors, fonts, indents, margins, default values</label>
      <label bold="false" italic="false" level="1">Property grid with smart display of properties from multiple selected objects</label>
      <label bold="false" italic="true" level="1">Value editing</label>
      <label bold="false" italic="false" level="2">It should be possible to edit longer texts for labels - (Check box associated with paragraph(s) of text)</label>
      <label bold="false" italic="false" level="2">It should be possible to edit multiline value (Multiline text area)</label>
      <label bold="false" italic="false" level="2">It should be user friendly to edit text properties in general - tree node name or small edit box in property grid may not be precisely easy to use</label>
      <label bold="true" italic="false" level="1">Choice editor</label>
      <label bold="false" italic="false" level="2">There can be multiple choices for single interactive object</label>
      <label bold="false" italic="false" level="2">There needs to be a reasonably simple editor that allows creation of new choices from one panel</label>
      <label bold="false" italic="false" level="2">It has to be possible to modify the choice properties, move, delete and duplicate choices in the list</label>
      <label bold="false" italic="false" level="2">It has to be possible to edit long and multiline texts for choices</label>
      <label bold="true" italic="false" level="1">Clipboard</label>
      <label bold="false" italic="false" level="2">Copy object with all properties that belong to the object - scripts, modifications</label>
      <label bold="false" italic="false" level="2">Copy/paste single object</label>
      <label bold="false" italic="false" level="2">Copy/paste more selected objects</label>
      <label bold="false" italic="false" level="2">Copy/paste of multiple objects embedded in content or ancestor object, such as tables and groups</label>
      <label bold="false" italic="false" level="2">Copy in scope of current document</label>
      <label bold="false" italic="false" level="2">Copy from one document to another</label>
      <label bold="false" italic="false" level="2">Copy from one StoryTeller application to another</label>
      <label bold="false" italic="false" level="2">When object is copied, it is obvious for user which properties belong to object and which belong to linked objects</label>
      <label bold="false" italic="false" level="3">User expects that when he changes properties of object that he just pasted he does not edit the original object</label>
      <label bold="false" italic="false" level="3">Clipboard will help the user rather than complicate his work in steps needed to reproduce already defined objects</label>
      <label bold="false" italic="false" level="2">Partial object copy (Could)</label>
      <label bold="false" italic="false" level="3">At some point it may be helping the user to copy just choice list from one existing interactive object to another without overwriting other properties</label>
      <label bold="false" italic="false" level="2">Cut/Paste, same as move, in current document and same context should work without modification</label>
      <label bold="true" italic="false" level="1">Import</label>
      <label bold="false" italic="false" level="2">Select document by URL</label>
      <label bold="false" italic="false" level="2">Select object(s) in loaded document structure - pages, child objects, stories, embedded object</label>
      <label bold="false" italic="false" level="2">Paste selected object(s) into current document context position</label>
      <label bold="false" italic="true" level="1">Undo/Redo</label>
      <label bold="false" italic="false" level="2">Single UI action modifying the document definition will be reversible with single step of undo and returnable with single step of redo</label>
      <label bold="false" italic="false" level="2">No residues will remain after the undo step in document definition</label>
      <label bold="false" italic="false" level="2">Multiple undo and redo steps will be available after serie of UI actions</label>
      <label bold="false" italic="false" level="1">Copy style</label>
      <label bold="false" italic="false" level="2">Similar functionality will be provided for new objects as it is available for existing objects</label>
      <label bold="false" italic="false" level="2">Colors, border thickness, font, highlight</label>
      <label bold="false" italic="false" level="2">Content style vs. object style, see cell behavior</label>
      <label bold="true" italic="true" level="1">Find functionality</label>
      <label bold="false" italic="false" level="2">Find objects by different criteria</label>
      <label bold="false" italic="false" level="2">Object name, Input name</label>
      <label bold="false" italic="false" level="2">Choice values</label>
      <label bold="false" italic="false" level="2">Choice texts</label>
      <label bold="false" italic="false" level="2">Hints, titles</label>
      <label bold="false" italic="false" level="2">All XPath links used in the object properties</label>
      <label bold="false" italic="false" level="2">All URLs used in object properties</label>
      <label bold="false" italic="false" level="2">Colors, languages, etc. - see Find options</label>
    </data>
    




