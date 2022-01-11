'use strict'

const errorHandle = {
  INVALID_USER_EMAIL : {
    id : 'Invalid.user.email',
    statuscode : 400,
    message : '이메일 형식이 맞지 않습니다.'
  },
  USER_EMAIL_ALREADY_EXISTS : {
    id : 'User.email.already.exists',
    statuscode : 400,
    message : '이미 존재하는 Email 입니다.'
  },
  INVALID_USER_PASSWORD : {
    id : 'Invalid.user.password',
    statuscode : 400,
    message : "비밀번호 형식이 맞지 않습니다."
  },
  INVALID_USER_BIRTH : {
    id : 'Invalid.user.birth',
    statuscode : 400,
    message : "생년월일 형식이 맞지 않습니다."
  }
}

const errorHandler = key => strapi.services.common.errorHandlerV2('유저', errorHandle, key)

module.exports = { errorHandler }