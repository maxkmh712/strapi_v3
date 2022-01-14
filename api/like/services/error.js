'use strict'

const errorHandle = {
  PRODUCT_DOES_NOT_EXIST : {
    id : 'Product.does.not.exist',
    statuscode : 404,
    message : "상품을 찾을 수 없습니다."
  }
}

const errorHandler = (key) => {
  const result = strapi.services.common.productErrorHandler('좋아요', errorHandle, key)
  return result
}

module.exports = { errorHandler }