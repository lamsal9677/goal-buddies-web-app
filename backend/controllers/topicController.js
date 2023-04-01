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

const upsertTopic = async (req, res) => {
    const { id, title, user1, user2 } = req.body;
    try {
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        const result = await Topic.findOneAndUpdate({ _id: id }, { title, user1, user2 }, options);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }

    const topic = new topicModel({
        topic: req.body.topic,
        user1: req.body.user1,
        user2: req.body.user2,
    })
}

export { getTopic, upsertTopic }