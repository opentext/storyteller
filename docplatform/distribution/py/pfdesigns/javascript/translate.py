import docbuilder

def TestConfiguration():
    return { 
        'language' : "cs-CZ", 
        'language-files' : [ __file__.replace( '.py', '.tbl' ) ] 
    }

def DefineDocument( doc ):
    docbuilder.parse( __file__.replace( '.py', '.xml' ), doc )
