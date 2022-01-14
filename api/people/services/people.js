'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const hashPassword = async password => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const createUser = async (userdata) => {
  const {email, name, password, birth} = userdata;
  const hashedPassword = await hashPassword(password)
  const user = await strapi.query('people').create({
    email : email,
    name : name,
    password : hashedPassword,
    birth : birth
  });
  return user
}

const existEmail = async email => {
  const user = await strapi.query('people').findOne({email : email});
  return user ? true : false
}

const getUserByEmail = async email => {
  const user = await strapi.query('people').findOne({email : email});
  return user
}

const getUserById = async (id) => {
  const user = await strapi.query('people').findOne({id : id});
  return user;
}
const comparePassword = async (user, password) => {
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

const createToken = async (id) => {
  const {ALGORITHM, EXPIRES_IN, SECRET_KEY} = process.env
  const accessToken = jwt.sign({id : id}, SECRET_KEY, { algorithm : ALGORITHM, expiresIn : EXPIRES_IN });
  return accessToken
}

module.exports = {
  hashPassword,
  createUser,
  existEmail,
  getUserByEmail, 
  getUserById,
  comparePassword,
  verifyEmail, 
  verifyPassword, 
  verifyBirth, 
  createToken
}