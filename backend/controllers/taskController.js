import Task from '../models/taskmodel.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

//@desc to create a new task
//route POST /api/task
//private

export const createTask = asyncHandler(async (req, res) => {
    const { task } = req.body

    let token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECERET)
    const userId = decoded.id

    const createdTask = await Task.create({
        user: userId,
        task: task
    })
    res.json(createdTask)
})

//@desc to update a task
//route PUT /api/task/:id
//private

export const updateTask = asyncHandler(async (req, res) => {
    const { id, taskTobe } = req.body

    // let token = req.headers.authorization.split(' ')[1]
    // const decoded = jwt.verify(token, process.env.JWT_SECERET)

    console.log(taskTobe);

    let createdTask = await Task.findById(id)

    if (createdTask) {
        console.log("1-" + createdTask);
        createdTask.task = taskTobe

        console.log("2-" + createdTask);
        const updatedTask = await createdTask.save()

        console.log("3-" + createdTask);
        res.json(updatedTask)
    }
    else {
        res.status(404)
        throw new Error('Task Not Found')
    }
})

//@desc to delete a task
//route DELETE /api/task/:id
//private

export const deleteTask = asyncHandler(async (req, res) => {

    const task = await Task.findById(req.params.id);

    if (task) {
        await task.remove()
        res.json({ message: 'Task Deleted' });
    } else {
        res.status(404)
        throw new Error(`Task Not Found`)
    }
})

//@desc to get all tasks
//route GET /api/task
//private

export const getTasks = asyncHandler(async (req, res) => {

    let token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECERET)

    if (decoded.id) {
        const tasks = await Task.find({ user: decoded.id })
        res.json(tasks)
    } else {
        res.status(404)
        throw new Error(`User Not Found`)
    }
}
)




