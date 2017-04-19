======
Issues
======

:Author: Petr Filipsky

Test case definition
====================

Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance Issues

   <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
	 <issues>
       <issue>
		 <dpii:label>Issue 123:</dpii:label>
		 <dpii:input-group disabled="false" multiselect="false" name="123" readonly="false">
           <item>
			 <dpii:label>New</dpii:label>
			 <dpii:choice disabled="false" selected="false">n</dpii:choice>
           </item>
           <item>
			 <dpii:label>Open</dpii:label>
			 <dpii:choice disabled="false" selected="false">o</dpii:choice>
           </item>
           <item>
			 <dpii:label>In Progress</dpii:label>
			 <dpii:choice disabled="false" selected="true">i</dpii:choice>
           </item>
           <item>
			 <dpii:label>Resolved</dpii:label>
			 <dpii:choice disabled="false" selected="false">f</dpii:choice>
           </item>
           <item>
			 <dpii:label>Reopened</dpii:label>
			 <dpii:choice disabled="false" selected="false">r</dpii:choice>
           </item>
           <item>
			 <dpii:label>Closed</dpii:label>
			 <dpii:choice disabled="false" selected="false">c</dpii:choice>
           </item>
		 </dpii:input-group>
       </issue>
       <issue>
		 <dpii:label>Issue 456:</dpii:label>
		 <dpii:input-group disabled="false" multiselect="false" name="456" readonly="false">
           <item>
			 <dpii:label>New</dpii:label>
			 <dpii:choice disabled="false" selected="false">n</dpii:choice>
           </item>
           <item>
			 <dpii:label>Open</dpii:label>
			 <dpii:choice disabled="false" selected="false">o</dpii:choice>
           </item>
           <item>
			 <dpii:label>In Progress</dpii:label>
			 <dpii:choice disabled="false" selected="false">i</dpii:choice>
           </item>
           <item>
			 <dpii:label>Resolved</dpii:label>
			 <dpii:choice disabled="false" selected="false">f</dpii:choice>
           </item>
           <item>
			 <dpii:label>Reopened</dpii:label>
			 <dpii:choice disabled="false" selected="true">r</dpii:choice>
           </item>
           <item>
			 <dpii:label>Closed</dpii:label>
			 <dpii:choice disabled="false" selected="false">c</dpii:choice>
           </item>
		 </dpii:input-group>
       </issue>
       <issue>
		 <dpii:label>Issue 789:</dpii:label>
		 <dpii:input-group disabled="false" multiselect="false" name="789" readonly="false">
           <item>
			 <dpii:label>New</dpii:label>
			 <dpii:choice disabled="false" selected="false">n</dpii:choice>
           </item>
           <item>
			 <dpii:label>Open</dpii:label>
			 <dpii:choice disabled="false" selected="false">o</dpii:choice>
           </item>
           <item>
			 <dpii:label>In Progress</dpii:label>
			 <dpii:choice disabled="false" selected="false">i</dpii:choice>
           </item>
           <item>
			 <dpii:label>Resolved</dpii:label>
			 <dpii:choice disabled="false" selected="true">f</dpii:choice>
           </item>
           <item>
			 <dpii:label>Reopened</dpii:label>
			 <dpii:choice disabled="false" selected="false">r</dpii:choice>
           </item>
           <item>
			 <dpii:label>Closed</dpii:label>
			 <dpii:choice disabled="false" selected="false">c</dpii:choice>
           </item>
		 </dpii:input-group>
       </issue>
	 </issues>
   </data>


Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source Issues

   <data>
	 <message>
	   <issue id="123" status="i"/>
	   <issue id="456" status="r"/>
	   <issue id="789" status="f"/>
	 </message>
   </data>


Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template Issues

   <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
	 <statuses>
       <status value="n">New</status>
       <status value="o">Open</status>
       <status value="i">In Progress</status>
       <status value="f">Resolved</status>
       <status value="r">Reopened</status>
       <status value="c">Closed</status>
	 </statuses>
	 <issues>
	   <issue>
		 <dpii:label>?</dpii:label>
		 <dpii:input-group multiselect="false" name="?" disabled="false" readonly="false">
		   <item>
			 <dpii:label>?</dpii:label>
			 <dpii:choice disabled="false" selected="?">?</dpii:choice>
		   </item>
		 </dpii:input-group>
	   </issue>
	 </issues>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Issues

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/statuses">
       <tdt:value key=".">tdt:nodeset()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/issues/issue">
       <tdt:value key=".">/data/message/issue</tdt:value>
       <tdt:value key="$issue">.</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/issues/issue/dpii:input-group/item">
       <tdt:value key=".">tdt:template()/data/statuses/status</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/issues/issue/dpii:label">
       <tdt:value key="text()">concat( 'Issue ', @id, ':' )</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/issues/issue/dpii:input-group/item/dpii:label">
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/issues/issue/dpii:input-group/item/dpii:choice">
       <tdt:value key="@selected">@value = $issue/@status</tdt:value>
       <tdt:value key="text()">@value</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/issues/issue/dpii:input-group">
       <tdt:value key="@name">@id</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


