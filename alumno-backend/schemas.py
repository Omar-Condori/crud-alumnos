from pydantic import BaseModel
from typing import List

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

# Schema para respuesta paginada
class PaginatedResponse(BaseModel):
    items: List[AlumnoResponse]
    total: int
    page: int
    limit: int
    total_pages: int