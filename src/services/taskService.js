const { DataTypes } = require('sequelize')
const db = require('../../models/index')
const task = require('../../models/task')
const HTTPError = require('../util/errors/HTTPError')

/**
 * It takes a taskInfo object, checks if it has a name property, and if it does, it adds it to the
 * tasks array
 * @param taskInfo - This is the object that contains the task name.
 * @returns The last element of the tasks array.
 */
const addTask = async (userId, taskInfo) => {
  const taskInstance = task(db.sequelize, DataTypes)
  const data = await taskInstance.create({
    name: taskInfo.name,
    isComplete: false,
    userId
  })
  return data.dataValues
}

/**
 * It deletes a task from the tasks array
 * @param id - The ID of the task to delete.
 * @param deleteCompletedTasks - boolean
 * @returns A boolean value
 */

const deleteTask = async (userId, id, deleteCompletedTasks) => {
  const taskInstance = task(db.sequelize, DataTypes)
  if (deleteCompletedTasks) {
    await taskInstance.destroy({
      where: {
        isComplete: true,
        userId
      }
    })

    return true
  }

  await taskInstance.destroy({
    where: {
      id,
      userId
    }
  })

  return true
}

/*
 * "If allTasks is true, return all tasks, otherwise, if id is a number, return the task with that id,
 * otherwise throw an error."
 *
 * The function is a little more complicated than that, but that's the gist of it
 * @param id - The ID of the task to fetch.
 * @param allTasks - A boolean value that indicates whether to return all tasks or just one task.
 * @returns the task with the id that was passed in.
 */
const fetchTask = async (userId, id, allTasks) => {
  const taskInstance = task(db.sequelize, DataTypes)
  if (allTasks) {
    const data = await taskInstance.findAll({
      where: {
        userId
      }
    })
    data.forEach((val, index) => {
      data[index] = val.dataValues
    })
    return data
  }
  const data = await taskInstance.findOne({
    where: {
      id,
      userId
    }
  })
  return data === null ? {} : data.dataValues
}

/**
 * It takes an id and an object of data to be updated, and returns true if the task is updated
 * successfully
 * @param id - The id of the task to be updated.
 * @param dataToBeUpdated - This is an object that contains the data that needs to be updated.
 * @returns task as the index
 */

const updateTask = async (userId, id) => {
  const taskInstance = task(db.sequelize, DataTypes)
  const updatedTask = await taskInstance.update({
    isComplete: true
  }, {
    where: {
      id,
      userId
    }
  })

  if (updatedTask[0] === 0) throw new HTTPError('Task not found', 404)

  return updatedTask.dataValues
}

module.exports = { updateTask, fetchTask, deleteTask, addTask }
