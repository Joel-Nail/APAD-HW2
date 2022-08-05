from flask import Flask, request, send_from_directory
from flask_cors import CORS # comment out when deployed
import json
import random
import io


name_json =""

name_dict = {'Joel':'Nail', 'Lauren': 'Butler'}


app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app) # comment out when deployed


@app.route('/', methods=['GET'])
def index():
    return send_from_directory(app.static_folder, 'index.html') 


@app.route('/api/name/',methods=['POST'])
def name():
    name_request = request.data
    global name_json
    name_json = json.load(io.BytesIO(name_request)) # this seems to have fixed my internal server error issue
    #return json.dumps({'data from name_api':name_json})
    print("name api says name_json =", name_json)
    return name_json


@app.route('/api/getter/',methods=['GET'])
def getter():
    print("getter api says name_json =", name_json)

    name_string = name_json['name']
    
    try:
        return json.dumps({'data_from_backend' : name_dict[name_string]})
    except KeyError:
        return json.dumps({'data_from_backend' : "User not found"})
    

    #return json.dumps({'data_from_backend' : name_json})


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

'''
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False,
    port=os.environ.get('PORT', 80))
'''
