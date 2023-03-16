from conexion import obtener_conexion
from werkzeug.security import check_password_hash, generate_password_hash

# Controlador para buscar contactos en la base de datos
def BuscarUsuario(nombre_usuario, contrasenia):
    conexion = obtener_conexion()
    usuario = None
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT Usu_id, Password FROM USUARIO WHERE Nombre = %s", (nombre_usuario,))
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
def AgregarPelicula(nombre, director, estreno, resumen, trailer, reparto):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO PELICULA(NOMBRE, DIRECTOR, FECHA_ESTRENO, RESUMEN, TRAILER) VALUES (%s, %s, %s, %s, %s)",
                       (nombre, director, estreno, resumen, trailer))
        last_insert_id = cursor.lastrowid
        print(last_insert_id)
        for actor in reparto:
            cursor.execute("INSERT INTO REPARTO(PELICULA_PEL_ID, ACTOR_ACT_ID) VALUES(%s, %s)",(last_insert_id, actor)) 
    conexion.commit()
    conexion.close()

# Controlador para agregar una pelicula al watchlist
def AgregarPeliculaWatchlist(id_usuario, id_pelicula):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO WATCHLIST(Usuario_usu_id, Pelicula_pel_id) VALUES (%s, %s)",
                       (id_usuario, id_pelicula))
    conexion.commit()
    conexion.close()

# Controlador para eliminar una pelicula agregada en el watchlist
def EliminarPeliculaWatchlist(id):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("DELETE FROM WATCHLIST WHERE Wat_id = %s", (id,))
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
        query = "SELECT * FROM PELICULA WHERE PEL_ID = " + str(id)
        #print(query)
        cursor.execute(query)
        pelicula = cursor.fetchone()
        
        query2 = '''
SELECT REP_ID, ACT_ID, ACTOR.NOMBRE, DESCRIPCION, FOTO, FECHA_NACIMIENTO 
from ((REPARTO 
inner JOIN ACTOR ON REPARTO.ACTOR_ACT_ID = ACTOR. ACT_ID)
inner JOIN  PELICULA ON REPARTO.PELICULA_PEL_ID = PELICULA.PEL_ID)
WHERE PELICULA.PEL_ID = ''' + str(id)
        #print(query2)
        cursor.execute(query2)
        reparto = cursor.fetchall()
        
        listareparto = []
        for x in reparto:
            listareparto.append({"REP_ID": x[0], "ACT_ID": x[1],"NOMBRE": x[2],"DESCRIPCION":x[3], "FOTO": x[4], "FECHA_NACIMIENTO": x[5]})
        
        peliculajson = {"NOMBRE":pelicula[1], "DIRECTOR": pelicula[2], 
                        "FECHA_ESTRENO":pelicula[3], "RESUMEN":pelicula[4], 
                        "TRAILER":pelicula[5], "REPARTO":listareparto}
    conexion.close()
    return peliculajson

#Controlador para ver la informacion de un actor en particular 
def VerActor(id):
    conexion = obtener_conexion()
    pelicula = None
    with conexion.cursor() as cursor:
        query = "SELECT * FROM ACTOR WHERE ACT_ID = " + str(id)
        #print(query)
        cursor.execute(query)
        pelicula = cursor.fetchone()
              
        peliculajson = {"ID":pelicula[0],"NOMBRE":pelicula[1], "DESCRIPCION": pelicula[2], 
                        "FOTO":pelicula[3], "FECHA_NACIMIENTO":pelicula[4]}
    conexion.close()
    return peliculajson

def MostrarWatchlist(id_usuario):
    conexion = obtener_conexion()
    Watchlist = []
    with conexion.cursor() as cursor:
        query = """SELECT PELICULA.NOMBRE 
                   FROM WATCHLIST 
                   INNER JOIN PELICULA ON WATCHLIST.PELICULA_PEL_ID = PELICULA.PEL_ID 
                   WHERE WATCHLIST.USUARIO_USU_ID = """ + str(id_usuario)
        cursor.execute(query)
        Watchlist = cursor.fetchall()
        print(Watchlist)
        conexion.close()
        Watchlist = [{'nombre_pelicula': wlist[0]}for wlist in Watchlist]
        return Watchlist