===============
06 - Meta-Rules
===============

:Author: Petr Filipsky

Test case definition
====================
Source data
-----------

.. code:: xml
   :number-lines:
   :name: source pfi01/tutorial/02-advanced/06-metarules

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
   :name: template pfi01/tutorial/02-advanced/06-metarules

   <data>
      <item level="0">
        <p>?</p>
        <item level="1">
          <p>?</p>
          <item level="2">
            <p>?</p>
            <item level="3">
              <p>?</p>
            </item>
          </item>
        </item>
      </item>
    </data>
    




Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation pfi01/tutorial/02-advanced/06-metarules

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="//item">
        <tdt:value key=".">ul/li</tdt:value>
      </tdt:rule>
      <tdt:rule path="//p">
        <tdt:value key="text()">string(text())</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/item">
        <tdt:value key=".">/html/div/*</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/item/item">
        <tdt:value key=".">self::ul/li</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/item/p">
        <tdt:value key="text()">normalize-space(self::p)</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    




Compiled Transformation
-----------------------

.. code:: xml
   :number-lines:
   :name: compiled pfi01/tutorial/02-advanced/06-metarules

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data/item">
        <tdt:value key=".">/html/div/*</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/item/item">
        <tdt:value key=".">self::ul/li</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/item/p">
        <tdt:value key="text()">normalize-space(self::p)</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    




Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance pfi01/tutorial/02-advanced/06-metarules

   <data>
	 <item level="0">
       <p>Create new interactive controls on a page or in a story</p>
	 </item>
	 <item level="0">
       <p>User should be able to create, setup and manipulate interactive objects in StoryTeller.</p>
	 </item>
	 <item level="0">
       <p/>
       <item level="1">
		 <p>Edit box</p>
       </item>
       <item level="1">
		 <p>Check box</p>
       </item>
       <item level="1">
		 <p/>
       </item>
       <item level="1">
		 <p>Multi-selection list box</p>
       </item>
       <item level="1">
		 <p>Multiline text area</p>
       </item>
       <item level="1">
		 <p>Radio control</p>
       </item>
       <item level="1">
		 <p>Button</p>
       </item>
       <item level="1">
		 <p>Date picker, Email, Telephone and some other HTML5 controls (Could)</p>
       </item>
       <item level="1">
		 <p>Edit box with data list (Could)</p>
       </item>
	 </item>
	 <item level="0">
       <p>Acceptance criteria</p>
	 </item>
	 <item level="0">
       <p/>
       <item level="1">
		 <p>All required object types from above list</p>
       </item>
       <item level="1">
		 <p>WYSIWYG - render the interactive objects in StoryTeller similar to how they would look like in output</p>
		 <item level="2">
           <p>Reflect size, borders, colors, fonts, indents, margins, default values</p>
		 </item>
       </item>
       <item level="1">
		 <p>Property grid with smart display of properties from multiple selected objects</p>
       </item>
	 </item>
	 <item level="0">
       <p/>
       <item level="1">
		 <p/>
		 <item level="2">
           <p>It should be possible to edit longer texts for labels - (Check box associated with paragraph(s) of text)</p>
		 </item>
		 <item level="2">
           <p>It should be possible to edit multiline value (Multiline text area)</p>
		 </item>
		 <item level="2">
           <p>It should be user friendly to edit text properties in general - tree node name or small edit box in property grid may not be precisely easy to use</p>
		 </item>
       </item>
	 </item>
	 <item level="0">
       <p/>
       <item level="1">
		 <p/>
		 <item level="2">
           <p>There can be multiple choices for single interactive object</p>
		 </item>
		 <item level="2">
           <p>There needs to be a reasonably simple editor that allows creation of new choices from one panel</p>
		 </item>
		 <item level="2">
           <p>It has to be possible to modify the choice properties, move, delete and duplicate choices in the list</p>
		 </item>
		 <item level="2">
           <p>It has to be possible to edit long and multiline texts for choices</p>
		 </item>
       </item>
	 </item>
	 <item level="0">
       <p/>
       <item level="1">
		 <p/>
		 <item level="2">
           <p>Copy object with all properties that belong to the object - scripts, modifications</p>
		 </item>
		 <item level="2">
           <p>Copy/paste single object</p>
		 </item>
		 <item level="2">
           <p>Copy/paste more selected objects</p>
		 </item>
		 <item level="2">
           <p>Copy/paste of multiple objects embedded in content or ancestor object, such as tables and groups</p>
		 </item>
		 <item level="2">
           <p>Copy in scope of current document</p>
		 </item>
		 <item level="2">
           <p>Copy from one document to another</p>
		 </item>
		 <item level="2">
           <p>Copy from one StoryTeller application to another</p>
		 </item>
		 <item level="2">
           <p>When object is copied, it is obvious for user which properties belong to object and which belong to linked objects</p>
           <item level="3">
			 <p>User expects that when he changes properties of object that he just pasted he does not edit the original object</p>
           </item>
           <item level="3">
			 <p>Clipboard will help the user rather than complicate his work in steps needed to reproduce already defined objects</p>
           </item>
		 </item>
		 <item level="2">
           <p>Partial object copy (Could)</p>
           <item level="3">
			 <p>At some point it may be helping the user to copy just choice list from one existing interactive object to another without overwriting other properties</p>
           </item>
		 </item>
		 <item level="2">
           <p>Cut/Paste, same as move, in current document and same context should work without modification</p>
		 </item>
       </item>
	 </item>
	 <item level="0">
       <p/>
       <item level="1">
		 <p/>
		 <item level="2">
           <p>Select document by URL</p>
		 </item>
		 <item level="2">
           <p>Select object(s) in loaded document structure - pages, child objects, stories, embedded object</p>
		 </item>
		 <item level="2">
           <p>Paste selected object(s) into current document context position</p>
		 </item>
       </item>
	 </item>
	 <item level="0">
       <p/>
       <item level="1">
		 <p/>
		 <item level="2">
           <p>Single UI action modifying the document definition will be reversible with single step of undo and returnable with single step of redo</p>
		 </item>
		 <item level="2">
           <p>No residues will remain after the undo step in document definition</p>
		 </item>
		 <item level="2">
           <p>Multiple undo and redo steps will be available after serie of UI actions</p>
		 </item>
       </item>
	 </item>
	 <item level="0">
       <p/>
       <item level="1">
		 <p>Copy style</p>
		 <item level="2">
           <p>Similar functionality will be provided for new objects as it is available for existing objects</p>
		 </item>
		 <item level="2">
           <p>Colors, border thickness, font, highlight</p>
		 </item>
		 <item level="2">
           <p>Content style vs. object style, see cell behavior</p>
		 </item>
       </item>
	 </item>
	 <item level="0">
       <p/>
       <item level="1">
		 <p/>
		 <item level="2">
           <p>Find objects by different criteria</p>
		 </item>
		 <item level="2">
           <p>Object name, Input name</p>
		 </item>
		 <item level="2">
           <p>Choice values</p>
		 </item>
		 <item level="2">
           <p>Choice texts</p>
		 </item>
		 <item level="2">
           <p>Hints, titles</p>
		 </item>
		 <item level="2">
           <p>All XPath links used in the object properties</p>
		 </item>
		 <item level="2">
           <p>All URLs used in object properties</p>
		 </item>
		 <item level="2">
           <p>Colors, languages, etc. - see Find options</p>
		 </item>
       </item>
	 </item>
   </data>



