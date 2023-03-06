from conexion import obtener_conexion
import controlador
from flask import Flask, jsonify, request, Response
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
def index():
    try:
        conexion = obtener_conexion()
        print("CONEXION EXITOSA")
        return jsonify({'AYD1': "Practica 2, AYD1 CONEXION EXITOSA"})
    except:
        print("NO SE PUEDE ESTABLECER LA CONEXION A LA BASE DE DATOS")
        return jsonify({'AYD1': "NO SE PUEDE ESTABLECER LA CONEXION A LA BASE DE DATOS"})

# Endpoint para almacenar un usuario en la base de datos    
@app.route('/crearUsuario', methods=['POST'])
def crearUsuario():
    try:
        info = request.json
        nom = info['nombre']
        ape = info['apellido']
        mail = info['correo']
        passw = info['password']
        print(nom, ape, mail, passw)
        controlador.AgregarUsuario(nom, ape, mail, passw)
        return jsonify({"respuesta":"SE AGREGO UN CONTACTO EXITOSAMENTE"})
    except:
        print("NO SE PUEDE CREAR EL USUARIO")
        return jsonify({'respuesta': "NO SE PUEDE CREAR EL USUARIO"})

@app.route('/crearActor', methods=['POST'])
def crearActor():
    try:
        info = request.json
        nom = info['nombre']
        des = info['descripcion']
        pic = info['foto']
        nac = info['fecha_nacimiento']
        print(nom, des, pic, nac)
        controlador.AgregarActor(nom, des, pic, nac)
        return jsonify({"respuesta":"SE AGREGO UN ACTOR EXITOSAMENTE"})
    except:
        print("NO SE PUEDE CREAR EL ACTOR")
        return jsonify({'respuesta': "NO SE PUEDE CREAR EL ACTOR"})




if __name__ == '__main__':
    print("SERVIDOR INICIADO EN EL PUERTO: 5000")
    
    # serve(app, port=5000)
    app.run(debug=True)