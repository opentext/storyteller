=============================
07 - Translation as a Service
=============================

:Author: Petr Filipsky

Overview
========

This example demonstrates how easily we can integrate with an external translation service.

For demonstration we use the ``syslang.com`` free online translation service which powers
the `Frengly Online Translator <http://www.frengly.com/>`_ 
(see its `API documentation <http://www.frengly.com/translationAPI>`_ ).

When we call the service with following parameters:

- ``text`` ... ``Dear | Good bye | Sender | Street | Town | State``) 
- ``src`` ... ``en``
- ``dst`` ... ``cs``

We get the following `result <http://syslang.com/?email=a6269613@drdrb.net&password=veslo&src=en&dest=cs&text=%22Dear%20|%20Good%20bye%20|%20Sender%20|%20Street%20|%20Town%20|%20State%22>`_.

Test case definition
====================

Source data
-----------

The *Source Data* structure is fairly simple. It contains just a language we want the phrases to be translated to.
In principle there could be several languages, but unfortunately the free version of the translation service
limits the usage to just one request for each 2 or 3 seconds.

.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/07-translations

   <data>
      <message>
        <translation>sv</translation>
      </message>
    </data>
    




Data Template
-------------

The *Data Template* contains the phrases to be translated and a language they are written in.
Then there is a placeholder for translated phrases.

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/07-translations

   <data>
      <phrases xml:lang="en">
        <phrase>Dear</phrase>
        <phrase>Good bye</phrase>
        <phrase>Sender</phrase>
        <phrase>Street</phrase>
        <phrase>Town</phrase>
        <phrase>State</phrase>
      </phrases>
      <phrases xml:lang="?">
        <phrase>?</phrase>
      </phrases>
    </data>
    




Transformation
--------------

So the *TDT Definition* in this example simply does the following:

- Prepares the URI based on *source language*, *phrases* (in *Data Template*) and *destination language* (in *Data Source*) 
- Calls the translation service
- Parses the result and stores the translated phrases to *Data Instance*

.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/07-translations

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/data">
        <tdt:value key="$baseurl">'http://syslang.com/?email=a6269613@drdrb.net&amp;password=veslo'</tdt:value>
        <tdt:value key="$phrases">tdt:template()/data/phrases[1]</tdt:value>
        <tdt:value key="$keys">tdt:concat($phrases/phrase, ' | ')</tdt:value>
        <tdt:value key="$srclang">@xml:lang</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/phrases[2]">
        <tdt:value key=".">/data/message/translation</tdt:value>
        <tdt:value key="$dstlang">.</tdt:value>
        <tdt:value key="$url">concat($baseurl, '&amp;src=', $srclang, '&amp;dest=', $dstlang, '&amp;text=', $keys )</tdt:value>
        <tdt:value key="$values">tdt:document($url)/root/translation</tdt:value>
        <tdt:value key="@xml:lang">$dstlang</tdt:value>
      </tdt:rule>
      <tdt:rule path="/data/phrases[2]/phrase">
        <tdt:value key=".">tdt:split($values, ' | ')</tdt:value>
        <tdt:value key="text()">.</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    






Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/07-translations

   <data>
      <phrases xml:lang="en">
        <phrase>Dear</phrase>
        <phrase>Good bye</phrase>
        <phrase>Sender</phrase>
        <phrase>Street</phrase>
        <phrase>Town</phrase>
        <phrase>State</phrase>
      </phrases>
      <phrases xml:lang="sv">
        <phrase>Kära</phrase>
        <phrase>Bra bye</phrase>
        <phrase>Avsändaradress</phrase>
        <phrase>Gata</phrase>
        <phrase>Stan</phrase>
        <phrase>Tillstånd</phrase>
      </phrases>
    </data>
    




