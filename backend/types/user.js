const zod = require('zod')

const signUpType = zod.object({
  name: zod.string(),
  password: zod.string().length(6),
  email: zod.string().email(),
  phone_number: zod.number(), // will add validation in frontend only for length 10
})

const signIntype = zod.object({
  email: zod.string().email(),
  password: zod.string().length(6),
})

module.exports = {
  signUpType,
  signIntype
}