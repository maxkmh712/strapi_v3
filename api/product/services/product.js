'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

 const productList = async query => {
  const {category, sort, color} = query;
  const sortBy = {
    low_price  : "price:asc",
    high_price : "price:desc",
    old        : "created_at:asc",
    latest     : "created_at:desc",
  }

  try {
    const products = await strapi.query("product").find({
      _sort    : sortBy[sort],
      category : category,
      color_in : color
    },);

    const data = products.map((product) => {
      return {
        id         : product.id,
        name       : product.name,
        price      : product.price,
        color      : product.color,
        created_at : product.created_at,
        category   : {
          category_id   : product.category.id,
          category_name : product.category.name
        }
      };
    });
    return data
  } catch (error) {
    console.error();
  }
};

const productDetail = async id => {
  try {
    const product = await strapi.query("product").findOne({ id : id })
    const data = {
      id         : product.id,
      name       : product.name,
      price      : product.price,
      color      : product.color,
      created_at : product.created_at,
      updated_at : product.updated_at,
      category   : {
        category_id   : product.category.id,
        category_name : product.category.name
    }
  }
    return data
  } catch(error) {
    console.error();
  }
}

module.exports = { productList, productDetail };