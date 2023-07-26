import redis from "redis";
import { createClient } from "redis";
import {Users} from "../models/user";
import { date } from "joi";
import { Verify } from "./verify_user";

const client = createClient();
client.connect();
client.on('error', err => console.log('Redis client error', err));

export class Redis{
    static async maintain_session_redis(token,client){
        try{
            const user = await Verify.verify_token(token);
            const isUser = await Users.findOne({_id: user._id});
            console.log(isUser);
            if(isUser){
                await client.SET(isUser.username, JSON.stringify({
                    user_id: isUser._id,
                    isActive: true,
                    loginAt:date
                }));
                const session = await client.get(isUser.username);
                console.log(session);
            }
            else{
                console.log("User not found");
            }
        }
        catch(err){
            console.log(err);
        }
    }
    static async logout_session_redis(isUser:any){
        try{
            await client.SET(isUser.username, JSON.stringify({
                user_id: isUser._id,
                isActive: false
            }));
            const session = await client.get(isUser.username);
            console.log(session);
        }
        catch(err){
            console.log(err);
        }
    }
};