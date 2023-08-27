import mongoose from "mongoose";

export const connectMongoDB = async()=>{
    return await mongoose.connect(process.env.MONGO_URI);
}