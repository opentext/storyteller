========
Tokenize
========

:Author: Petr Filipsky

Test case definition
====================

Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance Tokenize

   <data>
     <record key="INVOICE_ITEM">
       <subrecord>
         <value name="ITEM_GROSS_AMOUNT_DES">9.02BRL</value>
         <value name="ITEM_NUMBER">2.0</value>
         <value name="ITEM_NET_AMOUNT_DES">7.216BRL</value>
         <value name="ITEM_DISPUTE_GROSS_DES">5.0BRL</value>
         <value name="REF_DATE_INV_ITEM">2014-04-04 00:00:00.0</value>
         <value name="ITEM_REFERENCE_CODE">0000000023</value>
         <value name="REFERENCE_CODE">0000000023</value>
         <value name="ITEM_CREDIT_AMOUNT">5.0</value>
         <value name="ITEM_CURRENCY">BRL</value>
         <value name="ITEM_SERVICE_DES">VIVO TV - Pacote FLEX HD</value>
         <value name="ITEM_CREDIT_RATE">55.43</value>
         <value name="ITEM_SERVICE">55.0</value>
         <value name="ITEM_AMOUNT">9.020000457763672</value>
         <value name="COMPLAINT_AMOUNT">27.950000762939453</value>
         <value name="ITEM_DESCRIPTION">0.0.3.29.1.24</value>
         <value name="ENTRY_DATE_INV_ITEM">2014-04-01 00:00:00.0</value>
       </subrecord>
       <subrecord>
         <value name="ITEM_NUMBER">0.0</value>
         <value name="ITEM_GROSS_AMOUNT_DES">15.46BRL</value>
         <value name="ITEM_NET_AMOUNT_DES">12.368BRL</value>
         <value name="ITEM_DISPUTE_GROSS_DES">0.02BRL</value>
         <value name="REF_DATE_INV_ITEM">2014-03-18 00:00:00.0</value>
         <value name="ITEM_REFERENCE_CODE">0000000019</value>
         <value name="ITEM_CURRENCY">BRL</value>
         <value name="ITEM_CREDIT_AMOUNT">0.019999999552965164</value>
         <value name="REFERENCE_CODE">0000000019</value>
         <value name="ITEM_SERVICE">1.0</value>
         <value name="ITEM_CREDIT_RATE">0.13</value>
         <value name="ITEM_SERVICE_DES">VIVO Telefone Movel</value>
         <value name="ITEM_AMOUNT">15.460000038146973</value>
         <value name="ITEM_DESCRIPTION">0.0.3.29.1.12</value>
         <value name="COMPLAINT_AMOUNT">15.460000038146973</value>
         <value name="ENTRY_DATE_INV_ITEM">2014-05-16 00:00:00.0</value>
       </subrecord>
     </record>
   </data>


Data Source
-----------

.. code:: xml
   :number-lines:
   :name: source Tokenize

   <data>
     <message>
       <attribute key="INVOICE_ITEM" value="{ITEM_GROSS_AMOUNT_DES=9.02BRL, ITEM_NUMBER=2.0, ITEM_NET_AMOUNT_DES=7.216BRL, ITEM_DISPUTE_GROSS_DES=5.0BRL, REF_DATE_INV_ITEM=2014-04-04 00:00:00.0, ITEM_REFERENCE_CODE=0000000023, REFERENCE_CODE=0000000023, ITEM_CREDIT_AMOUNT=5.0, ITEM_CURRENCY=BRL, ITEM_SERVICE_DES=VIVO TV - Pacote FLEX HD, ITEM_CREDIT_RATE=55.43, ITEM_SERVICE=55.0, ITEM_AMOUNT=9.020000457763672, COMPLAINT_AMOUNT=27.950000762939453, ITEM_DESCRIPTION=0.0.3.29.1.24, ENTRY_DATE_INV_ITEM=2014-04-01 00:00:00.0} {ITEM_NUMBER=0.0, ITEM_GROSS_AMOUNT_DES=15.46BRL, ITEM_NET_AMOUNT_DES=12.368BRL, ITEM_DISPUTE_GROSS_DES=0.02BRL, REF_DATE_INV_ITEM=2014-03-18 00:00:00.0, ITEM_REFERENCE_CODE=0000000019, ITEM_CURRENCY=BRL, ITEM_CREDIT_AMOUNT=0.019999999552965164, REFERENCE_CODE=0000000019, ITEM_SERVICE=1.0, ITEM_CREDIT_RATE=0.13, ITEM_SERVICE_DES=VIVO Telefone Movel, ITEM_AMOUNT=15.460000038146973, ITEM_DESCRIPTION=0.0.3.29.1.12, COMPLAINT_AMOUNT=15.460000038146973, ENTRY_DATE_INV_ITEM=2014-05-16 00:00:00.0}"/>
     </message>
   </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template Tokenize

   <data>
     <record key="?">
       <subrecord>
         <value name="?">?</value>
       </subrecord>
     </record>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Tokenize

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
     <tdt:rule path="/data/record">
       <tdt:value key=".">/data/message/attribute</tdt:value>
       <tdt:value key="@key">@key</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/record/subrecord">
       <tdt:value key=".">tdt:split(@value, '} {')</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/record/subrecord/value">
       <tdt:value key=".">tdt:split(., ', ')</tdt:value>
       <tdt:value key="@name">translate(substring-before(., '='), '{','')</tdt:value>
       <tdt:value key="text()">translate(substring-after(., '='), '}','')</tdt:value>
     </tdt:rule>
   </tdt:transformation>


