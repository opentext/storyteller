==================================
10b - HTML Invoice (TDT Generator)
==================================

:Author: Petr Filipsky

Overview
========

Here we demonstrate a possibility to define *Data Transformation* rules generating
an extensive *Data Transformation*.

We simply exploit the fact that *Data Transformation* definition is just another 
XML structure, which can be easily generated.

Especially in cases when there are many rules following a repeataable pattern
it can be beneficial to let a *Meta-Transformation* to generate rules for us 
as opposed to write and maintain the rules manually.  

We demonstrate the concept by generating the transforamtion used in 
the `10a - HTML Invoice <../10a-html-invoice/index.html>`_ usecase.

Test case definition
====================

Source data
-----------

This relatively compact *Data Structure* is used as a source for generating a resulting *Data Transformation*.

It contains just a hierarchy of ``groups`` and ``rules``:

- ``rule`` record directly represents just a more compact representation of a single rule
- ``group`` group of rules establishes a *base path* - used as a prefix for all sub-paths

.. code:: xml
   :number-lines:
   :name: source 

   <metatrans>
      <!-- customer-info -->
      <rule path="/html/head/title" key="text()">
	    concat(tdt:template()//title, ' ', $customer/tel/text(), ", ", $period )
	  </rule>
      <rule path="//span[@class='tel']" key="text()">$customer/tel/text()</rule>
      <group path="//div[@class='cust-info']/table/tbody">
        <rule path="tr[2]/td" key="text()">$customer/@code</rule>
        <rule path="tr[3]/td" key="text()">$customer/tarif/text()</rule>
      </group>
      <rule path="//div[@class='account-info']" key="text()">
	    concat(tdt:template()//div[@class='account-info'], ' ', $period )
	  </rule>
      <!-- "credits" table -->
      <group path="//table[@class='credits']">
        <rule key=".">$transactions/credits[item]</rule>
        <rule path="tbody/tr" key=".">item</rule>
        <group path="tbody/tr">
          <rule path="td[1]" key="text()">label/text()</rule>
          <rule path="td[2]" key="text()">type/text()</rule>
          <rule path="td[3]" key="text()">duration/text()</rule>
          <rule path="td[4]" key="text()">val/text()</rule>
          <rule path="td[5]" key="text()">tax/text()</rule>
          <rule path="td[6]" key="text()">final/text()</rule>
        </group>
        <rule path="tfoot/tr/td[1]" key="text()">string(@sum)</rule>
      </group>
      <!-- "fixed-fees" table -->
      <group path="//table[@class='fixed-fees']">
        <rule path="tbody/tr" key=".">$fixed-fees/item</rule>
        <group path="tbody/tr">
          <rule path="td[1]" key="text()">label/text()</rule>
          <rule path="td[2]" key="text()">duration/text()</rule>
          <rule path="td[3]" key="text()">count/text()</rule>
          <rule path="td[4]" key="text()">val/text()</rule>
          <rule path="td[5]" key="text()">tax/text()</rule>
          <rule path="td[6]" key="text()">final/text()</rule>
        </group>
        <rule path="tfoot/tr/td[1]" key="text()">string($fixed-fees/@sum)</rule>
      </group>
      <!-- "connection-fees" table -->
      <group path="//table[@class='connection-fees']">
        <group path="tbody">
          <rule key=".">$connection-fees/group</rule>
          <rule path="tr[@class='section-header']/th[1]" key="text()">label/text()</rule>
          <rule path="tr[@class='section-footer']/td[2]" key="text()">sum/text()</rule>
          <group path="tr[@class='section-data']">
            <rule key=".">item</rule>
            <rule path="td[1]" key="text()">label/text()</rule>
            <rule path="td[2]" key="text()">count/text()</rule>
            <rule path="td[3]" key="text()">period/text()</rule>
            <rule path="td[4]" key="text()">amount/text()</rule>
            <rule path="td[5]" key="text()">free-units/text()</rule>
            <rule path="td[6]" key="text()">price/text()</rule>
            <rule path="td[7]" key="text()">tax/text()</rule>
            <rule path="td[8]" key="text()">final/text()</rule>
          </group>
        </group>
        <rule path="tfoot/tr/td[1]" key="text()">string($connection-fees/@sum)</rule>
      </group>
      <!-- total -->
      <rule path="//table[@class='total']//td[@class='sum']" key="text()">$transactions/@sum</rule>
    </metatrans>



Data Template
-------------

*Data Template* for the *Meta-Transformation* is very simple.

Beside the initial variable declarations we have just two placeholders - the first for plain ``rules``
and the second for rule ``groups``. 

.. code:: xml
   :number-lines:
   :name: template 

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/html">
        <tdt:value key="$customer">/root/customer-info</tdt:value>
        <tdt:value key="$period">/root/account-info/period</tdt:value>
        <tdt:value key="$transactions">/root/transactions</tdt:value>
        <tdt:value key="$fixed-fees">$transactions/fixed-fees</tdt:value>
        <tdt:value key="$connection-fees">$transactions/connection-fees</tdt:value>
      </tdt:rule>
      <tdt:rule path="#placeholder">
        <tdt:value key="?">?</tdt:value>
      </tdt:rule>
    </tdt:transformation>




Transformation
--------------

*Data Transformation* is also very simple - two pairs of rules.

The first is for plain ``rules`` and the second is for rule ``groups``. 

.. code:: xml
   :number-lines:
   :name: transformation 

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="//tdt:rule[@path='#placeholder']">
        <tdt:value key=".">//rule</tdt:value>
        <tdt:value key="@path">tdt:concat( ancestor::group/@path|@path, '/' )</tdt:value>
      </tdt:rule>
      <tdt:rule path="//tdt:rule[@path='#placeholder']/tdt:value">
        <tdt:value key="recurse">.</tdt:value>
      </tdt:rule>
    </tdt:transformation>




Compiled Transformation
-----------------------

In order to achieve a better maintainability we are using attribute selector ``placeholder``
in our *Data Transformation*. 

Here we can see that in the *Compiled Transformation* the *rule path* are translated 
to an index-based form:

.. code:: xml
   :number-lines:
   :name: compiled 

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/tdt:transformation/tdt:rule[2]">
        <tdt:value key=".">//rule</tdt:value>
        <tdt:value key="@path">tdt:concat( ancestor::group/@path|@path, '/' )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/tdt:transformation/tdt:rule[2]/tdt:value">
        <tdt:value key="@key">@key</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
    </tdt:transformation>




Expected Result
---------------

The resulting *Data Instance* represents generated *Data Transformation* directly usable
for `HTML Invoice <../10a-html-invoice/index.html>`_.

.. code:: xml
   :number-lines:
   :name: instance 

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/html">
        <tdt:value key="$customer">/root/customer-info</tdt:value>
        <tdt:value key="$period">/root/account-info/period</tdt:value>
        <tdt:value key="$transactions">/root/transactions</tdt:value>
        <tdt:value key="$fixed-fees">$transactions/fixed-fees</tdt:value>
        <tdt:value key="$connection-fees">$transactions/connection-fees</tdt:value>
      </tdt:rule>
      <tdt:rule path="/html/head/title">
        <tdt:value key="text()">concat(tdt:template()//title, ' ', $customer/tel/text(), ", ", $period )</tdt:value>
      </tdt:rule>
      <tdt:rule path="//span[@class='tel']">
        <tdt:value key="text()">$customer/tel/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//div[@class='cust-info']/table/tbody/tr[2]/td">
        <tdt:value key="text()">$customer/@code</tdt:value>
      </tdt:rule>
      <tdt:rule path="//div[@class='cust-info']/table/tbody/tr[3]/td">
        <tdt:value key="text()">$customer/tarif/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//div[@class='account-info']">
        <tdt:value key="text()">concat(tdt:template()//div[@class='account-info'], ' ', $period )</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='credits']">
        <tdt:value key=".">$transactions/credits[item]</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='credits']/tbody/tr">
        <tdt:value key=".">item</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='credits']/tbody/tr/td[1]">
        <tdt:value key="text()">label/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='credits']/tbody/tr/td[2]">
        <tdt:value key="text()">type/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='credits']/tbody/tr/td[3]">
        <tdt:value key="text()">duration/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='credits']/tbody/tr/td[4]">
        <tdt:value key="text()">val/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='credits']/tbody/tr/td[5]">
        <tdt:value key="text()">tax/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='credits']/tbody/tr/td[6]">
        <tdt:value key="text()">final/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='credits']/tfoot/tr/td[1]">
        <tdt:value key="text()">string(@sum)</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='fixed-fees']/tbody/tr">
        <tdt:value key=".">$fixed-fees/item</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='fixed-fees']/tbody/tr/td[1]">
        <tdt:value key="text()">label/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='fixed-fees']/tbody/tr/td[2]">
        <tdt:value key="text()">duration/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='fixed-fees']/tbody/tr/td[3]">
        <tdt:value key="text()">count/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='fixed-fees']/tbody/tr/td[4]">
        <tdt:value key="text()">val/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='fixed-fees']/tbody/tr/td[5]">
        <tdt:value key="text()">tax/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='fixed-fees']/tbody/tr/td[6]">
        <tdt:value key="text()">final/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='fixed-fees']/tfoot/tr/td[1]">
        <tdt:value key="text()">string($fixed-fees/@sum)</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody">
        <tdt:value key=".">$connection-fees/group</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-header']/th[1]">
        <tdt:value key="text()">label/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-footer']/td[2]">
        <tdt:value key="text()">sum/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-data']">
        <tdt:value key=".">item</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-data']/td[1]">
        <tdt:value key="text()">label/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-data']/td[2]">
        <tdt:value key="text()">count/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-data']/td[3]">
        <tdt:value key="text()">period/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-data']/td[4]">
        <tdt:value key="text()">amount/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-data']/td[5]">
        <tdt:value key="text()">free-units/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-data']/td[6]">
        <tdt:value key="text()">price/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-data']/td[7]">
        <tdt:value key="text()">tax/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-data']/td[8]">
        <tdt:value key="text()">final/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tfoot/tr/td[1]">
        <tdt:value key="text()">string($connection-fees/@sum)</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='total']//td[@class='sum']">
        <tdt:value key="text()">$transactions/@sum</tdt:value>
      </tdt:rule>
    </tdt:transformation>




