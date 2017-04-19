<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout"
	version="1.0">
	<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="HTML" doctype-system=""/>

	<xsl:template match="/stl:stl">
	  <!--<xsl:text disable-output-escaping='yes'>&lt;!doctype html&gt;</xsl:text> -->
	  <html>
		<head>
		  <title>DocBuilder generated HTML</title>
		  <!--<xsl:text disable-output-escaping='yes'>&lt;charset="UTF-8"&gt;</xsl:text>-->
		  <xsl:apply-templates select="stl:style" mode="docbuilder"/>
		  <xsl:apply-templates select="stl:data" mode="docbuilder"/>
		  <xsl:apply-templates select="stl:fixtures" mode="docbuilder"/>
		  <link rel="stylesheet" href="./bower_components/nvd3/build/nv.d3.css"/>
		  <script src="./bower_components/d3/d3.js"></script>
		  <script src="./bower_components/nvd3/build/nv.d3.js"></script>
		  <script src="build/app.js"></script>
		</head>
		<xsl:apply-templates select="stl:document" mode="docbuilder"/>
	  </html>
	</xsl:template>

	<xsl:template match="stl:data/stl:source" mode="docbuilder">
	  <script type="text/xmldata" id="stl-data">
		<xsl:copy-of select="node()"/>
	  </script>
	</xsl:template>

	<xsl:template match="stl:fixtures" mode="docbuilder">
	  <script type="text/xmldata" id="stl-fixtures">
		<xsl:copy-of select="."/>
	  </script>
	</xsl:template>

	<xsl:template match="stl:style" mode="docbuilder">
	  <style type="text/css">
		<xsl:value-of select="text()"/>
	  </style>
	</xsl:template>

	<xsl:template match="stl:document" mode="docbuilder">
		<xsl:apply-templates select="stl:story[@name='Main']" mode="docbuilder"/>
	</xsl:template>

	<xsl:template match="stl:story[@name='Main']" mode="docbuilder">
	  <xsl:variable name="style">
		padding:20pt; margin: 0px auto; <xsl:if test="@max-width">max-width: <xsl:value-of select="@max-width"/></xsl:if>
	  </xsl:variable>
	  <body style="{$style}">
		<xsl:apply-templates mode="docbuilder"/>
	  </body>
	</xsl:template>

	<xsl:template match="stl:story" mode="docbuilder">
		<xsl:apply-templates mode="docbuilder"/>
	</xsl:template>

	<xsl:template match="stl:p" mode="docbuilder">
	  <p>
		<xsl:if test="@class"><xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute></xsl:if>
		<xsl:if test="@style"><xsl:attribute name="style"><xsl:value-of select="@style"/></xsl:attribute></xsl:if>
		<xsl:apply-templates mode="docbuilder"/>
	  </p>
	</xsl:template>

	<xsl:template match="stl:span" mode="docbuilder">
	  <span>
		<xsl:if test="@class"><xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute></xsl:if>
		<xsl:if test="@style"><xsl:attribute name="style"><xsl:value-of select="@style"/></xsl:attribute></xsl:if>
		<xsl:apply-templates mode="docbuilder"/>
	  </span>
	</xsl:template>

	<xsl:template match="stl:span[@column-count]" mode="docbuilder">
	  <div>
		<xsl:if test="@class"><xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute></xsl:if>
		<xsl:variable name="style">
		  <xsl:value-of select="@style"/>
		  <xsl:if test="@column-count">
		    column-count:<xsl:value-of select="@column-count"/>; 
		    -webkit-column-count:<xsl:value-of select="@column-count"/>; 
		    -moz-column-count:<xsl:value-of select="@column-count"/>;
		  </xsl:if>
		  <xsl:if test="@column-gap">
		    column-gap:<xsl:value-of select="@column-gap"/>; 
		    -webkit-column-gap:<xsl:value-of select="@column-gap"/>; 
		    -moz-column-gap:<xsl:value-of select="@column-gap"/>;
		  </xsl:if>
		  <xsl:if test="@column-width">
		    column-width:<xsl:value-of select="@column-width"/>; 
		    -webkit-column-width:<xsl:value-of select="@column-width"/>; 
		    -moz-column-width:<xsl:value-of select="@column-width"/>;
		  </xsl:if>
		</xsl:variable>
		<xsl:if test="$style"><xsl:attribute name="style"><xsl:value-of select="$style"/></xsl:attribute></xsl:if>
		<xsl:apply-templates mode="docbuilder"/>
	  </div>
	</xsl:template>

	<xsl:template match="stl:span[@collapse-with-summary]" mode="docbuilder">
	  <details>
		<xsl:if test="@class"><xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute></xsl:if>
		<xsl:if test="@style"><xsl:attribute name="style"><xsl:value-of select="@style"/></xsl:attribute></xsl:if>
		<summary><xsl:value-of select="@collapse-with-summary"/></summary>
		<xsl:apply-templates mode="docbuilder"/>
	  </details>
	</xsl:template>

	<xsl:template match="stl:table" mode="docbuilder">
	  <table>
		<xsl:variable name="style"><xsl:if test="@w">width:<xsl:value-of select="@w"/>;</xsl:if><xsl:value-of select="@style"/></xsl:variable>
		<xsl:if test="@class"><xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute></xsl:if>
		<xsl:if test="$style"><xsl:attribute name="style"><xsl:value-of select="$style"/></xsl:attribute></xsl:if>
		<xsl:apply-templates mode="docbuilder"/>
	  </table>
	</xsl:template>

	<xsl:template match="stl:row" mode="docbuilder">
	  <tr>
		<xsl:if test="@class"><xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute></xsl:if>
		<xsl:if test="@style"><xsl:attribute name="style"><xsl:value-of select="@style"/></xsl:attribute></xsl:if>
		<xsl:apply-templates mode="docbuilder"/>
	  </tr>
	</xsl:template>

	<xsl:template match="stl:cell" mode="docbuilder">
	  <td>
		<xsl:variable name="style"><xsl:if test="@w">width:<xsl:value-of select="@w"/></xsl:if><xsl:value-of select="@style"/></xsl:variable>
		<xsl:if test="@class"><xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute></xsl:if>
		<xsl:if test="normalize-space($style)"><xsl:attribute name="style"><xsl:value-of select="$style"/></xsl:attribute></xsl:if>
		<xsl:if test="@colspan"><xsl:attribute name="colspan"><xsl:value-of select="@colspan"/></xsl:attribute></xsl:if>
		<xsl:apply-templates mode="docbuilder"/>
	  </td>
	</xsl:template>

	<xsl:template match="stl:image" mode="docbuilder">
	  <img>
		<xsl:variable name="src"><xsl:value-of select="@src"/></xsl:variable>
	    <xsl:attribute name="src">data:<xsl:value-of select="//stl:fixture[@key=$src]/@type"/>;<xsl:value-of select="//stl:fixture[@key=$src]/@encoding"/>,<xsl:value-of select="normalize-space(//stl:fixture[@key=$src]/text())"/></xsl:attribute>
		</img>
	</xsl:template>

	<xsl:template match="stl:datasource" mode="docbuilder">
	  <span>
		<xsl:attribute name="data-stl-datasource-xpath"><xsl:value-of select="@xpath"/></xsl:attribute>
	  </span>
	</xsl:template>

	<xsl:template match="stl:repeater" mode="docbuilder">
	  <tbody>
		<xsl:attribute name="data-stl-repeater-xpath"><xsl:value-of select="@xpath"/></xsl:attribute>
		<xsl:apply-templates mode="docbuilder"/>
	  </tbody>
	</xsl:template>

	<xsl:template match="stl:script[@when='before' and @language='js']" mode="docbuilder">
	  <span style="display: inline; margin 0 auto;">
		<xsl:attribute name="data-stl-script-before"><xsl:value-of select="text()"/></xsl:attribute>
		<svg xmlns="http://www.w3.org/2000/svg">
		  <xsl:attribute name="style">display:inline; width:<xsl:value-of select="../@w"/>; height:<xsl:value-of select="../@h"/>;</xsl:attribute>
		</svg>
	  </span>
	</xsl:template>

	<xsl:template match="stl:script[@when='after' and @language='js']" mode="docbuilder">
	  <xsl:attribute name="data-stl-script-after"><xsl:value-of select="text()"/></xsl:attribute>
	</xsl:template>
</xsl:stylesheet>
