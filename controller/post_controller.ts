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
        usrId:decoded._id,
        postId:req.body.postId,
        caption:req.body.caption,
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