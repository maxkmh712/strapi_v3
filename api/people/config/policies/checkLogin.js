module.exports = async (ctx, next) => {
  const { errorHandler } = require("../../services/error");
  const { getUserById } = require("../../services/people");
  const jwt = require('jsonwebtoken');
  const secretKey = process.env.SECRET_KEY;
  const { token } = ctx.request.headers;

  try {
    const { id } = await jwt.verify(token, secretKey);
    const user = await getUserById(id);
    
    if (!user) throw Error;
    ctx.request.user = user;
    return await next();
  } catch (error) {
    console.error(error);
    const errorInfo = errorHandler("UNAUTHORIZED");
    return ctx.send(errorInfo, 401)
  }
};