<?xml version="1.0"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor"
	xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout"
	xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt"
	xmlns:arc="http://www.platts.org/model/plattsArticle/1.0"
	xmlns:aid="http://ns.adobe.com/AdobeInDesign/4.0/"
	exclude-result-prefixes="arc aid"
	version="1.0">

	<xsl:output method="xml" encoding="utf-8" indent="yes"/>

	<xsl:template name="substring-after-last">
	  <xsl:param name="input"/>
	  <xsl:param name="substr"/>
	  <xsl:param name="ignore"/>
	  <xsl:variable name="temp" select="substring-after($input,$substr)"/>
	  <xsl:choose>
		<xsl:when test="$substr and contains($temp,$substr)">
		  <xsl:call-template name="substring-after-last">
			<xsl:with-param name="input" select="$temp"/>
			<xsl:with-param name="substr" select="$substr"/>
			<xsl:with-param name="ignore" select="$ignore"/>
		  </xsl:call-template>
		</xsl:when>
		<xsl:when test="$substr and translate($temp, $ignore, '') = ''">
		  <xsl:value-of select="substring-before($input,$substr)"/>
		</xsl:when>
		<xsl:otherwise>
		  <xsl:value-of select="$temp"/>
		</xsl:otherwise>
	  </xsl:choose>
	</xsl:template>

	<xsl:template name="class-name">
	  <xsl:param name="style" select="@aid:pstyle"/>
	  <xsl:call-template name="substring-after-last">
		<xsl:with-param name="input" select="$style"/>
		<xsl:with-param name="substr" select="'_'"/>
		<xsl:with-param name="ignore" select="'0123456789'"/>
	  </xsl:call-template>
	</xsl:template>

	<xsl:template name="toc-category-data">
	  <xsl:param name="contenttype"/>
	  <xsl:param name="contentindex"/>
	  <category type="{$contenttype}">
		<xsl:for-each select="//story[@contenttype=$contenttype]">
		  <xsl:variable name="label">
			<xsl:value-of select="normalize-space(substring-before(concat(translate(headline,',&lt;(','|||'),'|'),'|'))"/>
			<xsl:value-of select="normalize-space(storyTitlealts/headline)"/>
			<xsl:if test="storybody/p[1]/subhead">: <xsl:value-of select="normalize-space(storybody/p[1]/subhead)"/></xsl:if>
		  </xsl:variable>
		  <story><xsl:value-of select="$label"/></story>
		</xsl:for-each>
	  </category>
	</xsl:template>

	<xsl:template name="toc-fragment">
	  <xsl:text disable-output-escaping='yes'>&lt;stl:stl xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1"&gt;</xsl:text>
	  <stl:data>
		<stl:template>
		  <data type="?" index="?"/>
		</stl:template>
		<stl:transformation>
		  <xsl:text disable-output-escaping='yes'>&lt;tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0"&gt;</xsl:text>
		  <tdt:rule path="/">
			<tdt:value key="$type"/>
			<tdt:value key="$index"/>
		  </tdt:rule>
		  <tdt:rule path="/data">
			<tdt:value key="@type">$type</tdt:value>
			<tdt:value key="@index">$index</tdt:value>
		  </tdt:rule>
		  <xsl:text disable-output-escaping='yes'>&lt;/tdt:transformation&gt;</xsl:text>
		</stl:transformation>
	  </stl:data>
	  <stl:style src="wd:/Platts.css"/>
	  <stl:document>
		<stl:page w="841.89pt" h="595.28pt">
		  <stl:text w="20pt" h="20pt">
			<stl:story>
			  <stl:p class="toc-line">
				<stl:field xpath="$page">
				  <stl:script language="js">
					var vars = require('vars');
					var index = data.dump('string(/data/@index)');
					var type = data.dump('string(/data/@type)');
					var contentindex = vars.all.toc_types.indexOf(type)+1;
					var page = vars.all['toc_pages'+contentindex][index];
					vars.all.page = page ? page : '?';
				  </stl:script>
				</stl:field>
			  </stl:p>
			</stl:story>
		  </stl:text>
		</stl:page>
	  </stl:document>
	  <xsl:text disable-output-escaping='yes'>&lt;/stl:stl&gt;</xsl:text>
	</xsl:template>

	<xsl:key name="contenttype" match="//story/@contenttype" use="." />

	<xsl:template name="toc-data">
	  <xsl:for-each select="//story/@contenttype[generate-id()=generate-id(key('contenttype',.)[1]) ]">
		<xsl:call-template name="toc-category-data">
		  <xsl:with-param name="contenttype" select="."/>
		  <xsl:with-param name="contentindex" select="position()"/>
		</xsl:call-template>
	  </xsl:for-each>
	</xsl:template>

	<xsl:template name="toc-content">
	  <stl:repeater xpath="/data/category">
		<stl:story>
		  <stl:p/>
		  <stl:p class="toc-subhead"><stl:field xpath="@type"/></stl:p>
		  <stl:repeater xpath="story">
			<stl:story>
			  <stl:p class="toc-line" tabs="10pt:250pt;decimal;.">
				<stl:field xpath="."/>
				<stl:tab/>
				<stl:fragment w="10pt" h=".5em" category="postprocessing" 
							  src="link:/toc-line.xml!/item[1]/item[1]">
				  <stl:script language="js">
					var fragment = require('layout').item();
					var data = require('data');
					var index = data.dump('strs-current-position()-1');
					var type = data.dump('string(../@type)');
					fragment.Transformation.Parameters = { index: index, type: "'"+type+"'" };
				  </stl:script>
				</stl:fragment>
			  </stl:p>
			</stl:story>
		  </stl:repeater>
		</stl:story>
	  </stl:repeater>
	</xsl:template>

	<xsl:template match="/arc:package">
	  <stl:stl xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout" version="0.1">
		<stl:data>
		  <stl:source>
			<data>
			  <xsl:call-template name="toc-data"/>
			</data>
		  </stl:source>
		</stl:data>
		<stl:fixtures>
		  <xp:fixture key="link:/header-footer.xml">
			<stl:group>
			  <!-- header -->
			  <stl:line y="6%" w="100%" h="0pt" class="header-footer-separator"/>
			  <stl:text x="5%" y="2%" w="60%" h="25pt">
				<stl:story>
				  <stl:p>
					<stl:span class="header-left"><xsl:value-of select="//header1"/></stl:span>
					<stl:tab/>
					<stl:span style="vertical-align:sub;">
					  <stl:line x1="0pt" y1="14pt" x2="0pt" y2="0pt" class="header-footer-separator"/>
					</stl:span>
					<stl:tab/>
					<stl:span class="header-right"><xsl:value-of select="//header2"/></stl:span>
				  </stl:p>
				</stl:story>
			  </stl:text>
			  <!-- footer -->
			  <stl:line y="94%" w="100%" h="0pt" class="header-footer-separator"/>
			  <stl:text x="5%" y="95.5%" w="40%" h="4%">
				<stl:story>
				  <stl:p>
					<stl:span class="footer-copyright"><xsl:value-of select="//footer2"/></stl:span>
					<stl:tab/>
					<stl:span style="vertical-align:sub;">
					  <stl:line x1="0pt" y1="14pt" x2="0pt" y2="0pt" class="header-footer-separator"/>
					</stl:span>
					<stl:tab/>
					<stl:span class="footer-page-number"><stl:field type="page-number"/></stl:span>
				  </stl:p>
				</stl:story>
			  </stl:text>
			</stl:group>
		  </xp:fixture>

		  <xp:fixture key="link:/toc-line.xml">
			<xsl:call-template name="toc-fragment"/>
		  </xp:fixture>
		</stl:fixtures>
		<stl:style src="wd:/Platts.css"/>
		<stl:document>
		  <stl:story name="TOC">
			<stl:p class="toc-heading">INSIDE THIS ISSUE</stl:p>
			<xsl:call-template name="toc-content"/>
		  </stl:story>
		  <stl:story name="Main" w="757.7pt">
			<xsl:apply-templates select="//story"/>
		  </stl:story>
		  <stl:page w="841.89pt" h="595.28pt" occurrence="optional">
			<stl:script language="js">
			  var vars = require('vars');
			  vars.all.current_page = 1;
			  vars.set("toc_types", null, [0] );
			  <xsl:for-each select="//story/@contenttype[generate-id()=generate-id(key('contenttype',.)[1]) ]">
			  vars.set( "toc_pages<xsl:value-of select='position()'/>", null, [ 0 ] );
			  vars.all.toc_types.push("<xsl:value-of select='.'/>");
			  </xsl:for-each>
			  require('share').toc_register = function(contenttype) {
			    var contentindex = vars.all.toc_types.indexOf(contenttype)+1; // one-based 
			    vars.all['toc_pages'+contentindex].push(vars.all.current_page);
			  }
			</stl:script>
			<stl:text x="5%" y="5%" w="90%" h="20%" wrapping-mode="bbox">
			  <!-- Main header -->
			  <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
			  <xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'" />
			  <stl:story>
				<stl:p class="doc-heading"><xsl:value-of select="translate(//header1, $lowercase, $uppercase)"/></stl:p>
				<stl:p class="doc-coverdate"><xsl:value-of select="//formattedcoverdate"/></stl:p>
			  </stl:story>
			</stl:text>
			<stl:text x="5%" y="15%" w="90%" h="78%" story="Main" loose-formatting="false"/>
			<stl:text x="65%" y="15%" w="30%" h="43%" story="TOC" wrapping-mode="bbox" class="toc-frame"/>
			<!-- Main footer -->
			<stl:line y="94%" w="100%" h="0pt" class="header-footer-separator"/>
			<stl:text x="5%" y="95.5%" w="40%" h="4%">
			  <stl:story>
				<stl:p><stl:span class="footer-url">www.platts.com</stl:span></stl:p>
			  </stl:story>
			</stl:text>
		  </stl:page>
		  <stl:page w="841.89pt" h="595.28pt" occurrence="optional">
			<stl:script language="js">
			  var vars = require('vars');
			  vars.all.current_page = +vars.all.current_page + 1;
			</stl:script>
			<xp:include src="link:/header-footer.xml"/>
			<stl:text x="5%" y="8%" w="90%" h="85%" story="Main" loose-formatting="false"/>
			<stl:text x="5%" y="8%" w="30%" h="85%" story="TOC" wrapping-mode="bbox" class="toc-frame"/>
		  </stl:page>
		  <stl:page w="841.89pt" h="595.28pt" occurrence="repeatable">
			<stl:script language="js">
			  var vars = require('vars');
			  vars.all.current_page = +vars.all.current_page + 1;
			</stl:script>
			<xp:include src="link:/header-footer.xml"/>
			<stl:text x="5%" y="8%" w="90%" h="85%" story="Main"/>
		  </stl:page>
		</stl:document>
	  </stl:stl>
	</xsl:template>

	<xsl:template match="story" />

	<xsl:template match="story[@type='story' or @type='brief']">
	  <stl:p>
		<xsl:attribute name="class">
		  <xsl:call-template name="class-name">
			<xsl:with-param name="style" select="storyTitlealts/headline/@aid:pstyle" />
		  </xsl:call-template>
		</xsl:attribute>

		<stl:field xpath="''">
		  <stl:script language="js">require('share').toc_register("<xsl:value-of select="@contenttype"/>");</stl:script>
		</stl:field>

		<xsl:value-of select="normalize-space(storyTitlealts/headline)"/>
	  </stl:p>
	  <xsl:apply-templates select="lead|storybody"/>
	</xsl:template>


	<xsl:template match="story[@type='table']">
	  <stl:p>
		<xsl:attribute name="class">
		  <xsl:call-template name="class-name">
			<xsl:with-param name="style" select="headline/@aid:pstyle" />
		  </xsl:call-template>
		</xsl:attribute>

		<stl:field xpath="''">
		  <stl:script language="js">require('share').toc_register("<xsl:value-of select="@contenttype"/>");</stl:script>
		</stl:field>

		<xsl:value-of select="normalize-space(headline)"/>
	  </stl:p>
	  <xsl:apply-templates select="aid:Table"/>
	</xsl:template>

	<xsl:key name="keyRow" match="aid:Cell" use="floor(sum(preceding-sibling::*/@aid:ccols) div number(../@aid:tcols))"/>
	<xsl:key name="keyCell" match="aid:Cell" use="floor(sum(preceding-sibling::*/@aid:ccols) mod number(../@aid:tcols))"/>

	<xsl:template match="aid:Table">
	  <xsl:variable name="tcols"><xsl:value-of select="number(@aid:tcols)"/></xsl:variable>
	  <xsl:variable name="trows"><xsl:value-of select="number(@aid:trows)"/></xsl:variable>
	  <!-- Here we decide whether it is practical to split table to balanced columns -->
	  <!-- (tables with many columns and few rows are excluded) -->
	  <xsl:variable name="columns"><xsl:value-of select="floor(15 div $tcols)"/></xsl:variable>
	  <xsl:variable name="column-count">
		<xsl:choose>
		  <xsl:when test="floor( $trows div $columns ) &gt;= 5">
			<xsl:value-of select="$columns"/>
		  </xsl:when>
		  <xsl:otherwise>1</xsl:otherwise>
		</xsl:choose>
	  </xsl:variable>
	  <xsl:variable name="table-width">
		<xsl:choose>
		  <xsl:when test="$column-count &lt; $columns"><xsl:value-of select="100 div $columns"/>%</xsl:when>
		  <xsl:otherwise>100%</xsl:otherwise>
		</xsl:choose>
	  </xsl:variable>

	  <stl:span column-count="{$column-count}">
		<stl:p>
		  <stl:table w="{$table-width}">
			<stl:story>
			  <!-- We have to use Muenchian grouping for tables (see http://gandhimukul.tripod.com/xslt/grouping.html) -->
			  <xsl:for-each select="key('keyCell', 0 )[generate-id(current()) = generate-id(..)]">
				<xsl:variable name="row"><xsl:value-of select="floor(sum(preceding-sibling::*/@aid:ccols) div $tcols)"/></xsl:variable>
				<stl:row index="{$row}">
				  <xsl:for-each select="key('keyRow', $row )[generate-id(current()/..) = generate-id(..)]">
					<stl:cell index="{position()-1}" w="{100 div $tcols}%">
					  <xsl:attribute name="class">
						<xsl:call-template name="class-name"/>
					  </xsl:attribute>
					  <xsl:if test="not(@aid:ccols = 1)">
						<xsl:attribute name="colspan"><xsl:value-of select="@aid:ccols"/></xsl:attribute>
					  </xsl:if>
					  <stl:p>
						<xsl:variable name="class">
						  <xsl:choose>
							<xsl:when test="position() = 1">col-first</xsl:when>
							<xsl:when test="aid:font/@color">col-<xsl:value-of select="aid:font/@color"/></xsl:when>
							<xsl:when test="aid:font/@weight">col-<xsl:value-of select="aid:font/@weight"/></xsl:when>
							<xsl:when test="aid:u">col-underline</xsl:when>
						  </xsl:choose>
						</xsl:variable>
						<xsl:if test="normalize-space($class) != ''">
						  <xsl:attribute name="class"><xsl:value-of select="normalize-space($class)"/></xsl:attribute>
						</xsl:if>
						<xsl:value-of select="normalize-space(.)"/>
					  </stl:p>
					</stl:cell>
				  </xsl:for-each>
				</stl:row>
			  </xsl:for-each>
			</stl:story>
		  </stl:table>
		</stl:p>
	  </stl:span>
	</xsl:template>

	<xsl:template match="lead">
	  <xsl:if test="normalize-space(text())">
		<stl:p>
		  <xsl:attribute name="class">
			<xsl:call-template name="class-name"/>
		  </xsl:attribute>
		  <xsl:value-of select="normalize-space(text())"/>
		</stl:p>
	  </xsl:if>
	</xsl:template>

	<xsl:template match="storybody">
	  <stl:span column-count="3">
		<xsl:apply-templates select="p"/>
	  </stl:span>
	</xsl:template>

	<xsl:template match="p">
	  <xsl:choose>
		<xsl:when test="@class='listWrapper'">
		  <stl:list>
			<stl:p class="ListStart">
			  <stl:line x2="100%" y2="0pt" class="ListSeparator"/>
			</stl:p>
			<xsl:apply-templates select="ul/li"/>
			<stl:p class="ListEnd">
			  <stl:line x2="100%" y2="0pt" class="ListSeparator"/>
			</stl:p>
		  </stl:list>
		</xsl:when>
		<xsl:when test="subhead">
		  <stl:p>
			<xsl:for-each select="subhead">
			  <xsl:attribute name="class">	
				<xsl:call-template name="class-name"/>
			  </xsl:attribute>
			  <xsl:value-of select="normalize-space(text())"/>
			</xsl:for-each>
		  </stl:p>
		</xsl:when>
		<xsl:otherwise>
		  <stl:p>
			<xsl:attribute name="class">
			  <xsl:call-template name="class-name"/>
			  <!-- This trick helps us to avoid spacing-before on .Subhead paragraphs  -->
			  <xsl:if test="following-sibling::p[1]/subhead">Last</xsl:if>
			</xsl:attribute>
			<xsl:value-of select="normalize-space(text())"/>
		  </stl:p>
		</xsl:otherwise>
	  </xsl:choose>	  
	</xsl:template>

	<xsl:template match="li">
	  <stl:p class="Bullet">
		<xsl:value-of select="normalize-space(text())"/>
	  </stl:p>
	</xsl:template>

</xsl:stylesheet>
