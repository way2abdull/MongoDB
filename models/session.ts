import { Schema, model } from 'mongoose';

interface Session {
    _id: number;
    user_id: number;
    device_id: number;
    device_type: string;
    device_token: string;
    session_token: number;
    createdAt: Date;
    updatedAt: Date;
  }

const SessionSchema = new Schema<Session>({
    _id: {
        type: Number,
        required: true
    },
  user_id: {
    type: Number,
    ref: 'User',
    required: true 
},
  device_id: {
    type: Number,
    required: true 
},
device_type: { 
    type: String,
    required: true 
  },
  device_token: { 
    type: String,
    required: true 
  },
  session_token: {
    type: Number,
    required:true
  },
  createdAt: {
    type: Date,
    required: true 
},
  updatedAt: {
    type: Date,
    required: true 
},
});

const sessions = model<Session>('Session', SessionSchema);
export default sessions;