===============================
06 - Google Distance Matrix API
===============================

:Author: Petr Filipsky

Overview
========

Let's say a user wants to utilize an *external online service* and immediately present retrieved data in a readable form.

As an example we can choose `The Google Distance Matrix API <https://developers.google.com/maps/documentation/distancematrix>`_.

For given ``source`` (e.g. ``Gothenburg|Lviv|Prague|Stockholm``) and ``destination`` (e.g. ``Gothenburg|Lviv|Prague|Stockholm``) 
strings embeddes directly in user defined URL we obtain the following raw 
`XML data <http://maps.googleapis.com/maps/api/distancematrix/xml?origins=Gothenburg|Lviv|Prague|Stockholm&destinations=Gothenburg|Lviv|Prague|Stockholm>`_.

What if we want to visualize retrieved data in a form of a HTML table. Can TDT help us somehow?

Test case definition
====================


Source data
-----------

The *Source Data* contain just a list of cities we want to include in the *distance matrix*:

.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/06-google-distance-matrix

   <data>
      <message>
        <city>Gothenburg</city>
        <city>Lviv</city>
        <city>Prague</city>
        <city>Stockholm</city>
      </message>
    </data>




Data Template
-------------

See `template.html <template.html>`_

The *Data template* serves as a skeleton for `HTML table <http://en.wikipedia.org/wiki/HTML_element#Tables>`_,
so the whole HTML structure including embedded 
`CSS style sheet <http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Sources>`_ is statically defined as follows:

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/06-google-distance-matrix

   <html>
      <head>
        <style>
    		 .distance {font-style: normal;} 
    		 .duration {font-style: italic;}
    		 table tr:nth-child(even) { background-color: #ddd;}
    		 th,td { padding: 0 10 0 10; }
           </style>
      </head>
      <body>
        <table>
          <tr>
            <th/>
            <th>?</th>
          </tr>
          <tr>
            <th>?</th>
            <td>
              <span>
                <span class="distance">?</span>
                <br/>
                <span class="duration">?</span>
              </span>
            </td>
          </tr>
        </table>
      </body>
    </html>




Transformation
--------------

The actual number of *rows* and *columns* with *labels* and *distance/duration values* 
will be filled in during *transformation*.

The transformation consists roughly of the following steps:

#. From given *input list* we compute the *key* used as a *source* and *destination* URI parameter
#. We retrieve *XML data* from computed google service URI
#. We repeat over all ``destination addresses`` and fill the corresponding *labels* in ``header columns``
#. We repeat over all data ``rows`` and create corresponding ``table row``

   * For each ``table row`` we fill in ``source address``
   * For each ``row`` we iterate over all ``data elements`` and create ``table cell``
   * If the ``table cell`` is not at *diagonal* then we fill ``distance`` and ``duration`` in its content span 

.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/06-google-distance-matrix

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/html/body/table">
        <tdt:value key="$cities">/data/message/city</tdt:value>
        <tdt:value key="$key">tdt:concat($cities,'|')</tdt:value>
        <tdt:value key="$url">concat('http://maps.googleapis.com/maps/api/distancematrix/xml?origins=', $key, '&amp;', 'destinations=', $key )</tdt:value>
        <tdt:value key="$source">tdt:document($url)/DistanceMatrixResponse</tdt:value>
      </tdt:rule>
      <tdt:rule path="/html/body/table/tr[1]/th[2]">
        <tdt:value key=".">$source/destination_address</tdt:value>
        <tdt:value key="text()">text()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/html/body/table/tr[2]">
        <tdt:value key=".">$source/row</tdt:value>
        <tdt:value key="$row">position()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/html/body/table/tr[2]/td">
        <tdt:value key=".">element</tdt:value>
        <tdt:value key="$diagonal">position() = $row</tdt:value>
      </tdt:rule>
      <tdt:rule path="/html/body/table/tr[2]/td/span">
        <tdt:value key=".">self::node()[not($diagonal)]</tdt:value>
      </tdt:rule>
      <tdt:rule path="/html/body/table/tr[2]/td/span/span[1]">
        <tdt:value key="text()">distance/text</tdt:value>
      </tdt:rule>
      <tdt:rule path="/html/body/table/tr[2]/td/span/span[2]">
        <tdt:value key="text()">duration/text</tdt:value>
      </tdt:rule>
      <tdt:rule path="/html/body/table/tr[2]/th">
        <tdt:value key="$row">position()</tdt:value>
        <tdt:value key="text()">$source/origin_address[$row]</tdt:value>
      </tdt:rule>
    </tdt:transformation>




Expected Result
---------------

See `instance.html <instance.html>`_

.. raw:: html

   <iframe width="100%" height="300" src="instance.html" allowfullscreen="allowfullscreen" frameborder="0">
   </iframe>

In order to get the expected table we need to produce the following HTML code:

.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/06-google-distance-matrix

   <html>
      <head>
        <style>
    		 .distance {font-style: normal;} 
    		 .duration {font-style: italic;}
    		 table tr:nth-child(even) { background-color: #ddd;}
    		 th,td { padding: 0 10 0 10; }
           </style>
      </head>
      <body>
        <table>
          <tr>
            <th/>
            <th>Gothenburg, Sweden</th>
            <th>Lviv, Lviv Oblast, Ukraine</th>
            <th>Prague, Czech Republic</th>
            <th>Stockholm, Sweden</th>
          </tr>
          <tr>
            <th>Gothenburg, Sweden</th>
            <td/>
            <td>
              <span>
                <span class="distance">1,673 km</span>
                <br/>
                <span class="duration">18 hours 2 mins</span>
              </span>
            </td>
            <td>
              <span>
                <span class="distance">1,088 km</span>
                <br/>
                <span class="duration">12 hours 28 mins</span>
              </span>
            </td>
            <td>
              <span>
                <span class="distance">470 km</span>
                <br/>
                <span class="duration">4 hours 35 mins</span>
              </span>
            </td>
          </tr>
          <tr>
            <th>Lviv, Lviv Oblast, Ukraine</th>
            <td>
              <span>
                <span class="distance">1,678 km</span>
                <br/>
                <span class="duration">18 hours 10 mins</span>
              </span>
            </td>
            <td/>
            <td>
              <span>
                <span class="distance">877 km</span>
                <br/>
                <span class="duration">8 hours 38 mins</span>
              </span>
            </td>
            <td>
              <span>
                <span class="distance">2,019 km</span>
                <br/>
                <span class="duration">21 hours 17 mins</span>
              </span>
            </td>
          </tr>
          <tr>
            <th>Prague, Czech Republic</th>
            <td>
              <span>
                <span class="distance">1,088 km</span>
                <br/>
                <span class="duration">12 hours 25 mins</span>
              </span>
            </td>
            <td>
              <span>
                <span class="distance">872 km</span>
                <br/>
                <span class="duration">8 hours 22 mins</span>
              </span>
            </td>
            <td/>
            <td>
              <span>
                <span class="distance">1,429 km</span>
                <br/>
                <span class="duration">15 hours 32 mins</span>
              </span>
            </td>
          </tr>
          <tr>
            <th>Stockholm, Sweden</th>
            <td>
              <span>
                <span class="distance">467 km</span>
                <br/>
                <span class="duration">4 hours 34 mins</span>
              </span>
            </td>
            <td>
              <span>
                <span class="distance">2,012 km</span>
                <br/>
                <span class="duration">21 hours 9 mins</span>
              </span>
            </td>
            <td>
              <span>
                <span class="distance">1,427 km</span>
                <br/>
                <span class="duration">15 hours 36 mins</span>
              </span>
            </td>
            <td/>
          </tr>
        </table>
      </body>
    </html>
    

