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

# Endpoint para que un usuario pueda calificar una pelicula
@app.route('/calificarPelicula', methods=['POST'])
def calificarPelicula():
    try:
        data = request.json
        id_usuario = data['id_usuario']
        id_pelicula = data['id_pelicula']
        punteo = data['punteo']
        controlador.CalificarPelicula(id_usuario,id_pelicula, punteo)
        return jsonify({"respuesta":"Se ha calificado la pelicula correctamente"})
    except:
        return jsonify({'respuesta': "Error: No se pudo calificar la pelicula, intentelo de nuevo."})

# Endpoint para retornar la calificacion de una pelicula
@app.route('/devolverCalificacion/<int:id_pelicula>/<int:id_usuario>', methods=['GET'])
def devolverCalificacion(id_pelicula, id_usuario):
    try:
        # data = request.json
        # id_usuario = data['id_usuario']
        # id_pelicula = data['id_pelicula']
        cal = controlador.DevolverCalificacion(id_usuario,id_pelicula)
        if(cal != None):
            return jsonify({"respuesta":cal})
        else:
            return jsonify({"respuesta":0})
    except:
        return jsonify({'respuesta': "Error: No se pudo obtener la calificacion de pelicula."})

@app.route('/agregarComentario', methods=['POST'])
def agregarComentario():
    try:
        data = request.json
        id_usuario = data['id_usuario']
        id_pelicula = data['id_pelicula']
        descripcion = data['descripcion']
        controlador.AgregarComentario(id_usuario,id_pelicula, descripcion)
        return jsonify({"respuesta":"Se agrego el comentario con exito."})
    except:
        print("NO SE PUEDE CREAR EL ACTOR")
        return jsonify({'respuesta': "Error: No se pudo agregar el comentario, intentelo denuevo."})

# Endpoint para agregar una pelicula al watchlist
@app.route('/agregarPeliculaWatchlist', methods=['POST'])
def agregarPeliculaWatchlist():
    try:
        info = request.json
        id_usuario = info['id_usuario']
        id_pelicula = info['id_pelicula']
        id_wat = controlador.AgregarPeliculaWatchlist(id_usuario, id_pelicula)
        if id_wat is not None:
            return jsonify({"respuesta":"LA PELICULA YA ESTA INGRESADA EN EL WATCHILST"})
        else:
            return jsonify({"respuesta":"SE AGREGO LA PELICULA AL WATCHLIST CORRECTAMENTE"})
    except:
        return jsonify({"respuesta":"NO SE PUEDE AGREGAR LA PELICULA AL WATCHLIST"})

# Endpoint para eliminar una pelicula del watchlist
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

@app.route('/mostrarComentarios/<int:id>', methods=["GET"])
def mostrarComentarios(id):
    try:
        # data = request.json
        # id_pelicula = data['id_pelicula']
        # print(id_pelicula)
        comentarios = controlador.MostrarComentarios(id)
        return jsonify(comentarios)
    except:
        return jsonify({'respuesta': "Error: No se pueden mostrar los comentarios, intente denuevo."})


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
    
@app.route('/mostrarActor/<int:id>', methods=["GET"])
def mostrarActor(id):
    try:
        actor = controlador.VerActor(id)
        return actor
    except:
        print("NO SE PUEDE MOSTRAR EL ACTOR CON EL ID " + str(id))
        return jsonify({'respuesta': "NO SE PUEDE MOSTRAR EL ACTOR CON EL ID " + str(id)})
 
 
@app.route('/obtenerUltimas5PeliculasActor/<int:id>', methods=["GET"])
def mostrarUltimas5PelisActor(id):
    try:
        pelis = controlador.Ultimas5PelActor(id)
        return jsonify(pelis)
    except:
        print("NO SE PUEDE MOSTRAR LAS PELICULAS DEL ACTOR CON EL ID " + str(id))
        return jsonify({'respuesta': "NO SE PUEDE MOSTRAR LAS PELICULAS DEL ACTOR CON EL ID " + str(id)})   
    
@app.route('/mostrarWatchlist/<int:id>', methods=["GET"])
def mostrarWatchlist(id):
    try:
        Watchlist = controlador.MostrarWatchlist(id)   
        return Watchlist
    except:
        print("Error: No es posible mostrar el Watchlist del usuario.")
        return jsonify({'respuesta': "Error: No es posible mostrar el Watchlist del usuario."})


if __name__ == '__main__':
    print("SERVIDOR INICIADO EN EL PUERTO: 5000")
    
    # serve(app, port=5000)
    app.run(debug=True)
