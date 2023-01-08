# app.py

# Required imports
import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
from operation_function import reporter, owner
from PIL import Image

 # Initialize Flask app
app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate('kreaters-b978a-firebase-adminsdk-u1n4r-5e78738f35.json')
default_app = initialize_app(cred)
db = firestore.client()
owner_collection = db.collection('owner')
reporter_collection = db.collection('reporter')
mlCollection = db.collection('mlCollection')

@app.route('/list', methods=['GET'])
def main():
    for doc in reporter_collection.stream():
        reporterData = doc.to_dict()
        did = reporter_collection.document().id
        reporterData["did"] = did
        reporter(reporterData)
    

    ownerData = []
    mtime = []
    for doc in owner_collection.stream():
        owner_dict = doc.to_dict()
        did = owner_collection.document().id
        timeStamp_value = owner_dict['timestamp']
        mtime.append(timeStamp_value)
        owner_dict["did"] = did
        ownerData.append(owner_dict)
    newData = max(mtime)

    for doc in ownerData:
        if owner_dict['timestamp'] == newData:
            newData = owner_dict
    owner(newData)

    return "Hello"

# @app.route('/add', methods=['POST'])
# def create():
#     """
#         create() : Add document to Firestore collection with request body.
#         Ensure you pass a custom ID as part of json body in post request,
#         e.g. json={'id': '1', 'title': 'Write a blog post'}
#     """
#     try:
#         content = request.json
#         print("It's worked")
#         return content
#     except Exception as e:
#         return f"An Error Occurred: {e}"



# @app.route('/list', methods=['GET'])
# def read():
#     """
#         read() : Fetches documents from Firestore collection as JSON.
#         todo : Return document that matches query ID.
#         all_todos : Return all documents.
#     """

#     try:
#         # Check if ID was passed to URL query
#         todo_id = request.args.get('id')
#         if todo_id:
#             todo = todo_ref.document(todo_id).get()
#             return jsonify(todo.to_dict()), 200
#         else:
#             all_todos = [doc.to_dict() for doc in todo_ref.stream()]
#             return jsonify(all_todos), 200
#     except Exception as e:
#         return f"An Error Occurred: {e}"

# @app.route('/update', methods=['POST', 'PUT'])
# def update():
#     """
#         update() : Update document in Firestore collection with request body.
#         Ensure you pass a custom ID as part of json body in post request,
#         e.g. json={'id': '1', 'title': 'Write a blog post today'}
#     """
#     try:
#         ownerData = [] 
#         for doc in owner.stream():
#             data = doc.to_dict()
#             did = reporter.document().id
#             data["did"] = did
#             ownerData.append(data)
#         print(ownerData)
#         request.json = {'time': '11:44' }
#         .update(request.json)
#         return jsonify({"success": True}), 200
#     except Exception as e:
#         return f"An Error Occurred: {e}"

# @app.route('/update', methods=['POST', 'PUT'])
# def update():
#     """
#         update() : Update document in Firestore collection with request body.
#         Ensure you pass a custom ID as part of json body in post request,
#         e.g. json={'id': '1', 'title': 'Write a blog post today'}
#     """
#     try:
#         id = request.json['id']
#         todo_ref.document(id).update(request.json)
#         return jsonify({"success": True}), 200
#     except Exception as e:
#         return f"An Error Occurred: {e}"

# @app.route('/delete', methods=['GET', 'DELETE'])
# def delete():
#     """
#         delete() : Delete a document from Firestore collection.
#     """
#     try:
#         # Check for ID in URL query
#         todo_id = request.args.get('id')
#         todo_ref.document(todo_id).delete()
#         return jsonify({"success": True}), 200
#     except Exception as e:
#         return f"An Error Occurred: {e}"

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
