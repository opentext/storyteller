import os.path
import json
import requests
from storyteller import Proxy, find_result

def main():
    proxy = Proxy()
    if not proxy.ping():
        raise RuntimeError("Server not available")

    r = proxy.upload('samples/table/design.xml', 'application/xml')
    design = find_result(r, name='design.xml')
    r = proxy.upload('samples/table/data.xml', 'application/xml')
    data = find_result(r, name='data.xml')

    r = proxy.stl(design['id'], data['id'], 'pdf')
    pdf = find_result(r, mimetype='application/pdf')
    with open('table.pdf', 'wb') as f:
        f.write(proxy.content(pdf['id']))
            
if __name__ == '__main__':
    main()
