===================
Attribute Namespace
===================

:Author: Petr Filipsky

Test case definition
====================

Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source Grouping

   <data>
	 <message>
       <r cls="A">1</r>
       <r cls="A">2</r>
       <r cls="B">3</r>
       <r cls="B">4</r>
       <r cls="B">5</r>
       <r cls="A">6</r>
       <r cls="A">7</r>
       <r cls="B">8</r>
       <r cls="B">9</r>
	 </message>
   </data>


Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance Grouping

   <data xmlns:xml="http://www.w3.org/XML/1998/namespace">
     <item class="A" xml:id="id_1"/>
	 <item class="A" xml:id="id_2"/>
	 <item class="B" xml:id="id_3"/>
	 <item class="B" xml:id="id_4"/>
	 <item class="B" xml:id="id_5"/>
	 <item class="A" xml:id="id_6"/>
	 <item class="A" xml:id="id_7"/>
	 <item class="B" xml:id="id_8"/>
	 <item class="B" xml:id="id_9"/>
   </data>


Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template Grouping

   <data xmlns:xml="http://www.w3.org/XML/1998/namespace">
     <item xml:id="id_" class="?"/>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Grouping

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/item">
       <tdt:value key=".">/data/message/r</tdt:value>
       <tdt:value key="@xml:id">concat('id_',text())</tdt:value>
       <tdt:value key="@class">@cls</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


