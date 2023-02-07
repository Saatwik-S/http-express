/**
 * It takes a request and response object, and adds the task to the database
 * @param {Request} request  - This is the request object. It contains all the information about the request that
 * was made.
 * @param {Response} response - The response object that will be sent back to the client.
 */

const taskService = require('../services/taskService')
const joi = require('joi')
const HTTPError = require('../util/errors/HTTPError')
const responseErrorHandler = require('../util/errors/responseErrorHandler')
const handlePostRequestForTask = async (request, response) => {
  try {
    console.log(request.user)
    const task = await taskService.addTask(request.user.id, request.body)
    response.status(201).send(task)
  } catch (error) {
    console.log(error)

    response.status(500).json({ message: 'Oops Something broke' })
  }
}

const handleDeleteRequestForCompletedTasks = async (request, response) => {
  try {
    await taskService.deleteTask(request.user.id, undefined, true)

    response.send('Task(s) Deleted')
  } catch (error) {
    response.status(403)
      .send(error.toString())
  }
}

const handleDeleteRequestForTask = async (request, response) => {
  try {
    const id = request.params.id

    await taskService.deleteTask(request.user.id, parseInt(id), undefined)

    response.send('Task(s) Deleted')
  } catch (error) {
    response.status(403)
      .send(error.toString())
  }
}

/**
 *
 * @param {Request} request
 * @param {Response} response
 */
const handleGetRequestForTask = async (request, response) => {
  try {
    const schema = joi.object({
      id: joi.number()
    })

    const { error } = schema.validate(request.params)
    if (error) throw new HTTPError(error.message, 400)
    const id = request.params.id
    const task = id !== undefined ? await taskService.fetchTask(request.user.id, id, false) : await taskService.fetchTask(request.user.id, undefined, true)
    response.json(task)
  } catch (error) {
    if (error instanceof HTTPError) {
      response.status(error.code).json({ message: error.message })
    } else {
      console.log(error)
      response.status(500).json({ message: 'Something Broke.. Internal Server Error' })
    }
  }
}
const handlePatchRequestForTask = async (request, response) => {
  try {
    const id = request.params.id
    const task = await taskService.updateTask(request.user.id, parseInt(id), request.query)
    response.send(task)
  } catch (error) {
    responseErrorHandler(response, error)
  }
}

module.exports = { handlePostRequestForTask, handleDeleteRequestForCompletedTasks, handleDeleteRequestForTask, handleGetRequestForTask, handlePatchRequestForTask }
