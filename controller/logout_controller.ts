import { Request, Response } from "express"
import { sessionModel } from '../models/sessions'
import dotenv from 'dotenv'
import { Redis } from "../middleware/redis_session";
import { Users } from "../models/user";
dotenv.config();

export const user_logout = async (req: Request, res: Response) => {

    try {
        let data = await sessionModel.updateOne({
            userId: req.user._id,
            isActive: true,
        }, {
            $set: { isActive: false },
        })
        console.log(data, req.user._id)
        const isUser = await Users.findOne({_id : req.user._id})
        console.log(isUser);
        await Redis.logout_session_redis(isUser);
        res.send("logout successfully")
    } catch (err) {
        res.send("error")
    }
}