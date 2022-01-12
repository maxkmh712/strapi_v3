'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const findProduct = async ctx => {
  const { errorHandler } = require("../services/error")
  const productInfo = ctx.request.query;
  const { getProductList } = strapi.services.product;

  try {
    const data = await getProductList(productInfo);
    return ctx.send(data, 200);
  } catch (error) {
    console.error(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, 404);
  }
}

// 컨트롤러
const findOneProduct = async ctx => {
  const { errorHandler } = require("../services/error");
  const product_id = ctx.params.id;
  const { getProductDetail } = strapi.services.product;

  try{
    const product = await getProductDetail(product_id);
    return ctx.send(product, 200);
  } catch (error) {
    console.error(error);
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, 404);
  }
}

module.exports = { findProduct, findOneProduct };