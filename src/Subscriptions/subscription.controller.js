import subscription from "./subscription.model.js";
import sgMail from "@sendgrid/mail"
import dotenv from "dotenv"


dotenv.config({
    path: "../../config.env"
})


export const addSubscription = async(req, res) => {
    try {
        const email = req.body.email

        const emailExist = await subscription.find({
            email: email.toLowerCase()
        })
        if (emailExist.length) {
            res.status(409).json({
                Message: `Subscription <${email}> exists!!`
            })
        } else {
            const Subscriber = await subscription.create(req.body)
            await sendMail(Subscriber.email, Subscriber.name)
            res.status(201).json({
                Congratulation: "Subscription Added Successfully!!",
                Data: { Subscriber }

            })

        }

    } catch (error) {}
}

export const getSubscription = async(req, res) => {
    try {
        const Subscriber = await subscription.find()
        res.status(200).json({
            Message: "ALL SUBSCRIPTIONS RETRIEVED!!",
            Results: Subscriber.length,
            Data: { Subscriber }

        })

    } catch (error) {
        res.status(400).json({
            Message: "An error occured!!",
            //Error: error.stack
        })
    }
}

export const getOneSubscription = async(req, res) => {
    try {
        const Subscriber = await subscription.findById(req.params.id)
        res.status(201).json({
            Message: "ONE SUBSCRIPTION RETRIEVED!!",
            Subscriber: `${Subscriber.name}`,
            Data: { Subscriber }

        })

    } catch (error) {
        res.status(404).json({
            Message: "Subscription not found!!"
        })
    }
}

export const updateSubscription = async(req, res) => {
    try {
        const Subscriber = await subscription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(201).json({
            Message: "SUBSCRIPTION UPDATED!!",
            Subscriber: `${Subscriber.name}`,
            Data: { Subscriber }

        })

    } catch (error) {
        res.status(404).json({
            Message: "Subscription not found!!",
        })
    }
}

export const deleteSubscription = async(req, res) => {
    try {
        const Subscriber = await subscription.findByIdAndDelete(req.params.id)
        res.status(202).json({
            Message: `SUBSCRIBER ${Subscriber.name} DELETED SUCCESSFULLY!!`
        })

    } catch (error) {
        res.status(404).json({
            Message: "Subscription not found!!",
        })
    }
}

async function sendMail(email, name) {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: `${email}`, // Change to your recipient
        from: 'aimelive250@gmail.com', // Change to your verified sender
        subject: `Congratulations!!👑 ${name} - Your Subscription Added Successfully at AIMELIVE!`,
        text: `Hey ${name}, your subscription added successfully to Our Subscribers Lists ✌️`,
        html: `
          <center>
            <img src="https://res.cloudinary.com/dofeqwgfb/image/upload/v1648487540/Rectangle_21_nrqcl7.png" width="50px"/>
            <h1>👋 Hello ${name}!</h1>
            <p style="font-size: 15.0pt"> 🎉 Your Subscription Added Successfully!! 🎉</p>
            <p style="font-size: 13.0pt"> You will receive an email notification everytime when we update our blog posts. You can view, comment and share our blog posts to your community,
              <span>Kindly, follow this link and enjoy more... <a href="https://aimelive.netlify.app/blog.html"> Our Blog Posts</a></span>
            </p>
            <p>Do you want to unsubscribe? Please use this form and contact Admin for help to remove you from the Subscribers List 
            <a href="https://aimelive.netlify.app/contact.html"> Unsubscribe </a>
            </p>
          </center>`
    }
    await sgMail.send(msg)
    console.log("Email sent successfully!")
}