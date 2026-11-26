from pydantic import BaseModel, Field

class TareaNueva(BaseModel):

    titulo: str = Field(min_length=1, max_length=80)

class Tarea(TareaNueva):

    id: int