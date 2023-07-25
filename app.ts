import express, { Router } from "express";
import * as dotenv from 'dotenv';
import {router} from './routes/routes'
import { connectToDatabase } from "./db/db_connection";
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc'


const options:swaggerJSDoc.options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Instagram",
            version: "1.0.0"
        },
        schemas:['http', 'https'],
        servers: [
            {
                url: "http://localhost:3000/"
            }
        ]
    },
    // apis: ['./routes/routes.ts'],
    apis: ['./swagger/users.servicedoc.yaml'],
};

const app = express();
dotenv.config();
const port = process.env.PORT;

connectToDatabase();
app.use(express.json());

app.use('/', router);
    
const swaggerDocument = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`listning at http://localhost:${port}`);
})