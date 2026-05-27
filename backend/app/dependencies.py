from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials

from jose import jwt

SECRET_KEY = "siva123"

security = HTTPBearer()


def get_current_user(

    token:HTTPAuthorizationCredentials=Depends(
        security
    )

):

    try:

        payload = jwt.decode(

            token.credentials,

            SECRET_KEY,

            algorithms=["HS256"]
        )

        return payload

    except:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )