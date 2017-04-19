import docapi
import resourcesapi
import testtools
from testutils import assert_equal

g_tests = [
( 'return 42', 'test1', 
"""\
test1:1: SyntaxError: Illegal return statement
return 42
^^^^^^
SyntaxError: Illegal return statement
""" ),
( '"use strict";\nvar x = 042;', 'test2', 
"""\
test2:2: SyntaxError: Octal literals are not allowed in strict mode.
var x = 042;
        ^^^
SyntaxError: Octal literals are not allowed in strict mode.
""" ),
( '"use strict";\nwith (z) {}', 'test3', 
"""\
test3:2: SyntaxError: Strict mode code may not include a with statement
with (z) {}
^^^^
SyntaxError: Strict mode code may not include a with statement
""" ),
( '"use strict";\nfunction foo(x, x) { return x+x; }', 'test4', 
"""\
test4:2: SyntaxError: Duplicate parameter name not allowed in this context
function foo(x, x) { return x+x; }
                ^
SyntaxError: Duplicate parameter name not allowed in this context
""" ),
( 'x = 42;', "test5", "" ), # undeclared variable is not a compile error, but execution error
]

def DefineDocument( doc ):
    view = docapi.DocModel().DocumentView( doc, doc.ResourceContext() )
    testtools.create_default_processing_context_for_view( view, mode=docapi.IProcessingContext.PM_DESIGNTIME )
    view.Update()

    for statement, origin, result in g_tests:
        spec = resourcesapi.ScriptSpec( 'js', statement, origin ) 
        assert_equal( view.ViewDebug().CheckSyntax( spec ), result )

    spec = resourcesapi.ScriptSpec( 'py', 'a = 1', 'python_test' ) 
    testtools.should_throw( lambda: view.ViewDebug().CheckSyntax( spec ), 'RuntimeError: Not implemented' )
    
