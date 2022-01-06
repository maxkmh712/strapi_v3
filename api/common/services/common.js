const responseParser = data => {
  return {
      statusCode: 200,
      data: data
  }
}

// const errorHandlerV2 = (api, errorHandle, message) => {
//   const error = errorHandle[message]
//   if (!error) {
//       return {
//           id: `Out.of.control.error`,
//           message,
//           api
//       }
//   }

//   return error
// }

module.exports = { responseParser }