from pydantic import BaseModel


class MessageResponse(BaseModel):
    message: str


class ServiceItem(BaseModel):
    id: str
    name: str
    description: str
