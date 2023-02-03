
const router = require('express').Router()
const taskController = require('../controller/taskController')
const { validators, schemas } = require('../util/validators')

router.delete('/completed', taskController.handleDeleteRequestForCompletedTasks)

router.route('/:id')
  .delete(taskController.handleDeleteRequestForTask)
  .patch(validators.paramsValditor(schemas.updateTaskSchema.params), validators.queryValidator(schemas.updateTaskSchema.query), taskController.handlePatchRequestForTask)
module.exports = router
