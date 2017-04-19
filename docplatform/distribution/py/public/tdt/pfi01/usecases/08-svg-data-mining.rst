====================
08 - SVG Data Mining
====================

:Author: Petr Filipsky

Overview
========

Here we are mining US presidential election results from color maps in SVG format:
 
- `Michigan <http://en.wikipedia.org/wiki/United_States_presidential_election_in_Michigan,_2012>`_
- `North Carolina <http://en.wikipedia.org/wiki/United_States_presidential_election_in_North_Carolina,_2012>`_

Test case definition
====================

Source data
-----------

.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/08-svg-data-mining

   <data>
      <url>http://upload.wikimedia.org/wikipedia/commons/d/dc/Michigian_presidential_election_results_2012.svg</url>
      <url>http://upload.wikimedia.org/wikipedia/commons/3/34/North_carolina_presidential_election_results_2012.svg</url>
    </data>
    




Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/08-svg-data-mining

   <results>
      <lookup>
        <result key="#1666cb">Obama 70-80%</result>
        <result key="#4389e3">Obama 60-70%</result>
        <result key="#86b6f2">Obama 50-60%</result>
        <result key="#b9d7ff">Obama ~50%</result>
        <result key="#f2b3be">Romney ~50%</result>
        <result key="#e27f90">Romney 50-60%</result>
        <result key="#cc2f4a">Romney 60-70%</result>
        <result key="#d40000">Romney 70-80%</result>
      </lookup>
      <state name="?">
        <county name="?" ratio="?">?</county>
      </state>
    </results>
    




Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/08-svg-data-mining

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:svg="http://www.w3.org/2000/svg" version="1.0">
      <tdt:rule path="/results/lookup">
        <tdt:value key=".">tdt:nodeset()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/results/state">
        <tdt:value key=".">/data/url</tdt:value>
        <tdt:value key="$url">text()</tdt:value>
        <tdt:value key="$svg">tdt:document($url)</tdt:value>
        <tdt:value key="$paths">$svg/svg:svg/svg:g/svg:path</tdt:value>
        <tdt:value key="@name">substring-after( $paths[1]/@inkscape:label, ', ' )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/results/state/county">
        <tdt:value key=".">$paths</tdt:value>
        <tdt:value key="$style">@style</tdt:value>
        <tdt:value key="$fill">substring-before( substring-after( $style, 'fill:' ), ';' )</tdt:value>
        <tdt:value key="$result">tdt:template()/results/lookup/result[@key=$fill]</tdt:value>
        <tdt:value key="@name">substring-before( @inkscape:label, ', ' )</tdt:value>
        <tdt:value key="@ratio">substring-after( $result, ' ' )</tdt:value>
        <tdt:value key="text()">substring-before( $result, ' ' )</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    




Compiled Transformation
-----------------------

.. code:: xml
   :number-lines:
   :name: compiled pfi01/usecases/08-svg-data-mining

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" xmlns:svg="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.0">
      <tdt:rule path="/results/lookup">
        <tdt:value key=".">tdt:nodeset()</tdt:value>
      </tdt:rule>
      <tdt:rule path="/results/state">
        <tdt:value key=".">/data/url</tdt:value>
        <tdt:value key="$url">text()</tdt:value>
        <tdt:value key="$svg">tdt:document($url)</tdt:value>
        <tdt:value key="$paths">$svg/svg:svg/svg:g/svg:path</tdt:value>
        <tdt:value key="@name">substring-after( $paths[1]/@inkscape:label, ', ' )</tdt:value>
      </tdt:rule>
      <tdt:rule path="/results/state/county">
        <tdt:value key=".">$paths</tdt:value>
        <tdt:value key="$style">@style</tdt:value>
        <tdt:value key="$fill">substring-before( substring-after( $style, 'fill:' ), ';' )</tdt:value>
        <tdt:value key="$result">tdt:template()/results/lookup/result[@key=$fill]</tdt:value>
        <tdt:value key="@name">substring-before( @inkscape:label, ', ' )</tdt:value>
        <tdt:value key="@ratio">substring-after( $result, ' ' )</tdt:value>
        <tdt:value key="text()">substring-before( $result, ' ' )</tdt:value>
      </tdt:rule>
    </tdt:transformation>
    




Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/08-svg-data-mining

   <results>
      <state name="MI">
        <county name="Gogebic" ratio="50-60%">Obama</county>
        <county name="Ontonagon" ratio="50-60%">Romney</county>
        <county name="Monroe" ratio="~50%">Obama</county>
        <county name="Lenawee" ratio="~50%">Romney</county>
        <county name="Hillsdale" ratio="60-70%">Romney</county>
        <county name="Branch" ratio="50-60%">Romney</county>
        <county name="St. Joseph" ratio="50-60%">Romney</county>
        <county name="Cass" ratio="50-60%">Romney</county>
        <county name="Berrien" ratio="50-60%">Romney</county>
        <county name="Wayne" ratio="70-80%">Obama</county>
        <county name="Jackson" ratio="50-60%">Romney</county>
        <county name="Calhoun" ratio="50-60%">Obama</county>
        <county name="Kalamazoo" ratio="50-60%">Obama</county>
        <county name="Van Buren" ratio="~50%">Obama</county>
        <county name="Allegan" ratio="50-60%">Romney</county>
        <county name="Barry" ratio="50-60%">Romney</county>
        <county name="Eaton" ratio="50-60%">Obama</county>
        <county name="Ingham" ratio="60-70%">Obama</county>
        <county name="Livingston" ratio="60-70%">Romney</county>
        <county name="Oakland" ratio="50-60%">Obama</county>
        <county name="Macomb" ratio="50-60%">Obama</county>
        <county name="St. Clair" ratio="50-60%">Romney</county>
        <county name="Lapeer" ratio="50-60%">Romney</county>
        <county name="Genesee" ratio="60-70%">Obama</county>
        <county name="Shiawassee" ratio="50-60%">Obama</county>
        <county name="Clinton" ratio="50-60%">Romney</county>
        <county name="Ionia" ratio="50-60%">Romney</county>
        <county name="Ottawa" ratio="60-70%">Romney</county>
        <county name="Muskegon" ratio="50-60%">Obama</county>
        <county name="Kent" ratio="50-60%">Romney</county>
        <county name="Montcalm" ratio="50-60%">Romney</county>
        <county name="Gratiot" ratio="50-60%">Romney</county>
        <county name="Saginaw" ratio="50-60%">Obama</county>
        <county name="Sanilac" ratio="50-60%">Romney</county>
        <county name="Tuscola" ratio="50-60%">Romney</county>
        <county name="Huron" ratio="50-60%">Romney</county>
        <county name="Bay" ratio="50-60%">Obama</county>
        <county name="Midland" ratio="50-60%">Romney</county>
        <county name="Isabella" ratio="50-60%">Obama</county>
        <county name="Mecosta" ratio="50-60%">Romney</county>
        <county name="Newaygo" ratio="50-60%">Romney</county>
        <county name="Oceana" ratio="50-60%">Romney</county>
        <county name="Arenac" ratio="50-60%">Romney</county>
        <county name="Gladwin" ratio="50-60%">Romney</county>
        <county name="Clare" ratio="50-60%">Romney</county>
        <county name="Osceola" ratio="50-60%">Romney</county>
        <county name="Lake" ratio="50-60%">Obama</county>
        <county name="Mason" ratio="50-60%">Romney</county>
        <county name="Iosco" ratio="50-60%">Romney</county>
        <county name="Ogemaw" ratio="50-60%">Romney</county>
        <county name="Roscommon" ratio="50-60%">Romney</county>
        <county name="Missaukee" ratio="60-70%">Romney</county>
        <county name="Wexford" ratio="50-60%">Romney</county>
        <county name="Manistee" ratio="50-60%">Obama</county>
        <county name="Alcona" ratio="50-60%">Romney</county>
        <county name="Oscoda" ratio="50-60%">Romney</county>
        <county name="Crawford" ratio="50-60%">Romney</county>
        <county name="Kalkaska" ratio="50-60%">Romney</county>
        <county name="Grand Treverse" ratio="50-60%">Romney</county>
        <county name="Benzie" ratio="50-60%">Romney</county>
        <county name="Leelanau" ratio="50-60%">Romney</county>
        <county name="Alpena" ratio="50-60%">Romney</county>
        <county name="Montmorency" ratio="50-60%">Romney</county>
        <county name="Otsego" ratio="50-60%">Romney</county>
        <county name="Antrim" ratio="60-70%">Romney</county>
        <county name="Charlevoix" ratio="50-60%">Romney</county>
        <county name="Presque Isle" ratio="50-60%">Romney</county>
        <county name="Cheboygan" ratio="50-60%">Romney</county>
        <county name="Mackinac" ratio="50-60%">Romney</county>
        <county name="Chippewa" ratio="50-60%">Romney</county>
        <county name="Luce" ratio="60-70%">Romney</county>
        <county name="Schoolcraft" ratio="50-60%">Romney</county>
        <county name="Alger" ratio="50-60%">Romney</county>
        <county name="Delta" ratio="50-60%">Romney</county>
        <county name="Menominee" ratio="50-60%">Romney</county>
        <county name="Dickinson" ratio="60-70%">Romney</county>
        <county name="Marquette" ratio="50-60%">Obama</county>
        <county name="Iron" ratio="50-60%">Romney</county>
        <county name="Keweenaw" ratio="50-60%">Romney</county>
        <county name="Houghton" ratio="50-60%">Romney</county>
        <county name="Baraga" ratio="50-60%">Romney</county>
        <county name="Washtenaw" ratio="60-70%">Obama</county>
        <county name="Emmet" ratio="50-60%">Romney</county>
      </state>
      <state name="NC">
        <county name="Clay" ratio="70-80%">Romney</county>
        <county name="Macon" ratio="60-70%">Romney</county>
        <county name="Transylvania" ratio="50-60%">Romney</county>
        <county name="Jackson" ratio="~50%">Romney</county>
        <county name="Haywood" ratio="50-60%">Romney</county>
        <county name="Swain" ratio="50-60%">Romney</county>
        <county name="Graham" ratio="60-70%">Romney</county>
        <county name="Cherokee" ratio="70-80%">Romney</county>
        <county name="Mitchell" ratio="70-80%">Romney</county>
        <county name="Yancey" ratio="50-60%">Romney</county>
        <county name="Madison" ratio="50-60%">Romney</county>
        <county name="Buncombe" ratio="50-60%">Obama</county>
        <county name="Henderson" ratio="60-70%">Romney</county>
        <county name="Polk" ratio="60-70%">Romney</county>
        <county name="Rutherford" ratio="60-70%">Romney</county>
        <county name="McDowell" ratio="60-70%">Romney</county>
        <county name="Avery" ratio="70-80%">Romney</county>
        <county name="Watauga" ratio="50-60%">Romney</county>
        <county name="Alexander" ratio="70-80%">Romney</county>
        <county name="Ashe" ratio="60-70%">Romney</county>
        <county name="Alleghany" ratio="60-70%">Romney</county>
        <county name="Wilkes" ratio="70-80%">Romney</county>
        <county name="Caldwell" ratio="60-70%">Romney</county>
        <county name="Burke" ratio="60-70%">Romney</county>
        <county name="Cleveland" ratio="50-60%">Romney</county>
        <county name="Gatson" ratio="60-70%">Romney</county>
        <county name="Lincoln" ratio="60-70%">Romney</county>
        <county name="Catawba" ratio="60-70%">Romney</county>
        <county name="Iredell" ratio="60-70%">Romney</county>
        <county name="Mecklenburg" ratio="60-70%">Obama</county>
        <county name="Rowan" ratio="60-70%">Romney</county>
        <county name="Davie" ratio="70-80%">Romney</county>
        <county name="Yadkin" ratio="70-80%">Romney</county>
        <county name="Surry" ratio="60-70%">Romney</county>
        <county name="Stokes" ratio="70-80%">Romney</county>
        <county name="Forsyth" ratio="50-60%">Obama</county>
        <county name="Davidson" ratio="60-70%">Romney</county>
        <county name="Stanly" ratio="60-70%">Romney</county>
        <county name="Cabarrus" ratio="50-60%">Romney</county>
        <county name="Union" ratio="60-70%">Romney</county>
        <county name="Anson" ratio="60-70%">Obama</county>
        <county name="Rockingham" ratio="60-70%">Romney</county>
        <county name="Guilford" ratio="50-60%">Obama</county>
        <county name="Randolph" ratio="70-80%">Romney</county>
        <county name="Montgomery" ratio="50-60%">Romney</county>
        <county name="Richmond" ratio="50-60%">Obama</county>
        <county name="Scotland" ratio="50-60%">Obama</county>
        <county name="Caswell" ratio="50-60%">Romney</county>
        <county name="Alamance" ratio="50-60%">Romney</county>
        <county name="Moore" ratio="60-70%">Romney</county>
        <county name="Hoke" ratio="50-60%">Obama</county>
        <county name="Robeson" ratio="50-60%">Obama</county>
        <county name="Columbus" ratio="50-60%">Romney</county>
        <county name="Brunswick" ratio="60-70%">Romney</county>
        <county name="New Hanover" ratio="50-60%">Romney</county>
        <county name="Bladen" ratio="50-60%">Obama</county>
        <county name="Cumberland" ratio="50-60%">Obama</county>
        <county name="Chatham" ratio="50-60%">Obama</county>
        <county name="Harnett" ratio="50-60%">Romney</county>
        <county name="Lee" ratio="50-60%">Romney</county>
        <county name="Orange" ratio="70-80%">Obama</county>
        <county name="Person" ratio="50-60%">Romney</county>
        <county name="Durham" ratio="70-80%">Obama</county>
        <county name="Pender" ratio="50-60%">Romney</county>
        <county name="Sampson" ratio="50-60%">Romney</county>
        <county name="Wayne" ratio="50-60%">Romney</county>
        <county name="Johnston" ratio="60-70%">Romney</county>
        <county name="Wake" ratio="50-60%">Obama</county>
        <county name="Granville" ratio="50-60%">Obama</county>
        <county name="Vance" ratio="60-70%">Obama</county>
        <county name="Warren" ratio="60-70%">Obama</county>
        <county name="Franklin" ratio="50-60%">Romney</county>
        <county name="Nash" ratio="50-60%">Obama</county>
        <county name="Northampton" ratio="60-70%">Obama</county>
        <county name="Halifax" ratio="60-70%">Obama</county>
        <county name="Edgecombe" ratio="60-70%">Obama</county>
        <county name="Wilson" ratio="50-60%">Obama</county>
        <county name="Greene" ratio="50-60%">Romney</county>
        <county name="Lenoir" ratio="~50%">Romney</county>
        <county name="Jones" ratio="50-60%">Romney</county>
        <county name="Duplin" ratio="50-60%">Romney</county>
        <county name="Onslow" ratio="60-70%">Romney</county>
        <county name="Carteret" ratio="60-70%">Romney</county>
        <county name="Pamlico" ratio="50-60%">Romney</county>
        <county name="Craven" ratio="50-60%">Romney</county>
        <county name="Pitt" ratio="50-60%">Obama</county>
        <county name="Martin" ratio="50-60%">Obama</county>
        <county name="Chowan" ratio="50-60%">Romney</county>
        <county name="Hertford" ratio="70-80%">Obama</county>
        <county name="Bertie" ratio="60-70%">Obama</county>
        <county name="Gates" ratio="50-60%">Obama</county>
        <county name="Camden" ratio="60-70%">Romney</county>
        <county name="Pasquotank" ratio="50-60%">Obama</county>
        <county name="Perquimans" ratio="50-60%">Romney</county>
        <county name="Beaufort" ratio="50-60%">Romney</county>
        <county name="Washington" ratio="50-60%">Obama</county>
        <county name="Tyrrell" ratio="50-60%">Romney</county>
        <county name="Dare" ratio="50-60%">Romney</county>
        <county name="Currituck" ratio="60-70%">Romney</county>
        <county name="Hyde" ratio="50-60%">Romney</county>
      </state>
    </results>
    




