import { Users } from '../models/user';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';


dotenv.config();

const SECRET_KEY= process.env.SECRET_KEY;

const userSignUp = async (req: any, res: any) => {
    const details = req.body;
    try {
        const user = await Users.find({ username: details.username });
        console.log(user);
        if (!user.length){
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(details.password, salt);

            const user_details = new Users({
                username: details.username,
                first_name: details.first_name,
                last_name : details.last_name,
                email: details.email,
                password: hashpassword,
                bio: details.bio,
                follower_count: details.follower_count,
                following_count: details.follower_count,
                post_count: details.post_count,
                
            });
            const Details = await user_details.save();
            res.status(201).json({ message: "User SignUp Success, go to Login" });
            console.log(Details);
        }
        else {
            res.status(404).json({ message: "User already exist" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}

export {userSignUp} ;