// import mongoose from "mongoose";
import mongoose, { model } from 'mongoose';

export interface Post {
    post_id: number;
    user_id: number;
    caption: Text;
    media_url: string;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    caption:{
        type:String,
        required: true
    },
    media_url:{
        type:String,
        required: true
    },
    
    likes_count:{
        type:Number,
        required: true
    },
    comment_count:{
        type:Number,
        required: true
    }
});

export const Posts = model<Post>('Post', postSchema);
