from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import engine, get_db, Base
from models import Alumno
from schemas import AlumnoCreate, AlumnoUpdate, AlumnoResponse

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API CRUD Alumnos")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint para obtener las carreras disponibles
@app.get("/carreras")
def get_carreras():
    return {
        "carreras": [
            "Ingeniería de Sistemas",
            "Ingeniería Civil",
            "Administración de Empresas",
            "Contabilidad",
            "Derecho",
            "Medicina",
            "Enfermería",
            "Arquitectura",
            "Psicología",
            "Marketing"
        ]
    }

# CREATE - Crear un nuevo alumno
@app.post("/alumnos", response_model=AlumnoResponse, status_code=201)
def crear_alumno(alumno: AlumnoCreate, db: Session = Depends(get_db)):
    nuevo_alumno = Alumno(**alumno.dict())
    db.add(nuevo_alumno)
    db.commit()
    db.refresh(nuevo_alumno)
    return nuevo_alumno

# READ - Obtener todos los alumnos
@app.get("/alumnos", response_model=List[AlumnoResponse])
def listar_alumnos(db: Session = Depends(get_db)):
    alumnos = db.query(Alumno).all()
    return alumnos

# READ - Obtener un alumno por ID
@app.get("/alumnos/{alumno_id}", response_model=AlumnoResponse)
def obtener_alumno(alumno_id: int, db: Session = Depends(get_db)):
    alumno = db.query(Alumno).filter(Alumno.id == alumno_id).first()
    if not alumno:
        raise HTTPException(status_code=404, detail="Alumno no encontrado")
    return alumno

# UPDATE - Actualizar un alumno
@app.put("/alumnos/{alumno_id}", response_model=AlumnoResponse)
def actualizar_alumno(alumno_id: int, alumno_data: AlumnoUpdate, db: Session = Depends(get_db)):
    alumno = db.query(Alumno).filter(Alumno.id == alumno_id).first()
    if not alumno:
        raise HTTPException(status_code=404, detail="Alumno no encontrado")
    
    for key, value in alumno_data.dict().items():
        setattr(alumno, key, value)
    
    db.commit()
    db.refresh(alumno)
    return alumno

# DELETE - Eliminar un alumno
@app.delete("/alumnos/{alumno_id}")
def eliminar_alumno(alumno_id: int, db: Session = Depends(get_db)):
    alumno = db.query(Alumno).filter(Alumno.id == alumno_id).first()
    if not alumno:
        raise HTTPException(status_code=404, detail="Alumno no encontrado")
    
    db.delete(alumno)
    db.commit()
    return {"message": "Alumno eliminado exitosamente"}

@app.get("/")
def root():
    return {"message": "API CRUD Alumnos - FastAPI + PostgreSQL"}