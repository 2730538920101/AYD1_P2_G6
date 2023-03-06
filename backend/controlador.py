from conexion import obtener_conexion
from werkzeug.security import generate_password_hash

def AgregarUsuario(nombre, apellido, correo, password):
    conexion = obtener_conexion()
    password_encriptado = generate_password_hash(password, "sha256", 30)
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO USUARIO(NOMBRE, APELLIDO, CORREO, PASSWORD) VALUES (%s, %s, %s, %s)",
                       (nombre, apellido, correo, password_encriptado))
    conexion.commit()
    conexion.close()

def AgregarActor(nombre, descripcion, foto, fecha_nac):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("INSERT INTO ACTOR(NOMBRE, DESCRIPCION, FOTO, FECHA_NACIMIENTO) VALUES (%s, %s, %s, %s)",
                       (nombre, descripcion, foto, fecha_nac))
    conexion.commit()
    conexion.close()

