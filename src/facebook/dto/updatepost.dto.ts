import mongoose from "mongoose";

export class UpdatePost{
    name:string;
    
    text:string;
    
    comment:string;
    
    location:string;
    
    author:mongoose.Types.ObjectId
}