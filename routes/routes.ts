import express from 'express';
import {UserSignup} from '../controller/signupController';
import {user_login} from '../controller/loginController';
import { update_follower } from '../controller/follow_controller';
import { checkusername } from '../middleware/checkuser';
import { user_logout } from '../controller/logout_controller';
import { postController } from '../controller/post_controller';
import { sessionCheck } from '../middleware/session_mid';


const router = express.Router();

router.post('/signup', UserSignup);
router.post('/login', user_login);
router.get('/follower',checkusername ,update_follower);
router.patch('/logout',user_logout);
router.post('/post',sessionCheck,postController)


export {router};