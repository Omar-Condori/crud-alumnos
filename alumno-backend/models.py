from sqlalchemy import Column, Integer, String
from database import Base

class Alumno(Base):
    __tablename__ = "alumnos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    apellido = Column(String, nullable=False)
    grado_ciclo = Column(String, nullable=False)
    carrera = Column(String, nullable=False)