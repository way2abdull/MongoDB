import mongoose, { Schema } from 'mongoose';

interface posts extends mongoose.Document {
    usrId:mongoose.Types.ObjectId;
    postId:string,
    caption : string,
    hashTags:object
  }

const postSchema = new mongoose.Schema<posts>({
    usrId:{ type: Schema.Types.ObjectId, ref: 'User' },
    postId:String,
    caption :String,
    hashTags:Object
  });

export const post = mongoose.model<posts>('userPost', postSchema);