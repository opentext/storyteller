====
Maps
====

:Author: Petr Filipsky

Overview
========

This example is relatively simple. 

All the input data is available in `GMap <https://tempoci.opentext.com/#/FILE?action=browse&id=89375855&sortby=1&sortorder=1&browseView=1>`_ 
in David Bares's TempoBox.

The expected result is a form containing 2 *combo boxes*, *text box*, *radio buttons* and a *checkbox*.

Test case definition
====================

Data template
-------------

Data template corresponds to expected form and *iteractive item* "rigid" data structure:

.. code:: xml
   :number-lines:
   :name: template Maps

   <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
	 <locations>
	   <dpii:label>Predefined locations:</dpii:label>
	   <dpii:input-group multiselect="false" name="q" disabled="false" readonly="false">
		 <item>
		   <dpii:label>?</dpii:label>
		   <dpii:choice disabled="false" selected="?">?</dpii:choice>
		 </item>
	   </dpii:input-group>
	 </locations>

	 <location>
	   <dpii:label>Location:</dpii:label>
	   <dpii:input type="text" name="location" disabled="false" readonly="false">?</dpii:input>
	 </location>

	 <map-type>
	   <dpii:label>Map type:</dpii:label>
	   <dpii:input-group multiselect="false" name="t" disabled="false" readonly="false">
		 <item>
		   <dpii:label>?</dpii:label>
		   <dpii:choice disabled="false" selected="?">?</dpii:choice>
		 </item>
	   </dpii:input-group>
	 </map-type>

	 <map-style>
	   <dpii:label>Map style:</dpii:label>
	   <dpii:input-group multiselect="false" name="f" disabled="false" readonly="false">
		 <item>
		   <dpii:label>?</dpii:label>
		   <dpii:choice disabled="false" selected="?">?</dpii:choice>
		 </item>
	   </dpii:input-group>
	 </map-style>

	 <print-mode>
	   <dpii:label>Use print mode</dpii:label>
	   <dpii:input type="boolean" name="pw" disabled="false" readonly="false"/>
	 </print-mode>

	 <submit>
	   <dpii:label>Submit</dpii:label>
	   <dpii:input type="submit" name="submit" disabled="false" readonly="false"/>
	 </submit>

   </data>


Expected result
---------------

The complete resulting data instance looks as follows:

.. code:: xml
   :number-lines:
   :name: instance Maps

   <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
	 <locations>
       <dpii:label>Predefined locations:</dpii:label>
       <dpii:input-group disabled="false" multiselect="false" name="q" readonly="false">
		 <item>
           <dpii:label>Burlington</dpii:label>
           <dpii:choice disabled="false" selected="true">3 Van de Graaff Drive, Burlington, MA 01803-5188</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Copenhagen</dpii:label>
           <dpii:choice disabled="false" selected="false">Langebrogade 5, Copenhagen</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Goteborg</dpii:label>
           <dpii:choice disabled="false" selected="false">Sodra vagen 15, Goteborg</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Grasbrunn</dpii:label>
           <dpii:choice disabled="false" selected="false">Werner-von-Siemens-Ring 20,D-85630 Grasbrunn</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Paris</dpii:label>
           <dpii:choice disabled="false" selected="false">5/7 place de la Defense, Courbevoie</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Prague</dpii:label>
           <dpii:choice disabled="false" selected="false">V Celnici 5, Prague</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Stokholm</dpii:label>
           <dpii:choice disabled="false" selected="false">Karlavagen 108, Stockholm</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Waterloo</dpii:label>
           <dpii:choice disabled="false" selected="false">275 Frank Tompa drive, Waterloo</dpii:choice>
		 </item>
       </dpii:input-group>
	 </locations>
	 <location>
       <dpii:label>Location:</dpii:label>
       <dpii:input disabled="false" name="location" readonly="false" type="text">Burlington</dpii:input>
	 </location>
	 <map-type>
       <dpii:label>Map type:</dpii:label>
       <dpii:input-group disabled="false" multiselect="false" name="t" readonly="false">
		 <item>
           <dpii:label>Normal</dpii:label>
           <dpii:choice disabled="false" selected="true">m</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Satelite</dpii:label>
           <dpii:choice disabled="false" selected="false">k</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Hybrid</dpii:label>
           <dpii:choice disabled="false" selected="false">h</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Terain</dpii:label>
           <dpii:choice disabled="false" selected="false">p</dpii:choice>
		 </item>
       </dpii:input-group>
	 </map-type>
	 <map-style>
       <dpii:label>Map style:</dpii:label>
       <dpii:input-group disabled="false" multiselect="false" name="f" readonly="false">
		 <item>
           <dpii:label>Normal</dpii:label>
           <dpii:choice disabled="false" selected="true">q</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Directions</dpii:label>
           <dpii:choice disabled="false" selected="false">d</dpii:choice>
		 </item>
		 <item>
           <dpii:label>Local</dpii:label>
           <dpii:choice disabled="false" selected="false">l</dpii:choice>
		 </item>
       </dpii:input-group>
	 </map-style>
	 <print-mode>
       <dpii:label>Use print mode</dpii:label>
       <dpii:input disabled="false" name="pw" readonly="false" type="boolean"/>
	 </print-mode>
	 <submit>
       <dpii:label>Submit</dpii:label>
       <dpii:input disabled="false" name="submit" readonly="false" type="submit"/>
	 </submit>
   </data>


Source Data
-----------

*Input Data* already has a suitable structure regarding to the intended presentation
so the transformation is mainly one-to-one mapping. There is no grouping involved.

.. code:: xml
   :number-lines:
   :name: source Maps

   <data>
	 <design>
       <submit>Submit</submit>
       <print value="1">Use print mode</print>
       <types>
		 <type value="m">Normal</type>
		 <type value="k">Satelite</type>
		 <type value="h">Hybrid</type>
		 <type value="p">Terain</type>
       </types>
       <styles>
		 <style value="q">Normal</style>
		 <style value="d">Directions</style>
		 <style value="l">Local</style>
       </styles>
	 </design>

	 <message>
       <form>
		 <location>Langebrogade 5, Copenhagen</location>
		 <type>m</type>
		 <style>q</style>
		 <print/>
       </form>
       <sites>
		 <site>
           <name>Burlington</name>
           <location>3 Van de Graaff Drive, Burlington, MA 01803-5188</location>
		 </site>
		 <site>
           <name>Copenhagen</name>
           <location>Langebrogade 5, Copenhagen</location>
		 </site>
		 <site>
           <name>Goteborg</name>
           <location>Sodra vagen 15, Goteborg</location>
		 </site>
		 <site>
           <name>Grasbrunn</name>
           <location>Werner-von-Siemens-Ring 20,D-85630 Grasbrunn</location>
		 </site>
		 <site>
           <name>Paris</name>
           <location>5/7 place de la Defense, Courbevoie</location>
		 </site>
		 <site>
           <name>Prague</name>
           <location>V Celnici 5, Prague</location>
		 </site>
		 <site>
           <name>Stokholm</name>
           <location>Karlavagen 108, Stockholm</location>
		 </site>
		 <site>
           <name>Waterloo</name>
           <location>275 Frank Tompa drive, Waterloo</location>
		 </site>
       </sites>
	 </message>
   </data>


Transformation
--------------

In this example we create the following transformation:

.. code:: xml
   :number-lines:
   :name: transformation Maps

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data">
       <tdt:value key="$locselection">1</tdt:value>
       <tdt:value key="$styleselection">1</tdt:value>
       <tdt:value key="$typeselection">1</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/map-style/dpii:input-group/item">
       <tdt:value key=".">/data/design/styles/style</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/map-type/dpii:input-group/item">
       <tdt:value key=".">/data/design/types/type</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/locations/dpii:input-group/item">
       <tdt:value key=".">/data/message/sites/site</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/locations/dpii:input-group/item/dpii:label">
       <tdt:value key="text()">name/text()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/locations/dpii:input-group/item/dpii:choice">
       <tdt:value key="@selected">position() = $locselection</tdt:value>
       <tdt:value key="text()">location/text()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/location/dpii:input">
       <tdt:value key="text()">/data/message/sites/site[$locselection]/name/text()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/map-style/dpii:input-group/item/dpii:label">
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/map-style/dpii:input-group/item/dpii:choice">
       <tdt:value key="@selected">position() = $styleselection</tdt:value>
       <tdt:value key="text()">@value</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/map-type/dpii:input-group/item/dpii:label">
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/map-type/dpii:input-group/item/dpii:choice">
       <tdt:value key="@selected">position() = $typeselection</tdt:value>
       <tdt:value key="text()">@value</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


As the *input data* have similar high level structure as expected by the presentation
the *Data Transformation* is relatively straightforward. We just inject special data 
nodes expected by /Interactive Items/ and iterate over individual values provided 
by input message.

