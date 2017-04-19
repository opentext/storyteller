=========
Questions
=========

:Author: Petr Filipsky

Overview
========

This example should a simple poll questionaire.

In this case all the questions/answers are known in *design time* and so we can encode them in *Data Template*.


.. note:: An alternative would be that *questions* and/or *answers* are dynamic and come in message data.
		  Just few changes in *Data Transformation* would be necessary in such case.
		  The important fact is, that resulting *Data Instance* and whole *Presentation* would stay same
		  thanks to separatation of the *Data Transformation* from the rest of the formatting process.


Message data contain questions/answers:

Test case definition
====================

Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance Questions

   <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
	 <questions>
       <question id="q1">How are you satisfied with user interface?</question>
       <question id="q2">How are you satisfied with data binding?</question>
       <question id="q3">How are you satisfied with application of business rules?</question>
       <question id="q4">How do you evaluate the product in general?</question>
	 </questions>
	 <answers>
       <answer value="1">Not at all acceptable</answer>
       <answer value="2">Slightly acceptable</answer>
       <answer value="3">Moderately acceptable</answer>
       <answer value="4">Very acceptable</answer>
       <answer value="5">Completely acceptable</answer>
	 </answers>
	 <poll>
       <question>
		 <dpii:label>How are you satisfied with user interface?</dpii:label>
		 <dpii:input-group disabled="false" multiselect="false" name="q1" readonly="false">
           <item>
			 <dpii:label>Not at all acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">1</dpii:choice>
           </item>
           <item>
			 <dpii:label>Slightly acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">2</dpii:choice>
           </item>
           <item>
			 <dpii:label>Moderately acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">3</dpii:choice>
           </item>
           <item>
			 <dpii:label>Very acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">4</dpii:choice>
           </item>
           <item>
			 <dpii:label>Completely acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">5</dpii:choice>
           </item>
		 </dpii:input-group>
       </question>
       <question>
		 <dpii:label>How are you satisfied with data binding?</dpii:label>
		 <dpii:input-group disabled="false" multiselect="false" name="q2" readonly="false">
           <item>
			 <dpii:label>Not at all acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">1</dpii:choice>
           </item>
           <item>
			 <dpii:label>Slightly acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">2</dpii:choice>
           </item>
           <item>
			 <dpii:label>Moderately acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">3</dpii:choice>
           </item>
           <item>
			 <dpii:label>Very acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">4</dpii:choice>
           </item>
           <item>
			 <dpii:label>Completely acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">5</dpii:choice>
           </item>
		 </dpii:input-group>
       </question>
       <question>
		 <dpii:label>How are you satisfied with application of business rules?</dpii:label>
		 <dpii:input-group disabled="false" multiselect="false" name="q3" readonly="false">
           <item>
			 <dpii:label>Not at all acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">1</dpii:choice>
           </item>
           <item>
			 <dpii:label>Slightly acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">2</dpii:choice>
           </item>
           <item>
			 <dpii:label>Moderately acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">3</dpii:choice>
           </item>
           <item>
			 <dpii:label>Very acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">4</dpii:choice>
           </item>
           <item>
			 <dpii:label>Completely acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">5</dpii:choice>
           </item>
		 </dpii:input-group>
       </question>
       <question>
		 <dpii:label>How do you evaluate the product in general?</dpii:label>
		 <dpii:input-group disabled="false" multiselect="false" name="q4" readonly="false">
           <item>
			 <dpii:label>Not at all acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">1</dpii:choice>
           </item>
           <item>
			 <dpii:label>Slightly acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">2</dpii:choice>
           </item>
           <item>
			 <dpii:label>Moderately acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">3</dpii:choice>
           </item>
           <item>
			 <dpii:label>Very acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">4</dpii:choice>
           </item>
           <item>
			 <dpii:label>Completely acceptable</dpii:label>
			 <dpii:choice disabled="false" selected="false">5</dpii:choice>
           </item>
		 </dpii:input-group>
       </question>
	 </poll>
   </data>


Source Data
-----------

As all the information is available in *design time* and so present in *Data Template* 
the *Data Message* can remain empty:

.. code:: xml
   :number-lines:
   :name: source Questions

    <data>
        <message>
        </message>
    </data>


Data template
-------------

So the *Data Template* contains filled-in *questions* and *answers*:

.. code:: xml
   :number-lines:
   :name: template Questions

   <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
	 <questions>
	   <question id="q1">How are you satisfied with user interface?</question>
	   <question id="q2">How are you satisfied with data binding?</question>
	   <question id="q3">How are you satisfied with application of business rules?</question>
	   <question id="q4">How do you evaluate the product in general?</question>
	 </questions>
	 <answers>
	   <answer value="1">Not at all acceptable</answer>
	   <answer value="2">Slightly acceptable</answer>
	   <answer value="3">Moderately acceptable</answer>
	   <answer value="4">Very acceptable</answer>
	   <answer value="5">Completely acceptable</answer>
	 </answers>
	 <poll>
	   <question>
		 <dpii:label>?</dpii:label>
		 <dpii:input-group multiselect="false" name="?" disabled="false" readonly="false">
		   <item>
			 <dpii:label>?</dpii:label>
			 <dpii:choice disabled="false" selected="false">?</dpii:choice>
		   </item>
		 </dpii:input-group>
	   </question>
	 </poll>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Questions

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/poll/question">
       <tdt:value key=".">tdt:template()/data/questions/question</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/poll/question/dpii:input-group/item">
       <tdt:value key=".">tdt:template()/data/answers/answer</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/poll/question/dpii:label">
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/poll/question/dpii:input-group/item/dpii:label">
       <tdt:value key="text()">text()</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/poll/question/dpii:input-group/item/dpii:choice">
       <tdt:value key="text()">@value</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/poll/question/dpii:input-group">
       <tdt:value key="@name">@id</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


