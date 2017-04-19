=====
Union
=====

:Author: Petr Filipsky

Overview
========

This test case demonstrates the ``union`` functionality.

In the `data driven use case <../datadriven/index.html>`_ we have seen the situation
when user wanted to respect the order of input elements in order to be able to implement 
some *data driven* functionality on top of it.

But what if he wants to preserve the order but preserve also the exact structure of elements
at the same time? 

In our ``call`` | ``sms`` | ``mms`` example it means that user does not want to create 
an extra ``event`` element  for each *event* and wants just copy the data driven element as they are.
  
Is the transformation able to handle that?

Test case definition
====================

Source Data
-----------

So let's say we have the exact same data as in `the previous use case <../datadriven/index.html>`_:

.. code:: xml
   :number-lines:
   :name: source Union

   <data>
	 <message>
       <header owner="John Smelter" number="+4202468999"/>
       <call number="+4207654321" cost="3.23" duration="125"/>
       <sms number="+4201234567" cost="0.15" text="Hello!"/>
       <sms number="+4207654321" cost="0.12" text="Hi!"/>
       <mms number="+4207654321" cost="0.45" bytes="12432"/>
       <mms number="+4201234567" cost="0.75" bytes="32457"/>
       <sms number="+4201234567" cost="0.15" text="Cheers!"/>
       <call number="+4207654321" cost="1.67" duration="67"/>
       <sms number="+4201234567" cost="0.15" text="Good bye!"/>
       <mms number="+4207654321" cost="0.45" bytes="12345"/>
	 </message>
   </data>


Expected result
---------------

And we just want to preserve the exact same data (same structure, same order):

.. code:: xml
   :number-lines:
   :name: instance Union

   <data>
	 <message>
       <header number="+4202468999" owner="John Smelter"/>
       <call cost="3.23" duration="125" number="+4207654321"/>
       <sms cost="0.15" number="+4201234567" text="Hello!"/>
       <sms cost="0.12" number="+4207654321" text="Hi!"/>
       <mms bytes="12432" cost="0.45" number="+4207654321"/>
       <mms bytes="32457" cost="0.75" number="+4201234567"/>
       <sms cost="0.15" number="+4201234567" text="Cheers!"/>
       <call cost="1.67" duration="67" number="+4207654321"/>
       <sms cost="0.15" number="+4201234567" text="Good bye!"/>
       <mms bytes="12345" cost="0.45" number="+4207654321"/>
       <footer events="9" total="7.120000000000001"/>
	 </message>
   </data>



Data template
-------------

We create just the ordinary *Data template* as if we know the order (``header`` first, 
then ``call``, ``sms`` and ``mms``, finished by ``footer``).

The important part is that all the *data ordered* elements must be defined together.
User must keep in mind that the order of the *grouped* elements (``call``, ``sms``, ``mms``) 
is arbitrary, while the order of the *group* itself in respect to other elements 
(``header``, ``footer``) is important.  

There is also a new ``footer`` element which is synhesized and will contain summary data 
like *number of events* (``@events`` attribute) and a *sum of all costs* (``@total`` attribute).

.. code:: xml
   :number-lines:
   :name: template Union

   <data>
	 <message>
       <header owner="?" number="?"/>
       <call number="?" cost="?" duration="?"/>
       <sms number="?" cost="?" text="?"/>
       <mms number="?" cost="?" bytes="?"/>
       <footer events="?" total="?"/>
	 </message>
   </data>


All the *data order magic* is done in *Data transformation*...


Transformation
--------------

In order to switch locally from *design driven* processing to *data driven* we can use 
a special keyword - ``union``

In the *Data transformation* we do the following:

* First we retrieve all the ``call``, ``sms`` and ``mms`` elements in data order and store them to a *variable* called ``$events``
* Then we evaluate the ``header`` (in classic *design driven* mode)
* Then we evaluate the *union* in *data driven mode* 

  * The ``call``, ``sms`` and ``mms`` all share the same ``union`` value and so form a single group
 
* Finally we synthesize the ``footer`` element (again in *design driven* mode)


.. code:: xml
   :number-lines:
   :name: transformation Union

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/message">
       <tdt:value key=".">/data/message</tdt:value>
       <tdt:value key="$events">*[self::call|self::sms|self::mms]</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/message/header">
       <tdt:value key=".">header</tdt:value>
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
       <tdt:value key="@total">sum($events/@cost)</tdt:value>
       <tdt:value key="@events">count($events)</tdt:value>
	 </tdt:rule>
   </tdt:transformation>

