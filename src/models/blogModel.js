import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "This field is required"]
    },
    category: {
        type: String,
        required: [true, "This field is required"]
    },
    preview: {
        type: String,
        required: [true, "This field is required"]
    },
    body: {
        type: String,
        required: [true, "This field is required"]
    },
    imgURL: {
        type: String,
        required: [true, "This field is required"]
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    status: {
        type: Number,
        default: 1
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    dateUpdated: {
        type: Date
    }

});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;