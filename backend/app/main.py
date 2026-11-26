from fastapi import FastAPI, HTTPException
from .db import conectar
from .schemas import Tarea, TareaNueva

app = FastAPI(title="API de tareas")


@app.get("/api/tareas", response_model=list[Tarea])
def listar_tareas():
    with conectar() as conexion, conexion.cursor() as cursor:
        cursor.execute("SELECT id, titulo FROM tareas ORDER BY id")
        return cursor.fetchall()


@app.post("/api/tareas", response_model=Tarea, status_code=201)
def crear_tarea(datos: TareaNueva):
    titulo = datos.titulo.strip()
    if not titulo:
        raise HTTPException(422, "Escribe un título válido")
    with conectar() as conexion, conexion.cursor() as cursor:
        cursor.execute("INSERT INTO tareas (titulo) VALUES (%s)", (titulo,))
        tarea = Tarea(id=cursor.lastrowid, titulo=titulo)
        conexion.commit()
        return tarea