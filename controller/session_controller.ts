import * as dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
dotenv.config();
import { sessions } from "../models";

const SECRET_KEY= process.env.SECRET_KEY;

const upadteSession = async (req:any,res:any) => {

    const authheader = req.headers.authorization;
    const decode = jwt.verify(authheader, SECRET_KEY);

    const {user_id, device_id, device_type, status} = req.body;
}