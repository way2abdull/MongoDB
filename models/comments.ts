import mongoose, { model } from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

interface Comments { 
    post_id: number;
    user_id: number;
    content: string;

replies: {

    user_id: number;
    comment_id: number;
    content: string;
} [];
}

const replySchema = new Schema({

    user_id: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    reply_content: {
        type: String,
        required: true
    },
    reply_likes: {
        type: Number
    }

});


const commentSchema = new Schema({

    post_id: {
        type: ObjectId,
        ref: 'Post',
        required: true
    },

    user_id: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    content: {
        type: String,
        required: true
    },

    comment_likes: {
        type: Number
    },

    replies: [replySchema],
});

export const comments = model<Comments>('Comment', commentSchema);