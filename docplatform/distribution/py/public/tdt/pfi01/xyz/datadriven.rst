Data Driven
===========

:Author: Petr Filipsky

Overview
========

This example demonstrates the situation when message data contain elements
coming in an *arbitrary order* and user wants to preserve that order for presentation.

Let's say we have an input message containing ``footer`` element followed by arbitrarily 
ordered ``call``, ``sms`` and ``mms`` elements.

One possible solution to this problem is to create a *common element* - we can call 
it ``event`` for example - for any *data driven* input element. Such element represents 
a generic *event* and each its *instance* contains a single one of the *data driven* 
elements as its sub-element.

This ``event`` can also contain all *common attributes* like ``@number`` or ``@cost``. 

.. note:: If this solution does not fit the user's needs then and alternative would be to use 
          the ``union`` functionality described in `the union example <../union/index.html>`_.

Test case definition
====================

Source Data
-----------

We have the following data we need to process.

Note that the ``call``, ``sms`` and ``mms`` elements come in an arbitrary order.
And we want to preserve the order for presentation. 

.. code:: xml
   :number-lines:
   :name: source DataDriven

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

In the resulting data we introduce a new generic ``event`` element and move all
common attributes to it - in this case the common attributes are ``@number`` 
and ``@cost``.

.. code:: xml
   :number-lines:
   :name: instance DataDriven

   <data>
     <message>
       <header number="+4202468999" owner="John Smelter"/>
       <event cost="3.23" number="+4207654321">
         <call duration="125"/>
       </event>
       <event cost="0.15" number="+4201234567">
         <sms text="Hello!"/>
       </event>
       <event cost="0.12" number="+4207654321">
         <sms text="Hi!"/>
       </event>
       <event cost="0.45" number="+4207654321">
         <mms bytes="12432"/>
       </event>
       <event cost="0.75" number="+4201234567">
         <mms bytes="32457"/>
       </event>
       <event cost="0.15" number="+4201234567">
         <sms text="Cheers!"/>
       </event>
       <event cost="1.67" number="+4207654321">
         <call duration="67"/>
       </event>
       <event cost="0.15" number="+4201234567">
         <sms text="Good bye!"/>
       </event>
       <event cost="0.45" number="+4207654321">
         <mms bytes="12345"/>
       </event>
       <footer events="9" total="7.120000000000001"/>
     </message>
   </data>


Data template
-------------

The *Data template* introduces a generic ``event`` element with all common attributes
(``@number`` and ``@cost`` in this example).

There is also a new ``footer`` element which is synhesized and will contain summary data 
like *number of events* (``@events`` attribute) and a *sum of all costs* (``@total`` attribute).

.. code:: xml
   :number-lines:
   :name: template DataDriven

   <data>
     <message>
       <header owner="?" number="?"/>
       <event number="?" cost="?">
         <call duration="?"/>
         <sms text="?"/>
         <mms bytes="?"/>
       </event>
       <footer events="?" total="?"/>
     </message>
   </data>


Transformation
--------------

In order to switch to the *data driven processing* ve utilize the synthesized ``event`` element.

In the *Data transformation* we do the following:

* First we evaluate the ``header`` (in classic *design driven* mode)
* Then we evaluate the ``event`` element to emulate a *data driven mode* 
  (we retrieve all the ``call``, ``sms`` and ``mms`` elements)

  * We fill the *common attributes* - ``@number`` and ``@cost``
  * Then we pick a single corresponding sub-element (``call``, ``sms`` or ``mms``) with its attributes
 
* Finally we synthesize the ``footer`` element (again in *design driven* mode)

.. code:: xml
   :number-lines:
   :name: transformation DataDriven

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
     <tdt:rule path="/data/message">
       <tdt:value key=".">/data/message</tdt:value>
       <tdt:value key="$events">*[self::call|self::sms|self::mms]</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/header">
       <tdt:value key=".">header</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/event">
       <tdt:value key=".">$events</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/event/call">
       <tdt:value key=".">self::call</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/event/sms">
       <tdt:value key=".">self::sms</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/event/mms">
       <tdt:value key=".">self::mms</tdt:value>
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/footer">
       <tdt:value key="@total">sum($events/@cost)</tdt:value>
       <tdt:value key="@events">count($events)</tdt:value>
     </tdt:rule>
   </tdt:transformation>

