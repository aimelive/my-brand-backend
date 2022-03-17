import mongoose from "mongoose";
// import validator from "validator"

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String,
    },
    phone: {
        type: Number,
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

const User = mongoose.model("User", userSchema);
export default User;