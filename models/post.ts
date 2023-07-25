import mongoose, { model } from 'mongoose';

export interface Post {
    user_id: number;
    caption: Text;
    media_url: string;
    
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
    hashtag:{
        type: String,
        required: false
    }
    
    // likes_count:{
    //     type:Number,
    //     required: true
    // },
    // comment_count:{
    //     type:Number,
    //     required: true
    // }
});

export const Posts = model<Post>('Post', postSchema);
