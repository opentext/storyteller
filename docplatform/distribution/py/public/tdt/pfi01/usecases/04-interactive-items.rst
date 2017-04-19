======================
04 - Interactive Items
======================

:Author: Petr Filipsky

Test case definition
====================
Source data
-----------

.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/04-interactive-items

   <data>
      <message>
        <person gender="M" age="17" status="Aluminious"/>
        <person gender="M" age="17" status="Golden"/>
        <person gender="M" age="18" status="Aluminious"/>
        <person gender="M" age="18" status="Golden"/>
        <person gender="F" age="17" status="Aluminious"/>
        <person gender="F" age="17" status="Golden"/>
        <person gender="F" age="18" status="Aluminious"/>
        <person gender="F" age="18" status="Golden"/>
      </message>
    </data>
    




Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/04-interactive-items

   <data xmlns:ddi="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
      <labels>
        <label>P1 - every time</label>
        <label>P2 - every time</label>
        <label>P3 - every time</label>
        <label age="18">P4 - age &gt;= 18</label>
        <label age="18" gender="M">P5 - age &gt;= 18 and male</label>
        <label age="18">P6 - age &gt;= 18 </label>
        <label age="18" gender="F">P7 - age &gt;= 18 and female</label>
        <label status="Golden">P8 - state = "Golden"</label>
        <label status="Golden">P9 - state = "Golden"</label>
        <label status="Golden">P10 - state = "Golden"</label>
      </labels>
      <person gender="?" age="?" status="?">
        <ddi:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
          <item>
            <ddi:choice disabled="false" readonly="false" selected="?">?</ddi:choice>
            <ddi:label>?</ddi:label>
          </item>
        </ddi:input-group>
      </person>
    </data>
    




Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/04-interactive-items

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <!-- person info -->
      <!-- selection -->
      <tdt:rule path="/data/labels">
        <tdt:value key=".">tdt:nodeset()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/person">
        <tdt:value key=".">/data/message/person</tdt:value>
        <tdt:value key="$person">.</tdt:value>
        <tdt:value key="@gender">$person/@gender</tdt:value>
        <tdt:value key="@age">$person/@age</tdt:value>
        <tdt:value key="@status">$person/@status</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/person/ddi:input-group/item">
        <tdt:value key=".">tdt:template()/data/labels/label</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/person/ddi:input-group/item/ddi:choice">
        <tdt:value key="@selected">
             ( not(@age) or @age &lt;= $person/@age ) and
             ( not(@status) or @status = $person/@status ) and
             ( not(@gender) or @gender = $person/@gender )
           </tdt:value>
        <tdt:value key="text()">position()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/person/ddi:input-group/item/ddi:label">
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    




Compiled Transformation
-----------------------

.. code:: xml
   :number-lines:
   :name: compiled pfi01/usecases/04-interactive-items

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" xmlns:ddi="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1" version="1.0">
      <tdt:rule path="/data/labels">
        <tdt:value key=".">tdt:nodeset()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/person">
        <tdt:value key=".">/data/message/person</tdt:value>
        <tdt:value key="$person">.</tdt:value>
        <tdt:value key="@gender">$person/@gender</tdt:value>
        <tdt:value key="@age">$person/@age</tdt:value>
        <tdt:value key="@status">$person/@status</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/person/ddi:input-group/item">
        <tdt:value key=".">tdt:template()/data/labels/label</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/person/ddi:input-group/item/ddi:choice">
        <tdt:value key="@selected">
             ( not(@age) or @age &lt;= $person/@age ) and
             ( not(@status) or @status = $person/@status ) and
             ( not(@gender) or @gender = $person/@gender )
           </tdt:value>
        <tdt:value key="text()">position()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/person/ddi:input-group/item/ddi:label">
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    




Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/04-interactive-items

   <data xmlns:ddi="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
      <person gender="M" age="17" status="Aluminious">
        <ddi:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">1</ddi:choice>
            <ddi:label>P1 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">2</ddi:choice>
            <ddi:label>P2 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">3</ddi:choice>
            <ddi:label>P3 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">4</ddi:choice>
            <ddi:label>P4 - age &gt;= 18</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">5</ddi:choice>
            <ddi:label>P5 - age &gt;= 18 and male</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">6</ddi:choice>
            <ddi:label>P6 - age &gt;= 18 </ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">7</ddi:choice>
            <ddi:label>P7 - age &gt;= 18 and female</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">8</ddi:choice>
            <ddi:label>P8 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">9</ddi:choice>
            <ddi:label>P9 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">10</ddi:choice>
            <ddi:label>P10 - state = "Golden"</ddi:label>
          </item>
        </ddi:input-group>
      </person>
      <person gender="M" age="17" status="Golden">
        <ddi:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">1</ddi:choice>
            <ddi:label>P1 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">2</ddi:choice>
            <ddi:label>P2 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">3</ddi:choice>
            <ddi:label>P3 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">4</ddi:choice>
            <ddi:label>P4 - age &gt;= 18</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">5</ddi:choice>
            <ddi:label>P5 - age &gt;= 18 and male</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">6</ddi:choice>
            <ddi:label>P6 - age &gt;= 18 </ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">7</ddi:choice>
            <ddi:label>P7 - age &gt;= 18 and female</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">8</ddi:choice>
            <ddi:label>P8 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">9</ddi:choice>
            <ddi:label>P9 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">10</ddi:choice>
            <ddi:label>P10 - state = "Golden"</ddi:label>
          </item>
        </ddi:input-group>
      </person>
      <person gender="M" age="18" status="Aluminious">
        <ddi:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">1</ddi:choice>
            <ddi:label>P1 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">2</ddi:choice>
            <ddi:label>P2 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">3</ddi:choice>
            <ddi:label>P3 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">4</ddi:choice>
            <ddi:label>P4 - age &gt;= 18</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">5</ddi:choice>
            <ddi:label>P5 - age &gt;= 18 and male</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">6</ddi:choice>
            <ddi:label>P6 - age &gt;= 18 </ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">7</ddi:choice>
            <ddi:label>P7 - age &gt;= 18 and female</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">8</ddi:choice>
            <ddi:label>P8 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">9</ddi:choice>
            <ddi:label>P9 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">10</ddi:choice>
            <ddi:label>P10 - state = "Golden"</ddi:label>
          </item>
        </ddi:input-group>
      </person>
      <person gender="M" age="18" status="Golden">
        <ddi:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">1</ddi:choice>
            <ddi:label>P1 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">2</ddi:choice>
            <ddi:label>P2 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">3</ddi:choice>
            <ddi:label>P3 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">4</ddi:choice>
            <ddi:label>P4 - age &gt;= 18</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">5</ddi:choice>
            <ddi:label>P5 - age &gt;= 18 and male</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">6</ddi:choice>
            <ddi:label>P6 - age &gt;= 18 </ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">7</ddi:choice>
            <ddi:label>P7 - age &gt;= 18 and female</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">8</ddi:choice>
            <ddi:label>P8 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">9</ddi:choice>
            <ddi:label>P9 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">10</ddi:choice>
            <ddi:label>P10 - state = "Golden"</ddi:label>
          </item>
        </ddi:input-group>
      </person>
      <person gender="F" age="17" status="Aluminious">
        <ddi:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">1</ddi:choice>
            <ddi:label>P1 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">2</ddi:choice>
            <ddi:label>P2 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">3</ddi:choice>
            <ddi:label>P3 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">4</ddi:choice>
            <ddi:label>P4 - age &gt;= 18</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">5</ddi:choice>
            <ddi:label>P5 - age &gt;= 18 and male</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">6</ddi:choice>
            <ddi:label>P6 - age &gt;= 18 </ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">7</ddi:choice>
            <ddi:label>P7 - age &gt;= 18 and female</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">8</ddi:choice>
            <ddi:label>P8 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">9</ddi:choice>
            <ddi:label>P9 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">10</ddi:choice>
            <ddi:label>P10 - state = "Golden"</ddi:label>
          </item>
        </ddi:input-group>
      </person>
      <person gender="F" age="17" status="Golden">
        <ddi:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">1</ddi:choice>
            <ddi:label>P1 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">2</ddi:choice>
            <ddi:label>P2 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">3</ddi:choice>
            <ddi:label>P3 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">4</ddi:choice>
            <ddi:label>P4 - age &gt;= 18</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">5</ddi:choice>
            <ddi:label>P5 - age &gt;= 18 and male</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">6</ddi:choice>
            <ddi:label>P6 - age &gt;= 18 </ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">7</ddi:choice>
            <ddi:label>P7 - age &gt;= 18 and female</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">8</ddi:choice>
            <ddi:label>P8 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">9</ddi:choice>
            <ddi:label>P9 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">10</ddi:choice>
            <ddi:label>P10 - state = "Golden"</ddi:label>
          </item>
        </ddi:input-group>
      </person>
      <person gender="F" age="18" status="Aluminious">
        <ddi:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">1</ddi:choice>
            <ddi:label>P1 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">2</ddi:choice>
            <ddi:label>P2 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">3</ddi:choice>
            <ddi:label>P3 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">4</ddi:choice>
            <ddi:label>P4 - age &gt;= 18</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">5</ddi:choice>
            <ddi:label>P5 - age &gt;= 18 and male</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">6</ddi:choice>
            <ddi:label>P6 - age &gt;= 18 </ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">7</ddi:choice>
            <ddi:label>P7 - age &gt;= 18 and female</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">8</ddi:choice>
            <ddi:label>P8 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">9</ddi:choice>
            <ddi:label>P9 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">10</ddi:choice>
            <ddi:label>P10 - state = "Golden"</ddi:label>
          </item>
        </ddi:input-group>
      </person>
      <person gender="F" age="18" status="Golden">
        <ddi:input-group disabled="false" multiselect="true" name="usage_period" readonly="false">
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">1</ddi:choice>
            <ddi:label>P1 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">2</ddi:choice>
            <ddi:label>P2 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">3</ddi:choice>
            <ddi:label>P3 - every time</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">4</ddi:choice>
            <ddi:label>P4 - age &gt;= 18</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="false">5</ddi:choice>
            <ddi:label>P5 - age &gt;= 18 and male</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">6</ddi:choice>
            <ddi:label>P6 - age &gt;= 18 </ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">7</ddi:choice>
            <ddi:label>P7 - age &gt;= 18 and female</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">8</ddi:choice>
            <ddi:label>P8 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">9</ddi:choice>
            <ddi:label>P9 - state = "Golden"</ddi:label>
          </item>
          <item>
            <ddi:choice disabled="false" readonly="false" selected="true">10</ddi:choice>
            <ddi:label>P10 - state = "Golden"</ddi:label>
          </item>
        </ddi:input-group>
      </person>
    </data>
    




