import topicModel from '../models/topicModel.js'

const getTopic = async (req, res) => {
    if (!req.params.topicId) return res.status(400).json({ message: "Topic ID is required" })
    
    try {
        topic = topicModel.find({ topicId: req.params.topicId })
    } catch (error) {
        res.status(501).json({ message: error.message })
    }
    
    // topic should belong to one of the users
    if (topic.user1 != req.user.id && topic.user2 != req.user.id) return res.status(401).json({ message: "Unauthorized" })
    
    // display the tasks along side the topic
    topic.populate("user1Tasks")
    topic.populate("user2Tasks")

    return res.status(200).json(data)
}

const createTopic = async (req, res) => {
    if (!req.body.topic) return res.status(400).json({ message: "Topic is required" })
    if (!req.body.user1) return res.status(400).json({ message: "User1 is required" })
    if (!req.body.user2) return res.status(400).json({ message: "User2 is required" })
    
    const topic = new topicModel({
        topic: req.body.topic,
        user1: req.body.user1,
        user2: req.body.user2,
    })
    
    try {
        await topic.save()
    } catch (error) {
        res.status(501).json({ message: error.message })
    }
    
    return res.status(200).json({ message: "Topic created" })
}