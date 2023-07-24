import express from 'express';
import { Users } from '../models/user';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY= process.env.SECRET_KEY;
// const Userrouter = express.Router();

const UserSignup = async (req:any ,res:any ) =>{
try {
    const user = new Users(req.body);
    await user.save();
    const token = jwt.sign({id:user.username},SECRET_KEY, {expiresIn: '360'});
    console.log("Token:",token);
    res.status(200).json({status:"SignUp Success",token});
} catch (error) {
    console.error(error);
    res.status(500).send(error);
}
};

export {UserSignup};