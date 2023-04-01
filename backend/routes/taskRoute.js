import express from "express"
import { upsertTask, getTask, removeTask} from "../controllers/taskController.js"
import { getTopic, upsertTopic } from '../controllers/topicController.js'

import requireAuth from "../middleware/requireAuth.js";
import requireTopicOwnership from "../middleware/requireTopicOwnership.js";
const router = express.Router();

router.get("/:topicId", [requireAuth, requireTopicOwnership], getTopic),
router.post("/:topicId", [requireAuth], upsertTopic) // add topic belonging to the user
router.post("/:topicId/addTask", [requireAuth, requireTopicOwnership], upsertTask) // add task belonging to the user to the topic
router.get("/:topicId/getTask", [requireAuth, requireTopicOwnership], getTask)
router.get("/:topicId/removeTask", [requireAuth, requireTopicOwnership], removeTask)

export default router;