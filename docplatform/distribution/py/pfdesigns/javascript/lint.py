import docapi
import docbuilder
import testtools

g_trace = """\
  lint-syntax.js:3:32 JSLintWarning: Unexpected trailing space.
  lint-syntax.js:7:10 JSLintWarning: Redefinition of 'some_function' from line 2.
  lint-syntax.js:8:16 JSLintWarning: Expected '{' and instead saw 'return'.
  lint-syntax.js:9:2 JSLintWarning: Use spaces, not tabs.

  lint-semantics.js:3:10 JSLintWarning: Unused 'find_key'.
  lint-semantics.js:3:20 JSLintWarning: Unexpected space between '(' and 'obj'.
  lint-semantics.js:3:29 JSLintWarning: Unexpected space between 'val' and ')'.
  lint-semantics.js:5:5 JSLintWarning: Unexpected 'for'.
  lint-semantics.js:5:8 JSLintWarning: Expected one space between 'for' and '('.
  lint-semantics.js:5:10 JSLintWarning: Unexpected space between '(' and 'key'.
  lint-semantics.js:5:21 JSLintWarning: Unexpected space between 'obj' and ')'.
  lint-semantics.js:6:11 JSLintWarning: Expected one space between 'if' and '('.
  lint-semantics.js:6:13 JSLintWarning: Unexpected space between '(' and 'obj'.
  lint-semantics.js:7:26 JSLintWarning: Unexpected trailing space.
"""

def DefineDocument( doc ):
    docbuilder.parse( __file__.replace( '.py', '.xml' ), doc )
    doc.MakeReadOnly()
    view = testtools.create_view_with_default_procctx( doc, None, docapi.IProcessingContext.PM_RUNTIME_STREAM )

    testtools.should_trace( lambda: view.Update(), g_trace, False )
