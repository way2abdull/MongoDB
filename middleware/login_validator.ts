import express, { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { Users } from '../models'

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

export {loginSchema};
