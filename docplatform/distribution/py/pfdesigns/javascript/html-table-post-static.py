import docapi
import docbuilder

def TestConfiguration():
    return { 'data-source' : DataSourceHook }

def DataSourceHook():
    return __file__.replace( '-post-static.py', '-data.xml' )

def DefineDocument( doc ):
    docbuilder.parse( __file__.replace( '.py', '.xml' ), doc )
