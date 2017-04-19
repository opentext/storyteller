==================
10a - HTML Invoice
==================

:Author: Jakub Dvorak

Overview
========

This example demonstrate the possibility to implement production of HTML
document purely in TDT transformation with no StoryTeller or other formatting 
engine involved.

An unobtrusive nature of TDT makes this approach a viable option.
User just created an HTML template in his favourite editor and 
then makes it dynamic with a set of *TDT Transformation Rules*.

Test case definition
====================

Source data
-----------

Let's say we have the following data we want to present in a form of an HTML invoice:

.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/10a-html-invoice

   <root>
      <customer-info code="1.13746193">
        <tel>739 447 098</tel>
        <tarif>O2 Optimum Profi Light</tarif>
      </customer-info>
      <account-info>
        <period>08.06. - 07.07.</period>
      </account-info>
      <transactions sum="678,28">
        <credits sum="-568,13">
          <item>
            <label>OPP+Light směr O2- 1,00 Kč</label>
            <type>na spojení</type>
            <duration>08.06. - 07.07.</duration>
            <val>-10,17</val>
            <tax>21%</tax>
            <final>-12,30</final>
          </item>
          <item>
            <label>OPP+Light směr ost- 1,50 Kč</label>
            <type>na spojení</type>
            <duration>08.06. - 07.07.</duration>
            <val>-556,16</val>
            <tax>21%</tax>
            <final>-673,00</final>
          </item>
          <item>
            <label>OP+OPPromo+Light - SMS 0,90Kč</label>
            <type>na spojení</type>
            <duration>08.06. - 07.07.</duration>
            <val>-1,80</val>
            <tax>21%</tax>
            <final>-2,20</final>
          </item>
        </credits>
        <fixed-fees sum="381,00">
          <item>
            <label>O2 Optimum Profi Light</label>
            <count>1</count>
            <duration>08.06. - 07.07.</duration>
            <val>30,00</val>
            <tax>21%</tax>
            <final>36,30</final>
          </item>
          <item>
            <label>O2 Mobilní Internet Pro</label>
            <count>1</count>
            <duration>08.06. - 07.07.</duration>
            <val>350,00</val>
            <tax>21%</tax>
            <final>423,50</final>
          </item>
          <item>
            <label>Team Nonstop</label>
            <count>1</count>
            <duration>08.06. - 07.07.</duration>
            <val>1,00</val>
            <tax>21%</tax>
            <final>1,20</final>
          </item>
        </fixed-fees>
        <connection-fees sum="865,41">
          <group>
            <label>Volání</label>
            <item>
              <label>Do mobilní sítě O2</label>
              <count>3</count>
              <period>špička</period>
              <amount>6:45 min</amount>
              <free-units>0:00</free-units>
              <price>16,95</price>
              <tax>21%</tax>
              <final>20,51</final>
            </item>
            <item>
              <label>Do ostatních mobilních sítí ČR</label>
              <count>19</count>
              <period>špička</period>
              <amount>89:56 min</amount>
              <free-units>0:00</free-units>
              <price>394,28</price>
              <tax>21%</tax>
              <final>477,08</final>
            </item>
            <item>
              <label/>
              <count>2</count>
              <period>mimo šp.</period>
              <amount>51:59 min</amount>
              <free-units>0:00</free-units>
              <price>227,73</price>
              <tax>21%</tax>
              <final>275,55</final>
            </item>
            <item>
              <label/>
              <count>5</count>
              <period>víkend</period>
              <amount>42:21 min</amount>
              <free-units>0:00</free-units>
              <price>185,59</price>
              <tax>21%</tax>
              <final>224,56</final>
            </item>
            <item>
              <label>Do pevných sítí v ČR</label>
              <count>4</count>
              <period>špička</period>
              <amount>8:17 min</amount>
              <free-units>0:00</free-units>
              <price>36,36</price>
              <tax>21%</tax>
              <final>44,00</final>
            </item>
            <item>
              <label>Na bezplatné infolinky v ČR</label>
              <count>1</count>
              <period>špička</period>
              <amount>4:00 min</amount>
              <free-units>0:00</free-units>
              <price>0,00</price>
              <tax>21%</tax>
              <final>0,00</final>
            </item>
            <sum>860,91</sum>
          </group>
          <group>
            <label>Zprávy</label>
            <item>
              <label>SMS do mobilních sítí v ČR</label>
              <count/>
              <period>vždy</period>
              <amount>3 SMS</amount>
              <free-units>0</free-units>
              <price>4,50</price>
              <tax>21%</tax>
              <final>5,45</final>
            </item>
            <sum>4,50</sum>
          </group>
          <group>
            <label>Data, Internet</label>
            <item>
              <label>Připojení k Internetu</label>
              <count/>
              <period>vždy</period>
              <amount>126 874 kB</amount>
              <free-units>0</free-units>
              <price>0,00</price>
              <tax>21%</tax>
              <final>0,00</final>
            </item>
            <sum>0,00</sum>
          </group>
        </connection-fees>
      </transactions>
    </root>



Data Template
-------------

We can create an HTML template as we like.

It is good to add ``class`` or ``id`` attributes at proper places in order 
to be able to use them in *Meta-Rule TDT selectors*.

See `template.html <template.html>`_

.. raw:: html

   <iframe width="100%" height="700" src="template.html" allowfullscreen="allowfullscreen" frameborder="0">
   </iframe>

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/10a-html-invoice

   <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Rozpis tel:</title>
        <link rel="stylesheet" type="text/css" href="/tdt/static/invoice.css"/>
      </head>
      <body>
        <div class="main">
          <h1>Rozpis vyúčtování služeb</h1>
          <div class="cust-info">
            <table>
              <tbody>
                <tr>
                  <th>Telefonní číslo:</th>
                  <td>
                    <span class="tel">?</span>
                  </td>
                </tr>
                <tr>
                  <th>Kód zákazníka:</th>
                  <td>?</td>
                </tr>
                <tr>
                  <th>Tarif:</th>
                  <td>?</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="account-info">Zúčtovací období:</div>
          <div class="text-message">
            <p>
              <span>Vážený zákazníku, informaci o datu vypršení Vašeho smluvního závazku
                naleznete u příslušného produktu po přihlášení do Vašeho profilu na </span>
              <a href="www.mojeo2.cz">www.mojeo2.cz</a>
              <span>.
                Pokud službu Moje O2 ještě nevyužíváte, můžete se snadno zaregistrovat na </span>
              <a href="www.mojeo2.cz">www.mojeo2.cz</a>
              <span>
                s pomocí údajů z této faktury. Vaše O2</span>
            </p>
          </div>
          <div class="transactions">
            <table class="credits">
              <colgroup>
                <col/>
                <col/>
                <col/>
                <col style="width:60pt;"/>
                <col style="width:48pt;"/>
                <col style="width:52pt;"/>
              </colgroup>
              <thead>
                <tr>
                  <th>Přehled kreditů a slev</th>
                  <th>Typ slevy</th>
                  <th>Období</th>
                  <th>Slevy bez DPH</th>
                  <th>Sazba DPH</th>
                  <th>Celkem Kč*</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th colspan="3">Slevy celkem (bez DPH)</th>
                  <td class="sum">?</td>
                  <td colspan="2"/>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                </tr>
              </tbody>
            </table>
            <table class="fixed-fees">
              <colgroup>
                <col/>
                <col/>
                <col/>
                <col style="width:60pt;"/>
                <col style="width:48pt;"/>
                <col style="width:52pt;"/>
              </colgroup>
              <thead>
                <tr>
                  <th>Pravidelné poplatky</th>
                  <th>Období</th>
                  <th>Počet</th>
                  <th>Cena bez DPH</th>
                  <th>Sazba DPH</th>
                  <th>Celkem Kč*</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th colspan="3">Celkem za pravidelné poplatky (bez DPH)</th>
                  <td class="sum">?</td>
                  <td colspan="2"/>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                </tr>
              </tbody>
            </table>
            <table class="connection-fees">
              <colgroup>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
                <col style="width:60pt;"/>
                <col style="width:48pt;"/>
                <col style="width:52pt;"/>
              </colgroup>
              <thead>
                <tr>
                  <th>Platby za spojení</th>
                  <th>Počet</th>
                  <th>Čas. rozmezí</th>
                  <th>Účtováno</th>
                  <th>Volné jednotky</th>
                  <th>Cena bez DPH</th>
                  <th>Sazba DPH</th>
                  <th>Celkem Kč*</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th colspan="5">Celkem za spojení (bez DPH)</th>
                  <td class="sum">?</td>
                  <td colspan="2"/>
                </tr>
              </tfoot>
              <tbody>
                <tr class="section-header">
                  <th>?</th>
                  <th colspan="7"/>
                </tr>
                <tr class="section-data">
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                  <td>?</td>
                </tr>
                <tr class="section-footer">
                  <td colspan="5"/>
                  <td>?</td>
                  <td colspan="2"/>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="total">
            <table class="total">
              <colgroup>
                <col/>
                <col style="width:60pt;"/>
                <col style="width:48pt;"/>
                <col style="width:52pt;"/>
              </colgroup>
              <tfoot>
                <tr>
                  <th>
                    <span>Celkem za telefonní číslo </span>
                    <span class="tel">??? ??? ???</span>
                    <span> (bez DPH)</span>
                  </th>
                  <td class="sum">?</td>
                  <td/>
                  <td/>
                </tr>
              </tfoot>
            </table>
          </div>
          <footer>
            <p>Rozpis vyúčtování služeb</p>
            <p>* Haléřově zaokrouhleno.</p>
          </footer>
        </div>
      </body>
    </html>



Transformation
--------------

In *TDT Transformation Definition* we form Meta-Rules to link to the appropriate places.

The ``//div[@class='cust-info']/table/tbody/tr[2]/td`` meta-rule path is an example 
of such selector:

.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/10a-html-invoice

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/html">
        <tdt:value key="$customer">/root/customer-info</tdt:value>
        <tdt:value key="$period">/root/account-info/period</tdt:value>
        <tdt:value key="$transactions">/root/transactions</tdt:value>
        <tdt:value key="$fixed-fees">$transactions/fixed-fees</tdt:value>
        <tdt:value key="$connection-fees">$transactions/connection-fees</tdt:value>
      </tdt:rule>
      <!-- customer-info -->
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
      <!-- "credits" table -->
      <tdt:rule path="//table[@class='credits']/tfoot/tr/td[1]">
        <tdt:value key="text()">string(@sum)</tdt:value>
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
      <!-- "fixed-fees" table -->
      <tdt:rule path="//table[@class='fixed-fees']/tfoot/tr/td[1]">
        <tdt:value key="text()">string($fixed-fees/@sum)</tdt:value>
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
      <!-- "connection-fees" table -->
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-header']/th[1]">
        <tdt:value key="text()">label/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody/tr[@class='section-footer']/td[2]">
        <tdt:value key="text()">sum/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tfoot/tr/td[1]">
        <tdt:value key="text()">string($connection-fees/@sum)</tdt:value>
      </tdt:rule>
      <tdt:rule path="//table[@class='connection-fees']/tbody">
        <tdt:value key=".">$connection-fees/group</tdt:value>
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
      <!-- total -->
      <tdt:rule path="//table[@class='total']//td[@class='sum']">
        <tdt:value key="text()">$transactions/@sum</tdt:value>
      </tdt:rule>
    </tdt:transformation>



Expected Result
---------------

The resulting HTML respects the design of the *Template* but contains 
all dynamically filled data:

See `instance.html <instance.html>`_

.. raw:: html

   <iframe width="100%" height="900" src="instance.html" allowfullscreen="allowfullscreen" frameborder="0">
   </iframe>


.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/10a-html-invoice

   <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Rozpis tel: 739 447 098, 08.06. - 07.07.</title>
        <link rel="stylesheet" type="text/css" href="/tdt/static/invoice.css"/>
      </head>
      <body>
        <div class="main">
          <h1>Rozpis vyúčtování služeb</h1>
          <div class="cust-info">
            <table>
              <tbody>
                <tr>
                  <th>Telefonní číslo:</th>
                  <td>
                    <span class="tel">739 447 098</span>
                  </td>
                </tr>
                <tr>
                  <th>Kód zákazníka:</th>
                  <td>1.13746193</td>
                </tr>
                <tr>
                  <th>Tarif:</th>
                  <td>O2 Optimum Profi Light</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="account-info">Zúčtovací období: 08.06. - 07.07.</div>
          <div class="text-message">
            <p>
              <span>Vážený zákazníku, informaci o datu vypršení Vašeho smluvního závazku
                naleznete u příslušného produktu po přihlášení do Vašeho profilu na </span>
              <a href="www.mojeo2.cz">www.mojeo2.cz</a>
              <span>.
                Pokud službu Moje O2 ještě nevyužíváte, můžete se snadno zaregistrovat na </span>
              <a href="www.mojeo2.cz">www.mojeo2.cz</a>
              <span>
                s pomocí údajů z této faktury. Vaše O2</span>
            </p>
          </div>
          <div class="transactions">
            <table class="credits">
              <colgroup>
                <col/>
                <col/>
                <col/>
                <col style="width:60pt;"/>
                <col style="width:48pt;"/>
                <col style="width:52pt;"/>
              </colgroup>
              <thead>
                <tr>
                  <th>Přehled kreditů a slev</th>
                  <th>Typ slevy</th>
                  <th>Období</th>
                  <th>Slevy bez DPH</th>
                  <th>Sazba DPH</th>
                  <th>Celkem Kč*</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th colspan="3">Slevy celkem (bez DPH)</th>
                  <td class="sum">-568,13</td>
                  <td colspan="2"/>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>OPP+Light směr O2- 1,00 Kč</td>
                  <td>na spojení</td>
                  <td>08.06. - 07.07.</td>
                  <td>-10,17</td>
                  <td>21%</td>
                  <td>-12,30</td>
                </tr>
                <tr>
                  <td>OPP+Light směr ost- 1,50 Kč</td>
                  <td>na spojení</td>
                  <td>08.06. - 07.07.</td>
                  <td>-556,16</td>
                  <td>21%</td>
                  <td>-673,00</td>
                </tr>
                <tr>
                  <td>OP+OPPromo+Light - SMS 0,90Kč</td>
                  <td>na spojení</td>
                  <td>08.06. - 07.07.</td>
                  <td>-1,80</td>
                  <td>21%</td>
                  <td>-2,20</td>
                </tr>
              </tbody>
            </table>
            <table class="fixed-fees">
              <colgroup>
                <col/>
                <col/>
                <col/>
                <col style="width:60pt;"/>
                <col style="width:48pt;"/>
                <col style="width:52pt;"/>
              </colgroup>
              <thead>
                <tr>
                  <th>Pravidelné poplatky</th>
                  <th>Období</th>
                  <th>Počet</th>
                  <th>Cena bez DPH</th>
                  <th>Sazba DPH</th>
                  <th>Celkem Kč*</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th colspan="3">Celkem za pravidelné poplatky (bez DPH)</th>
                  <td class="sum">381,00</td>
                  <td colspan="2"/>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>O2 Optimum Profi Light</td>
                  <td>08.06. - 07.07.</td>
                  <td>1</td>
                  <td>30,00</td>
                  <td>21%</td>
                  <td>36,30</td>
                </tr>
                <tr>
                  <td>O2 Mobilní Internet Pro</td>
                  <td>08.06. - 07.07.</td>
                  <td>1</td>
                  <td>350,00</td>
                  <td>21%</td>
                  <td>423,50</td>
                </tr>
                <tr>
                  <td>Team Nonstop</td>
                  <td>08.06. - 07.07.</td>
                  <td>1</td>
                  <td>1,00</td>
                  <td>21%</td>
                  <td>1,20</td>
                </tr>
              </tbody>
            </table>
            <table class="connection-fees">
              <colgroup>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
                <col style="width:60pt;"/>
                <col style="width:48pt;"/>
                <col style="width:52pt;"/>
              </colgroup>
              <thead>
                <tr>
                  <th>Platby za spojení</th>
                  <th>Počet</th>
                  <th>Čas. rozmezí</th>
                  <th>Účtováno</th>
                  <th>Volné jednotky</th>
                  <th>Cena bez DPH</th>
                  <th>Sazba DPH</th>
                  <th>Celkem Kč*</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th colspan="5">Celkem za spojení (bez DPH)</th>
                  <td class="sum">865,41</td>
                  <td colspan="2"/>
                </tr>
              </tfoot>
              <tbody>
                <tr class="section-header">
                  <th>Volání</th>
                  <th colspan="7"/>
                </tr>
                <tr class="section-data">
                  <td>Do mobilní sítě O2</td>
                  <td>3</td>
                  <td>špička</td>
                  <td>6:45 min</td>
                  <td>0:00</td>
                  <td>16,95</td>
                  <td>21%</td>
                  <td>20,51</td>
                </tr>
                <tr class="section-data">
                  <td>Do ostatních mobilních sítí ČR</td>
                  <td>19</td>
                  <td>špička</td>
                  <td>89:56 min</td>
                  <td>0:00</td>
                  <td>394,28</td>
                  <td>21%</td>
                  <td>477,08</td>
                </tr>
                <tr class="section-data">
                  <td/>
                  <td>2</td>
                  <td>mimo šp.</td>
                  <td>51:59 min</td>
                  <td>0:00</td>
                  <td>227,73</td>
                  <td>21%</td>
                  <td>275,55</td>
                </tr>
                <tr class="section-data">
                  <td/>
                  <td>5</td>
                  <td>víkend</td>
                  <td>42:21 min</td>
                  <td>0:00</td>
                  <td>185,59</td>
                  <td>21%</td>
                  <td>224,56</td>
                </tr>
                <tr class="section-data">
                  <td>Do pevných sítí v ČR</td>
                  <td>4</td>
                  <td>špička</td>
                  <td>8:17 min</td>
                  <td>0:00</td>
                  <td>36,36</td>
                  <td>21%</td>
                  <td>44,00</td>
                </tr>
                <tr class="section-data">
                  <td>Na bezplatné infolinky v ČR</td>
                  <td>1</td>
                  <td>špička</td>
                  <td>4:00 min</td>
                  <td>0:00</td>
                  <td>0,00</td>
                  <td>21%</td>
                  <td>0,00</td>
                </tr>
                <tr class="section-footer">
                  <td colspan="5"/>
                  <td>860,91</td>
                  <td colspan="2"/>
                </tr>
              </tbody>
              <tbody>
                <tr class="section-header">
                  <th>Zprávy</th>
                  <th colspan="7"/>
                </tr>
                <tr class="section-data">
                  <td>SMS do mobilních sítí v ČR</td>
                  <td/>
                  <td>vždy</td>
                  <td>3 SMS</td>
                  <td>0</td>
                  <td>4,50</td>
                  <td>21%</td>
                  <td>5,45</td>
                </tr>
                <tr class="section-footer">
                  <td colspan="5"/>
                  <td>4,50</td>
                  <td colspan="2"/>
                </tr>
              </tbody>
              <tbody>
                <tr class="section-header">
                  <th>Data, Internet</th>
                  <th colspan="7"/>
                </tr>
                <tr class="section-data">
                  <td>Připojení k Internetu</td>
                  <td/>
                  <td>vždy</td>
                  <td>126 874 kB</td>
                  <td>0</td>
                  <td>0,00</td>
                  <td>21%</td>
                  <td>0,00</td>
                </tr>
                <tr class="section-footer">
                  <td colspan="5"/>
                  <td>0,00</td>
                  <td colspan="2"/>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="total">
            <table class="total">
              <colgroup>
                <col/>
                <col style="width:60pt;"/>
                <col style="width:48pt;"/>
                <col style="width:52pt;"/>
              </colgroup>
              <tfoot>
                <tr>
                  <th>
                    <span>Celkem za telefonní číslo </span>
                    <span class="tel">739 447 098</span>
                    <span> (bez DPH)</span>
                  </th>
                  <td class="sum">678,28</td>
                  <td/>
                  <td/>
                </tr>
              </tfoot>
            </table>
          </div>
          <footer>
            <p>Rozpis vyúčtování služeb</p>
            <p>* Haléřově zaokrouhleno.</p>
          </footer>
        </div>
      </body>
    </html>
    




