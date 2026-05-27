from fastapi import FastAPI,Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from app.database import get_db
from app.database import engine

from app.schemas import TournamentCreate
from app.schemas import TournamentResponse
from app.schemas import RegistrationCreate

from app.models import Tournament
from app.models import Registration

import app.models as models

from typing import List

from app.auth import router as auth_router


app=FastAPI()

app.include_router(
auth_router
)


app.add_middleware(

CORSMiddleware,

allow_origins=[
"http://localhost:5173"
],

allow_credentials=True,

allow_methods=["*"],

allow_headers=["*"]
)


models.Base.metadata.create_all(
bind=engine
)


@app.get("/")
def home():

    return{
    "message":"Backend Running"
    }


@app.post("/tournament")
def create_tournament(
tournament:TournamentCreate,
db:Session=Depends(get_db)
):

    new_tournament=Tournament(

    name=tournament.name,

    details=tournament.details,

    image=tournament.image,

    rules=tournament.rules
    )

    db.add(
    new_tournament
    )

    db.commit()

    db.refresh(
    new_tournament
    )

    return new_tournament


@app.get(
"/tournament",
response_model=List[TournamentResponse]
)
def get_tournaments(
db:Session=Depends(get_db)
):

    return db.query(
    Tournament
    ).all()


@app.post("/register")
def register(
registration:RegistrationCreate,
db:Session=Depends(get_db)
):

    reg_no=f"REG-{registration.user_id}{registration.tournament_id}"

    new_registration=Registration(

    user_id=registration.user_id,

    tournament_id=registration.tournament_id,

    team_name=registration.team_name,

    registration_no=reg_no
    )

    db.add(
    new_registration
    )

    db.commit()

    return{

    "message":"Registration Successful",

    "registration_no":reg_no
    }

@app.get(
    "/tournament/{id}",
    response_model=TournamentResponse
)
def get_tournament(
    id:int,
    db:Session=Depends(get_db)
):

    tournament=db.query(
        Tournament
    ).filter(
        Tournament.id==id
    ).first()

    return tournament

@app.put(
"/tournament/{id}"
)
def update_tournament(
id:int,
tournament:TournamentCreate,
db:Session=Depends(get_db)
):

    existing=db.query(
    Tournament
    ).filter(
    Tournament.id==id
    ).first()


    if not existing:

        return{
        "message":"Tournament not found"
        }


    existing.name=tournament.name

    existing.details=tournament.details

    existing.image=tournament.image

    existing.rules=tournament.rules


    db.commit()

    db.refresh(
    existing
    )

    return{

    "message":"Tournament Updated",

    "data":existing
    }



@app.delete(
"/tournament/{id}"
)
def delete_tournament(
id:int,
db:Session=Depends(get_db)
):

    tournament=db.query(
    Tournament
    ).filter(
    Tournament.id==id
    ).first()


    if not tournament:

        return{

        "message":"Tournament not found"
        }


    db.delete(
    tournament
    )

    db.commit()


    return{

    "message":"Tournament Deleted"
    }