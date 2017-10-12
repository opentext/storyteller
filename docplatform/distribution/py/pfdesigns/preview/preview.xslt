<?xml version="1.0"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:stl="http://developer.opentext.com/schemas/storyteller/layout"
	xmlns:xp="http://developer.opentext.com/schemas/storyteller/xmlpreprocessor"
	version="1.0">
	<xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="yes" />
	<xsl:param name="remove_prefix" select="''"/>
	<xsl:template match="stl:stl">
		<html>
			<head>
				<title>Preview</title>
				<style type="text/css">
					.strs-page { position: relative; border-style: solid; }
					.strs-area { position: absolute; border: 1px dashed red; margin: -1px; }
					.strs-area:hover { background-color: RGBA(255,200,200,0.1); }
					.strs-section { position: absolute; border: 1px dashed green; margin: -1px; }
					.strs-section:hover { background-color: RGBA(200,255,200,0.2); }
					.strs-fragment { position: absolute; border: 1px dashed blue; margin: -1px; }
					.strs-fragment:hover { background-color: RGBA(200,200,255,0.3); }

					.strs-pages-container {
						position:relative;
						display:flex;
						flex-direction:column;
					}

					.strs-page-container {
						display: flex;
						flex-direction: row;
					}

					.strs-page-number {
						width: 4em;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-family: "Lato"
						font-size: 0.875em;
						color: #333;
						align: left;
					}

					.strs-page-right {
						width: 4em;
					}

					.strs-page-number-next {
						margin-bottom: 0.5em;
					}

					.strs-page-number-previous {
						margin-top:0.5em;
					}

					.strs-page-content {
						box-shadow : 0 0 5px 0 rgba(0,0,0,.7);
						background-repeat: no-repeat;
					}

					.strs-page-divider {
						border: 0.0625em dashed #333;
						margin: 0;
					}
					<xsl:apply-templates select="stl:fixtures/xp:fixture"/>
				</style>
			</head>
			<body>
				<xsl:variable name="pageCount" select="count(//stl:page)" />
				<div class="strs-pages-container">
					<xsl:attribute name="data-page-count"><xsl:value-of select="$pageCount"/></xsl:attribute>
					<xsl:apply-templates select="stl:document/stl:page"/>
				</div>
			</body>
		</html>
	</xsl:template>

	<xsl:template match="xp:fixture[@encoding='base64']">
		<xsl:variable name="doc" select="count(../../preceding-sibling::stl:stl)"/>
		<xsl:variable name="id" select="translate(substring-after(@key, 'link:/'), '/.', '--')"/>
					#doc<xsl:value-of select="$doc"/>-<xsl:value-of select="$id"/> {
						background-image: url('data:<xsl:value-of select="@type"/>;<xsl:value-of select="@encoding"/>,<xsl:copy-of select="node()"/>');
		}
	</xsl:template>

	<xsl:template match="xp:fixture[@src]">
		<xsl:variable name="doc" select="count(../../preceding-sibling::stl:stl)"/>
		<xsl:variable name="id" select="translate(substring-after(@key, 'link:/'), '/.', '--')"/>
		<xsl:choose>
			<xsl:when test="starts-with(@src,'resource:/')">
					#doc<xsl:value-of select="$doc"/>-<xsl:value-of select="$id"/> {
						background-image:url(<xsl:value-of select="substring-after(@src,'resource:/')"/>);
					}
			</xsl:when>
			<xsl:when test="string-length($remove_prefix) &gt; 0">
					#doc<xsl:value-of select="$doc"/>-<xsl:value-of select="$id"/> {
						background-image:url(<xsl:value-of select="substring-after(@src, $remove_prefix)"/>);
					}
			</xsl:when>
			<xsl:otherwise>
					#doc<xsl:value-of select="$doc"/>-<xsl:value-of select="$id"/> {
						background-image:url(<xsl:value-of select="text()"/>);
					}
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="xp:fixture"/>

	<xsl:template match="stl:page">
	  <xsl:variable name="doc" select="count(../../preceding-sibling::stl:stl)"/>
		<xsl:variable name="pageCount" select="count(//stl:page)" />
		<xsl:variable name="bg" select="@background"/>
		<xsl:variable name="pageNumber" select="count(./preceding::stl:page) + 1"/>
		<div class="strs-page-container">
			<div class="strs-page-number">
				<div class="strs-page-number-previous">
					<xsl:if test="$pageNumber &gt; 1">
					{{PREVIEW.PAGE.LABEL}}: <xsl:value-of select="$pageNumber"/>
					</xsl:if>
				</div>

				<div class="strs-page-number-next">
					<xsl:if test="$pageNumber &lt; $pageCount">
					{{PREVIEW.PAGE.LABEL}}: <xsl:value-of select="$pageNumber"/>
					</xsl:if>
				</div>
			</div>
			<div class="strs-page-content strs-page">
				<xsl:choose>
					<xsl:when test="$bg">
						<xsl:attribute name="id">doc<xsl:value-of select="$doc"/>-<xsl:value-of select="translate(substring-after($bg, 'link:/'), '/.', '--')"/></xsl:attribute>
					</xsl:when>
				<xsl:otherwise>
					<xsl:variable name="index" select="substring(string(1000000000 + @index), 8)"/>
					<xsl:attribute name="id">doc<xsl:value-of select="$doc"/>-<xsl:value-of select="concat(translate(substring-after(../@background, 'link:/'), '/.', '--'),'-page', $index)"/></xsl:attribute>
				</xsl:otherwise>
				</xsl:choose>
				<xsl:attribute name="data-page-number"><xsl:value-of select="$pageNumber"/></xsl:attribute>
				<xsl:variable name="dim" select="concat('width: ',@w,'; min-width: ',@w,'; height: ',@h,'; ')" />

				<xsl:attribute name="style"><xsl:value-of select="$dim"/></xsl:attribute>
				<xsl:copy-of select="//xp:fixture[@key=$bg and @type='image/svg+xml' and not(@encoding='base64')][$doc+1]/node()"/>
				<xsl:apply-templates select="stl:box"/>
			</div>
			<div class="strs-page-right">
			</div>
		</div>
		<xsl:if test="$pageNumber &lt; $pageCount">
			<div class="strs-page-divider">
				<xsl:attribute name="style">width:<xsl:value-of select="substring-before(@w, 'px') + 80"/>px;</xsl:attribute>
			</div>
		</xsl:if>
	</xsl:template>

	<xsl:template match="stl:box[@class='area']">
		<div class="strs-area">
			<xsl:variable name="left" select="concat(@x,substring('0', 1 div not(@x)))"/>
			<xsl:variable name="top" select="concat(@y,substring('0', 1 div not(@y)))"/>
			<xsl:variable name="pos" select="concat('left: ', $left,'; top: ', $top ,'; ')" />
			<xsl:variable name="dim" select="concat('width: ',@w,'; height: ',@h,'; ')" />
			<xsl:attribute name="style"><xsl:value-of select="$pos"/><xsl:value-of select="$dim"/><xsl:if test="@transform">transform: <xsl:value-of select="translate(@transform, ' ', ',')"/>;</xsl:if></xsl:attribute>
			<xsl:apply-templates select="stl:box"/>
		</div>
	</xsl:template>

	<xsl:template match="stl:box[@class='span']">
		<xsl:variable name="type" select="substring-before(@data, ';')" />
		<xsl:variable name="data" select="substring-after(@data, ';')" />
		<xsl:variable name="left" select="concat(@x,substring('0', 1 div not(@x)))"/>
		<xsl:variable name="top" select="concat(@y,substring('0', 1 div not(@y)))"/>
		<xsl:variable name="pos" select="concat('left: ', $left,'; top: ', $top ,'; ')" />
		<xsl:variable name="dim" select="concat('width: ',@w,'; height: ',@h,'; ')" />
		<div>
			<xsl:choose>
				<xsl:when test="$type='s'">
					<xsl:attribute name="class">strs-section</xsl:attribute>
					<xsl:attribute name="data-section-id"><xsl:value-of select="$data"/></xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">strs-fragment</xsl:attribute>
					<xsl:variable name="id" select="substring-after($data, ';')" />
					<xsl:variable name="uri" select="substring-before($data, ';')" />
					<xsl:attribute name="data-resource-id"><xsl:value-of select="$id"/></xsl:attribute>
					<xsl:attribute name="data-resource-uri"><xsl:value-of select="$uri"/></xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:attribute name="style"><xsl:value-of select="$pos"/><xsl:value-of select="$dim"/>position:absolute;</xsl:attribute>
			<xsl:apply-templates select="stl:box"/>
		</div>
	</xsl:template>

</xsl:stylesheet>
