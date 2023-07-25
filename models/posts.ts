import mongoose, { Schema } from 'mongoose';

interface posts extends mongoose.Document {
    usrId:mongoose.Types.ObjectId;
    caption : string,
    media_url: string,
    hashTags:string
  }

const postSchema = new mongoose.Schema<posts>({
    usrId:{ type: Schema.Types.ObjectId, ref: 'User' },
    caption :String,
    media_url: String,
    hashTags: String
  });

export const post = mongoose.model<posts>('userPost', postSchema);