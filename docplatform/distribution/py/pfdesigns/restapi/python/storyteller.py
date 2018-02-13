import os.path
import json
import requests

class Proxy:
    def __init__(self, url = "https://cem-dev-karim.eastus.cloudapp.azure.com/storyteller/api"):
        self.url = url
        self.session = requests.Session()
        
    def ping(self):
        response = self.session.get(self.url+'/ping')
        return response.status_code == 200

    def upload(self, filepath, mimetype='application/octet-stream'):
        files = {'file': (os.path.basename(filepath), open(filepath, 'rb'), mimetype)}
        response = self.session.post(self.url+'/files', files=files)
        return response.json()

    def content(self, hash):
        return self.session.get(self.url+'/files/'+hash+'/contents').content

    def tdt(self, source, template, rules, params = {}):
        inputs = {
            "source": source,
            "template": template,
            "rules": rules,
            "options": {
                "mode": 127,
                "params": params
            }
        }
        response = self.session.post(self.url+'/tdt', json=inputs)
        return response.json()

    def stl(self, design, data=None, format = "pdf"):
        inputs = {
            "design": design,
            "options": {
                "data": {"rules":"_default","source":"_default"},
                "driver":{"type":format},
                "properties":{"language":"en-US"},
                "validate":True
            }
        }
        if data:
            inputs['data'] = data
        response = self.session.post(self.url+'/stl', json=inputs)
        return response.json()
    
def find_result(response, name = None, mimetype = None):
    if name:
        for r in response['result']:
            if name == r['name']:
                return r
    if mimetype:
        for r in response['result']:
            if mimetype == r['type']:
                return r

