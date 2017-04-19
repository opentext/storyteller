============================
10c - HTML Invoice (Dynamic)
============================

:Author: Petr Filipsky

Overview
========

This example is a variation of the `10a - HTML Invoice <../10a-html-invoice/index.html>`_.

Here we do not generate static HTML tables, but instead inject more-or-less original data
in XML form and create presentation in client side script.

It is clearly visible how TDT was significantly simplified as all data handling complexities 
were moved to javascript code.

Of course there are other variants to this scenario:

- Embed data in JSON format (it would simplify the scripting - no XML parsing would be necessary)
- Do not embed data at all - retrieve it dynamically from a server (either in JSON or XML format)

Test case definition
====================

Data Template
-------------

See `template.html <template.html>`_

.. raw:: html

   <iframe width="100%" height="800" src="template.html" allowfullscreen="allowfullscreen" frameborder="0">
   </iframe>


The *Data Template* really drives all the logic here. 

It dictates all the following:

  - Place(s) where *Data Island* ought to be injected
  - All the javascript implemented dynamic logic
  - Design of the resulting page defined as HTML markup 

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/10c-html-invoice-dynamic

   <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Rozpis tel:</title>
        <link rel="stylesheet" type="text/css" href="/tdt/static/invoice.css"/>
        <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.1.min.js"/>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqgrid/4.6.0/js/jquery.jqGrid.min.js"/>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqgrid/4.6.0/js/i18n/grid.locale-en.js"/>
        <link rel="stylesheet" type="text/css" media="screen" href="https://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
        <link rel="stylesheet" type="text/css" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/jqgrid/4.6.0/css/ui.jqgrid.css"/>
        <script id="credits-data" type="application/xml">
          <credits sum="-568,13">
            <item>
              <label>?</label>
              <type>?</type>
              <from>?</from>
              <to>?</to>
              <val>?</val>
              <tax>?</tax>
              <final>?</final>
            </item>
          </credits>
        </script>
        <script id="fixed-fees-data" type="application/xml">
          <fixed-fees>
            <item>
              <label>?</label>
              <count>?</count>
              <from>?</from>
              <to>?</to>
              <val>?</val>
              <tax>?</tax>
              <final>?</final>
            </item>
          </fixed-fees>
        </script>
        <script id="connection-fees-data" type="application/xml">
          <connection-fees sum="?">
            <item>
              <group>?</group>
              <label>?</label>
              <count>?</count>
              <period>?</period>
              <amount>?</amount>
              <free-units>?</free-units>
              <price>?</price>
              <tax>?</tax>
              <final>?</final>
            </item>
          </connection-fees>
        </script>
        <script type="text/javascript">
          function getRow( items, id, columns ) {
            var result = { "ID" : id };
            columns.forEach( function(key) {
              var $this = $(items[id]);
              result[key] = $this.find(key).text();
            } );
            return result;
          }
    
          function initGrid( grid, source, model, labels, caption, footer, grpfield )
          {
            var columns = model.map( function(rec) { return rec.name; } );
            var grouping = undefined;
            if ( grpfield != undefined ) {
              grouping = { 
                groupField : [grpfield], 
                groupDataSorted : false, 
                groupColumnShow : [false], 
                groupSummary : [true], 
              };
            }
            grid.jqGrid({
                        datatype: "local",
                        colNames: labels,
                        colModel: model,
                        multiselect: false,
                        caption: caption,
                        height: 'auto',
                        viewrecords: true,
                        sortname: grpfield,
                        grouping: grouping != undefined, 
                        groupingView : grouping,
                        footerrow: footer!=undefined,
                    });
        
            var parser = new DOMParser();
            var xmldoc = parser.parseFromString(source, "application/xml");
            var items = xmldoc.getElementsByTagName("item");
            for (i=0;i&lt;items.length;i++)
            {
              var row = getRow( items, i, columns );
              grid.jqGrid('addRowData', i, row );
            }
            if ( footer != undefined ) {
              var operation = grid.jqGrid("getCol", footer.sumcol, false, 'sum');
              var struct = {} 
              struct[footer.labelcol] = footer.label;
              struct[footer.sumcol] = operation; 
              grid.jqGrid("footerData", "set", struct );
            }
            grid.trigger("reloadGrid");
          }
        
          function initCredits() {
              var model = [
                { name: 'label', width: 200 },
                { name: 'type', width: 100 },
                { name: 'from', index : 'from', width:50, align: 'center', sorttype: "date",
                  cellattr: function(rowId, value, rowObject, colModel, arrData) { return ' colspan=2'; }, 
                  formatter : function(value, options, rData){ return value + " - "+rData['to']; } }, 
                { name: 'to', index : 'to', width:50, sorttype: "date",
                  cellattr: function(rowId, value, rowObject, colModel, arrData) { return " style=display:none; "; } },
                { name: 'val', width: 80, align: "right", sorttype: "float", formatter:"number" },
                { name: 'tax', width: 80, align: "right", sorttype: "int" },
                { name: 'final', width: 80, align: "right", sorttype: "float" },
              ];
              var labels = [ '', 'Typ slev', 'Od', 'Do', 'Slevy bez DPH', 'Sazba DPH', 'Celkem Kč*' ];
              var caption = 'Přehled kreditů a slev';
              var footer = { labelcol: 'label', label: 'Slevy celkem (bez DPH)', sumcol : 'val' };
              initGrid( $("#credits-table"), $("#credits-data").text(), model, labels, caption, footer );
          }
    
          function initFixed() {
              var model = [
                { name: 'label', width: 200 },
                { name: 'from', index : 'from', width:50, align: 'center', sorttype: "date",
                  cellattr: function(rowId, value, rowObject, colModel, arrData) { return ' colspan=2'; }, 
                  formatter : function(value, options, rData){ return value + " - "+rData['to']; } }, 
                { name: 'to', index : 'to', width:50, sorttype: "date",
                  cellattr: function(rowId, value, rowObject, colModel, arrData) { return " style=display:none; "; } },
                { name: 'count', width: 100, align: "right" },
                { name: 'val', width: 80, align: "right", sorttype: "float", formatter:"number" },
                { name: 'tax', width: 80, align: "right", sorttype: "int" },
                { name: 'final', width: 80, align: "right", sorttype: "float" },
              ];
              var labels = [ '', 'Od', 'Do', 'Počet', 'Cena bez DPH', 'Sazba DPH', 'Celkem Kč*' ];          
              var caption = 'Pravidelné poplatky';
              var footer = { labelcol: 'label', label: 'Celkem za pravidelné poplatky (bez DPH)', sumcol : 'val' };
              initGrid( $("#fixed-fees-table"), $("#fixed-fees-data").text(), model, labels, caption, footer );
          }
          
          function initConnection() {
              var model = [
                { name: 'group', width: 80, editable:true },
                { name: 'label', width: 200 },
                { name: 'count', width: 40 },
                { name: 'period', width: 55 },
                { name: 'amount', width: 80, sorttype: "date" },
                { name: 'free-units', width: 50, align: "right", sorttype: "float" },
                { name: 'price', width: 80, align: "right", sorttype: "float", summaryType:'sum' },
                { name: 'tax', width: 50, align: "right", sorttype: "int" },
                { name: 'final', width: 80, align: "right", sorttype: "float" },
              ];
              var labels = [ 'Skupina', '', 'Počet', 'Čas. rozmezí', 'Účtováno', 'Volné jednotky', 'Cena bez DPH', 'Sazba DPH', 'Celkem Kč*' ];
              var caption = 'Platby za spojení';
              var footer = { labelcol: 'label', label: 'Celkem za spojení (bez DPH)', sumcol : 'price' };
              initGrid( $("#connection-fees-table"), $("#connection-fees-data").text(), model, labels, caption, footer, 'group' );
          }
          
          $(document).ready( function() {
            initCredits();
            initFixed();
            initConnection();
          } );
        </script>
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
          <div class="transactions-dynamic">
            <table id="credits-table">
            </table>
            <br/>
            <table id="fixed-fees-table">
            </table>
            <br/>
            <table id="connection-fees-table">
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

*TDT* was simplified significantly as all the data handling complexities 
were moved to javascript code:

.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/10c-html-invoice-dynamic

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/html">
        <tdt:value key="$customer">/root/customer-info</tdt:value>
        <tdt:value key="$period">/root/account-info/period</tdt:value>
        <tdt:value key="$transactions">/root/transactions</tdt:value>
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
      <tdt:rule path="//script[@id='credits-data']/credits">
        <tdt:value key=".">$transactions/credits</tdt:value>
        <tdt:value key="recurse">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="//script[@id='credits-data']/credits/item/val">
        <tdt:value key="text()">translate(., ',', '.')</tdt:value>
      </tdt:rule>
      <!-- "fixed-fees" table -->
      <tdt:rule path="//script[@id='fixed-fees-data']/fixed-fees/item">
        <tdt:value key=".">$transactions/fixed-fees/item</tdt:value>
        <tdt:value key="recurse">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="//script[@id='fixed-fees-data']/fixed-fees/item/val">
        <tdt:value key="text()">translate(., ',', '.')</tdt:value>
      </tdt:rule>
      <!-- "connection-fees" table -->
      <tdt:rule path="//script[@id='connection-fees-data']/connection-fees/item">
        <tdt:value key=".">$transactions/connection-fees/group/item</tdt:value>
        <tdt:value key="recurse">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="//script[@id='connection-fees-data']/connection-fees/item/group">
        <tdt:value key=".">.</tdt:value>
        <tdt:value key="text()">../label</tdt:value>
      </tdt:rule>
      <tdt:rule path="//script[@id='connection-fees-data']/connection-fees/item/price">
        <tdt:value key="text()">translate(., ',', '.')</tdt:value>
      </tdt:rule>
      <!-- total -->
      <tdt:rule path="//table[@class='total']//td[@class='sum']">
        <tdt:value key="text()">$transactions/@sum</tdt:value>
      </tdt:rule>
    </tdt:transformation>




Data Instance
-------------

See `instance.html <instance.html>`_

.. raw:: html

   <iframe width="100%" height="1100" src="instance.html" allowfullscreen="allowfullscreen" frameborder="0">
   </iframe>

Data island is embedded in resulting HTML in XML format:

.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/10c-html-invoice-dynamic

   <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Rozpis tel: 739 447 098, 08.06. - 07.07.</title>
        <link rel="stylesheet" type="text/css" href="/tdt/static/invoice.css"/>
        <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.1.min.js"/>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqgrid/4.6.0/js/jquery.jqGrid.min.js"/>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqgrid/4.6.0/js/i18n/grid.locale-en.js"/>
        <link rel="stylesheet" type="text/css" media="screen" href="https://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
        <link rel="stylesheet" type="text/css" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/jqgrid/4.6.0/css/ui.jqgrid.css"/>
        <script id="credits-data" type="application/xml">
          <credits sum="-568,13">
            <item>
              <label>OPP+Light směr O2- 1,00 Kč</label>
              <type>na spojení</type>
              <from>08.06</from>
              <to>07.07.</to>
              <val>-10.17</val>
              <tax>21%</tax>
              <final>-12,30</final>
            </item>
            <item>
              <label>OPP+Light směr ost- 1,50 Kč</label>
              <type>na spojení</type>
              <from>08.06</from>
              <to>07.07.</to>
              <val>-556.16</val>
              <tax>21%</tax>
              <final>-673,00</final>
            </item>
            <item>
              <label>OP+OPPromo+Light - SMS 0,90Kč</label>
              <type>na spojení</type>
              <from>08.06</from>
              <to>07.07.</to>
              <val>-1.80</val>
              <tax>21%</tax>
              <final>-2,20</final>
            </item>
          </credits>
        </script>
        <script id="fixed-fees-data" type="application/xml">
          <fixed-fees>
            <item>
              <label>O2 Optimum Profi Light</label>
              <count>1</count>
              <from>08.06</from>
              <to>07.07.</to>
              <val>30.00</val>
              <tax>21%</tax>
              <final>36,30</final>
            </item>
            <item>
              <label>O2 Mobilní Internet Pro</label>
              <count>1</count>
              <from>08.06</from>
              <to>07.07.</to>
              <val>350.00</val>
              <tax>21%</tax>
              <final>423,50</final>
            </item>
            <item>
              <label>Team Nonstop</label>
              <count>1</count>
              <from>08.06</from>
              <to>07.07.</to>
              <val>1.00</val>
              <tax>21%</tax>
              <final>1,20</final>
            </item>
          </fixed-fees>
        </script>
        <script id="connection-fees-data" type="application/xml">
          <connection-fees sum="?">
            <item>
              <group>Volání</group>
              <label>Do mobilní sítě O2</label>
              <count>3</count>
              <period>špička</period>
              <amount>6:45 min</amount>
              <free-units>0:00</free-units>
              <price>16.95</price>
              <tax>21%</tax>
              <final>20,51</final>
            </item>
            <item>
              <group>Volání</group>
              <label>Do ostatních mobilních sítí ČR</label>
              <count>19</count>
              <period>špička</period>
              <amount>89:56 min</amount>
              <free-units>0:00</free-units>
              <price>394.28</price>
              <tax>21%</tax>
              <final>477,08</final>
            </item>
            <item>
              <group>Volání</group>
              <label/>
              <count>2</count>
              <period>mimo šp.</period>
              <amount>51:59 min</amount>
              <free-units>0:00</free-units>
              <price>227.73</price>
              <tax>21%</tax>
              <final>275,55</final>
            </item>
            <item>
              <group>Volání</group>
              <label/>
              <count>5</count>
              <period>víkend</period>
              <amount>42:21 min</amount>
              <free-units>0:00</free-units>
              <price>185.59</price>
              <tax>21%</tax>
              <final>224,56</final>
            </item>
            <item>
              <group>Volání</group>
              <label>Do pevných sítí v ČR</label>
              <count>4</count>
              <period>špička</period>
              <amount>8:17 min</amount>
              <free-units>0:00</free-units>
              <price>36.36</price>
              <tax>21%</tax>
              <final>44,00</final>
            </item>
            <item>
              <group>Volání</group>
              <label>Na bezplatné infolinky v ČR</label>
              <count>1</count>
              <period>špička</period>
              <amount>4:00 min</amount>
              <free-units>0:00</free-units>
              <price>0.00</price>
              <tax>21%</tax>
              <final>0,00</final>
            </item>
            <item>
              <group>Zprávy</group>
              <label>SMS do mobilních sítí v ČR</label>
              <count/>
              <period>vždy</period>
              <amount>3 SMS</amount>
              <free-units>0</free-units>
              <price>4.50</price>
              <tax>21%</tax>
              <final>5,45</final>
            </item>
            <item>
              <group>Data, Internet</group>
              <label>Připojení k Internetu</label>
              <count/>
              <period>vždy</period>
              <amount>126 874 kB</amount>
              <free-units>0</free-units>
              <price>0.00</price>
              <tax>21%</tax>
              <final>0,00</final>
            </item>
          </connection-fees>
        </script>
        <script type="text/javascript">
          function getRow( items, id, columns ) {
            var result = { "ID" : id };
            columns.forEach( function(key) {
              var $this = $(items[id]);
              result[key] = $this.find(key).text();
            } );
            return result;
          }
    
          function initGrid( grid, source, model, labels, caption, footer, grpfield )
          {
            var columns = model.map( function(rec) { return rec.name; } );
            var grouping = undefined;
            if ( grpfield != undefined ) {
              grouping = { 
                groupField : [grpfield], 
                groupDataSorted : false, 
                groupColumnShow : [false], 
                groupSummary : [true], 
              };
            }
            grid.jqGrid({
                        datatype: "local",
                        colNames: labels,
                        colModel: model,
                        multiselect: false,
                        caption: caption,
                        height: 'auto',
                        viewrecords: true,
                        sortname: grpfield,
                        grouping: grouping != undefined, 
                        groupingView : grouping,
                        footerrow: footer!=undefined,
                    });
        
            var parser = new DOMParser();
            var xmldoc = parser.parseFromString(source, "application/xml");
            var items = xmldoc.getElementsByTagName("item");
            for (i=0;i&lt;items.length;i++)
            {
              var row = getRow( items, i, columns );
              grid.jqGrid('addRowData', i, row );
            }
            if ( footer != undefined ) {
              var operation = grid.jqGrid("getCol", footer.sumcol, false, 'sum');
              var struct = {} 
              struct[footer.labelcol] = footer.label;
              struct[footer.sumcol] = operation; 
              grid.jqGrid("footerData", "set", struct );
            }
            grid.trigger("reloadGrid");
          }
        
          function initCredits() {
              var model = [
                { name: 'label', width: 200 },
                { name: 'type', width: 100 },
                { name: 'from', index : 'from', width:50, align: 'center', sorttype: "date",
                  cellattr: function(rowId, value, rowObject, colModel, arrData) { return ' colspan=2'; }, 
                  formatter : function(value, options, rData){ return value + " - "+rData['to']; } }, 
                { name: 'to', index : 'to', width:50, sorttype: "date",
                  cellattr: function(rowId, value, rowObject, colModel, arrData) { return " style=display:none; "; } },
                { name: 'val', width: 80, align: "right", sorttype: "float", formatter:"number" },
                { name: 'tax', width: 80, align: "right", sorttype: "int" },
                { name: 'final', width: 80, align: "right", sorttype: "float" },
              ];
              var labels = [ '', 'Typ slev', 'Od', 'Do', 'Slevy bez DPH', 'Sazba DPH', 'Celkem Kč*' ];
              var caption = 'Přehled kreditů a slev';
              var footer = { labelcol: 'label', label: 'Slevy celkem (bez DPH)', sumcol : 'val' };
              initGrid( $("#credits-table"), $("#credits-data").text(), model, labels, caption, footer );
          }
    
          function initFixed() {
              var model = [
                { name: 'label', width: 200 },
                { name: 'from', index : 'from', width:50, align: 'center', sorttype: "date",
                  cellattr: function(rowId, value, rowObject, colModel, arrData) { return ' colspan=2'; }, 
                  formatter : function(value, options, rData){ return value + " - "+rData['to']; } }, 
                { name: 'to', index : 'to', width:50, sorttype: "date",
                  cellattr: function(rowId, value, rowObject, colModel, arrData) { return " style=display:none; "; } },
                { name: 'count', width: 100, align: "right" },
                { name: 'val', width: 80, align: "right", sorttype: "float", formatter:"number" },
                { name: 'tax', width: 80, align: "right", sorttype: "int" },
                { name: 'final', width: 80, align: "right", sorttype: "float" },
              ];
              var labels = [ '', 'Od', 'Do', 'Počet', 'Cena bez DPH', 'Sazba DPH', 'Celkem Kč*' ];          
              var caption = 'Pravidelné poplatky';
              var footer = { labelcol: 'label', label: 'Celkem za pravidelné poplatky (bez DPH)', sumcol : 'val' };
              initGrid( $("#fixed-fees-table"), $("#fixed-fees-data").text(), model, labels, caption, footer );
          }
          
          function initConnection() {
              var model = [
                { name: 'group', width: 80, editable:true },
                { name: 'label', width: 200 },
                { name: 'count', width: 40 },
                { name: 'period', width: 55 },
                { name: 'amount', width: 80, sorttype: "date" },
                { name: 'free-units', width: 50, align: "right", sorttype: "float" },
                { name: 'price', width: 80, align: "right", sorttype: "float", summaryType:'sum' },
                { name: 'tax', width: 50, align: "right", sorttype: "int" },
                { name: 'final', width: 80, align: "right", sorttype: "float" },
              ];
              var labels = [ 'Skupina', '', 'Počet', 'Čas. rozmezí', 'Účtováno', 'Volné jednotky', 'Cena bez DPH', 'Sazba DPH', 'Celkem Kč*' ];
              var caption = 'Platby za spojení';
              var footer = { labelcol: 'label', label: 'Celkem za spojení (bez DPH)', sumcol : 'price' };
              initGrid( $("#connection-fees-table"), $("#connection-fees-data").text(), model, labels, caption, footer, 'group' );
          }
          
          $(document).ready( function() {
            initCredits();
            initFixed();
            initConnection();
          } );
        </script>
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
          <div class="transactions-dynamic">
            <table id="credits-table">
            </table>
            <br/>
            <table id="fixed-fees-table">
            </table>
            <br/>
            <table id="connection-fees-table">
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
    





Source Data
-----------

Input data stay the same as in previous variant.

.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/10c-html-invoice-dynamic

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
            <from>08.06</from>
            <to>07.07.</to>
            <val>-10,17</val>
            <tax>21%</tax>
            <final>-12,30</final>
          </item>
          <item>
            <label>OPP+Light směr ost- 1,50 Kč</label>
            <type>na spojení</type>
            <from>08.06</from>
            <to>07.07.</to>
            <val>-556,16</val>
            <tax>21%</tax>
            <final>-673,00</final>
          </item>
          <item>
            <label>OP+OPPromo+Light - SMS 0,90Kč</label>
            <type>na spojení</type>
            <from>08.06</from>
            <to>07.07.</to>
            <val>-1,80</val>
            <tax>21%</tax>
            <final>-2,20</final>
          </item>
        </credits>
        <fixed-fees sum="381,00">
          <item>
            <label>O2 Optimum Profi Light</label>
            <count>1</count>
            <from>08.06</from>
            <to>07.07.</to>
            <val>30,00</val>
            <tax>21%</tax>
            <final>36,30</final>
          </item>
          <item>
            <label>O2 Mobilní Internet Pro</label>
            <count>1</count>
            <from>08.06</from>
            <to>07.07.</to>
            <val>350,00</val>
            <tax>21%</tax>
            <final>423,50</final>
          </item>
          <item>
            <label>Team Nonstop</label>
            <count>1</count>
            <from>08.06</from>
            <to>07.07.</to>
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
    




