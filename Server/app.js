import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();

//To link application level middleware
import donorRouter from './router/donor.router.js';
import contactRouter from './router/contact.router.js';
//To read a body content load the configuration body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended":"true"}));

//To read Binary constent 


// to load cross origin resource sharing
app.use(cors());

//Application Level Middileware
app.use("/donor",donorRouter);
app.use("/contact",contactRouter);

app.listen(3001);
console.log("Server invoked at linked http://localhost:3001");
