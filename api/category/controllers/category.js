'use strict'

const findAllCategory = async (ctx) => {
  try {
    const categories = await strapi.query("category").find();
    const data = categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
      };
    });
    // ctx.send({ data: data }, 200);
    return data;
  } catch (error) {
    console.error();
  }
};
module.exports = { findAllCategory };