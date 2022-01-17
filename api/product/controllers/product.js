'use strict';
const { errorHandler } = require("../services/error")
const { getProductList, getProductDetail } = require("../services/product")


// 전체 상품 리스트 조회
const findProduct = async ctx => {
  const productInfo = ctx.request.query;

  try {
    const data = await getProductList(productInfo);

    return ctx.send(data, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    console.log(errorInfo)
    return ctx.send(errorInfo, 404);
  }
}

const findOneProduct = async ctx => {
  const product_id = ctx.params.id;

  try{
    if (!product_id) throw Error("PRODUCT_DOES_NOT_EXIST")
    const product = await getProductDetail(product_id);
    return ctx.send(product, 200);
  } catch (error) {
    const errorInfo = errorHandler(error.message);
    return ctx.send(errorInfo, 404);
  }
}

module.exports = { findProduct, findOneProduct };