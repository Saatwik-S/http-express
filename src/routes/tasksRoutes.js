
const controller = require('../controller/taskController')
const {validators, schemas} = require('../util/validators')
const router = require('express').Router()

router.route('/')
  .get(controller.handleGetRequestForTask)
  .post(validators.bodyValidator(schemas.newTaskSchema), controller.handlePostRequestForTask)

router.get('/:id', controller.handleGetRequestForTask)

module.exports = router
