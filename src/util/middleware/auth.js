const Joi = require('joi')
const HTTPError = require('../errors/HTTPError')

const validateToken = async (token) => {
  const response = await fetch(`http://localhost:5000/auth/validate?token=${token}`)
  if (response.status === 500) {
    throw new Error('Internal Server Error', 500)
  } else if (response.status === 498) { throw new HTTPError('Invalid Token', 498) }
  const decodedResponse = await response.json()
  return decodedResponse.data
}

/**
 *
 * @param {import('express').Request} request
 * @param {*} response
 * @param {*} next
 */
const verifyUser = async (request, response, next) => {
  try {
    const token = request.headers.authorization
    const schema = Joi.string().min(10).max(255).required()
    const { error } = schema.validate(token)
    if (error) {
      throw new HTTPError('Invalid Token', 498)
    }

    const decodedToken = await validateToken(token)
    request.user = decodedToken
    next()
  } catch (error) {
    if (error instanceof HTTPError) { return response.status(error.code).json({ message: error.message }) }
    response.status(500).json({ message: 'Internal Server Error' })
  }
}
module.exports = { verifyUser }
