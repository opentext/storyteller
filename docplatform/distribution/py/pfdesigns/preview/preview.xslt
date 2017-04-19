<?xml version="1.0"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout"
	version="1.0">
	<xsl:output method="html" version="4.0" encoding="UTF-8" indent="yes"/>
	<xsl:param name="remove_prefix" select="''"/>
	<xsl:template match="stl:root">
		<html>
			<head>
				<title>Edit Area Layout</title>
				<style type="text/css">
					div.strs_page { position: relative; border-style: solid; }
					div.strs_area { position: absolute; border: 1px dashed red; margin: -1px; }
					div.strs_area:hover { background-color: RGBA(255,200,200,0.1); }
					div.strs_section { position: absolute; border: 1px dashed green; margin: -1px; }
					div.strs_section:hover { background-color: RGBA(200,255,200,0.2); }
					div.strs_fragment { position: absolute; border: 1px dashed blue; margin: -1px; }
					div.strs_fragment:hover { background-color: RGBA(200,200,255,0.3); }
					<xsl:apply-templates select="stl:resources/stl:resource"/>
				</style>
			</head>
			<body>
				<xsl:apply-templates select="stl:doc/stl:page"/>
			</body>
		</html>
	</xsl:template>

	<xsl:template match="stl:resource[@type='data' and @encoding='base64']">
		#<xsl:value-of select="@id"/> {
		background-image:url('data:<xsl:value-of select="@mimetype"/>;<xsl:value-of select="@encoding"/>,<xsl:copy-of
	select="node()"/>');
		}
	</xsl:template>

	<xsl:template match="stl:resource[@type='uri']">
		<xsl:choose>
			<xsl:when test="starts-with(text(),'resource:/')">
				#<xsl:value-of select="@id"/> {
				background-image:url(<xsl:value-of select="substring-after(text(),'resource:/')"/>);
				}
			</xsl:when>
			<xsl:when test="string-length($remove_prefix) &gt; 0">
				#<xsl:value-of select="@id"/> {
				background-image:url(<xsl:value-of select="substring-after(text(), $remove_prefix)"/>);
				}
			</xsl:when>
			<xsl:otherwise>
				#<xsl:value-of select="@id"/> {
				background-image:url(<xsl:value-of select="text()"/>);
				}
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="stl:resource"/>

	<xsl:template match="stl:page">
		<xsl:variable name="id" select="@id"/>
		<div class="strs_page">
			<xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
			<xsl:variable name="dim" select="concat('width: ',@w,'px; height: ',@h,'px; ')" />

			<xsl:attribute name="style"><xsl:value-of select="$dim"/></xsl:attribute>
			<xsl:copy-of select="/stl:root/stl:resources/stl:resource[@id=$id and @mimetype='image/svg+xml' and @encoding='utf8']/node()"/>
			<xsl:apply-templates select="stl:area"/>
		</div>
	</xsl:template>

	<xsl:template match="stl:area">
		<div class="strs_area">
		  <xsl:variable name="pos" select="concat('left: ',@x,'px; top: ',@y,'px; ')" />
		  <xsl:variable name="dim" select="concat('width: ',@w,'px; height: ',@h,'px; ')" />
		  <xsl:variable name="matrix">
			<xsl:if test="@mtx">
			  <xsl:value-of select="concat('transform: matrix(',translate(@mtx,' ', ','),');')" />
			</xsl:if>
		  </xsl:variable>
		  <xsl:attribute name="style"><xsl:value-of select="$pos"/><xsl:value-of select="$dim"/><xsl:value-of select="$matrix"/></xsl:attribute>
			<xsl:apply-templates select="stl:area|stl:span"/>
		</div>
	</xsl:template>

	<xsl:template match="stl:span">
	  <xsl:variable name="type" select="substring-before(@data, ';')" />
	  <xsl:variable name="data" select="substring-after(@data, ';')" />
	  <xsl:variable name="pos" select="concat('left: ',@x,'px; top: ',@y,'px; ')" />
	  <xsl:variable name="dim" select="concat('width: ',@w,'px; height: ',@h,'px; ')" />
	  <div>
		<xsl:choose>
		  <xsl:when test="$type='s'">
			<xsl:attribute name="class">strs_section</xsl:attribute>
			<xsl:attribute name="title">Section <xsl:value-of select="$data"/></xsl:attribute>
			<xsl:attribute name="data-section-id"><xsl:value-of select="$data"/></xsl:attribute>
		  </xsl:when>
		  <xsl:otherwise>
			<xsl:attribute name="class">strs_fragment</xsl:attribute>
			<xsl:variable name="id" select="substring-after($data, ';')" />
			<xsl:variable name="uri" select="substring-before($data, ';')" />
			<xsl:attribute name="title">Fragment <xsl:value-of select="$uri"/></xsl:attribute>
			<xsl:attribute name="data-resource-id"><xsl:value-of select="$id"/></xsl:attribute>
			<xsl:attribute name="data-resource-uri"><xsl:value-of select="$uri"/></xsl:attribute>
		  </xsl:otherwise>
		</xsl:choose>
		<xsl:attribute name="style"><xsl:value-of select="$pos"/><xsl:value-of select="$dim"/></xsl:attribute>
		<xsl:apply-templates select="stl:area|stl:span"/>
	  </div>
	</xsl:template>

</xsl:stylesheet>
