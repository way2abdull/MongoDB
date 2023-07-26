import Joi from 'joi';

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

export {loginSchema};
