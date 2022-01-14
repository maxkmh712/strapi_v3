'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const createLike = async (userId, productId) => {
  const like = await strapi.query('like').create({
    person : userId,
    product : productId
  })
  return like;
}

const deleteLike = async (id) => {
  const like = await strapi.query('like').delete({id : id});
  return like;
}

const countLike = async (productId) => {
  const count = await strapi.query('like').count({product : productId});
  return count;
}

const getLike = async (id) => {
  const likes = await strapi.query('like').find({ person : id });
  const list = likes.map((like) => {
    return {
      id: like.product.id,
      name: like.product.name,
      price: like.product.price,
      color: like.product.color
    }
  })
  return list;
}

const getOneLike = async (userId, productId) => {
  const like = await strapi.query('like').findOne({
    person : userId,
    product : productId 
  })

  return like
}

module.exports = { createLike, getLike, deleteLike, getOneLike, countLike };
