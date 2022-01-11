'use strict';


/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
// test

const signUp = async ctx => {
  // const { responseParser } = strapi.services.common;
    const { errorHandler } = require("../services/error");
    const { createUser, checkEmail, verifyEmail, verifyPassword, verifyBirth } = require("../services/people");
    const userdata = ctx.request.body;

    try {
    if (await verifyEmail(userdata.email)==false) throw Error("INVALID_USER_EMAIL")
    if (await checkEmail(userdata.email)) throw Error("USER_EMAIL_ALREADY_EXISTS")
    if (await verifyPassword(userdata.password)==false) throw Error("INVALID_USER_PASSWORD")
    if (await verifyBirth(userdata.birth)==false) throw Error("INVALID_USER_BIRTH")
    const data = await createUser(userdata)                                                                                                                                                                                                                                                                                                              

    return ctx.send({message : "SUCCESS"}, 201)
  } catch (error) {
    const error1 = errorHandler(error.message);
    // console.log(error)
    return ctx.send(error1, 400)
  }

}

module.exports = { signUp };