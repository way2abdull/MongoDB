import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();


const SECRET_KEY= process.env.SECRET_KEY;

const auth = (req, res, next) => {
 
    const authheader = req.headers.authorization;
    console.log(authheader);
    
    if (authheader) {
        
        // const token = authheader.split(' ')[1];
        // console.log(token);
        
      const decode = jwt.verify(authheader, SECRET_KEY);
   
      res.json({
        login: true,
        data: decode,
      });
    } else {
   
      res.json({
        login: false,
        // req.state.data,
        data: "error"
      });
    }
  };


export {auth};
