==========================
03b - Radio Schedule (BBC)
==========================

:Author: Petr Filipsky

Overview
========

This is just another variation of use case `already described here <../03a-radio-cro/index.html>`_.

Here we convert schedule XML data provided by `BBC radio <http://www.bbc.co.uk/radio>`_ broadcaster.

Test case definition
====================


Data Template
-------------

This is a unified *Data template*. The same structure is used for every broadcaster:

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/03-radio-bbc

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




Source data
-----------

The BBC stations use the following XML structure for their published shedule data.
(the live data for current day can be reached at 
`this address <http://www.bbc.co.uk/radio1/programmes/schedules/england/ataglance.xml>`_).


.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/03-radio-bbc

   <schedule>
      <service type="radio" key="radio1">
        <title>BBC Radio 1</title>
        <outlet key="england">
          <title>England</title>
        </outlet>
      </service>
      <day date="2014-01-20" has_next="1" has_previous="1">
        <broadcasts>
          <broadcast is_repeat="0" is_blanked="0">
            <pid>p01plbf9</pid>
            <start>2014-01-20T00:00:00Z</start>
            <end>2014-01-20T02:00:00Z</end>
            <duration>7200</duration>
            <programme type="episode">
              <pid>b03q0xdl</pid>
              <position/>
              <title>20/01/2014</title>
              <short_synopsis>London Grammar have a new music tip in Band Mates and SertOne gets 300 Seconds to Mix.</short_synopsis>
              <media_type>audio</media_type>
              <duration>7200</duration>
              <display_titles>
                <title>BBC Introducing with Jen and Ally</title>
                <subtitle>20/01/2014</subtitle>
              </display_titles>
              <first_broadcast_date>2014-01-20T00:00:00Z</first_broadcast_date>
              <ownership>
                <service type="radio" id="bbc_radio_one" key="radio1">
                  <title>BBC Radio 1</title>
                </service>
              </ownership>
              <programme type="brand">
                <pid>b01jk7zb</pid>
                <title>BBC Introducing with Jen and Ally</title>
                <position/>
                <expected_child_count/>
                <first_broadcast_date>2012-06-18T00:00:00+01:00</first_broadcast_date>
                <ownership>
                  <service type="radio" id="bbc_radio_one" key="radio1">
                    <title>BBC Radio 1</title>
                  </service>
                </ownership>
              </programme>
              <available_until>2014-01-27T02:02:00Z</available_until>
              <actual_start>2014-01-20T03:53:04Z</actual_start>
              <is_available_mediaset_pc_sd>1</is_available_mediaset_pc_sd>
              <is_legacy_media>0</is_legacy_media>
              <media format="audio">
                <expires>2014-01-27T02:02:00Z</expires>
                <availability>7 days left to listen</availability>
              </media>
            </programme>
          </broadcast>
          <broadcast is_repeat="0" is_blanked="0">
            <pid>p01pqflk</pid>
            <start>2014-01-20T12:45:00Z</start>
            <end>2014-01-20T13:00:00Z</end>
            <duration>900</duration>
            <programme type="episode">
              <pid>b03ntts2</pid>
              <position/>
              <title>20/01/2014</title>
              <short_synopsis>The latest news from around the UK and around the world.</short_synopsis>
              <media_type>audio</media_type>
              <duration>900</duration>
              <image>
                <pid>p01lc3bc</pid>
              </image>
              <display_titles>
                <title>Newsbeat</title>
                <subtitle>20/01/2014</subtitle>
              </display_titles>
              <first_broadcast_date>2014-01-20T12:45:00Z</first_broadcast_date>
              <ownership>
                <service type="radio" id="bbc_radio_one" key="radio1">
                  <title>BBC Radio 1</title>
                </service>
              </ownership>
              <programme type="brand">
                <pid>b006wkry</pid>
                <title>Newsbeat</title>
                <position/>
                <expected_child_count/>
                <first_broadcast_date>2007-09-17T12:45:00+01:00</first_broadcast_date>
                <ownership>
                  <service type="radio" id="bbc_radio_one" key="radio1">
                    <title>BBC Radio 1</title>
                  </service>
                </ownership>
              </programme>
              <is_available_mediaset_pc_sd>0</is_available_mediaset_pc_sd>
              <is_legacy_media>0</is_legacy_media>
            </programme>
          </broadcast>
          <broadcast is_repeat="0" is_blanked="0">
            <pid>p01pqfll</pid>
            <start>2014-01-20T13:00:00Z</start>
            <end>2014-01-20T16:00:00Z</end>
            <duration>10800</duration>
            <programme type="episode">
              <pid>b03ntts4</pid>
              <position/>
              <title>20/01/2014</title>
              <short_synopsis>Scott entertains the nation.</short_synopsis>
              <media_type>audio</media_type>
              <duration>10800</duration>
              <image>
                <pid>p01m5ry6</pid>
              </image>
              <display_titles>
                <title>Scott Mills</title>
                <subtitle>20/01/2014</subtitle>
              </display_titles>
              <first_broadcast_date>2014-01-20T13:00:00Z</first_broadcast_date>
              <ownership>
                <service type="radio" id="bbc_radio_one" key="radio1">
                  <title>BBC Radio 1</title>
                </service>
              </ownership>
              <programme type="brand">
                <pid>b006wkt4</pid>
                <title>Scott Mills</title>
                <position/>
                <expected_child_count/>
                <first_broadcast_date>2007-09-17T16:00:00+01:00</first_broadcast_date>
                <ownership>
                  <service type="radio" id="bbc_radio_one" key="radio1">
                    <title>BBC Radio 1</title>
                  </service>
                </ownership>
              </programme>
              <is_available_mediaset_pc_sd>0</is_available_mediaset_pc_sd>
              <is_legacy_media>0</is_legacy_media>
            </programme>
          </broadcast>
          <broadcast is_repeat="0" is_blanked="0">
            <pid>p01pqfln</pid>
            <start>2014-01-20T17:45:00Z</start>
            <end>2014-01-20T18:00:00Z</end>
            <duration>900</duration>
            <programme type="episode">
              <pid>b03ntts6</pid>
              <position/>
              <title>20/01/2014</title>
              <short_synopsis>The latest news from around the UK and around the world.</short_synopsis>
              <media_type>audio</media_type>
              <duration>900</duration>
              <image>
                <pid>p01lc3bc</pid>
              </image>
              <display_titles>
                <title>Newsbeat</title>
                <subtitle>20/01/2014</subtitle>
              </display_titles>
              <first_broadcast_date>2014-01-20T17:45:00Z</first_broadcast_date>
              <ownership>
                <service type="radio" id="bbc_radio_one" key="radio1">
                  <title>BBC Radio 1</title>
                </service>
              </ownership>
              <programme type="brand">
                <pid>b006wkry</pid>
                <title>Newsbeat</title>
                <position/>
                <expected_child_count/>
                <first_broadcast_date>2007-09-17T12:45:00+01:00</first_broadcast_date>
                <ownership>
                  <service type="radio" id="bbc_radio_one" key="radio1">
                    <title>BBC Radio 1</title>
                  </service>
                </ownership>
              </programme>
              <is_available_mediaset_pc_sd>0</is_available_mediaset_pc_sd>
              <is_legacy_media>0</is_legacy_media>
            </programme>
          </broadcast>
        </broadcasts>
      </day>
      <service type="radio" key="1xtra">
        <title>BBC Radio 1Xtra</title>
      </service>
      <day date="2014-01-21" has_next="1" has_previous="1">
        <broadcasts>
          <broadcast is_repeat="0" is_blanked="0">
            <pid>p01plcqq</pid>
            <start>2014-01-21T02:00:00Z</start>
            <end>2014-01-21T04:00:00Z</end>
            <duration>7200</duration>
            <programme type="episode">
              <pid>b03q0xdn</pid>
              <position/>
              <title>Lights On with Chimpo</title>
              <short_synopsis>Chimpo has the Lights On Mix for Monki, plus another Simmer Down Selection.</short_synopsis>
              <media_type>audio</media_type>
              <duration>7200</duration>
              <display_titles>
                <title>Monki</title>
                <subtitle>Lights On with Chimpo</subtitle>
              </display_titles>
              <first_broadcast_date>2014-01-21T02:00:00Z</first_broadcast_date>
              <ownership>
                <service type="radio" id="bbc_radio_one" key="radio1">
                  <title>BBC Radio 1</title>
                </service>
              </ownership>
              <programme type="brand">
                <pid>b01ryt1v</pid>
                <title>Monki</title>
                <position/>
                <expected_child_count/>
                <first_broadcast_date>2013-05-20T02:00:00+01:00</first_broadcast_date>
                <ownership>
                  <service type="radio" id="bbc_radio_one" key="radio1">
                    <title>BBC Radio 1</title>
                  </service>
                </ownership>
              </programme>
              <available_until>2014-01-27T04:02:00Z</available_until>
              <actual_start>2014-01-21T05:04:44Z</actual_start>
              <is_available_mediaset_pc_sd>1</is_available_mediaset_pc_sd>
              <is_legacy_media>0</is_legacy_media>
              <media format="audio">
                <expires>2014-01-27T04:02:00Z</expires>
                <availability>7 days left to listen</availability>
              </media>
            </programme>
          </broadcast>
          <broadcast is_repeat="0" is_blanked="0">
            <pid>p01pqfy7</pid>
            <start>2014-01-21T16:00:00Z</start>
            <end>2014-01-21T17:45:00Z</end>
            <duration>6300</duration>
            <programme type="episode">
              <pid>b03ny3nq</pid>
              <position/>
              <title>20/01/2014</title>
              <short_synopsis>Charlie respins P Money's Fire in the Booth.</short_synopsis>
              <media_type>audio</media_type>
              <duration>6300</duration>
              <image>
                <pid>p01m1yyk</pid>
              </image>
              <display_titles>
                <title>Charlie Sloth</title>
                <subtitle>21/01/2014</subtitle>
              </display_titles>
              <first_broadcast_date>2014-01-21T16:00:00Z</first_broadcast_date>
              <ownership>
                <service type="radio" id="bbc_1xtra" key="1xtra">
                  <title>BBC Radio 1Xtra</title>
                </service>
              </ownership>
              <programme type="brand">
                <pid>b00x2ymq</pid>
                <title>Charlie Sloth</title>
                <position/>
                <expected_child_count/>
                <first_broadcast_date>2011-01-08T10:00:00Z</first_broadcast_date>
                <ownership>
                  <service type="radio" id="bbc_1xtra" key="1xtra">
                    <title>BBC Radio 1Xtra</title>
                  </service>
                </ownership>
              </programme>
              <is_available_mediaset_pc_sd>0</is_available_mediaset_pc_sd>
              <is_legacy_media>0</is_legacy_media>
            </programme>
          </broadcast>
          <broadcast is_repeat="0" is_blanked="0">
            <pid>p01pqfy9</pid>
            <start>2014-01-21T18:00:00Z</start>
            <end>2014-01-21T19:00:00Z</end>
            <duration>3600</duration>
            <programme type="episode">
              <pid>b03ny3ns</pid>
              <position/>
              <title>20/01/2014</title>
              <short_synopsis>Big beats from the big man!</short_synopsis>
              <media_type>audio</media_type>
              <duration>3600</duration>
              <image>
                <pid>p01m1yyk</pid>
              </image>
              <display_titles>
                <title>Charlie Sloth</title>
                <subtitle>21/01/2014</subtitle>
              </display_titles>
              <first_broadcast_date>2014-01-21T18:00:00Z</first_broadcast_date>
              <ownership>
                <service type="radio" id="bbc_1xtra" key="1xtra">
                  <title>BBC Radio 1Xtra</title>
                </service>
              </ownership>
              <programme type="brand">
                <pid>b00x2ymq</pid>
                <title>Charlie Sloth</title>
                <position/>
                <expected_child_count/>
                <first_broadcast_date>2011-01-08T10:00:00Z</first_broadcast_date>
                <ownership>
                  <service type="radio" id="bbc_1xtra" key="1xtra">
                    <title>BBC Radio 1Xtra</title>
                  </service>
                </ownership>
              </programme>
              <is_available_mediaset_pc_sd>0</is_available_mediaset_pc_sd>
              <is_legacy_media>0</is_legacy_media>
            </programme>
          </broadcast>
        </broadcasts>
      </day>
    </schedule>
    



Transformation
--------------

Here is the *Data transformation* converting input data to unified form specified by the *Data template*.

The transformation is relatively simple, it just groups the ``broadcast`` elements at various levels
(``station``, ``category``) to make more hierarchical structure as required.


.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/03-radio-bbc

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data/day">
        <tdt:value key=".">/schedule/day</tdt:value>
        <tdt:value key="@date">@date</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station">
        <tdt:value key=".">tdt:group( broadcasts/broadcast, '~programme/ownership/service/@key')</tdt:value>
        <tdt:value key="@name">key[1]</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station/category">
        <tdt:value key=".">tdt:group( tdt:ungroup(), '~programme/programme/title/text()' )</tdt:value>
        <tdt:value key="@name">key[1]</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station/category/broadcast">
        <tdt:value key=".">tdt:ungroup()</tdt:value>
        <tdt:value key="@time">substring-before( substring-after( start/text(), 'T' ), 'Z' )</tdt:value>
        <tdt:value key="@duration">duration/text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station/category/broadcast/hyperlink">
        <tdt:value key=".">programme/pid</tdt:value>
        <tdt:value key="text()">concat( 'http://www.bbc.co.uk/programmes/', . )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station/category/broadcast/name">
        <tdt:value key="text()">concat( programme/display_titles/title, ' - ', programme/display_titles/subtitle )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/day/station/category/broadcast/synopsis">
        <tdt:value key="text()">programme/short_synopsis/text()</tdt:value>
      </tdt:rule>
    </tdt:transformation>



The demonstrated version processes input data which are already downloaded from the broadcaster's server.

If we changed the ``xpath`` in the *rule* for ``/data/day`` element to the following form:

.. code::   xml
   :name: transformation-alternative CRo

   <tdt:rule path="/data/day">
     <tdt:value key="xpath">tdt:document('http://www.bbc.co.uk/radio1/programmes/schedules/england/ataglance.xml')/schedule/day</tdt:value>
   </tdt:rule>


then the *processor* would retrieve the data directly during the transformation process.


Expected Result
---------------

The following XML shows the expected result - *BBC Radio* schedule 
converted to unified format:


.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/03-radio-bbc

   <data>
      <day date="2014-01-20">
        <station>
          <category>
            <broadcast duration="7200" time="00:00:00">
              <name>BBC Introducing with Jen and Ally - 20/01/2014</name>
              <synopsis>London Grammar have a new music tip in Band Mates and SertOne gets 300 Seconds to Mix.</synopsis>
              <hyperlink>http://www.bbc.co.uk/programmes/b03q0xdl</hyperlink>
            </broadcast>
          </category>
          <category>
            <broadcast duration="900" time="12:45:00">
              <name>Newsbeat - 20/01/2014</name>
              <synopsis>The latest news from around the UK and around the world.</synopsis>
              <hyperlink>http://www.bbc.co.uk/programmes/b03ntts2</hyperlink>
            </broadcast>
            <broadcast duration="900" time="17:45:00">
              <name>Newsbeat - 20/01/2014</name>
              <synopsis>The latest news from around the UK and around the world.</synopsis>
              <hyperlink>http://www.bbc.co.uk/programmes/b03ntts6</hyperlink>
            </broadcast>
          </category>
          <category>
            <broadcast duration="10800" time="13:00:00">
              <name>Scott Mills - 20/01/2014</name>
              <synopsis>Scott entertains the nation.</synopsis>
              <hyperlink>http://www.bbc.co.uk/programmes/b03ntts4</hyperlink>
            </broadcast>
          </category>
        </station>
      </day>
      <day date="2014-01-21">
        <station>
          <category>
            <broadcast duration="7200" time="02:00:00">
              <name>Monki - Lights On with Chimpo</name>
              <synopsis>Chimpo has the Lights On Mix for Monki, plus another Simmer Down Selection.</synopsis>
              <hyperlink>http://www.bbc.co.uk/programmes/b03q0xdn</hyperlink>
            </broadcast>
          </category>
        </station>
        <station>
          <category>
            <broadcast duration="6300" time="16:00:00">
              <name>Charlie Sloth - 21/01/2014</name>
              <synopsis>Charlie respins P Money's Fire in the Booth.</synopsis>
              <hyperlink>http://www.bbc.co.uk/programmes/b03ny3nq</hyperlink>
            </broadcast>
            <broadcast duration="3600" time="18:00:00">
              <name>Charlie Sloth - 21/01/2014</name>
              <synopsis>Big beats from the big man!</synopsis>
              <hyperlink>http://www.bbc.co.uk/programmes/b03ny3ns</hyperlink>
            </broadcast>
          </category>
        </station>
      </day>
    </data>
    




