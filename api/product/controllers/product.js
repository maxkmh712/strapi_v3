'use strict';
const { errorHandler } = require("../services/error")
const { getProductList, getProductDetail } = require("../services/product")


const findProduct = async ctx => {
  const productInfo = ctx.request.query;

  try {
    const data = await getProductList(productInfo);
    return ctx.send(data, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, 404);
  }
}

const findOneProduct = async ctx => {
  const product_id = ctx.params.id;

  try{
    const product = await getProductDetail(product_id);
    return ctx.send(product, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, 404);
  }
}

module.exports = { findProduct, findOneProduct };