'use strict';
const bcrypt = require('bcrypt');
const error = require('./error');
const saltRounds = 10;
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const createUser = async (userdata) => {
  const {email, name, password, birth} = userdata;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const result = await strapi.query('people').create({
    email : email,
    name : name,
    password : hashedPassword,
    birth : birth
  });
  return result
  
}

const checkEmail = async (email) => {
  var user = await strapi.query('people').findOne({email : email});
  return user;
}

const verifyEmail = async (email) => {
  var emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  return emailRegExp.test(email);
}

const verifyPassword = async (password) => {
  var passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  return passwordRegExp.test(password);
}

const verifyBirth = async (birth) => {
  var birthRegExp = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
  return birthRegExp.test(birth)
}
module.exports = {createUser, checkEmail, verifyEmail, verifyPassword, verifyBirth};