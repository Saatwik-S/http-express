/* eslint-disable no-undef */
// generate test cases with jest for controller
//  const { expect, jest, test, describe } = require('@jest/globals')

const taskService = require('../../src/services/taskService')
const tasksController = require('../../src/controller/taskController')

const { schemas, validators } = require('../../src/util/validators')
const HTTPError = require('../../src/util/errors/HTTPError')

describe('Test Cases for TODO APP', () => {
  const generateMockRes = () => (
    {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    }
  )
  describe('Test cases for GET Request', () => {
    it('should send back all the tasks', async () => {
      jest.spyOn(taskService, 'fetchTask').mockResolvedValue([{ id: 1 }])
      const mockRes = { json: jest.fn() }
      const mockReq = { params: {} }

      await tasksController.handleGetRequestForTask(mockReq
        , mockRes)

      expect(mockRes.json).toHaveBeenCalledWith([{ id: 1 }])
    })

    it('should send back the test with id:  1', async () => {
      jest.spyOn(taskService, 'fetchTask').mockResolvedValue({
        id: 1,
        name: 'hello world',
        isComplete: false
      })
      const mockReq = {
        params: {
          id: 1
        }
      }
      const mockRes = {
        json: jest.fn()
      }
      await tasksController.handleGetRequestForTask(mockReq, mockRes)
      expect(mockRes.json).toHaveBeenCalledWith({
        id: 1,
        name: 'hello world',
        isComplete: false
      })
    })

    it('If task is not found, it should throw an HTTP Error', async () => {
      jest.spyOn(taskService, 'fetchTask').mockRejectedValue(new HTTPError('Task not found', 404))
      const mockReq = {
        params: {
          id: 1
        }
      }
      const mockRes = generateMockRes()
      await tasksController.handleGetRequestForTask(mockReq, mockRes)
      expect(mockRes.status).toHaveBeenCalledWith(404)
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Task not found' })
    })

    it('Should throw error when there is a server sided error', async () => {
      jest.spyOn(taskService, 'fetchTask').mockRejectedValue(new Error('Server Error'))
      const mockReq = {
        params: {
          id: 1
        }
      }
      const mockRes = generateMockRes()
      await tasksController.handleGetRequestForTask(mockReq, mockRes)
      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Something Broke.. Internal Server Error' })
    })
  })

  describe('Test for POST Req', () => {
    it('should create a task', async () => {
      jest.spyOn(taskService, 'addTask').mockResolvedValue({
        id: 1,
        name: 'hello world',
        isComplete: false
      })

      const mockRes = { status: jest.fn().mockReturnValue({ send: jest.fn() }) }

      await tasksController.handlePostRequestForTask({
        body: { name: 'hello world' }
      }, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(201)
      expect(mockRes.status().send).toHaveBeenCalledWith({
        id: 1,
        name: 'hello world',
        isComplete: false
      })
    })

    it('should throw an server error when the task is not created', async () => {
      jest.spyOn(taskService, 'addTask').mockRejectedValue(new Error('Server Error'))
      const mockRes = generateMockRes()
      await tasksController.handlePostRequestForTask({
        body: { name: 'hello world' }
      }, mockRes)
      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Something Broke.. Internal Server Error' })
    })
  })
})
// describe('Test for POST Req', () => {
//   it('should create a task', async () => {
//     jest.spyOn(taskService, 'addTask').mockResolvedValue({
//       id: 1,
//       name: 'hello world',
//       isComplete: false
//     })

//     const mockRes = { status: jest.fn().mockReturnValue({ send: jest.fn() }) }

//     await tasksController.handlePostRequestForTask({
//       body: { name: 'hello world' }
//     }, mockRes)

//     expect(mockRes.status).toHaveBeenCalledWith(201)
//     expect(mockRes.status().send).toHaveBeenCalledWith({
//       id: 1,
//       name: 'hello world',
//       isComplete: false
//     })
//   })
// })
// describe('Test for POST Req', () => {
//   it('should create a task', async () => {
//     jest.spyOn(taskService, 'addTask').mockResolvedValue({
//       id: 1,
//       name: 'hello world',
//       isComplete: false
//     })

//     const mockRes = { status: jest.fn().mockReturnValue({ send: jest.fn() }) }

//     await tasksController.handlePostRequestForTask({
//       body: { name: 'hello world' }
//     }, mockRes)

//     expect(mockRes.status).toHaveBeenCalledWith(201)
//     expect(mockRes.status().send).toHaveBeenCalledWith({
//       id: 1,
//       name: 'hello world',
//       isComplete: false
//     })
//   })
// })
// })
