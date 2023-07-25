"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const signupController_1 = require("../controller/signupController");
const loginController_1 = require("../controller/loginController");
const follow_controller_1 = require("../controller/follow_controller");
const logout_controller_1 = require("../controller/logout_controller");
const post_controller_1 = require("../controller/post_controller");
const session_mid_1 = require("../middleware/session_mid");
const router = express_1.default.Router();
exports.router = router;
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
router.post('/signup', signupController_1.userSignUp);
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
router.post('/login', loginController_1.user_login);
router.get('/follower', follow_controller_1.update_follower);
router.patch('/logout', logout_controller_1.user_logout);
router.post('/post', session_mid_1.sessionCheck, post_controller_1.postController);
//# sourceMappingURL=routes.js.map