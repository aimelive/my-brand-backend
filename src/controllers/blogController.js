import Blog from "../models/blogModel.js"
import Comment from "../models/commentModel.js"
import { photo } from "../middlewares/About Photo/multer.js"
export const createBlog = async(req, res) => {
    try {

        const title = req.body.title;
        const titleExists = await Blog.find({
            title: title
        })

        if (titleExists.length) {
            const blog = await Blog.findOne({ title: title })
            res.status(400).json({
                Blog: "Already Exists!!",
                Title: title,
                ID: blog._id
            })
        } else {
            req.body.imgURL = await photo(req)
            const newBlog = await Blog.create({
                title: req.body.title,
                category: req.body.category,
                preview: req.body.preview,
                body: req.body.body,
                imgURL: req.body.imgURL
            })
            res.status(201).json({
                Message: "New blog created sucessfully",
                Content: { newBlog }

            })
        }



    } catch (error) {
        res.status(500).json({
            Status: "FAIL",
            Message: "Failed to add new blog!",
            Error: error

        })
    }

}


export const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find().sort({ dateCreated: -1 })
        res.status(200).json({
            Status: "All blogs in the database retrieved successfully",
            Number_of_blogs: blogs.length,
            Content: blogs

        })
    } catch (error) {
        res.status(500).json({
            Message: "An error occured",
            //Error: error.stack
        })
    }

}


export const getBlog = async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("comments")

        res.status(200).json({
            Message: `Blog retrieved successfully!!`,
            Title: blog.title,
            Content: { blog },
            //Comments: { comment }

        })
    } catch (error) {
        res.status(404).json({
            Error: `Blog not found!!`
        })
    }

}


export const updateBlog = async(req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        const blogPost = await Blog.findByIdAndUpdate(req.params.id, { dateUpdated: Date.now() }, { new: true, runValidators: true });
        //blogPost.comments.push(newComment)
        await blogPost.save((e) => {
            res.status(201).json({
                Message: "Blog updated!",
                Data: blogPost
            })
        })
    } catch (error) {
        res.status(404).json({
            Oops: `A blog with an ID ${req.params.id} doesn't exist`
        })
    }

}



export const updateBlogPhto = async(req, res) => {
    try {
        req.body.imgURL = await photo(req)
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        const blogPost = await Blog.findByIdAndUpdate(req.params.id, { dateUpdated: Date.now() }, { new: true, runValidators: true });
        //blogPost.comments.push(newComment)
        if (blog) {
            await blogPost.save((e) => {
                res.status(201).json({
                    Message: "Blog updated!",
                    Data: blogPost
                })
            })
        } else {
            res.status(404).json({
                Message: "Failed to update!!",
                Oops: `A blog with an ID ${req.params.id} doesn't exist`
            })
        }

    } catch (error) {
        res.status(500).json({
            Message: "Failed to update!!",
            Error: error.stack
        })
    }

}


export const deleteBlog = async(req, res) => {
    try {
        const delBlog = await Blog.findByIdAndDelete(req.params.id)
        if (delBlog !== null) {
            await Comment.deleteMany({
                postID: req.params.id
            })

            res.status(202).json({
                Message: "Blog has been deleted successfully"
            })
        } else {
            res.status(404).json({
                Error: "Blog not found!!"
            })
        }

    } catch (error) {
        res.status(404).json({
            Message: "An error occured, Blog not found!!"
        })
    }

}