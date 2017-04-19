import docapi

def DefineDocument( doc ):
    factory = doc.Factory()
    page = factory.Page()

    text = factory.Text( 72, 72, 72, 72 )
    text.Story().Range().setText( 'a\nb' )

    script = text.Script( docapi.BEFORE );
    script.setLanguage( "js" )
    script.setScript( "console.log( 'Hello from javascript!' );" )
    
    page.Children().Add( text )
    doc.PageItems().Add( page )
    doc.Structure().AppendPage( page, docapi.OCC_ONCE_OR_MORE )

