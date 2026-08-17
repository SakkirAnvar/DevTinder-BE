const validator = require("validator");
const bcrypt = require("bcrypt")

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email address not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

const validateLoginData = (req) => {
  const { emailId } = req.body;

  if (!validator.isEmail(emailId)) {
    throw new Error("Email address not valid");
  }
};

const validateEditProfileData = (req) =>{
  const allowedEditFields = ["firstName", "lastName", "emailId", "age", "gender", 'skills', "about", "photoUrl"];

  const isEditAllowed = Object.keys(req.body).every((field)=> allowedEditFields.includes(field))

  return isEditAllowed

}

const validateForgotPassword = async (req) =>{
  const user = req.user

  const {currentPassword, updatedPassword} = req.body

  const isPasswordValid = await user.validatePassword(currentPassword)


  if(!isPasswordValid){
    throw new Error("Invalid current password..")
    
  }else if(!validator.isStrongPassword(updatedPassword)){
    throw new Error("Enter a strong new password..")
  }
  

  
}


module.exports = {
  validateSignupData,
  validateLoginData,
  validateEditProfileData,
  validateForgotPassword,
};
