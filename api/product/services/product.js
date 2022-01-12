'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const getProductList = async query => {
  const {category, sort, color} = query;
  
  const sortBy = {
    low_price  : "price:asc",
    high_price : "price:desc",
    old        : "created_at:asc",
    latest     : "created_at:desc",
  }

  const products = await strapi.query("product").find({
    _sort    : sortBy[sort] || 'id',
    category : category,
    color_in : color
  });

  const data = products.map((product) => {
    return {
      id         : product.id,
      name       : product.name,
      price      : product.price,
      color      : product.color,
      created_at : product.created_at,
      category : {
        category_id : product.category.id,
        category_name : product.category.name
      }
    };
  })

  return data;
}


// 서비스
const getProductDetail = async id => {
  console.log(id)
  const product = await strapi.query("product").findOne({ id : id })
  if (!product) throw Error("PRODUCT_DOES_NOT_EXIST")
  const data = {
    id : product.id,
    name : product.name,
    price  : product.price,
    color : product.color,
    created_at : product.created_at,
    updated_at : product.updated_at,
    category : {
      category_id : product.category.id,
      category_name : product.category.name
  }}
  return data;
}

module.exports = { getProductList, getProductDetail };