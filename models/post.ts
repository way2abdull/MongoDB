// import mongoose from "mongoose";
import mongoose, { Schema, model } from 'mongoose';

interface Post {
    post_id: number;
    user_id: number;
    caption: Text;
    media_url: string;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema({

    post_id:{
        type:Number
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    caption:{
        type:String
    },
    media_url:{
        type:String
    },
    
    likes_count:{
        type:Number
    },
    comment_count:{
        type:Number
    },
    created_at:{
        type:Date
    },
    updated_at:{
        type:Date
    }
});

const posts = model<Post>('Post', postSchema);
export default posts;