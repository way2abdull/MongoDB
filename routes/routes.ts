import express from 'express';
import { userSignUp } from '../controller/signupController';
import {user_login} from '../controller/loginController';
import { update_follower } from '../controller/follow_controller';
import { checkusername } from '../middleware/checkuser';
import { user_logout } from '../controller/logout_controller';
import { postController } from '../controller/post_controller';
import { sessionCheck } from '../middleware/session_mid';


const router = express.Router();


/** 
* @openapi
* /signup:
*   post:
*     tags:
*     - Register User
*     descrition: Register User
*     requestBody:
*       description: This route registers users with their details.
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*                 example: abdul123
*               first_name:
*                 type: string
*                 example: abdul
*               last_name:
*                 type: string
*                 example: rahman    
*               email:
*                 type: string
*                 example: abdul@gmail.com
*               password:
*                 type: string
*               bio:
*                 type: string
*                 example: This is my bio  
*               profile_pic:
*                 type: string
*                 example: image.jpg
*               follower_count:
*                 type: number
*               following_count:
*                 type: number
*               post_count:
*                 type: number        
*                     
*     responses:
*       '201':
*          description: Created Success
*       '406':
*          description: Value not accepted
*       '500':
*          description: Internal Server Error
*/

router.post('/signup', userSignUp);

/** 
* @openapi
* /login:
*   post:
*     tags:
*     - Login User
*     descrition: User gets logged in using correct credentials
*     requestBody:
*       description: Enter correct credentials to LogIn.
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*                 example: abdul123
*               first_name:
*                 type: string
*                 example: abdul
*               last_name:
*                 type: string
*                 example: rahman    
*               email:
*                 type: string
*                 example: abdul@gmail.com
*               password:
*                 type: string
*               bio:
*                 type: string
*                 example: This is my bio  
*               profile_pic:
*                 type: string
*                 example: image.jpg
*               follower_count:
*                 type: number
*               following_count:
*                 type: number
*               post_count:
*                 type: number        
*                     
*     responses:
*       '201':
*          description: Created Success
*       '406':
*          description: Value not accepted
*       '500':
*          description: Internal Server Error
*/
router.post('/login', user_login);
router.get('/follower' ,update_follower);
router.patch('/logout',user_logout);
router.post('/post',sessionCheck,postController)


export {router};