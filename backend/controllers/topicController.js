import topicModel from '../models/topicModel.js'

const getTopic = async (req, res) => {
    if (!req.params.topicId) return res.status(400).json({ message: "Topic ID is required" })
    
    let topic;
    try {
        topic = await topicModel.findOne({ topicId: req.params.topicId })
    } catch (error) {
        return res.status(501).json({ message: error.message })
    }
    
    console.log(topic)

    // topic should belong to one of the users
    if (topic.user1 != req.user.id && topic.user2 != req.user.id) return res.status(401).json({ message: "Unauthorized" })
    
    // display the tasks along side the topic
    topic.populate("user1Tasks")
    topic.populate("user2Tasks")

    return res.status(200).json(topic)
}

const addTopic = async (req, res) => {
    const { title, user1, user2 } = req.body;

    // assert that the first user is the logged in user
    if (user1 != req.user.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const topic = new topicModel({ title, user1, user2 });
        const result = await topic.save();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateTopic = async (req, res) => {
    const { topicId } = req.params;
    if (!topicId) return res.status(400).json({ message: "Topic ID is required" })
    const { title, user1, user2 } = req.body;
    try {
        const result = await topicModel.findOneAndUpdate({ _id: topicId }, { title, user1, user2 });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
}

export { getTopic, updateTopic, addTopic }