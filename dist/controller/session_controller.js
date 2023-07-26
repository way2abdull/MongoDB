// import { sessionModel } from "../models";
// import { Verify} from '../middleware/verify_user'
// import { Users } from "../models";
// import { Redis } from '../middleware/redis_session';
// import { date } from "joi";
// export class Sessions{
//     static async maintain_session(req: any, res: any, token){
//         try{
//             const check_user = await Verify.verify_token(token);
//             const isUser = await Users.find({email: check_user.email});
//             if(isUser){
//                 const user = isUser[0]._id;
//                 const isSession = await sessionModel.find({user_id: user})
//                 console.log(isSession);
//                 if(!isSession.length){
//                     const session_details = new sessionModel({
//                         user_id: user,
//                         isActive: true,
//                         loginAt: date
//                     });
//                     const session = await session_details.save();
//                     console.log("Session stored successfully");
//                     console.log(session);
//                 }
//                 else if(isSession.length){
//                     if(!isSession[0].isActive){
//                         await sessionModel.findOneAndUpdate({user_id: user}, {status: !isSession[0].isActive});
//                         console.log("Session Activate");
//                     }
//                 }
//                 // console.log("One session of this user is already activ");
//                 // res.status(201).json({message: "Session stored successfully"});
//                 await Redis.maintain_session_redis(token);
//             }
//             else{
//                 // res.status(404).json({message: "User Not Found"});
//                 console.log("User not found");
//             }
//         }
//         catch(err){
//             // res.status(500).json({message: "Server Error", err});
//             console.log("Server Error")
//         }
//     }
// }
//# sourceMappingURL=session_controller.js.map