from fastapi import APIRouter 
from fastapi import Depends 
from fastapi import HTTPException 
from sqlalchemy.orm import Session 
from typing import List 
from app.database import get_db
from app.schemas import Tournament 

router = APIRouter()

@router.post("/tournament")
def create_tournament(tournament:TournamentCreate,db:Session=Depends(get_db)):
    new_tournament = Tournament(name=tournament.name,details = tournament.details,image = tournament.image,rules = tournament.rules)
    db.add(new_tournament)
    db.commit()
    db.refresh(new_tournament)
    return new_tournament

@router.get("/tournamnet",response_model=List[TournamentResponse])
def get_tournaments(db:Session=Depends(get_db)):
    return db.query(Tournament).all()

@router.get("/tournament/{id}")
def get_tournamentbyid(id:int,db:Session=Depends(get_db)):
    tournament = db.query(Tournament).filter(Tournament.id==id).first()

    if not tournament:
        raise HTTPException(status_code = 404,detail = "Not Found :(")
    
    return tournament

@router.put("tournament/{id}")
def update_tournament(id:int,tournament:TournamentCreate,db:Session=Depends(get_db)):
    existing = db.query(Tournament).filter(Tournament.id==id).first()

    existing.name = tournament.name
    existing.details = tournament.details
    existing.image = tournament.image
    existing.rules = tournament.rules

    db.commit()
    return existing 

@router.delete("/tournament/{id}")
def delete_tournament(id:int,db:Session=Depends(get_db)):
    tournament = db.query(Tournament).filter(Tournament.id == id).first()
    db.delete(tournament)
    db.commit()

    return{"message":"Deleted!!"}


    
