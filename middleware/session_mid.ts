import {sessionModel} from '../models/sessions'
import { Request,Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
export const sessionCheck=async (req:Request,res:Response,next:()=>void)=>{
  //secretKey
  let secretKey=""+process.env.SECRET_KEY
  //JWT Token
  let token=""+req.headers.authorization
  let decode:any;
  try{
        decode= jwt.verify(token,secretKey)
    }catch(err)
    {
        res.send("token Expire or not valid")
    }
    try{
        let data=await sessionModel.find({
            userId:decode._id,
            isActive:true,
        })
        data.length>0?next():res.send("Authentication error")
    }catch(err){
    res.send("error")
  }
}