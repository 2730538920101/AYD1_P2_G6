from conexion import obtener_conexion

<<<<<<< HEAD
=======
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

# Controlador para agregar peliculas a la base de datos
def CalificarPelicula(id_usuario, id_pelicula, punteo):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO CALIFICACION(USUARIO_USU_ID, PELICULA_PEL_ID, PUNTEO) VALUES (%s, %s, %s)",
                       (id_usuario, id_pelicula, punteo))
    conexion.commit()
    conexion.close()

# Controlador para retornar la calificacion que un usuario le da a una pelicula
def DevolverCalificacion(id_usuario, id_pelicula):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT PUNTEO FROM CALIFICACION WHERE USUARIO_USU_ID = %s AND PELICULA_PEL_ID = %s", (id_usuario,id_pelicula))
        calificacion = cursor.fetchone()
        conexion.close()
        return calificacion


# Controlador para agregar una pelicula al watchlist
def AgregarPeliculaWatchlist(id_usuario, id_pelicula):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT Wat_id FROM WATCHLIST WHERE Usuario_usu_id = %s AND Pelicula_pel_id = %s", (id_usuario,id_pelicula))
        usuario = cursor.fetchone()

        if usuario is None:
            cursor.execute("INSERT INTO WATCHLIST(Usuario_usu_id, Pelicula_pel_id) VALUES (%s, %s)",
                        (id_usuario, id_pelicula))            
    conexion.commit()
    conexion.close()
    return usuario

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

def AgregarComentario(id_usuario,id_pelicula, descripcion):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
         cursor.execute("INSERT INTO COMENTARIO(USUARIO_USU_ID, PELICULA_PEL_ID,DESCRIPCION) VALUES (%s, %s,%s)",
                (id_usuario, id_pelicula,descripcion))
    conexion.commit()
    conexion.close()

def MostrarComentarios(id_pelicula):
    conexion = obtener_conexion()
    comentario = []
    with conexion.cursor() as cursor:
        query = """SELECT DESCRIPCION, USUARIO_USU_ID,concat( USUARIO.NOMBRE," ",USUARIO.APELLIDO) as nombre_completo
                   FROM COMENTARIO
                   INNER JOIN PELICULA ON COMENTARIO.PELICULA_PEL_ID = PELICULA.PEL_ID
                   INNER JOIN USUARIO ON  COMENTARIO.USUARIO_USU_ID = USUARIO.USU_ID
                   WHERE COMENTARIO.PELICULA_PEL_ID =""" + str(id_pelicula)
        cursor.execute(query)
        comentario = cursor.fetchall()
        conexion.close()
        comentario = [{'comentario': cm[0], 'id_usuario': cm[1],'nombre': cm[2]}for cm in comentario]
        return comentario

    
def Ultimas5PelActor(id):
    conexion = obtener_conexion()    
    with conexion.cursor() as cursor:
        query = '''select PELICULA.PEL_ID, PELICULA.NOMBRE, PELICULA.DIRECTOR, PELICULA.FECHA_ESTRENO, PELICULA.RESUMEN, PELICULA.TRAILER   
from (REPARTO 
INNER JOIN PELICULA ON PELICULA.PEL_ID = REPARTO.PELICULA_PEL_ID)
WHERE ACTOR_ACT_ID = '''+ str(id) +''' 
order by str_to_date(PELICULA.FECHA_ESTRENO, '%d/%m/%y') DESC LIMIT 5;'''
        print(query)
        cursor.execute(query)
        peliculas = cursor.fetchall()
              
        peliculaJSON = [{"PEL_ID":pelicula[0], "NOMBRE":pelicula[1], "DIRECTOR": pelicula[2], "FECHA_ESTRENO":pelicula[3], "RESUMEN":pelicula[4], "TRAILER":pelicula[5] }for pelicula in peliculas]
    conexion.close()
    return peliculaJSON

def MostrarWatchlist(id_usuario):
    conexion = obtener_conexion()
    Watchlist = []
    with conexion.cursor() as cursor:
        query = """SELECT PELICULA.NOMBRE, PELICULA.PEL_ID, PELICULA.FECHA_ESTRENO, PELICULA.TRAILER, WATCHLIST.WAT_ID
                   FROM WATCHLIST 
                   INNER JOIN PELICULA ON WATCHLIST.PELICULA_PEL_ID = PELICULA.PEL_ID 
                   WHERE WATCHLIST.USUARIO_USU_ID = """ + str(id_usuario)
        cursor.execute(query)
        Watchlist = cursor.fetchall()
        print(Watchlist)
        conexion.close()
        Watchlist = [{'nombre_pelicula': wlist[0], 'id_pelicula':wlist[1], 'fecha':wlist[2], 'trailer':wlist[3], 'id_wl':wlist[4]}for wlist in Watchlist]
        return Watchlist
>>>>>>> 1.0.0
