'use strict';
const { errorHandler } = require("../services/error");
const { createUser, 
        existEmail, 
        getUserByEmail, 
        comparePassword, 
        verifyEmail, 
        verifyPassword, 
        verifyBirth, 
        createToken } = require("../services/people");

const signUp = async ctx => {
  const userdata = ctx.request.body;
    try {
    if (await verifyEmail(userdata.email)==false) throw Error("INVALID_USER_EMAIL")
    if (await existEmail(userdata.email)) throw Error("USER_EMAIL_ALREADY_EXISTS")
    if (await verifyPassword(userdata.password)==false) throw Error("INVALID_USER_PASSWORD")
    if (await verifyBirth(userdata.birth)==false) throw Error("INVALID_USER_BIRTH")
    await createUser(userdata)                                                                                                                                                                                                                                                                                                              

    return ctx.send({message : "SUCCESS"}, 201)
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, 400)
  }
}


const signIn = async ctx => {
  const userdata = ctx.request.body;
  try {
    if (!(await getUserByEmail(userdata.email))) throw Error("USER_DOSE_NOT_EXIST")
    const user = await getUserByEmail(userdata.email)
    if (await comparePassword(user, userdata.password)==false) throw Error("USER_PASSWORD_INCORRECT")

    const accessToken = await createToken(user.id)
    
    return ctx.send({ accessToken : accessToken })
  } catch (error) {
    console.error(error)
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, 401)
  }
}
module.exports = { signUp, signIn };