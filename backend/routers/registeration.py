from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Registration
from app.schemas import RegistrationCreate

router=APIRouter()


@router.post("/register")
def register(
registration:RegistrationCreate,
db:Session=Depends(get_db)
):

    reg_number=f"REG-{registration.user_id}{registration.tournament_id}"

    new_registration=Registration(

        user_id=registration.user_id,

        tournament_id=registration.tournament_id,

        team_name=registration.team_name,

        registration_number=reg_number
    )

    db.add(
        new_registration
    )

    db.commit()

    return{
        "message":"Registered"
    }