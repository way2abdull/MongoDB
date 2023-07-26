import express, { Request, Response } from 'express';
import { Users } from '../models/user';
import { sessionModel } from '../models/sessions';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { loginSchema } from '../middleware/login_validator';
import { Redis } from '../middleware/redis_session';
import { createClient } from "redis";

const client = createClient();
client.connect();
client.on('error', err => console.log('Redis client error', err));

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const user_login = async (req: Request, res: Response, next: () => void) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { username, email, password } = req.body;
    let user = await Users.findOne({ email });

    console.log(user);

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }

    user = { ...JSON.parse(JSON.stringify(user)) }
    const token = jwt.sign({ _id: user?._id }, SECRET_KEY);
    console.log(token)

    console.log(user);

    //Session creation if not exist
    let data = await sessionModel.find({
      userId: user?._id,
      isActive: true,
    })
    if (!(data.length > 0)) {
      sessionModel.create(
        {
          userId: user?._id,
          isActive: true,
          loginAt: new Date()
        }
      )
    }
    res.status(200).json({ status: "Login Success", token });
    await Redis.maintain_session_redis(token,client);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
  next()
};

export { user_login };