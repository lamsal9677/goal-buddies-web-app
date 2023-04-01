import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
import topicModel from "../models/topicModel.js";
dotenv.config();

const addOrUpdateTask = async (req, res) => {
    const { topicId } = req.params;
    const { id } = req.body;
    const { title, description } = req.body;
    const userId = req.user.id;
    const topic = await topicModel.find({_id: topicId});
    
    if (id) {
        newTask = await newTask.find({ _id: id })
        
    }

    const newTask = new taskModel({ title, description, completed: false, topic })

    if (topic.user1 == userId) {
        topic.user1Tasks.push(newTask); 
    } else if (topic.user2 == userId) {
        topic.user2Tasks.push(newTask)
    } else { 
        return res.status(401).json({ message: "Unauthorized" })
    }

    Promise.all([newTask.save(), topic.save()])
        .then(() => res.status(200).json({ message: "Task added successfully" }))
        .catch((error) => res.status(500).json({ message: error.message }))
}

const removeByValue = (arr, value) => {
    let index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
        return true
    }
    return false
}

const removeTask = async (req, res) => {
    /**
     * Expect body to be of form { taskId: <id> }
     */
    const { taskId } = req.body;
    const { topicId } = req.params;
    const userId = req.user.id;
    const topic = await topicModel.find({_id: topicId});
    const task = await taskModel.find({_id: taskId});

    if (topic.user1 == userId) {
        if (removeByValue(topic.user1Tasks, taskId)) return res.status(404).json({ message: "Task not found in topic" })
    } else if (topic.user2 == userId) {
        if (removeByValue(topic.user2Tasks, taskId)) return res.status(404).json({ message: "Task not found in topic" })
    } else { 
        return res.status(401).json({ message: "Unauthorized" })
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

export { addTask, getTask, removeTask }