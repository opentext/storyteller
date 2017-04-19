import docapi
import docbuilder
from utils_dump import OptionsHook

g_data = __file__.replace('.py', '.dat')
g_html = __file__.replace('.py', '.htm')

g_settings = {
    "JSFILTER_PATH" : "wd:/stl2html.js",
    "JSFILTER_STREAM_data" : "<data/>",
    "JSFILTER_CFG_stl" : "wd:/stl2html.xml",
    "JSFILTER_CFG_template" : "wd:/template.html",
}

g_def = """
<root>
  <page>
    <text size='400,400' pos='10,10' pen='1'><p/></text>
  </page>
</root>
"""

def TestConfiguration():
    return { 'pipeline' : PipelineHook, 'options-hook' : OptionsHook }

def PipelineHook( driver, resctx, procctx ):
    invoker = docapi.DocModel().DebugTools().CreateExtfilterInvoker("jsfilter")

    repo = docapi.cast_to_output(resctx.Services().Repository())

    wd = repo.Status("wd:/").PhysicalPath()
    invoker.set_property( 1, wd ) #xf_workingDirectory
    invoker.set_property( 11, "text/plain" ) #xf_contentType

    stream_in = repo.OpenSeqStreamInput(g_data)
    stream_out = repo.OpenSeqStreamOutput(g_html, True, False)
    settings = '\t'.join( '%s=%s' % ( key, value ) for key, value in g_settings.items() )
    invoker.invoke( stream_in.__deref__(), stream_out.__deref__(), settings )
    return driver

def DefineDocument( doc ):
    docbuilder.parse_string( g_def, doc )
