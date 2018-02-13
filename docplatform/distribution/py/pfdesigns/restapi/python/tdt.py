import os.path
import json
import requests
from storyteller import Proxy, find_result

samples = 'samples/tdt/'
types = {
    'xml': 'application/xml',
    'pdf': 'application/pdf'
}

def main():
    proxy = Proxy()
    if not proxy.ping():
        raise RuntimeError("Server not available")

    r = proxy.upload(samples+'rules.xml', types['xml'])
    rules = find_result(r, name='rules.xml')
    r = proxy.upload(samples+'template.xml', types['xml'])
    template = find_result(r, name='template.xml')

    for i in range(1,12):
        src = 'data%02d.xml' % i
        dst = 'tdt%02d.pdf' % i
        msg = '%s -> %s' % (src, dst)
        print msg

        r = proxy.upload(samples+src, types['xml'])
        source = find_result(r, name=src)
        r = proxy.tdt(source['id'], template['id'], rules['id'])
        design = r['result']
        r = proxy.stl(design['id'], format='pdf')
        pdf = find_result(r, mimetype=types['pdf'])
        with open(dst, 'wb') as f:
            f.write(proxy.content(pdf['id']))
        
if __name__ == '__main__':
    main()
