import Messages from "../models/messageModel.js";

export const createMessage = async(req, res) => {
    try {
        const newMessage = await Messages.create(req.body)
        res.status(201).json({
            Status: "Message sent successfully!!",
            Data: newMessage

        })
    } catch (error) {
        res.status(400).json({
            Message: "Failed to send message!!",
            //data: { error }
        })
    }

}





export const getAllMessages = async(req, res) => {
    try {
        const messages = await Messages.find()
        res.status(200).json({
                Status: "Success",
                Results: ` ${messages.length} Messages`,
                Data: { messages }

            })
            //console.log(messages)
    } catch (error) {
        res.status(500).json({
            Status: "Fail",
            Message: "Can not retrieve messages!!",
            //data: { error }
        })
    }

}




export const getMessage = async(req, res) => {
    try {
        const message = await Messages.findById(req.params.id)
        if (message != null) {
            res.status(200).json({
                Status: "Success, retrieved!!",
                Sender: `${message.name}`,
                Data: message

            })
        } else {
            res.status(200).json({
                Message: "Sorry, We can't find the message!!"

            })
        }

    } catch (error) {
        res.status(404).json({
            Message: "Sorry, We can't find the message!!",
            //data: error.stack
        })
    }

}

export const deleteMessage = async(req, res) => {
    try {

        const delM = await Messages.findByIdAndDelete(req.params.id)
        if (delM !== null) {
            res.status(202).json({
                Message: "Deleted successfully!",


            })
        } else {
            res.status(404).json({
                Message: `Sorry, We can't find the message!!`
            })
        }


    } catch (error) {
        res.status(404).json({
            Message: "Sorry, We can't find the message!!",
            //Error: error.stack
        })
    }

}