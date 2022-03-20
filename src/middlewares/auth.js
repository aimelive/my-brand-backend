import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
export const protect = async(req, res, next) => {

    let token
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({
                Message: "LOGIN FIRST!!"
            })
        }
        if (req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        try {

            const decoded = await promisify(jwt.verify)(token, 'AIMELIVE APP')
            const freshUser = await User.findById(decoded._id)
            if (!freshUser) {
                return res.status(404).json({ Message: 'User not found' })
            }

            req.user = freshUser

        } catch (error) {
            return res.status(400).json({ Message: 'FAILED TO DECODE A TOKEN', Error: error.stack })
        }

    } catch (error) {
        res.status(500).json({
            Message: "AN ERROR OCCURED, TOKEN ERROR!!",
            Error: error.stack
        })
    }

    next();
}

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                Status: "UNAUTHORIZED!",
                Message: 'You do not have access to this role.'
            });
        }
        next()
    }
}