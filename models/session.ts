import { Schema, model } from 'mongoose';

interface Session {
  user_id: number;
  device_id: number;
  device_type: string;
  status: boolean;
}

const SessionSchema = new Schema<Session>({

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
  status: {
    type: Boolean,
    required: true
  }
});

export const sessions = model<Session>('Session', SessionSchema);
