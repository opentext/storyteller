======
UC-012
======

:Author: Vladimir Lavicka

Use case definition
===================

.. admonition:: Use case definition
   
    User wants to add a multiline edit control for comment on his transaction 
    table row.

    - Each comment field name will be a concatenation of '*comment_*' + '*id*' 
      field from repeated data.

    - Comment value will come from another data list, paired by '*id*'.

    - The value will be optional.


.. note:: no example available


Test case definition
====================

Document definition
-------------------

.. code:: xml
   :number-lines:
   :name: content UC-012

    <story>
      <table size='370, 50' dim='1,4' mode='paragraph'>
        <body>
          <rep xpath='/data/tablerow'>
            <row index='0'>
              <cell alignment_mode="resourcesapi.AM_VERTICAL" v_alignment="0.5">
                <p alignment="resourcesapi.AL_CENTER"><subst xpath="position()"/></p>
              </cell>
              <cell alignment_mode="resourcesapi.AM_VERTICAL" v_alignment="0.5">
                <p alignment="resourcesapi.AL_CENTER"><subst xpath="info/@name"/></p>
              </cell>
              <cell alignment_mode="resourcesapi.AM_VERTICAL" v_alignment="0.5">
                <p alignment="resourcesapi.AL_CENTER"><subst xpath="info/@age"/></p>
              </cell>
              <cell alignment_mode="resourcesapi.AM_VERTICAL" v_alignment="0.5">
                <p alignment="resourcesapi.AL_CENTER">
                <interactive datalink="input" buttontype="submit" controltype="multiline"
                             shape_rescale="resourcesapi.RM_FIXED" size="80,45"
                             brush_rgb="180,250,180,255">
                    <iistyle name="Arial" size="10.0"/>
                </interactive>
                </p>
              </cell>
            </row>
          </rep>
        </body>
      </table>
    </story>
    <page size='400,400'>
        <text storyindex="0" pos='10,10' brush_rgb='100,240,100,255' size='380,380'/>
    </page>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance UC-012

    <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
        <tablerow id="1">
            <input>
                <dpii:input disabled="false" name="comment_1" readonly="false" type="text">homer's comment</dpii:input>
            </input>
            <info age="36" name="Homer"/>
        </tablerow>
        <tablerow id="2">
            <input>
                <dpii:input disabled="false" name="comment_2" readonly="false" type="text">bart's comment</dpii:input>
            </input>
            <info age="10" name="Bart"/>
        </tablerow>
        <tablerow id="3">
            <input>
                <dpii:input disabled="false" name="comment_3" readonly="false" type="text">marge's comment</dpii:input>
            </input>
            <info age="36" name="Marge"/>
        </tablerow>
        <tablerow id="4">
            <input>
                <dpii:input disabled="false" name="comment_4" readonly="false" type="text">lisa's comment</dpii:input>
            </input>
            <info age="8" name="Lisa"/>
        </tablerow>
        <tablerow id="5">
            <input>
                <dpii:input disabled="false" name="comment_5" readonly="false" type="text">maggie's comment</dpii:input>
            </input>
            <info age="1" name="Maggie"/>
        </tablerow>
    </data>


Message
-------

.. code:: xml
   :number-lines:
   :name: source UC-012

    <data>
        <message>
            <comments>
                <comment id="1">homer's comment</comment>
                <comment id="2">bart's comment</comment>
                <comment id="3">marge's comment</comment>
                <comment id="4">lisa's comment</comment>
                <comment id="5">maggie's comment</comment>
            </comments>
            <transactions>
                <transaction id="1" name="Homer" age="36"/>
                <transaction id="2" name="Bart" age="10"/>
                <transaction id="3" name="Marge" age="36"/>
                <transaction id="4" name="Lisa" age="8"/>
                <transaction id="5" name="Maggie" age="1"/>
            </transactions>
        </message>
    </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template UC-012

    <data xmlns:dpii="http://developer.opentext.com/schemas/storyteller/layout/ddi/v1">
      <tablerow id="?">
        <input>
          <dpii:input disabled="false" name="?" readonly="false" type="text">?</dpii:input>
        </input>
        <info age="?" name="?"/>
      </tablerow>
    </data>


Transformation
--------------

:TDT:

.. code:: xml
   :number-lines:
   :name: transformation UC-012

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
	 <tdt:rule path="/data/tablerow">
       <tdt:value key=".">/data/message/transactions/transaction</tdt:value>
       <tdt:value key="@id">@id</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/tablerow/input/dpii:input">
       <tdt:value key="$id">@id</tdt:value>
       <tdt:value key="@name">concat('comment_', @id)</tdt:value>
       <tdt:value key="text()">/data/message/comments/comment[@id = $id]</tdt:value>
	 </tdt:rule>
	 <tdt:rule path="/data/tablerow/info">
       <tdt:value key="@name">@name</tdt:value>
       <tdt:value key="@age">@age</tdt:value>
	 </tdt:rule>
   </tdt:transformation>


