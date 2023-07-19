import mongoose, { model } from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

interface Likes {
      user_id: number;
      post_id: number;
    };

    const like = new Schema({
        post_id:{
            type: ObjectId,
            ref: 'Post',
            required: true 
        },
        user_id:{
            type: ObjectId,
            ref: 'User',
            required: true 
        },
    });

    export const likes = model<Likes>('Like', like);