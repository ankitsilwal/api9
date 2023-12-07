import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import mongoose from "mongoose";

@Schema({timestamps:true})

export class Facebook{

    @Prop() 
    name:string;
    
    @Prop() 
    text:string;
    
    @Prop() 
    comment:string;
    
    @Prop() 
    location:string;
    
    @Prop({type:mongoose.Types.ObjectId, ref:"User"}) 
    author:mongoose.Types.ObjectId;
}


export const FacebookSchema= SchemaFactory.createForClass(Facebook)