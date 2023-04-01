import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
import topicModel from "../models/topicModel.js";
dotenv.config();

const removeByValue = (arr, value) => {
    let index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
        return true
    }
    return false
}

/***
 * Note: all of the below function run after requireTopicOwnership middleware
 */

const updateTask = async (req, res) => {
    const { topicId } = req.params;
    const { id } = req.body;
    const { title, description } = req.body;
    const userId = req.user.id;
    const topic = await topicModel.findOne({_id: topicId});
    
    const task = await taskModel.findOne({_id: id});
    if (!task) return res.status(404).json({ message: "Task not found" })
    else if (task.topic != topicId ) return res.status(401).json({ message: "Unauthorized" })
    


    try {
        task = await taskModel.updateOne({ _id: id }, { ...req.body }, { new: true })
    } catch {
        return res.status(400).json({ message: `Invalid task data: ${error.message}` })
    }
    
    return res.status(200).json(task)
}

const upsertTask = async (req, res) => {
    let task;

    const isUser1 = req.user.id == topic.user1;
    
    task = new taskModel({ title, description, completed: false, topic })

    // if this task is newly created, add it to the topic
    if (isUser1) topic.user1Tasks.push(task); 
    else if (topic.user2 == userId) topic.user2Tasks.push(task)
    
    try {
        await Promise.all([topic.save(() => {}), task.save()])
    } catch (error) {
        return res.status(400).json({ message: `Invalid task data: ${error.message}` })
    }
}

const removeTask = async (req, res) => {
    /**
     * Expect body to be of form { taskId: <id> }
     */
    const { taskId } = req.body;
    const { topicId } = req.params;
    const userId = req.user.id;
    const topic = await topicModel.findOne({_id: topicId});
    const task = await taskModel.findOne({_id: taskId});

    if (topic.user1 == userId) {
        if (removeByValue(topic.user1Tasks, taskId)) return res.status(404).json({ message: "Task not found in topic" })
    } else if (topic.user2 == userId) {
        if (removeByValue(topic.user2Tasks, taskId)) return res.status(404).json({ message: "Task not found in topic" })
    }

    Promise.all([task.remove(), topic.save()])
        .then(() => res.status(200).json({ message: "Task deleted successfully" }))
        .catch((error) => res.status(501).json({ message: error.message }))
}

const getTask = (req, res) => {
    taskModel.find({ userId: req.user.id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(501).json({ message: error.message }))
}

export { upsertTask, getTask, removeTask }