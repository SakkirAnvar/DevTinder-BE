# DevTnder APIs

## authRouter
POST /signup
POST /login
POST /logout

## profileRouter
GET /profile/view
PATCH /profile/edit
PATCH /profile/password

## connectionRequestRouter
POST /request/send/:status/:userId
POST /request/review/:status:requestId

## userRouter
GET /coonections
GET /requests/received
GET /feed