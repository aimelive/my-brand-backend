import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true
    },
    status: { type: Number, default: 1 },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})

const subscription = mongoose.model("subscription", subscriptionSchema)

export default subscription