const Joi = require('joi')
const BAD_REQUEST = 400

const errorMessageResponseObj = (res, message) => res.status(BAD_REQUEST).json({ message })

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

const validators = {
  bodyValidator: (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return errorMessageResponseObj(res, error.message)
    }
    next()
  },
  paramsValditor: (schema) => (req, res, next) => {
    const { error } = schema.validate(req.params)
    if (error) {
      return errorMessageResponseObj(res, error.message)
    }
    next()
  },
  queryValidator: (schema) => (req, res, next) => {
    const { error } = schema.validate(req.query)
    if (error) {
      return errorMessageResponseObj(res, error.message)
    }
    next()
  }

}

module.exports = { schemas, validators }
