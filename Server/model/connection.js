import mongoose from 'mongoose';

const url ="mongodb://localhost:27017/blood&organ";

mongoose.connect(url);

console.log("Database connected successfully");