# -*- coding: utf-8 -*-

import docbuilder
import docapi

g_def ="""\
<root>
  <template>
    <people>
      <person>
	<name>Deron Eriksson</name>
	<birth>1972-01-20 09:32</birth>
	<eyes>blue</eyes>
	<locale>sv</locale>
      </person>
      <person>
	<name>Will Smith</name>
	<birth>1989-12-03 11:49</birth>
	<eyes>brown</eyes>
	<locale>en</locale>
      </person>
      <person>
	<name>Pierre Gautier</name>
	<birth>1933-05-22 22:37</birth>
	<eyes>black</eyes>
	<locale>fr</locale>
      </person>
      <person>
	<name>Kateřina Ťuhýková</name>
	<birth>1969-07-29 18:03</birth>
	<eyes>green</eyes>
	<locale>cs</locale>
      </person>
      <person>
	<name>Афанасий Аллочкин</name>
	<birth>1919-04-13 01:44</birth>
	<eyes>darkgray</eyes>
	<locale>ru</locale>
      </person>
      <person>
	<name>آمنة عبد الحميد</name>
	<birth>2001-06-19 16:24</birth>
	<eyes>darkred</eyes>
	<locale>ar-sa</locale>
      </person>
      <person>
	<name>আহসান अकबर चन्दना</name>
	<birth>1976-07-28 07:32</birth>
	<eyes>maroon</eyes>
	<locale>hi</locale>
      </person>
      <person>
	<name>日本人の氏名</name>
	<birth>1988-03-13 14:23</birth>
	<eyes>navy</eyes>
	<locale>ja</locale>
      </person>
    </people>
  </template>
  <tdt:transformation 
    xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0"/>

    <story name="main">
      <table dim="2,3" widths="220;220;60" translate="0,20" size="522,0" mode="paragraph">
        <!--   <script when="docapi.BEFORE" language="js">
              var data = require( 'data' );
              var dt = data.xpath( '/', { format: 'js' } );
              console.log( JSON.stringify(dt,null,2) );
              console.log( data.xpath( '//person/name/text()' ) );
           </script> -->
        <body>
          <row index="0">
              <cell inner_margins="5,5,5,5"><p><style bold="1"/>Name</p></cell>
              <cell inner_margins="5,5,5,5"><p><style bold="1"/>Birth</p></cell>
              <cell inner_margins="5,5,5,5"><p><style bold="1"/>Eyes</p></cell>
          </row>
          <rep xpath="/people/person" name="item">
            <style name='Arial Unicode MS' size='12'/>
            <row index="1">
              <script when="docapi.BEFORE" language="js">
                var env = require( 'env' );
                var data = require( 'data' );
                var moment = require( 'moment' );
                var color = require( 'onecolor' );

                var dt = data.xpath( '.', { format: 'js' } );
                var m = moment( dt.person.birth, "YYYY-MM-DD HH:mm" );
                m.locale( dt.person.locale );
                env.variable.birth = m.format('LLLL');
                var layout = require( 'layout' );
                env.variable.color = color( dt.person.eyes ).css();
              </script>

              <cell inner_margins="5,5,5,5">
                <p>
                  <subst xpath="name" name="address" sample="Address" texttype="0" description="address"/>
                </p>
              </cell>
              <cell inner_margins="5,5,5,5">
                <p>
                  <subst xpath="$birth" name="address" sample="Address" texttype="0" description="address"/>
                </p>
              </cell>
              <cell inner_margins="5,5,5,5">
                <p>
                  <subst xpath="eyes" texttype="0">
                    <modification value="$color" key="@ISubstitution/CharacterStyle/Foreground/Color"/>
                  </subst>
                </p>
              </cell>

            </row>
          </rep>
        </body>
      </table>
    </story>

    <page>
       <text pos='20,20' size='550,750' pen_rgb='255,255,255,0' storyref="main"/>
    </page>
</root>"""

def DefineDocument( doc ):
    docbuilder.parse_string( g_def, doc )
    doc.Structure().Children().At(0).setOccurrence( docapi.OCC_ONCE_OR_MORE )
