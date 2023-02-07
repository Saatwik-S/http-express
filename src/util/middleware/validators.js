const Joi = require('joi')

const schemas = {

  newTaskSchema: Joi.object({
    name: Joi.string().min(1).max(100).required()
  }),
  updateTaskSchema: {
    query: Joi.object({
      isCompleted: Joi.boolean().required()
    }),
    params: Joi.object({
      id: Joi.alternatives().try(Joi.string().allow('completed'), Joi.number().integer().positive()).required()
    })

  }

}
const REQ_PARAMTERS = {
  BODY: 'body',
  HEADER: 'headers',
  QUERY: 'query',
  PARAMS: 'params'
}

/**
 *
    * @param {joi.Schema} schema
 * @param {String} parameterType

 */
const validate = (schema, parameterType) => (req, res, next) => {
  const { error } = schema.validate(req[parameterType])
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  next()
}

module.exports = { validate, REQ_PARAMTERS, schemas }
