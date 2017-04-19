==========================
03a - Radio Schedule (CRo)
==========================

:Author: Petr Filipsky

Overview
========

Let's say a user wants to collect schedule data of several radio broadcasters
and present them in a unified form.

The unified presentation data consist of a hierarchy of ``day``, ``station``,
``category`` and ``broadcast``. 

Every broadcaster provides an XML feed containing schedule for next several days, 
but the problem is that each broadcaster has a different data structure. 

The solution is to define a single *Data template* but a different *Data transformation*
for every broadcaster. Then the transformations convert various input data formats to 
a single unified data structure - which is then used for presentation.

The broadcasters we demonstrate in this example are:

* `Czech radio <http://www.rozhlas.cz/english/portal>`_ (this document)
* `BBC radio <http://www.bbc.co.uk/radio>`_ (demonstrated `here <../03b-radio-bbc/index.html>`_)


Test case definition
====================

Data Template
-------------

There can be several ``days``, for each ``day`` there is a list of ``stations``,
each broadcasting several ``categories``. Each ``category`` then contains a 
sequence of ``broadcasts``, for each ``broadcast`` we would like to present 
a ``name``, ``time``, ``duration``, ``synopsis`` and an optional ``hyperlink``.

This is a unified *Data template*. The same structure is used for every broadcaster:

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/03-radio-cro

   <data>
      <day date="?">
        <station name="?">
          <category name="?">
            <broadcast duration="?" time="?">
              <name>?</name>
              <synopsis>?</synopsis>
              <hyperlink>?</hyperlink>
            </broadcast>
          </category>
        </station>
      </day>
    </data>




If the intended presentation hierarchy more-or-less corresponds to this 
data hierarchy then the design process should be relatively straightforward - 
just a bunch of nested *repeaters* and *substitutions* with relative *xpaths*.


Data schema
-----------

Data schema would provide some additional info about each node.
	
For example:
	
	- The ``day``, ``station``, ``category`` and ``broadcast`` nodes are repeatable
	- The ``name`` node is mandatory
	- The ``hyperlink`` node is optional
	- The ``/day/@date`` has a specific *DATE* format
	- The ``broadcast/@time`` has a specific *TIME* format
	- The ``hyperlink/text()`` has a specific *URL* format
  
We can validate both *Data template* and *Data instances* with *Data schema*.
  
Validation process should provide a strong guarantee that data (either defined by user
or produced by a transformation) have a correct structure as expected. 


Source data
-----------


The *Czech Radio* stations use the following XML structure for their published shedule data.
(the live data for current day can be reached at `this address <http://program.rozhlas.cz/xml.php>`_).


.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/03-radio-cro

   <program>
      <den datum="Středa 2.7." date="2014-07-02">
        <porad stanice="CR1T" relace="dopoledne" id="849608106">
          <nazev_stanice>Český rozhlas 1 - Radiožurnál</nazev_stanice>
          <casvysilani od="0" do="540">2014-07-02 00:00:00</casvysilani>
          <edice rscr_kod="0" priznak=""/>
          <nazev>Zprávy</nazev>
          <popis>Zpravodajství z Česka i ze světa. Sport, Zelená vlna a předpověď počasí. O dopravní situaci informujte na bezplatné lince 800 12 20 12. </popis>
          <url>_porad/157</url>
          <typporadu_nazev id="1">Zpravodajství (zprávy vč. sportovních)</typporadu_nazev>
          <minutaz>9</minutaz>
        </porad>
        <porad stanice="CR1T" relace="dopoledne" id="849608135">
          <nazev_stanice>Český rozhlas 1 - Radiožurnál</nazev_stanice>
          <casvysilani od="16200" do="16320">2014-07-02 04:30:00</casvysilani>
          <edice rscr_kod="0" priznak=""/>
          <nazev>Zprávy</nazev>
          <popis>Zpravodajství z Česka i ze světa. Sport, Zelená vlna a předpověď počasí. O dopravní situaci informujte na bezplatné lince 800 12 20 12. </popis>
          <url>_porad/157</url>
          <typporadu_nazev id="1">Zpravodajství (zprávy vč. sportovních)</typporadu_nazev>
          <minutaz>2</minutaz>
        </porad>
        <porad stanice="CRo2" relace="dopoledne" id="849608302">
          <nazev_stanice>Český rozhlas 2 - Praha</nazev_stanice>
          <casvysilani od="16200" do="18000">2014-07-02 04:30:00</casvysilani>
          <edice rscr_kod="0" priznak=""/>
          <nazev>Hudební budíček</nazev>
          <popis>Maximum hudby pro příjemné probuzení. </popis>
          <typporadu_nazev id="13">Ostatní pořady (jinak neuvedené)</typporadu_nazev>
          <minutaz>30</minutaz>
        </porad>
        <porad stanice="CRo2" relace="dopoledne" id="849608303">
          <nazev_stanice>Český rozhlas 2 - Praha</nazev_stanice>
          <casvysilani od="18000" do="30600">2014-07-02 05:00:00</casvysilani>
          <edice rscr_kod="0" priznak=""/>
          <nazev>Dobré ráno, Česko!</nazev>
          <popis>Moderují Jitka Lukešová a Pavel Kučera. Čerstvé informace, počasí, ranní noviny, kalendárium a vaše příběhy.  K tomu písničky, které vás naladí, i humor, který vás pobaví. Kontaktní e-mail: rano@rozhlas.cz. 
            
            <br/>Zprávy: 5.00, 5.30, 6.00, 6.30, 7.00, 7.30, 8.00 
          
          </popis>
          <url>_porad/100293</url>
          <typporadu_nazev id="15">Magazín zprav., publicistiky a hudby</typporadu_nazev>
          <minutaz>210</minutaz>
        </porad>
        <porad stanice="WAVE" relace="dopoledne" id="849608578">
          <nazev_stanice>Český rozhlas Radio Wave</nazev_stanice>
          <casvysilani od="18000" do="21600">2014-07-02 05:00:00</casvysilani>
          <edice rscr_kod="0" priznak=""/>
          <nazev>Friday Ripple</nazev>
          <popis>Alternative music, global style! Jason The Shark presents the hottest  electronic sounds from all around the planet. There's a heavy focus on the latest music from Africa, but you'll also hear from scenes all over the world.  There's a lot out there ? tune in for what you won't hear on radio anywhere else in Europe!  </popis>
          <url>http://www.rozhlas.cz/radiowave/friday_ripple/</url>
          <typporadu_nazev id="35">Hudební pořady jiné - populární hudba</typporadu_nazev>
          <minutaz>60</minutaz>
        </porad>
        <porad stanice="WAVE" relace="dopoledne" id="849608579">
          <nazev_stanice>Český rozhlas Radio Wave</nazev_stanice>
          <casvysilani od="21600" do="25200">2014-07-02 06:00:00</casvysilani>
          <edice rscr_kod="0" priznak=""/>
          <nazev>Music Check</nazev>
          <popis>Music Check je hodina plná hudby vybírané z playlistu Radia Wave.  </popis>
          <url>http://www.rozhlas.cz/radiowave/porady/_zprava/371629</url>
          <typporadu_nazev id="35">Hudební pořady jiné - populární hudba</typporadu_nazev>
          <minutaz>60</minutaz>
        </porad>
        <porad stanice="DDur" relace="vecer" id="849608571">
          <nazev_stanice>Český rozhlas D-dur</nazev_stanice>
          <casvysilani od="78281" do="79565">2014-07-02 21:44:00</casvysilani>
          <edice rscr_kod="0" priznak=""/>
          <nazev>Franz Liszt: Koncert pro klavír a orchestr č. 2 A dur, S. 125</nazev>
          <popis>Hrají Marc-André Hamelin (klavír) a Montrealský symfonický orchestr, řídí Kent Nagano.</popis>
          <typporadu_nazev id="10">Hudební pořady</typporadu_nazev>
          <minutaz>22</minutaz>
        </porad>
        <porad stanice="DDur" relace="vecer" id="849608573">
          <nazev_stanice>Český rozhlas D-dur</nazev_stanice>
          <casvysilani od="82881" do="83114">2014-07-02 23:01:00</casvysilani>
          <edice rscr_kod="0" priznak=""/>
          <nazev>Georges Bizet: Farandole, z 'L'Arlésienne Suite č. 2'</nazev>
          <popis>Hraje Montrealský symfonický orchestr, řídí Kent Nagano.</popis>
          <typporadu_nazev id="10">Hudební pořady</typporadu_nazev>
          <minutaz>4</minutaz>
        </porad>
      </den>
    </program>
    



Transformation
--------------

Here is the *Data transformation* converting input data to unified form specified by the *Data template*.

The transformation is relatively simple, it just groups the ``porad`` elements at various levels
(``station``, ``category``) to make more hierarchical structure as required.


.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/03-radio-cro

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data/day">
        <tdt:value key=".">/program/den</tdt:value>
        <tdt:value key="@date">@date</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station">
        <tdt:value key=".">tdt:group( porad, '~@stanice' )</tdt:value>
        <tdt:value key="@name">tdt:ungroup()[1]/nazev_stanice</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station/category">
        <tdt:value key=".">tdt:group( tdt:ungroup(.), '~typporadu_nazev/@id' )</tdt:value>
        <tdt:value key="@name">tdt:ungroup()[1]/typporadu_nazev/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station/category/broadcast">
        <tdt:value key=".">tdt:ungroup()</tdt:value>
        <tdt:value key="@duration">casvysilani/@do - casvysilani/@od</tdt:value>
        <tdt:value key="@time">substring-after(casvysilani/text(), ' ')</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station/category/broadcast/hyperlink">
        <tdt:value key=".">url</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station/category/broadcast/name">
        <tdt:value key="text()">nazev/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station/category/broadcast/synopsis">
        <tdt:value key="text()">string(popis/text())</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    



The demonstrated version processes input data which are already downloaded from the broadcaster's server.

If we changed the ``xpath`` in the *rule* for ``/data/day`` element to the following form:

.. code::   xml
   :name: transformation-alternative CRo

   <tdt:rule path="/data/day">
     <tdt:value key="xpath">tdt:document('http://program.rozhlas.cz/xml.php')/program/den</tdt:value>
   </tdt:rule>


then the *Transformation Processor* retrieves the data directly during the transformation process.


Expected Result
---------------


The following XML shows the expected result - `Czech Radio <http://www.rozhlas.cz/english/portal>`_ schedule 
converted to unified format:


.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/03-radio-cro

   <data>
      <day date="2014-07-02">
        <station name="Český rozhlas 1 - Radiožurnál">
          <category name="Zpravodajství (zprávy vč. sportovních)">
            <broadcast duration="540" time="00:00:00">
              <name>Zprávy</name>
              <synopsis>Zpravodajství z Česka i ze světa. Sport, Zelená vlna a předpověď počasí. O dopravní situaci informujte na bezplatné lince 800 12 20 12. </synopsis>
              <hyperlink>_porad/157</hyperlink>
            </broadcast>
            <broadcast duration="120" time="04:30:00">
              <name>Zprávy</name>
              <synopsis>Zpravodajství z Česka i ze světa. Sport, Zelená vlna a předpověď počasí. O dopravní situaci informujte na bezplatné lince 800 12 20 12. </synopsis>
              <hyperlink>_porad/157</hyperlink>
            </broadcast>
          </category>
        </station>
        <station name="Český rozhlas 2 - Praha">
          <category name="Ostatní pořady (jinak neuvedené)">
            <broadcast duration="1800" time="04:30:00">
              <name>Hudební budíček</name>
              <synopsis>Maximum hudby pro příjemné probuzení. </synopsis>
            </broadcast>
          </category>
          <category name="Magazín zprav., publicistiky a hudby">
            <broadcast duration="12600" time="05:00:00">
              <name>Dobré ráno, Česko!</name>
              <synopsis>Moderují Jitka Lukešová a Pavel Kučera. Čerstvé informace, počasí, ranní noviny, kalendárium a vaše příběhy.  K tomu písničky, které vás naladí, i humor, který vás pobaví. Kontaktní e-mail: rano@rozhlas.cz. 
            
            </synopsis>
              <hyperlink>_porad/100293</hyperlink>
            </broadcast>
          </category>
        </station>
        <station name="Český rozhlas Radio Wave">
          <category name="Hudební pořady jiné - populární hudba">
            <broadcast duration="3600" time="05:00:00">
              <name>Friday Ripple</name>
              <synopsis>Alternative music, global style! Jason The Shark presents the hottest  electronic sounds from all around the planet. There's a heavy focus on the latest music from Africa, but you'll also hear from scenes all over the world.  There's a lot out there ? tune in for what you won't hear on radio anywhere else in Europe!  </synopsis>
              <hyperlink>http://www.rozhlas.cz/radiowave/friday_ripple/</hyperlink>
            </broadcast>
            <broadcast duration="3600" time="06:00:00">
              <name>Music Check</name>
              <synopsis>Music Check je hodina plná hudby vybírané z playlistu Radia Wave.  </synopsis>
              <hyperlink>http://www.rozhlas.cz/radiowave/porady/_zprava/371629</hyperlink>
            </broadcast>
          </category>
        </station>
        <station name="Český rozhlas D-dur">
          <category name="Hudební pořady">
            <broadcast duration="1284" time="21:44:00">
              <name>Franz Liszt: Koncert pro klavír a orchestr č. 2 A dur, S. 125</name>
              <synopsis>Hrají Marc-André Hamelin (klavír) a Montrealský symfonický orchestr, řídí Kent Nagano.</synopsis>
            </broadcast>
            <broadcast duration="233" time="23:01:00">
              <name>Georges Bizet: Farandole, z 'L'Arlésienne Suite č. 2'</name>
              <synopsis>Hraje Montrealský symfonický orchestr, řídí Kent Nagano.</synopsis>
            </broadcast>
          </category>
        </station>
      </day>
    </data>
    




