import express from "express"
import { addTopic, getTopic, updateTopic } from '../controllers/topicController.js'

import requireAuth from "../middleware/requireAuth.js";
import requireTopicOwnership from "../middleware/requireTopicOwnership.js";

const router = express.Router();

router.get("/:topicId", [requireAuth, requireTopicOwnership], getTopic),
router.post("/:topicId", [requireAuth, requireTopicOwnership], updateTopic),
router.post("/", [requireAuth], addTopic) // add topic belonging to the user

export default router;