import mongoose, { model } from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

interface Follower {
    sender_id: number;
    receiver_id: number;
    status: 'accept' | 'reject' | 'pending';
    createdAt: Date;
    updatedAt: Date;
}

const follow = new Schema<Follower>({
    sender_id:{
        type: Number,
        ref: 'post' 
    },
    receiver_id:{
        type: Number,
        ref: 'User' 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status:{
    type: String,
    enum: ['accept', 'reject', 'pending'],
    required: true
    }
});


const follows = model<Follower>('Follower', follow);
export default follows;