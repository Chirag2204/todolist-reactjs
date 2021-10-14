import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import User from "../models/usermodel.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECERET)

            req.user = await User.findById(decoded._id).select('-password')
            // console.log(req.user);
            next()

        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('UnAuthorised No token Found')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('UnAuthorised No token Found')
    }
})