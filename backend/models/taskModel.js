import mongoose from "mongoose";
const taskSchema = mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    completed:{type:Boolean, required:true}
}, {timestamps:true});

const taskModel = mongoose.model("Task", taskInstance);
export default taskModel;