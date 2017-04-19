import docapi
import docbuilder
import testtools

g_trace = """\
log message
info message
error message
warn message
{ log: [Function: bound ],
  info: [Function: bound ],
  warn: [Function: bound ],
  error: [Function: bound ],
  dir: [Function: bound ],
  time: [Function: bound ],
  timeEnd: [Function: bound ],
  trace: [Function: bound trace],
  assert: [Function: bound ],
  Console: [Function: Console] }
"""

def DefineDocument( doc ):
    docbuilder.parse( __file__.replace( '.py', '.xml' ), doc )
    doc.MakeReadOnly()
    view = testtools.create_view_with_default_procctx( doc, None, docapi.IProcessingContext.PM_RUNTIME_STREAM )

    testtools.should_trace( lambda: view.Update(), g_trace, False )
