import express from 'express';
import { userSignUp } from '../controller/signupController';
import {user_login} from '../controller/loginController';
import { update_follower } from '../controller/follow_controller';
import { auth } from '../middleware/auth';
import { user_logout } from '../controller/logout_controller';
import { postController } from '../controller/post_controller';
import { sessionCheck } from '../middleware/session_mid';


const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login' ,user_login);
router.post('/follower',auth ,update_follower);
router.patch('/logout',auth, user_logout);
router.post('/post',auth,sessionCheck,postController)


export {router};