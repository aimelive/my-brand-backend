import Blog from "../models/blogModel.js"
import Comment from "../models/commentModel.js"
import { photo } from "../middlewares/About Photo/multer.js"
import sgMail from "@sendgrid/mail"
import subscription from "../Subscriptions/subscription.model.js"
import dotenv from "dotenv"



dotenv.config({
    path: "../../config.env"
})


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

            await sendPost(newBlog._id, newBlog.dateCreated, newBlog.title, newBlog.imgURL, newBlog.category)

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


async function sendPost(postId, postDate, postTitle, postImage, postCategory) {
    const blogs = await Blog.find()
    const subscriptions = await subscription.find()
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    for (let i = 0; i < subscriptions.length; i++) {
        const subInfo = subscriptions[i];
        const msg = {
            to: `${subInfo.email}`, // Change to your recipient
            from: 'aimelive250@gmail.com', // Change to your verified sender
            subject: `{${blogs.length}} AIMELIVE - New Blog Added Successfully!`,
            text: `Hey ${subInfo.name}, here is new blog added to our website. you can view, comment and share ✌️`,
            html: `
      <center>
        <img src="https://res.cloudinary.com/dofeqwgfb/image/upload/v1648487540/Rectangle_21_nrqcl7.png" width="50px"/>
        <h1>👋 Hello ${subInfo.name}!</h1>
        <p style="font-size: 15.0pt">Here's a new blog we added yet.</p>
        <p style="font-size: 13.0pt"> You can view, comment and share to your community,
          <span>Kindly, follow this link to read more... <a href="https://aimelive.netlify.app/read.html?${postId}"> ${postTitle} </a></span>
        </p>
        <div background="grey">
        <img src="${postImage}" width="337px"/> <p><i>${postTitle}</i></p>
        </div>
        <br>
        <a href="https://aimelive.netlify.app/read.html?${postId}"> Continue to read...</a>
      </center>`
        }
        const msgSent = await sgMail.send(msg)
        if (msgSent) {
            console.log("Email sent successfully!!")
        } else {
            console.log("AN ERROR HAPPENING!")
        }
    }

}