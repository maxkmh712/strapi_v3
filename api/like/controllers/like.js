'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const createOrDeleteLike = async ctx => {
  const { errorHandler } = require("../services/error");
  const { getProductDetail } = strapi.services.product;
  const { getOneLike, createLike, deleteLike, countLike } = strapi.services.like;
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
    
    const result = await createLike(user.id, product.id)
    return ctx.send({message : "success"}, 201)
  } catch (error) {
    console.error(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, 400)
  }
}

const findLike = async ctx => {
  const { errorHandler } = require("../services/error")
  const { getLike } = strapi.services.like;
  const user = ctx.request.user;

  try {
    const likes = await getLike(user.id);
    return ctx.send(likes, 200);
  } catch (error) {
    console.error(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, 404)
  }
}
module.exports = { createOrDeleteLike, findLike };
