================
09 - SVG BarPlot
================

:Author: Jakub Dvorak

Overview
========

Test case definition
====================

Source data
-----------

.. code:: xml
   :number-lines:
   :name: source pfi01/usecases/09e-svg-barplot

   <root>
      <values>
        <record index="1" val="100"/>
        <record index="1" val="-50"/>
        <record index="2" val="20"/>
        <record index="2" val="-100"/>
        <record index="3" val="130"/>
        <record index="4" val="150"/>
        <record index="4" val="-90"/>
        <record index="5" val="170"/>
        <record index="6" val="-90"/>
        <record index="7" val="140"/>
        <record index="7" val="-130"/>
        <record index="8" val="130"/>
        <record index="9" val="60"/>
        <record index="11" val="130"/>
        <record index="12" val="160"/>
        <record index="13" val="130"/>
        <record index="14" val="150"/>
        <record index="14" val="-150"/>
      </values>
    </root>
    




Data Template
-------------

.. code:: xml
   :number-lines:
   :name: template pfi01/usecases/09e-svg-barplot

   <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="1024" height="768" id="svg2993" version="1.1" inkscape:version="0.48.4 r9939" sodipodi:docname="bars01.svg">
      <defs id="defs2995"/>
      <sodipodi:namedview id="base" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" inkscape:pageopacity="0.0" inkscape:pageshadow="2" inkscape:zoom="1.5308737" inkscape:cx="300.56513" inkscape:cy="462" inkscape:current-layer="layer2" inkscape:document-units="pt" showgrid="false" inkscape:window-width="1555" inkscape:window-height="1244" inkscape:window-x="585" inkscape:window-y="74" inkscape:window-maximized="0" units="px"/>
      <metadata id="metadata2998">
        <rdf:RDF>
          <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
            <dc:title/>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <g id="layer1" inkscape:label="Layer 1" inkscape:groupmode="layer" transform="translate(0,-2.4414063e-5)">
        <rect style="fill:none;stroke:#4065ad;stroke-width:1.50022733;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="graph-area" width="838.49976" height="558.49976" x="90.750114" y="103.75013">
          <title id="title3035">Bar plot</title>
        </rect>
        <path style="fill:none;stroke:#000000;stroke-width:0.99949527;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 59.999495,382.5 899.001005,0" id="axis-x" inkscape:connector-curvature="0" sodipodi:nodetypes="cc"/>
      </g>
      <g inkscape:groupmode="layer" id="layer2" inkscape:label="Bar Layer" transform="translate(0,-2.4414063e-5)">
        <rect style="fill:#de8787;fill-opacity:0.49803922;stroke:#000000;stroke-width:0.92848742;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="negative-bar-00" width="44.071514" height="74.07151" x="100.46425" y="383.46423" inkscape:label="negative-bar">
          <title id="title3841">negative-bar</title>
        </rect>
        <rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-00" width="43.594982" height="123.59499" x="100.70251" y="258.70255" inkscape:label="positive-bar">
          <title id="title3843">positive-bar</title>
        </rect>
        <g id="g2995">
          <path inkscape:connector-curvature="0" id="path2989" d="m 72,257.50002 34,0" style="fill:none;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"/>
          <text sodipodi:linespacing="125%" id="text2991" y="260.00003" x="28" style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans" xml:space="preserve">
            <tspan y="260.00003" x="28" id="tspan2993" sodipodi:role="line">100</tspan>
          </text>
        </g>
        <g id="g3030">
          <path inkscape:connector-curvature="0" id="path2989-7" d="m 71.999687,507.4997 34.000003,0" style="fill:none;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"/>
          <text sodipodi:linespacing="125%" id="text2991-1" y="509.99973" x="25.999687" style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans" xml:space="preserve">
            <tspan y="509.99973" x="25.999687" id="tspan2993-9" sodipodi:role="line">-100</tspan>
          </text>
        </g>
      </g>
    </svg>
    




Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation pfi01/usecases/09e-svg-barplot

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
      <tdt:rule path="/svg:svg/svg:g[@id='layer2']">
        <tdt:value key="$base">tdt:split(tdt:template()//svg:path[@id='axis-x']/@d, ' ')[1 &lt; position()]</tdt:value>
        <tdt:value key="$y0">tdt:split($base[1], ',')[2]</tdt:value>
        <tdt:value key="$x0">tdt:template()//svg:g[@id='layer2']//svg:rect[@id='positive-bar-00']/@x</tdt:value>
        <tdt:value key="$wb">tdt:template()//svg:rect[@id='graph-area']/@width - 2 * ($x0 - tdt:template()//svg:rect[@id='graph-area']/@x)</tdt:value>
        <tdt:value key="$hu">tdt:template()//svg:g[@id='layer2']//svg:rect[@id='positive-bar-00']/@height div 100</tdt:value>
        <tdt:value key="$w">$wb div /root/values/record[last()]/@index</tdt:value>
      </tdt:rule>
      <tdt:rule path="/svg:svg/svg:g[@id='layer2']/svg:rect[@id='positive-bar-00']">
        <tdt:value key=".">/root/values/record[number(@val) &gt; 0]</tdt:value>
        <tdt:value key="@id">concat('positive-bar-', @index)</tdt:value>
        <tdt:value key="$h">@val * $hu </tdt:value>
        <tdt:value key="@height">$h</tdt:value>
        <tdt:value key="@x">$x0 + (@index - 1) * $w</tdt:value>
        <tdt:value key="@y">$y0 - $h</tdt:value>
        <tdt:value key="@width">$w</tdt:value>
      </tdt:rule>
      <tdt:rule path="/svg:svg/svg:g[@id='layer2']/svg:rect[@id='positive-bar-00']/svg:title">
        <tdt:value key="text()">@val</tdt:value>
      </tdt:rule>
      <tdt:rule path="/svg:svg/svg:g[@id='layer2']/svg:rect[@id='negative-bar-00']">
        <tdt:value key=".">/root/values/record[number(@val) &lt; 0]</tdt:value>
        <tdt:value key="@id">concat('negative-bar-', @index)</tdt:value>
        <tdt:value key="$h">- @val * $hu</tdt:value>
        <tdt:value key="@height">$h</tdt:value>
        <tdt:value key="@x">$x0 + (@index - 1) * $w</tdt:value>
        <tdt:value key="@width">$w</tdt:value>
      </tdt:rule>
      <tdt:rule path="/svg:svg/svg:g[@id='layer2']/svg:rect[@id='negative-bar-00']/svg:title">
        <tdt:value key="text()">@val</tdt:value>
      </tdt:rule>
    </tdt:transformation>




Expected Result
---------------

.. code:: xml
   :number-lines:
   :name: instance pfi01/usecases/09e-svg-barplot

   <svg:svg xmlns:svg="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" width="1024" height="768" id="svg2993" version="1.1" inkscape:version="0.48.4 r9939" sodipodi:docname="bars01.svg">
      <svg:defs id="defs2995"/>
      <sodipodi:namedview id="base" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" inkscape:pageopacity="0.0" inkscape:pageshadow="2" inkscape:zoom="1.5308737" inkscape:cx="300.56513" inkscape:cy="462" inkscape:current-layer="layer2" inkscape:document-units="pt" showgrid="false" inkscape:window-width="1555" inkscape:window-height="1244" inkscape:window-x="585" inkscape:window-y="74" inkscape:window-maximized="0" units="px"/>
      <svg:metadata id="metadata2998">
        <rdf:RDF>
          <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
            <dc:title/>
          </cc:Work>
        </rdf:RDF>
      </svg:metadata>
      <svg:g id="layer1" inkscape:label="Layer 1" inkscape:groupmode="layer" transform="translate(0,-2.4414063e-5)">
        <svg:rect style="fill:none;stroke:#4065ad;stroke-width:1.50022733;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="graph-area" width="838.49976" height="558.49976" x="90.750114" y="103.75013">
          <svg:title id="title3035">Bar plot</svg:title>
        </svg:rect>
        <svg:path style="fill:none;stroke:#000000;stroke-width:0.99949527;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 59.999495,382.5 899.001005,0" id="axis-x" inkscape:connector-curvature="0" sodipodi:nodetypes="cc"/>
      </svg:g>
      <svg:g inkscape:groupmode="layer" id="layer2" inkscape:label="Bar Layer" transform="translate(0,-2.4414063e-5)">
        <svg:rect style="fill:#de8787;fill-opacity:0.49803922;stroke:#000000;stroke-width:0.92848742;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="negative-bar-1" width="58.4710691428571" height="61.797495" x="100.70251" y="383.46423" inkscape:label="negative-bar">
          <svg:title id="title3841">-50</svg:title>
        </svg:rect>
        <svg:rect style="fill:#de8787;fill-opacity:0.49803922;stroke:#000000;stroke-width:0.92848742;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="negative-bar-2" width="58.4710691428571" height="123.59499" x="159.173579142857" y="383.46423" inkscape:label="negative-bar">
          <svg:title id="title3841">-100</svg:title>
        </svg:rect>
        <svg:rect style="fill:#de8787;fill-opacity:0.49803922;stroke:#000000;stroke-width:0.92848742;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="negative-bar-4" width="58.4710691428571" height="111.235491" x="276.115717428571" y="383.46423" inkscape:label="negative-bar">
          <svg:title id="title3841">-90</svg:title>
        </svg:rect>
        <svg:rect style="fill:#de8787;fill-opacity:0.49803922;stroke:#000000;stroke-width:0.92848742;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="negative-bar-6" width="58.4710691428571" height="111.235491" x="393.057855714286" y="383.46423" inkscape:label="negative-bar">
          <svg:title id="title3841">-90</svg:title>
        </svg:rect>
        <svg:rect style="fill:#de8787;fill-opacity:0.49803922;stroke:#000000;stroke-width:0.92848742;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="negative-bar-7" width="58.4710691428571" height="160.673487" x="451.528924857143" y="383.46423" inkscape:label="negative-bar">
          <svg:title id="title3841">-130</svg:title>
        </svg:rect>
        <svg:rect style="fill:#de8787;fill-opacity:0.49803922;stroke:#000000;stroke-width:0.92848742;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="negative-bar-14" width="58.4710691428571" height="185.392485" x="860.826408857143" y="383.46423" inkscape:label="negative-bar">
          <svg:title id="title3841">-150</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-1" width="58.4710691428571" height="123.59499" x="100.70251" y="258.90501" inkscape:label="positive-bar">
          <svg:title id="title3843">100</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-2" width="58.4710691428571" height="24.718998" x="159.173579142857" y="357.781002" inkscape:label="positive-bar">
          <svg:title id="title3843">20</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-3" width="58.4710691428571" height="160.673487" x="217.644648285714" y="221.826513" inkscape:label="positive-bar">
          <svg:title id="title3843">130</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-4" width="58.4710691428571" height="185.392485" x="276.115717428571" y="197.107515" inkscape:label="positive-bar">
          <svg:title id="title3843">150</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-5" width="58.4710691428571" height="210.111483" x="334.586786571429" y="172.388517" inkscape:label="positive-bar">
          <svg:title id="title3843">170</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-7" width="58.4710691428571" height="173.032986" x="451.528924857143" y="209.467014" inkscape:label="positive-bar">
          <svg:title id="title3843">140</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-8" width="58.4710691428571" height="160.673487" x="509.999994" y="221.826513" inkscape:label="positive-bar">
          <svg:title id="title3843">130</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-9" width="58.4710691428571" height="74.156994" x="568.471063142857" y="308.343006" inkscape:label="positive-bar">
          <svg:title id="title3843">60</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-11" width="58.4710691428571" height="160.673487" x="685.413201428571" y="221.826513" inkscape:label="positive-bar">
          <svg:title id="title3843">130</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-12" width="58.4710691428571" height="197.751984" x="743.884270571428" y="184.748016" inkscape:label="positive-bar">
          <svg:title id="title3843">160</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-13" width="58.4710691428571" height="160.673487" x="802.355339714286" y="221.826513" inkscape:label="positive-bar">
          <svg:title id="title3843">130</svg:title>
        </svg:rect>
        <svg:rect style="fill:#6481ff;fill-opacity:0.49803922;stroke:#000000;stroke-width:1.40501785;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" id="positive-bar-14" width="58.4710691428571" height="185.392485" x="860.826408857143" y="197.107515" inkscape:label="positive-bar">
          <svg:title id="title3843">150</svg:title>
        </svg:rect>
        <svg:g id="g2995">
          <svg:path inkscape:connector-curvature="0" id="path2989" d="m 72,257.50002 34,0" style="fill:none;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"/>
          <svg:text sodipodi:linespacing="125%" id="text2991" y="260.00003" x="28" style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans" xml:space="preserve">
            <svg:tspan y="260.00003" x="28" id="tspan2993" sodipodi:role="line">100</svg:tspan>
          </svg:text>
        </svg:g>
        <svg:g id="g3030">
          <svg:path inkscape:connector-curvature="0" id="path2989-7" d="m 71.999687,507.4997 34.000003,0" style="fill:none;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"/>
          <svg:text sodipodi:linespacing="125%" id="text2991-1" y="509.99973" x="25.999687" style="font-size:16px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans" xml:space="preserve">
            <svg:tspan y="509.99973" x="25.999687" id="tspan2993-9" sodipodi:role="line">-100</svg:tspan>
          </svg:text>
        </svg:g>
      </svg:g>
    </svg:svg>
    




