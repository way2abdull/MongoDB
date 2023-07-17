import mongoose, { model } from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

interface Action {
    action_id: number;
    likes: {
      user_id: number;
      post_id: number;
    }[];

    comments: {
        comment_id: number
      post_id: number;
      user_id: number;      
      content: string;

      replies: {
        reply_id: number;
        user_id: number;
        comment_id: number;
        content: Text;
      }[];
    }
  }

const replySchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    user_id: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    reply_content: {
        type: Text,
        required: true
    },
    reply_likes: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },

});


const commentSchema = new Schema({

    _id: {
        type: Number,
        required: true
    },

    post_id: {
        type: ObjectId,
        ref: 'post',
        required: true
    },

    user_id: {
        type: ObjectId,
        ref: 'user',
        required: true
    },

    content: {
        type: Text,
        required: true
    },

    comment_likes: {
        type: Number
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },

    replySchema:replySchema,
});


const like = new mongoose.Schema({
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post' 
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    created_at:{
        type:Date,
        default: Date.now
    },
    updated_at:{
        type:Date,
        default: Date.now
    }

});


const actionSchema = new Schema<Action>({
  action_id: { type: Number, required: true },
  likes: [like],
  comments: [commentSchema],
});

const actions = model<Action>('Action', actionSchema);
export default actions;