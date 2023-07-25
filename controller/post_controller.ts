import { post } from "../models/posts";
import {Request,Response} from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const postController=(req:Request,res:Response)=>{
    const token=""+req.headers.authorization
    try{

      //JWT Key Coding
      let secretKey=""+process.env.SECRET_KEY
      let decoded:any = jwt.verify(token, secretKey);
      //Creating data that we want to insert into database
      let postData={
        userId:decoded._id,
        caption:req.body.caption,
        media_url: req.body.media_url,
        hashTags:req.body.hashtag
      }
      post.create(postData)
      .then((savedUser) => {
          res.send(postData)
      })
      .catch((error) => {
          res.send(error)
      });
    }catch(err){
          res.send("Error,Data is Crupted")
    }
 
}