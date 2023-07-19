import mongoose from 'mongoose';
import * as model from '../models/index';


async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/Instagram')
    console.log('Connected to MongoDB');
    model.Actions;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export {connectToDatabase};