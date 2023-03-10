import mongoose, { Error } from "mongoose";

// Handling uncaught exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() =>{
    process.exit(1);
  });
});

// .ENV files configuartion
import * as dotenv from "dotenv";
dotenv.config({path : `${__dirname}/config.env`});

import app from "./app";

// Environment variable checking
let DB: string = '';
if(process.env.DB && process.env.DB_PASSWORD){
  DB = process.env.DB.replace('<PASSWORD>',process.env.DB_PASSWORD);
} else console.log('DB environment variables are not defined');


// Connect MongoDB
mongoose.set('strictQuery',false);
mongoose.connect(DB)
.then(() => console.log('DB connection successful'))
.catch(err => console.log(err));


// Running on port
const port = process.env.PORT || 8000;
const server = app.listen(port, ()=>{
  console.log(`Server running on port : ${port}`);
});

process.on('unhandledRejection',( err: Error) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() =>{
    process.exit(1);
  });
});