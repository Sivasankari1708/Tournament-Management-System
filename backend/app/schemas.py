from pydantic import BaseModel


class TournamentCreate(BaseModel):

    name:str
    details:str
    image:str
    rules:dict


class TournamentResponse(BaseModel):

    id:int
    name:str
    details:str
    image:str
    rules:dict

    class Config:
        from_attributes=True


class RegistrationCreate(BaseModel):

    user_id:int
    tournament_id:int
    team_name:str