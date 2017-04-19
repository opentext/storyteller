====
XKCD
====

:Author: Petr Filipsky

Test case definition
====================


Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-001

   <xkcd>
	 <item>
       <id>1423</id>
       <title>Conversation</title>
       <description>Later, at home: 'Dear diary: Still can't figure out what to write here ...'</description>
       <image>http://imgs.xkcd.com/comics/conversation.png</image>
       <link>http://xkcd.com/1423/</link>
       <date>19 Sep 2014</date>
	 </item>
	 <item>
       <id>1422</id>
       <title>My Phone is Dying</title>
       <description>When it explodes, it will cast off its outer layers, leaving behind nothing but a slowly fading PalmPilot, calculator, or two-way pager.</description>
       <image>http://imgs.xkcd.com/comics/my_phone_is_dying.png</image>
       <link>http://xkcd.com/1422/</link>
       <date>17 Sep 2014</date>
	 </item>
	 <item>
       <id>1421</id>
       <title>Future Self</title>
       <description>Maybe I haven't been to Iceland because I'm busy dealing with YOUR crummy code.</description>
       <image>http://imgs.xkcd.com/comics/future_self.png</image>
       <link>http://xkcd.com/1421/</link>
       <date>15 Sep 2014</date>
	 </item>
	 <item>
       <id>1420</id>
       <title>Watches</title>
       <description>Old people used to write obnoxious thinkpieces about how people these days always wear watches and are slaves to the clock, but now they've switched to writing thinkpieces about how kids these days don't appreciate the benefits of an old-fashioned watch. My position is: The word 'thinkpiece' sounds like a word made up by someone who didn't know about the word 'brain'.</description>
       <image>http://imgs.xkcd.com/comics/watches.png</image>
       <link>http://xkcd.com/1420/</link>
       <date>12 Sep 2014</date>
	 </item>
   </xkcd>



Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source UC-001

   <data/>


Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-001

   <xkcd>
	 <item>
       <id>?</id>
       <title>?</title>
       <description>?</description>
       <image>?</image>
       <link>?</link>
       <date>?</date>
	 </item>    
   </xkcd>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation UC-001

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
     <tdt:rule path="/xkcd/item">
       <tdt:value key=".">tdt:document('http://xkcd.com/rss.xml')/rss/channel/item</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/xkcd/item/id">
       <tdt:value key=".">guid</tdt:value>
       <tdt:value key="text()">tdt:split( text(), '/')[4]</tdt:value>
     </tdt:rule>
     <tdt:rule path="/xkcd/item/date">
       <tdt:value key=".">pubDate</tdt:value>
       <tdt:value key="text()">substring( ., 6, string-length( . )-20 )</tdt:value>
     </tdt:rule>
     <tdt:rule path="/xkcd/item/image">
       <tdt:value key=".">description</tdt:value>
       <tdt:value key="text()">substring-before( substring-after( text(), 'src="' ), '" title="')</tdt:value>
     </tdt:rule>
     <tdt:rule path="/xkcd/item/description">
       <tdt:value key=".">description</tdt:value>
       <tdt:value key="text()">substring-before( substring-after( text(), 'title="' ), '" alt="')</tdt:value>
     </tdt:rule>
   </tdt:transformation>




Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-001

    <page>
        <text pos='100,100' brush='1' size='200,179'>
            <!--<subst xpath="/data/input/@value"/>-->
        </text>
    </page>


