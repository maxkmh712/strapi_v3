'use strict';
const { errorHandler } = require("../services/error");
const { getOneLike, createLike, deleteLike, countLike, getLike } = require("../services/like");
const { getProductDetail } = require("../../product/services/product")

const createOrDeleteLike = async ctx => {
  const id = ctx.params.id;
  const user = ctx.request.user;
  
  try {
    const product = await getProductDetail(id);
    if (!product) throw Error("PRODUCT_DOES_NOT_EXIST");
    const like = await getOneLike(user.id, product.id);

    if (like) {
      await deleteLike(like.id);
      const count = await countLike(product.id)
      return ctx.send({ message : "DELETE" , count}, 200)
    }
    
    await createLike(user.id, product.id)
    return ctx.send({message : "success"}, 201)
  } catch (error) {
    console.log(error)
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, 400)
  }
}

const findLike = async ctx => {
  const user = ctx.request.user;

  try {
    const likes = await getLike(user.id);
    return ctx.send(likes, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, 404)
  }
}
module.exports = { createOrDeleteLike, findLike };
