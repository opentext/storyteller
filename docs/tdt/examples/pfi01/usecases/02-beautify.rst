==========================
02 - Beautify Message Data
==========================

:Author: Vladimir Lavicka

Overview
========

The `Ericsson Egypt <http://www.ericsson.com/eg>`_ customer use case.

We improve data structure to be more friendly for subsequent presentation phase.

Test case definition
====================

Source data
-----------

.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/02-beautify

   <data>
      <message>
        <Block_Document>
          <Id>130721018046207962227505</Id>
          <BAId>01804620796222750</BAId>
          <Block_CallDetails>
            <BAId_2>01804620796222750</BAId_2>
            <Block_ContrCalls>
              <Id_14>CONTR4958121</Id_14>
              <Block_ServCalls>
                <Block_Call>
                  <Block_XCD>
                    <CT_2>1</CT_2>
                    <No>1</No>
                    <SN>TEL</SN>
                    <UM>Sec</UM>
                    <SubId>1</SubId>
                    <SeqNo/>
                    <MKT>GSM</MKT>
                    <CU>07962227500180462</CU>
                    <CO>CONTR4958121</CO>
                    <CTs>20130715174706</CTs>
                    <CRTs>20130715174706</CRTs>
                    <ChType>I</ChType>
                    <PrInd>N</PrInd>
                    <ORV>25.000000</ORV>
                    <DRV>25.000000</DRV>
                    <ORdV>25.000000</ORdV>
                    <DRdV>25.000000</DRdV>
                    <DC>0.000000</DC>
                    <OAmt>1.000</OAmt>
                    <DAmt>0.000</DAmt>
                    <CC>JOD</CC>
                    <TM>ZAKA1</TM>
                    <RT>BASE</RT>
                    <CAI>I</CAI>
                    <CTI>0</CTI>
                    <RTON>1</RTON>
                    <NN>JORFL</NN>
                    <ANP>E.164</ANP>
                    <NI>H</NI>
                    <DES>NV</DES>
                    <CGI>41601312C22201</CGI>
                    <OPN>962796567644</OPN>
                    <DV>25.000000</DV>
                    <DUM>Sec</DUM>
                    <CQV>25.000000</CQV>
                    <CQUM>Sec</CQUM>
                    <EC>CONTR4958121</EC>
                    <SP>DEFSP</SP>
                    <ExtAmt>0.000</ExtAmt>
                    <XCD/>
                    <TT>TWTT000001</TT>
                    <TZ>GVZN001479</TZ>
                    <UT>OUT</UT>
                    <DZP>G0112</DZP>
                  </Block_XCD>
                </Block_Call>
                <Block_Call>
                  <Block_XCD>
                    <CT_2>1</CT_2>
                    <No>1</No>
                    <SN>TEL</SN>
                    <UM>Sec</UM>
                    <SubId>1</SubId>
                    <SeqNo/>
                    <MKT>GSM</MKT>
                    <CU>07962227500180462</CU>
                    <CO>CONTR4958121</CO>
                    <CTs>20130715182459</CTs>
                    <CRTs>20130715182459</CRTs>
                    <ChType>I</ChType>
                    <PrInd>N</PrInd>
                    <ORV>56.000000</ORV>
                    <DRV>56.000000</DRV>
                    <ORdV>56.000000</ORdV>
                    <DRdV>56.000000</DRdV>
                    <DC>0.000000</DC>
                    <OAmt>2.000</OAmt>
                    <DAmt>0.000</DAmt>
                    <CC>JOD</CC>
                    <TM>ZAKA1</TM>
                    <RT>BASE</RT>
                    <CAI>I</CAI>
                    <CTI>0</CTI>
                    <RTON>1</RTON>
                    <NN>JORFL</NN>
                    <ANP>E.164</ANP>
                    <NI>H</NI>
                    <DES>NV</DES>
                    <CGI>416011106C36263</CGI>
                    <OPN>962796462266</OPN>
                    <DV>56.000000</DV>
                    <DUM>Sec</DUM>
                    <CQV>56.000000</CQV>
                    <CQUM>Sec</CQUM>
                    <EC>CONTR4958121</EC>
                    <SP>DEFSP</SP>
                    <ExtAmt>0.000</ExtAmt>
                    <XCD/>
                    <TT>TWTT000001</TT>
                    <TZ>GVZN001479</TZ>
                    <UT>OUT</UT>
                    <DZP>G0112</DZP>
                  </Block_XCD>
                </Block_Call>
                <Block_Call>
                  <Block_XCD>
                    <CT_2>1</CT_2>
                    <No>1</No>
                    <SN>TEL</SN>
                    <UM>Sec</UM>
                    <SubId>1</SubId>
                    <SeqNo/>
                    <MKT>GSM</MKT>
                    <CU>07962227500180462</CU>
                    <CO>CONTR4958121</CO>
                    <CTs>20130715182946</CTs>
                    <CRTs>20130715182946</CRTs>
                    <ChType>I</ChType>
                    <PrInd>N</PrInd>
                    <ORV>58.000000</ORV>
                    <DRV>58.000000</DRV>
                    <ORdV>58.000000</ORdV>
                    <DRdV>58.000000</DRdV>
                    <DC>0.000000</DC>
                    <OAmt>3.000</OAmt>
                    <DAmt>0.000</DAmt>
                    <CC>JOD</CC>
                    <TM>ZAKA1</TM>
                    <RT>BASE</RT>
                    <CAI>I</CAI>
                    <CTI>0</CTI>
                    <RTON>1</RTON>
                    <NN>JORFL</NN>
                    <ANP>E.164</ANP>
                    <NI>H</NI>
                    <DES>NV</DES>
                    <CGI>41601302C36183</CGI>
                    <OPN>962795944900</OPN>
                    <DV>58.000000</DV>
                    <DUM>Sec</DUM>
                    <CQV>58.000000</CQV>
                    <CQUM>Sec</CQUM>
                    <EC>CONTR4958121</EC>
                    <SP>DEFSP</SP>
                    <ExtAmt>0.000</ExtAmt>
                    <XCD/>
                    <TT>TWTT000001</TT>
                    <TZ>GVZN001479</TZ>
                    <UT>OUT</UT>
                    <DZP>G0112</DZP>
                  </Block_XCD>
                </Block_Call>
                <Block_Call>
                  <Block_XCD>
                    <CT_2>1</CT_2>
                    <No>1</No>
                    <SN>TEL</SN>
                    <UM>Sec</UM>
                    <SubId>1</SubId>
                    <SeqNo/>
                    <MKT>GSM</MKT>
                    <CU>07962227500180462</CU>
                    <CO>CONTR4958121</CO>
                    <CTs>20130715183312</CTs>
                    <CRTs>20130715183312</CRTs>
                    <ChType>I</ChType>
                    <PrInd>N</PrInd>
                    <ORV>40.000000</ORV>
                    <DRV>40.000000</DRV>
                    <ORdV>40.000000</ORdV>
                    <DRdV>40.000000</DRdV>
                    <DC>0.000000</DC>
                    <OAmt>0.025</OAmt>
                    <DAmt>0.025</DAmt>
                    <CC>JOD</CC>
                    <TM>ZAKA1</TM>
                    <RT>BASE</RT>
                    <CAI>I</CAI>
                    <CTI>0</CTI>
                    <RTON>1</RTON>
                    <NN>JORFL</NN>
                    <ANP>E.164</ANP>
                    <NI>H</NI>
                    <DES>NV</DES>
                    <CGI>41601302C36046</CGI>
                    <OPN>962799086671</OPN>
                    <DV>40.000000</DV>
                    <DUM>Sec</DUM>
                    <CQV>40.000000</CQV>
                    <CQUM>Sec</CQUM>
                    <EC>CONTR4958121</EC>
                    <SP>DEFSP</SP>
                    <ExtAmt>0.025</ExtAmt>
                    <XCD/>
                    <TT>TWTT000001</TT>
                    <TZ>GVZN001479</TZ>
                    <UT>OUT</UT>
                    <DZP>G0112</DZP>
                  </Block_XCD>
                </Block_Call>
              </Block_ServCalls>
            </Block_ContrCalls>
          </Block_CallDetails>
        </Block_Document>
      </message>
    </data>
    




Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/02-beautify

   <data>
      <lookups>
        <call-type>
          <record key="TEL" value="telephone"/>
          <record key="" value="unknown"/>
        </call-type>
      </lookups>
      <document id="?" baid="?">
        <call-details baid="?">
          <contr-calls id="?">
            <total>?total?</total>
            <call type="?">
              <date>?date?</date>
              <time>?time?</time>
              <rate>{TODO}</rate>
              <duration>?duration?</duration>
              <number>?dialed-number?</number>
              <charge>?charge?</charge>
            </call>
          </contr-calls>
        </call-details>
      </document>
    </data>
    




Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/02-beautify

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data/document">
        <tdt:value key=".">/data/message/Block_Document</tdt:value>
        <tdt:value key="@id">Id</tdt:value>
        <tdt:value key="@baid">BAId</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/document/call-details">
        <tdt:value key=".">Block_CallDetails</tdt:value>
        <tdt:value key="@baid">BAId_2</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/document/call-details/contr-calls">
        <tdt:value key=".">Block_ContrCalls</tdt:value>
        <tdt:value key="@id">Id_14</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/document/call-details/contr-calls/call">
        <tdt:value key=".">Block_ServCalls/Block_Call/Block_XCD</tdt:value>
        <tdt:value key="$ts">CTs</tdt:value>
        <tdt:value key="$hour">substring($ts, 9, 2)</tdt:value>
        <tdt:value key="$minute">substring($ts, 11, 2)</tdt:value>
        <tdt:value key="$second">substring($ts, 13, 2)</tdt:value>
        <tdt:value key="$year">substring($ts, 7, 2)</tdt:value>
        <tdt:value key="$month">substring($ts, 5, 2)</tdt:value>
        <tdt:value key="$day">substring($ts, 1, 4)</tdt:value>
        <tdt:value key="$issubtotal">name(preceding-sibling::call/@subtotal) = "subtotal"</tdt:value>
        <tdt:value key="@type">/data/lookups/call-type/record[@key = SN]/@value</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/document/call-details/contr-calls/call/charge">
        <tdt:value key="text()">OAmt</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/document/call-details/contr-calls/call/date">
        <tdt:value key="text()">concat($year, '/', $month, '/', $day)</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/document/call-details/contr-calls/call/duration">
        <tdt:value key="text()">concat(ORdV, ' ', UM)</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/document/call-details/contr-calls/call/number">
        <tdt:value key="text()">OPN</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/document/call-details/contr-calls/call/rate">
        <tdt:value key="text()">'DefaultOffnet'</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/document/call-details/contr-calls/call/time">
        <tdt:value key="text()">concat($hour, ':', $minute, ':', $second)</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/document/call-details/contr-calls/total">
        <tdt:value key="text()">sum(Block_ServCalls[1]//*[OAmt][SN='TEL' and NI='H']/OAmt)</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/lookups">
        <tdt:value key=".">tdt:nodeset()</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    






Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/02-beautify

   <data>
      <document id="130721018046207962227505" baid="01804620796222750">
        <call-details baid="01804620796222750">
          <contr-calls id="CONTR4958121">
            <total>6.025</total>
            <call>
              <date>15/07/2013</date>
              <time>17:47:06</time>
              <rate>DefaultOffnet</rate>
              <duration>25.000000 Sec</duration>
              <number>962796567644</number>
              <charge>1.000</charge>
            </call>
            <call>
              <date>15/07/2013</date>
              <time>18:24:59</time>
              <rate>DefaultOffnet</rate>
              <duration>56.000000 Sec</duration>
              <number>962796462266</number>
              <charge>2.000</charge>
            </call>
            <call>
              <date>15/07/2013</date>
              <time>18:29:46</time>
              <rate>DefaultOffnet</rate>
              <duration>58.000000 Sec</duration>
              <number>962795944900</number>
              <charge>3.000</charge>
            </call>
            <call>
              <date>15/07/2013</date>
              <time>18:33:12</time>
              <rate>DefaultOffnet</rate>
              <duration>40.000000 Sec</duration>
              <number>962799086671</number>
              <charge>0.025</charge>
            </call>
          </contr-calls>
        </call-details>
      </document>
    </data>
    




