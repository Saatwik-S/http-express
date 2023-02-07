
const router = require('express').Router()
const taskController = require('../controller/taskController')
const { verifyUser } = require('../util/middleware/auth')
const { validate, schemas, REQ_PARAMTERS } = require('../util/middleware/validators')

router.delete('/completed',
  verifyUser,
  taskController.handleDeleteRequestForCompletedTasks)

router.route('/:id')
  .delete(
    verifyUser,
    taskController.handleDeleteRequestForTask)
  .patch(
    verifyUser,
    validate(schemas.updateTaskSchema.params, REQ_PARAMTERS.PARAMS),
    validate(schemas.updateTaskSchema.query, REQ_PARAMTERS.QUERY),
    taskController.handlePatchRequestForTask)
module.exports = router
