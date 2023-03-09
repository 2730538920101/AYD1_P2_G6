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

# Endpoint para obtener un usuario existente en la base de datos
@app.route('/buscarUsuario/<nombre>/<contrasenia>', methods=['GET'])
def BuscarUsuario(nombre, contrasenia):
    usuario = controlador.BuscarUsuario(nombre, contrasenia)
    return jsonify({"respuesta":usuario})

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
        return jsonify({"respuesta":"SE AGREGO UN USUARIO EXITOSAMENTE"})
    except:
        print("NO SE PUEDE CREAR EL USUARIO")
        return jsonify({'respuesta': "NO SE PUEDE CREAR EL USUARIO"})

# Endpoint para almacenar un actor en la base de datos
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

# Endpoint para almacenar una pelicula en la base de datos
@app.route('/crearPelicula', methods=['POST'])
def crearPelicula():
    try:
        info = request.json
        nom = info['nombre']
        dir = info['director']
        estreno = info['fecha_estreno']
        res = info['resumen']
        tra = info['trailer']
        rep = info['reparto']
        print(nom, dir, estreno, res, tra, rep)
        controlador.AgregarPelicula(nom, dir, estreno, res, tra, rep)
        return jsonify({"respuesta":"SE AGREGO UNA PELICULA Y SU REPARTO EXITOSAMENTE"})
    except:
        print("NO SE PUEDE CREAR EL ACTOR")
        return jsonify({'respuesta': "NO SE PUEDE CREAR LA PELICULA Y SU REPARTO"})

@app.route('/eliminarPeliculaWatchlist/<int:IdPelicula>', methods=["DELETE"])
def eliminarPeliculaWatchlist(IdPelicula):
    controlador.EliminarPeliculaWatchlist(IdPelicula)
    return jsonify({"respuesta":"SE ELIMINO CORRECTAMENTE LA PELICULA DEL WATCHLIST"})

# Endpoint para mostrar todos los actores registrados
@app.route('/mostrarActores', methods=["GET"])
def mostrarActores():
    try:
        actores = controlador.VerActores()
        return jsonify(actores)
    except:
        print("NO SE PUEDE MOSTRAR LOS ACTORES")
        return jsonify({'respuesta': "NO SE PUEDE MOSTRAR LOS ACTORES"})

# Endpoint para mostrar todas las peliculas registradas
@app.route('/mostrarPeliculas', methods=["GET"])
def mostrarPeliculas():
    try:
        peliculas = controlador.VerPeliculas()
        return jsonify(peliculas)
    except:
        print("NO SE PUEDE MOSTRAR LAS PELICULAS")
        return jsonify({'respuesta': "NO SE PUEDE MOSTRAR LAS PELICULAS"})
    
# Endpoint para mostrar toda la informacion de una pelicula
@app.route('/mostrarPelicula/<int:id>', methods=["GET"])
def mostrarPelicula(id):
    try:
        pelicula = controlador.VerPelicula(id)
        return pelicula
    except:
        print("NO SE PUEDE MOSTRAR LA PELICULA CON EL ID " + str(id))
        return jsonify({'respuesta': "NO SE PUEDE MOSTRAR LA PELICULA CON EL ID " + str(id)})
    

if __name__ == '__main__':
    print("SERVIDOR INICIADO EN EL PUERTO: 5000")
    
    # serve(app, port=5000)
    app.run(debug=True)