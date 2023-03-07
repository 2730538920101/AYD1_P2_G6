from conexion import obtener_conexion
from werkzeug.security import check_password_hash, generate_password_hash

# Controlador para buscar contactos en la base de datos
def BuscarUsuario(nombre_usuario, contrasenia):
    conexion = obtener_conexion()
    usuario = None
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT Nombre,Password FROM USUARIO WHERE Nombre = %s", (nombre_usuario,))
        usuario = cursor.fetchone()
        if usuario and check_password_hash(usuario[1], contrasenia):
            usuario = usuario[0]
        else:
            usuario = None
    conexion.close()
    return usuario

# Controlador para agregar usuarios a la base de datos
def AgregarUsuario(nombre, apellido, correo, password):
    conexion = obtener_conexion()
    password_encriptado = generate_password_hash(password, "sha256", 30)
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO USUARIO(NOMBRE, APELLIDO, CORREO, PASSWORD) VALUES (%s, %s, %s, %s)",
                       (nombre, apellido, correo, password_encriptado))
    conexion.commit()
    conexion.close()

# Controlador para agregar actores a la base de datos
def AgregarActor(nombre, descripcion, foto, fecha_nac):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO ACTOR(NOMBRE, DESCRIPCION, FOTO, FECHA_NACIMIENTO) VALUES (%s, %s, %s, %s)",
                       (nombre, descripcion, foto, fecha_nac))
    conexion.commit()
    conexion.close()

# Controlador para agregar peliculas a la base de datos
def AgregarPelicula(nombre, director, estreno, resumen, trailer):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO PELICULA(NOMBRE, DIRECTOR, FECHA_ESTRENO, RESUMEN, TRAILER) VALUES (%s, %s, %s, %s, %s)",
                       (nombre, director, estreno, resumen, trailer))
    conexion.commit()
    conexion.close()

# Controlador para ver todos los actores en la base de datos
def VerActores():
    conexion = obtener_conexion()
    actores = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM ACTOR")
        actores = cursor.fetchall()
        actores = [{"ACT_ID":actor[0], "NOMBRE":actor[1], "DESCRIPCION": actor[2], "FOTO":actor[3], "FECHA_NACIMIENTO":actor[4]}for actor in actores]
    conexion.close()
    return actores

# Controlador para ver todas las peliculas que hay en la base de datos
def VerPeliculas():
    conexion = obtener_conexion()
    peliculas = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM PELICULA")
        peliculas = cursor.fetchall()
        peliculas = [{"PEL_ID":pelicula[0], "NOMBRE":pelicula[1], "DIRECTOR": pelicula[2], "FECHA_ESTRENO":pelicula[3], "RESUMEN":pelicula[4], "TRAILER":pelicula[5]}for pelicula in peliculas]
    conexion.close()
    return peliculas

# Controlador para ver toda la informacion de una pelicula
def VerPelicula(id):
    conexion = obtener_conexion()
    pelicula = None
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM PELICULA WHERE PEL_ID = %s", (id,))
        pelicula = cursor.fetchone()
        peliculajson = {"NOMBRE":pelicula[1], "DIRECTOR": pelicula[2], "FECHA_ESTRENO":pelicula[3], "RESUMEN":pelicula[4], "TRAILER":pelicula[5]}
    conexion.close()
    return peliculajson