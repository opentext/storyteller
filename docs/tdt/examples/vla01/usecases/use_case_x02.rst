==============
Extra use case
==============

Description
===========

Create data from comma separated values.



Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content eUC-002

    <story name="Story 1" fmt_mode="docapi.DO_NOT_FIT_ERROR">
      <style name="Arial" size="10.0"/>
      <p>
        <table dim="2,2" widths="200;150" thickness="inf" mode="paragraph" size="400,20">
          <body>
            <style name="Arial" size="10.0"/>
              <style name="Arial" size="9.0"/>
              <rep xpath="/data/record/part">
              <row index="0" height="14.0">
                <cell col_span="2" inner_margins="0,0,20,5" thickness="inf">
                  <style bold="1" name="Arial" size="11.0"/>
                  <p>ID: <subst xpath="@part"/></p>
                </cell>
                <cell col_span="0" thickness="inf">
                  <p/>
                </cell>
              </row>
              <rep xpath="value">
              <row index="1" height="12.0">
                <cell inner_margins="5,5,5,5">
                  <style name="Arial" size="9.0"/>
                  <p><subst xpath="concat(substring(@name, 1, 1), translate(substring(@name, 2) , 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_', 'abcdefghijklmnopqrstuvwxyz '))"/></p>
                </cell>
                <cell inner_margins="5,5,5,5">
                  <style name="Arial" size="9.0"/>
                  <p><subst xpath="."/></p>
                </cell>
              </row>
              </rep>
              </rep>
          </body>
        </table>
      </p>
    </story>
    <page name="Page 1">
      <text storyindex="0" alignment_mode="resourcesapi.AM_VERTICAL" thickness="0.0" shape_rescale="resourcesapi.RM_FIXED" translate="31.5,31.5" size="526.5,769.5"/>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance eUC-002

    <data>
      <identifiers>
        <id>ITEM_GROSS_AMOUNT_DES</id>
        <id>ITEM_NUMBER</id>
        <id>ITEM_NET_AMOUNT_DES</id>
        <id>ITEM_DISPUTE_GROSS_DES</id>
        <id>REF_DATE_INV_ITEM</id>
        <id>ITEM_REFERENCE_CODE</id>
        <id>REFERENCE_CODE</id>
        <id>ITEM_CREDIT_AMOUNT</id>
        <id>ITEM_CURRENCY</id>
        <id>ITEM_SERVICE_DES</id>
        <id>ITEM_CREDIT_RATE</id>
        <id>ITEM_SERVICE</id>
        <id>ITEM_AMOUNT</id>
        <id>COMPLAINT_AMOUNT</id>
        <id>ITEM_DESCRIPTION</id>
        <id>ENTRY_DATE_INV_ITEM</id>
      </identifiers>
      <parts>
        <part name="first" separator="" />
        <part name="second" separator="}" />
      </parts>
      <record key="INVOICE_ITEM">
        <part part="first">
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
        </part>
        <part part="second">
          <value name="ITEM_GROSS_AMOUNT_DES">15.46BRL</value>
          <value name="ITEM_NUMBER">0.0</value>
          <value name="ITEM_NET_AMOUNT_DES">12.368BRL</value>
          <value name="ITEM_DISPUTE_GROSS_DES">0.02BRL</value>
          <value name="REF_DATE_INV_ITEM">2014-03-18 00:00:00.0</value>
          <value name="ITEM_REFERENCE_CODE">0000000019</value>
          <value name="REFERENCE_CODE">0000000019</value>
          <value name="ITEM_CREDIT_AMOUNT">0.019999999552965164</value>
          <value name="ITEM_CURRENCY">BRL</value>
          <value name="ITEM_SERVICE_DES">VIVO Telefone Movel</value>
          <value name="ITEM_CREDIT_RATE">0.13</value>
          <value name="ITEM_SERVICE">1.0</value>
          <value name="ITEM_AMOUNT">15.460000038146973</value>
          <value name="COMPLAINT_AMOUNT">15.460000038146973</value>
          <value name="ITEM_DESCRIPTION">0.0.3.29.1.12</value>
          <value name="ENTRY_DATE_INV_ITEM">2014-05-16 00:00:00.0</value>
        </part>
      </record>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source eUC-002

  <data>
    <message>
      <attribute key="INVOICE_ITEM" value="{
        ITEM_GROSS_AMOUNT_DES=9.02BRL, 
        ITEM_NUMBER=2.0, 
        ITEM_NET_AMOUNT_DES=7.216BRL, 
        ITEM_DISPUTE_GROSS_DES=5.0BRL,
        REF_DATE_INV_ITEM=2014-04-04 00:00:00.0,
        ITEM_REFERENCE_CODE=0000000023,
        REFERENCE_CODE=0000000023,
        ITEM_CREDIT_AMOUNT=5.0,
        ITEM_CURRENCY=BRL,
        ITEM_SERVICE_DES=VIVO TV - Pacote FLEX HD,
        ITEM_CREDIT_RATE=55.43,
        ITEM_SERVICE=55.0,
        ITEM_AMOUNT=9.020000457763672,
        COMPLAINT_AMOUNT=27.950000762939453,
        ITEM_DESCRIPTION=0.0.3.29.1.24,
        ENTRY_DATE_INV_ITEM=2014-04-01 00:00:00.0} {ITEM_NUMBER=0.0,
        ITEM_GROSS_AMOUNT_DES=15.46BRL,
        ITEM_NET_AMOUNT_DES=12.368BRL,
        ITEM_DISPUTE_GROSS_DES=0.02BRL,
        REF_DATE_INV_ITEM=2014-03-18 00:00:00.0,
        ITEM_REFERENCE_CODE=0000000019,
        ITEM_CURRENCY=BRL,
        ITEM_CREDIT_AMOUNT=0.019999999552965164,
        REFERENCE_CODE=0000000019,
        ITEM_SERVICE=1.0,
        ITEM_CREDIT_RATE=0.13,
        ITEM_SERVICE_DES=VIVO Telefone Movel,
        ITEM_AMOUNT=15.460000038146973,
        ITEM_DESCRIPTION=0.0.3.29.1.12,
        COMPLAINT_AMOUNT=15.460000038146973,
        ENTRY_DATE_INV_ITEM=2014-05-16 00:00:00.0}"/>
    </message>
  </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template eUC-002

   <data>
    <identifiers>
      <id>ITEM_GROSS_AMOUNT_DES</id>
      <id>ITEM_NUMBER</id>
      <id>ITEM_NET_AMOUNT_DES</id>
      <id>ITEM_DISPUTE_GROSS_DES</id>
      <id>REF_DATE_INV_ITEM</id>
      <id>ITEM_REFERENCE_CODE</id>
      <id>REFERENCE_CODE</id>
      <id>ITEM_CREDIT_AMOUNT</id>
      <id>ITEM_CURRENCY</id>
      <id>ITEM_SERVICE_DES</id>
      <id>ITEM_CREDIT_RATE</id>
      <id>ITEM_SERVICE</id>
      <id>ITEM_AMOUNT</id>
      <id>COMPLAINT_AMOUNT</id>
      <id>ITEM_DESCRIPTION</id>
      <id>ENTRY_DATE_INV_ITEM</id>
    </identifiers>
    <parts>
      <part name="first" separator=""/>
      <part name="second" separator="}"/>
    </parts>
    <record key="?">
      <part part="?">
        <value name="?">?</value>
      </part>
    </record>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation eUC-002

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
     <tdt:rule path="/data/record">
       <tdt:value key=".">/data/message/attribute</tdt:value>
       <tdt:value key="$value">@value</tdt:value>
       <tdt:value key="@key">@key</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/record/part">
       <tdt:value key=".">tdt:template()/data/parts/part</tdt:value>
       <tdt:value key="$separator">@separator</tdt:value>
       <tdt:value key="@part">@name</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/record/part/value">
       <tdt:value key=".">tdt:template()/data/identifiers/id</tdt:value>
       <tdt:value key="$name">text()</tdt:value>
       <tdt:value key="@name">$name</tdt:value>
       <tdt:value key="text()">
         substring-before( 
           substring-after( 
             translate( substring-after( $value, $separator ), '}', ',' ), 
             concat($name,'=') ), 
           ',' )
       </tdt:value>
     </tdt:rule>
   </tdt:transformation>


