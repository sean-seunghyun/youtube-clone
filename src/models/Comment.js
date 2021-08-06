import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    createdAt: { type:Date, default: Date.now, required: true },
    text: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    video: {type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true}
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;