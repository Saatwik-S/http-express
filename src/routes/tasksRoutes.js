const controller = require('../controller/taskController')
const router = require('express').Router()

router.route('/')
  .get(controller.handleGetRequestForTask)
  .post(controller.handlePostRequestForTask)

router.get('/:id', controller.handleGetRequestForTask)

module.exports = router
