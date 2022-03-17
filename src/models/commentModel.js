import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    name: {
        type: String,
        required: [true, "This field is required"]
    },
    email: {
        type: String,
        required: [true, "This field is required"]
    },
    comment: {
        type: String,
        required: [true, "This field is required"]
    },
    status: {
        type: Number,
        default: 1
    },

    dateCreated: {
        type: Date,
        default: Date.now()
    }

});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;