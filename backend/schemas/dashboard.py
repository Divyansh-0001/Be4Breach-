from pydantic import BaseModel


class DashboardSummary(BaseModel):
    role: str
    welcome: str
    highlights: list[str]
