import Blog from "../models/blogModel.js"
import Comment from "../models/commentModel.js"

export const createComment = async(req, res) => {
    try {
        const newComment = await Comment.create({
            postID: req.params.blogId,
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment
        })
        const blogPost = await Blog.findById(req.params.blogId);
        blogPost.comments.push(newComment)
        await blogPost.save((e) => {
            res.status(201).json({
                Message: "New Comment Added Successfully!!",
                Data: newComment
            })
        })

    } catch (error) {
        res.status(400).json({
            Status: "Fail",
            Message: "Failed to add comment!!"
        })
    }

}

export const getAllComments = async(req, res) => {
    try {

        const blog = await Blog.findById(req.params.blogId)
        const comments = await Comment.find({ postID: req.params.blogId })
        if (comments != null) {
            res.status(200).json({
                Message: `Comments retrieved!!`,
                Blog: blog.title,
                Results: `${comments.length} Comments`,
                Comments: { comments }

            })
        } else {
            res.status(404).json({
                Message: "No message yet!!",

            })
        }

    } catch (error) {
        res.status(500).json({
            Message: "No message yet!!",
            //Error: error.stack

        })
    }

}


export const getComment = async(req, res) => {

    try {
        const blogId = req.params.blogId
        const commentId = req.params.commentId
        const comment = await Comment.findOne({
            postID: blogId,
            _id: commentId
        })
        if (comment != null) {
            res.status(200).json({
                Message: `One comment retrieved`,
                Data: comment
            })

        } else {
            res.status(404).json({
                Message: "Comment not found!"
            })

        }

    } catch (error) {
        res.status(404).json({
            Message: "Comment not found!",
            //Error: error.stack

        })
    }

}

export const deleteComment = async(req, res) => {
    try {
        const blogId = req.params.blogId
        const commentId = req.params.commentId
        const comment = await Comment.findOneAndDelete({
            postID: blogId,
            _id: commentId
        })
        if (comment != null) {
            res.status(200).json({
                Message: "Comment Deleted successfully!"
            })
        } else {
            res.status(404).json({
                Message: `An error occured, Comment not found!!`,
            })
        }

    } catch (error) {
        res.status(404).json({
            Message: `An error occured, Comment not found!!`,
            //Error: error.stack
        })
    }


}