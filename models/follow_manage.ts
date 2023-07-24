import mongoose, { model, Types } from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export interface Follower {
    sender_id: Number;
    receiver_id: Number;
    status: 'accept' | 'reject' | 'pending';
    createdAt: Date;
    updatedAt: Date;
}

const follow = new Schema<Follower>({
    sender_id:{
        type: ObjectId,
        ref: 'User',
        required: true 
    },
    receiver_id:{
        type: ObjectId,
        ref: 'User',
        required: true 
    },
    status:{
    type: String,
    enum: ['accept', 'reject', 'pending'],
    required: true
    }
});


export const follows = model<Follower>('Follower', follow);
