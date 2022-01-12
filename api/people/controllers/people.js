'use strict';


/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const signUp = async ctx => {
    const { errorHandler } = require("../services/error");
    const { createUser, checkEmail, verifyEmail, verifyPassword, verifyBirth } = require("../services/people");
    const userdata = ctx.request.body;

    try {
    if (await verifyEmail(userdata.email)==false) throw Error("INVALID_USER_EMAIL")
    if (await checkEmail(userdata.email)) throw Error("USER_EMAIL_ALREADY_EXISTS")
    if (await verifyPassword(userdata.password)==false) throw Error("INVALID_USER_PASSWORD")
    if (await verifyBirth(userdata.birth)==false) throw Error("INVALID_USER_BIRTH")
    await createUser(userdata)                                                                                                                                                                                                                                                                                                              

    return ctx.send({message : "SUCCESS"}, 201)
  } catch (error) {
    const error1 = errorHandler(error.message);
    return ctx.send(error1, 400)
  }
}

const signIn = async ctx => {
  const { errorHandler } = require("../services/error");
  const { checkEmail, checkPassword, createToken } = require("../services/people");
  const userdata = ctx.request.body;

  try {
    if (!(await checkEmail(userdata.email))) throw Error("USER_DOSE_NOT_EXIST")
    const user = await checkEmail(userdata.email)
    if (await checkPassword(user, userdata.password)==false) throw Error("USER_PASSWORD_INCORRECT")

    const accessToken = await createToken(user.id)
    
    return ctx.send({ accessToken : accessToken })
  } catch (error) {
    console.error(error)
    const error2 = errorHandler(error.message);
    return ctx.send(error2, 401)
  }
}
module.exports = { signUp, signIn };