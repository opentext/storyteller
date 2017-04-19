import os
import re
import docapi
import vflib

from rst2docbuilder import TransformationRSTTestCase

testcase = TransformationRSTTestCase(os.path.realpath(__file__))
testcase.generate_xml_definition_xsl()
testcase.dump_xslt()

def TestConfiguration():
    return { 
        'data-source': testcase.DataSourceHook(),
        'processing-mode' : docapi.IProcessingContext.PM_DESIGNTIME,
        'pipeline' : testcase.PipelineHookXSLT(docapi, DefineDocument),
        'xslt-uri' : testcase.XsltHook(), 
        'on-document-done': testcase.DocumentDone()
    }

def DefineDocument( doc ):
    testcase.parse_with_docbuilder(doc)
