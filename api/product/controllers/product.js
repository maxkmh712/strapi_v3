'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const findProduct = async ctx => {
  const { responseParser } = strapi.services.common;
  const query = ctx.request.query;
  const { productList } = strapi.services.product;
  const data = await productList(query)

  return responseParser(data, 200)
}

const findProductDetail = async ctx => {
  const { responseParser } = strapi.services.common;
  const id = ctx.params.id;
  const { productDetail } = strapi.services.product;
  const data = await productDetail(id)

  return responseParser(data, 200)
}

module.exports = { findProduct, findProductDetail };