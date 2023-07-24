import mongoose, { Document, Model, Types } from 'mongoose';
// import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


interface User extends Document {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    bio: string;
    profile_pic: string;
    follower_count: number;
    following_count: number;
    post_count: number;
}

const UserSchema = new Schema<User>({
    // _id:{
    //     type:Number
    // },
    username: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
    profile_pic: {
        type: String,
        required: false,
    },
    follower_count: [{
        type: Number,
        ref: 'Follower'
    }],
    following_count: [{
        type: Number,
        ref: 'Follower'
    }],
    post_count: [{
        type: Number,
        ref: 'Post'
    }]
});

export const Users = mongoose.model('User', UserSchema);

