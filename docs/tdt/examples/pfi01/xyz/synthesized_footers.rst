===================
Synthesized Footers
===================

:Author: Petr Filipsky

Test case definition
====================

Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance SynthesizedFooters

   <data>
     <message>
       <header number="+4202468999" owner="John Smelter"/>
       <call cost="3.23" duration="125" number="+4207654321"/>
       <sms cost="0.15" number="+4201234567" text="Hello!"/>
       <sms cost="0.12" number="+4207654321" text="Hi!"/>
       <mms bytes="12432" cost="0.45" number="+4207654321"/>
       <footer events="4" total="3.95"/>
       <header number="+42069696969" owner="Monika Lewinsky"/>
       <mms bytes="32457" cost="0.75" number="+4201234567"/>
       <sms cost="0.15" number="+4201234567" text="Cheers!"/>
       <footer events="2" total="0.9"/>
       <header number="+4201234567" owner="Bill Clinton"/>
       <call cost="1.97" duration="67" number="+4207654321"/>
       <sms cost="0.15" number="+4201234567" text="Good bye!"/>
       <mms bytes="12345" cost="0.45" number="+4207654321"/>
       <footer events="3" total="2.57"/>
     </message>
   </data>


Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source SynthesizedFooters

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
       <call number="+4207654321" cost="1.97" duration="67"/>
       <sms number="+4201234567" cost="0.15" text="Good bye!"/>
       <mms number="+4207654321" cost="0.45" bytes="12345"/>
     </message>
   </data>


Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template SynthesizedFooters

   <data>
     <message>
       <call number="?" cost="?" duration="?"/>
       <sms number="?" cost="?" text="?"/>
       <mms number="?" cost="?" bytes="?"/>
       <footer events="?" total="?"/>
       <header owner="?" number="?"/>
     </message>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation SynthesizedFooters

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
     <tdt:rule path="/data/message">
       <tdt:value key=".">/data/message</tdt:value>
       <tdt:value key="$events">*</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/header">
       <tdt:value key="union">$events</tdt:value>
       <tdt:value key=".">self::header</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/call">
       <tdt:value key="union">$events</tdt:value>
       <tdt:value key=".">self::call</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/sms">
       <tdt:value key="union">$events</tdt:value>
       <tdt:value key=".">self::sms</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/mms">
       <tdt:value key="union">$events</tdt:value>
       <tdt:value key=".">self::mms</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/footer">
       <tdt:value key="union">$events</tdt:value>
       <tdt:value key=".">self::node()[count(following-sibling::*)=0 or self::header and count(preceding-sibling::*)!=0]</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
       <tdt:value key="$prev">preceding-sibling::header[1]/preceding-sibling::*</tdt:value>
       <tdt:value key="$curr">.|preceding-sibling::*</tdt:value>
       <tdt:value key="@total">sum($curr/@cost) - sum($prev/@cost)</tdt:value>
       <tdt:value key="@events">count($curr/@cost) - count($prev/@cost)</tdt:value>
     </tdt:rule>
   </tdt:transformation>

