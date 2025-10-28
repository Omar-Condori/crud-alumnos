from pydantic import BaseModel

class AlumnoBase(BaseModel):
    nombre: str
    apellido: str
    grado_ciclo: str
    carrera: str

class AlumnoCreate(AlumnoBase):
    pass

class AlumnoUpdate(AlumnoBase):
    pass

class AlumnoResponse(AlumnoBase):
    id: int

    class Config:
        from_attributes = True