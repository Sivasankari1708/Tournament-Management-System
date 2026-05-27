from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String,ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSON

from app.database import Base


class User(Base):

    __tablename__="users"

    id=Column(Integer,primary_key=True,index=True)
    name=Column(String)
    mobile=Column(String)
    profile_pic=Column(String)


class Tournament(Base):

    __tablename__="tournament"

    id=Column(Integer,primary_key=True,index=True)

    image=Column(String)

    name=Column(String)

    details=Column(String)

    rules=Column(JSON)


class Registration(Base):

    __tablename__="registration"

    id=Column(Integer,primary_key=True)

    user_id=Column(
        Integer,
        ForeignKey("users.id")
    )

    tournament_id=Column(
        Integer,
        ForeignKey("tournament.id")
    )

    team_name=Column(String)

    registration_no=Column(String)

    user=relationship("User")

    tournament=relationship("Tournament")