import docapi

def PipelineHook( driver, context, proc_context ):
    return docapi.DocModel().SurfaceTools().FragmentProcessor( driver, context, proc_context )
    
def TestConfiguration():
    return { 'pipeline' : PipelineHook }

def DefineDocument( doc ):
    stream = doc.ResourceContext().Services().Repository().OpenStreamInput( __file__.replace( '.py', '.xml' ) )
    docapi.DocModel().BuildDocument( stream.__deref__(), doc.__deref__() )
    
