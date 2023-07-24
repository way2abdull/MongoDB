import { Request,Response } from "express"
import {sessionModel} from '../models/sessions'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const user_logout=async (req:Request,res:Response)=>{
    //secretKey
    let SECRET_KEY=""+process.env.SECRET_KEY
    //JWT Token
    let token=""+req.headers.authorization
    let decode:any;
      try{
          decode= jwt.verify(token,SECRET_KEY)
      }catch(err)
      {
          res.send("token Expire or not valid")
      }
      try{
          let data=await sessionModel.updateOne({
              userId: decode._id,
              isActive:true,
          },{
            $set:{isActive:false},
        })
        console.log("....................")
            res.send("logout successfully")
        }catch(err){
            res.send("error")
        }
}