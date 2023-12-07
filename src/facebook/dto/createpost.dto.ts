import mongoose from "mongoose";

export class CreatePost{
    name:string;
    
    text:string;
    
    comment:string;
    
    location:string;
    
    author:mongoose.Types.ObjectId
}