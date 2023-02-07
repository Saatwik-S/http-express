
const controller = require('../controller/taskController')
const { verifyUser } = require('../util/middleware/auth')
const { validate, schemas, REQ_PARAMTERS } = require('../util/middleware/validators')
const router = require('express').Router()
router.route('/')
  .get(
    verifyUser,
    controller.handleGetRequestForTask)
  .post(
    verifyUser,
    validate(schemas.newTaskSchema, REQ_PARAMTERS.BODY),
    controller.handlePostRequestForTask)

router.get('/:id',
  verifyUser,
  controller.handleGetRequestForTask)

module.exports = router
