==============
tdt:document()
==============

:Author: Petr Filipsky

Overview
========

This example demonstrates the ``tdt:document()`` function.

:Signature:

   ``<document> tdt:document( <string> )``

This function provides an access to an external XML source document.
User can access any external XML specified by first parameter representing a xml document *URL*. 

Currently ``file:``, ``ftp:`` and ``http:`` URL schemas are supported 
The supported schemas depend on actual repository configuration,
so user can utilize all the goodies provided by *StoryTeller Repository Framework* 
(like *Mount points* and *Proprietary URL schemas* like ``wd:`` or ``otmm:``).


Test case definition
====================


Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source tdt-document

   <data/>



Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template tdt-document

   <xkcd>
	 <item>
       <title>?</title>
       <link>?</link>
	 </item>    
   </xkcd>



Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation tdt-document

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/xkcd/item">
        <tdt:value key=".">tdt:document('http://xkcd.com/rss.xml')/rss/channel/item</tdt:value>
        <tdt:value key="recurse">.</tdt:value>
      </tdt:rule>
    </tdt:transformation>





Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance tdt-document

   <xkcd>
      <item>
        <title>Efficiency</title>
        <link>http://xkcd.com/1445/</link>
      </item>
      <item>
        <title>Cloud</title>
        <link>http://xkcd.com/1444/</link>
      </item>
      <item>
        <title>Language Nerd</title>
        <link>http://xkcd.com/1443/</link>
      </item>
      <item>
        <title>Chemistry</title>
        <link>http://xkcd.com/1442/</link>
      </item>
    </xkcd>


