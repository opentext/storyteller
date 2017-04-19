=======================
Grouping Document Order
=======================

:Author: Petr Filipsky


Test case definition
====================

Message
-------

.. code:: xml
   :number-lines:
   :name: source Grouping

   <data>
	 <message>
       <r cls="Z" num="10">1</r>
       <r cls="Z" num="5">2</r>
       <r cls="A" num="10">3</r>
       <r cls="D" num="5">4</r>
       <r cls="B" num="10">5</r>
       <r cls="Z" num="5">6</r>
       <r cls="Z" num="5">7</r>
       <r cls="D" num="5">8</r>
       <r cls="A" num="10">9</r>
	 </message>
   </data>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance Grouping

   <data>
	 <message>
       <cls cls="Z" num="10" size="1">
		 <r>1</r>
       </cls>
       <cls cls="Z" num="5" size="3">
		 <r>2</r>
		 <r>6</r>
		 <r>7</r>
       </cls>
       <cls cls="A" num="10" size="2">
		 <r>3</r>
		 <r>9</r>
       </cls>
       <cls cls="D" num="5" size="2">
		 <r>4</r>
		 <r>8</r>
       </cls>
       <cls cls="B" num="10" size="1">
		 <r>5</r>
       </cls>
	 </message>
   </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template Grouping

   <data>
	 <message>
       <cls size="?" cls="?" num="?">
		 <r>?</r>
       </cls>
	 </message>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Grouping

   <tdt:transformation version="1.0" xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt">
	 <tdt:rule path="/data/message">
       <tdt:value key=".">/data/message</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/message/cls">
       <tdt:value key=".">tdt:group( r, '~@cls', '@num' )</tdt:value>
       <tdt:value key="@size">@size</tdt:value>
       <tdt:value key="@cls">tdt:key[@key='~@cls']</tdt:value>
       <tdt:value key="@num">tdt:key[2]</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/message/cls/r">
       <tdt:value key=".">tdt:ungroup()</tdt:value>
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


