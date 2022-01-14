'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const createUser = async (userdata) => {
  const {email, name, password, birth} = userdata;
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await strapi.query('people').create({
    email : email,
    name : name,
    password : hashedPassword,
    birth : birth
  });
  return user
}

const checkEmail = async (email) => {
  const user = await strapi.query('people').findOne({email : email});
  return user;
}

const checkUserId = async (id) => {
  const user = await strapi.query('people').findOne({id : id});
  return user;
}
const checkPassword = async (user, password) => {
  const bcrypt = require('bcrypt');
  const check = await bcrypt.compare(password, user.password);
  return check
}

const verifyEmail = async (email) => {
  const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  return emailRegExp.test(email);
}

const verifyPassword = async (password) => {
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  return passwordRegExp.test(password);
}

const verifyBirth = async (birth) => {
  const birthRegExp = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
  return birthRegExp.test(birth)
}

const userLogIn = async (userdata) => {
  const { email } = userdata;
  const login_user = await strapi.query('people').findOne({ email : email });
  return login_user
}

const createToken = async (id) => {
  const jwt = require('jsonwebtoken')
  const algorithm = process.env.ALGORITHM
  const expiresIn = process.env.EXPIRES_IN
  console.log(id)
  const accessToken = jwt.sign({id : id}, process.env.SECRET_KEY, { 
    algorithm : algorithm,
    expiresIn : expiresIn
  });
  return accessToken
}

module.exports = {
  createUser, 
  checkEmail, 
  checkUserId,
  checkPassword,
  verifyEmail, 
  verifyPassword, 
  verifyBirth, 
  userLogIn, 
  createToken
}