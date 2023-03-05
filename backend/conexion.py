import mysql.connector


def obtener_conexion():
    return mysql.connector.connect(host='localhost',
                                user='practica2',
                                password='practica2',
                                db='peliculas_db',
                                port='3307')