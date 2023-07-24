import express, { Router } from "express";
import * as dotenv from 'dotenv';
import {router} from './routes/routes'
import { connectToDatabase } from "./db/db_connection";
import session from 'express-session';


const app = express();
dotenv.config();
const port = process.env.PORT;

connectToDatabase();
app.use(express.json());

app.use('/', router);
    

app.listen(port, () => {
    console.log(`listning at http://localhost:${port}`);
})