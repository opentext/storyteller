==================
Synthesized Groups
==================

:Author: Petr Filipsky

Test case definition
====================

Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance SynthesizedGroups

   <data>
	 <message>
       <customer events="4" name="John Smelter" number="+4202468999" total="3.95">
		 <call cost="3.23" duration="125" number="+4207654321"/>
		 <sms cost="0.15" number="+4201234567" text="Hello!"/>
		 <sms cost="0.12" number="+4207654321" text="Hi!"/>
		 <mms bytes="12432" cost="0.45" number="+4207654321"/>
       </customer>
       <customer events="2" name="Monika Lewinsky" number="+42069696969" total="0.9">
		 <mms bytes="32457" cost="0.75" number="+4201234567"/>
		 <sms cost="0.15" number="+4201234567" text="Cheers!"/>
       </customer>
       <customer events="3" name="Bill Clinton" number="+4201234567" total="2.27">
		 <call cost="1.67" duration="67" number="+4207654321"/>
		 <sms cost="0.15" number="+4201234567" text="Good bye!"/>
		 <mms bytes="12345" cost="0.45" number="+4207654321"/>
       </customer>
	 </message>
   </data>


Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source SynthesizedGroups

   <data>
	 <message>
       <header owner="John Smelter" number="+4202468999"/>
       <call number="+4207654321" cost="3.23" duration="125"/>
       <sms number="+4201234567" cost="0.15" text="Hello!"/>
       <sms number="+4207654321" cost="0.12" text="Hi!"/>
       <mms number="+4207654321" cost="0.45" bytes="12432"/>
       <header owner="Monika Lewinsky" number="+42069696969"/>
       <mms number="+4201234567" cost="0.75" bytes="32457"/>
       <sms number="+4201234567" cost="0.15" text="Cheers!"/>
       <header owner="Bill Clinton" number="+4201234567"/>
       <call number="+4207654321" cost="1.67" duration="67"/>
       <sms number="+4201234567" cost="0.15" text="Good bye!"/>
       <mms number="+4207654321" cost="0.45" bytes="12345"/>
	 </message>
   </data>


Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template SynthesizedGroups

   <data>
	 <message>
       <customer name="?" number="?" events="?" total="?">
		 <call number="?" cost="?" duration="?"/>
		 <sms number="?" cost="?" text="?"/>
		 <mms number="?" cost="?" bytes="?"/>
       </customer>
	 </message>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation SynthesizedGroups

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
     <tdt:rule path="/data/message">
       <tdt:value key=".">/data/message</tdt:value>
       <tdt:value key="$headers">header</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/customer">
       <tdt:value key=".">$headers</tdt:value>
       <tdt:value key="$owner">string(@owner)</tdt:value>
       <tdt:value key="$header">$headers[position()]</tdt:value>
       <tdt:value key="$events">$header/following-sibling::*[preceding-sibling::header[1]/@owner=$owner]</tdt:value>
       <tdt:value key="@name">@owner</tdt:value>
       <tdt:value key="@number">@number</tdt:value>
       <tdt:value key="@total">sum($events/@cost)</tdt:value>
       <tdt:value key="@events">count($events[self::call|self::sms|self::mms])</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/customer/call">
       <tdt:value key="union">$events</tdt:value>
       <tdt:value key=".">self::call</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/customer/sms">
       <tdt:value key="union">$events</tdt:value>
       <tdt:value key=".">self::sms</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/customer/mms">
       <tdt:value key="union">$events</tdt:value>
       <tdt:value key=".">self::mms</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
   </tdt:transformation>


