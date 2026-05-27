from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User

from jose import jwt
from datetime import datetime,timedelta

import random


router=APIRouter()

otp_store={}

SECRET_KEY="siva123"


@router.post("/send-otp")
def send_otp(
mobile:str,
db:Session=Depends(get_db)
):

    otp=random.randint(
    1000,
    9999
    )

    otp_store[mobile]=otp

    return{

    "mobile":mobile,

    "otp":otp
    }


@router.post("/verify-otp")
def verify_otp(
name:str,
mobile:str,
otp:int,
db:Session=Depends(get_db)
):

    stored_otp=otp_store.get(
    mobile
    )

    if stored_otp!=otp:

        return{

        "message":"Invalid OTP"
        }


    user=db.query(
    User
    ).filter(
    User.mobile==mobile
    ).first()


    if not user:

        user=User(

        name=name,

        mobile=mobile,

        profile_pic=""
        )

        db.add(user)

        db.commit()

        db.refresh(user)


    expire=datetime.utcnow()+timedelta(
    hours=1
    )

    payload={

    "user_id":str(user.id),

    "name":user.name,

    "mobile":user.mobile,

    "exp":int(expire.timestamp())
    }

    token=jwt.encode(

    payload,
    SECRET_KEY,
    algorithm="HS256"
    )

    return{

    "message":"Login Successful",

    "token":token,

    "name":user.name
    }