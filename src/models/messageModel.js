import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "This field is required"]
    },
    email: {
        type: String,
        required: [true, "This field is required"],
        trim: true
    },
    message: {
        type: String,
        required: [true, "This field is required"]
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
})



const Messages = mongoose.model('Messages', messageSchema);
export default Messages;