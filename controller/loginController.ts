import express, {Request,Response} from 'express';
import { Users } from '../models/user';
import { sessionModel } from '../models/sessions';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import {loginSchema} from '../middleware/login_validator';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const user_login = async (req:Request, res:Response, next:()=>void) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    try {
      const { username, email, password } = req.body;
      let isAvailable = await Users.findOne({ username,email,password });
  
      if (!isAvailable) {
        return res.status(404).json({ status: "User not found" });
      }
      
      isAvailable = {...JSON.parse(JSON.stringify(isAvailable))}
      const token = jwt.sign({ user : req.body}, SECRET_KEY);
      console.log(token);
      res.status(200).json({ status: "Login Success", token });


      //Session creation if not exist
      let data=await sessionModel.find({
        userId:isAvailable?._id,
        isActive:true,
      })
      if(!(data.length>0))
      {
        sessionModel.create(
          {
            userId:isAvailable?._id,
            isActive:true,
            loginAt:new Date()
          }
        )
      }
      res.send(req.headers.authorization)
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
    next()
  };
  
  export { user_login };