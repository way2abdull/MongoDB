import mongoose, { model } from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

interface Action {
    action_type: string;
      user_id: number;
      post_id: number;
    }

const actionSchema = new Schema<Action>({
  action_type: { type: String, required: true },
  user_id: {type: Number, ref: 'User', required: true},
  post_id: {type: Number, ref: 'Post', required:true}
});

export const Actions = model<Action>('Action', actionSchema);
