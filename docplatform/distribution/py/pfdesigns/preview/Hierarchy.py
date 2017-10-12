import docbuilder
import vflib
from empty_data_source_hook import DataSourceHook

g_design = __file__.replace( '.py', '.xml' )
g_docdef = __file__.replace( '.py', 'DD.xml' )

def DocDefHook():
    return g_docdef, True

def TestConfiguration():
    return { 'pipeline' : vflib.adhoc_test_pipeline, 'data-source' : DataSourceHook, 'docdef' : DocDefHook }

def DefineDocument( doc ):
    docbuilder.parse( g_design, doc )
