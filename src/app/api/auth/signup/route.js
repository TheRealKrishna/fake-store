import bcrypt from "bcryptjs/dist/bcrypt";
import { connectMongoDB } from "../../libs/MongoConnect";
import User from "../../models/UserSchema";
import { NextResponse } from "next/server";
import JWT from "jsonwebtoken"


export async function POST(request){
    try{
        const req = await request.json()
        await connectMongoDB();
        const userCheck = await User.findOne({email: req.email})
        if(userCheck){
            return NextResponse.json({error:"User Already Exists", success:false}, {status: 200})
        }
        const securePassword = bcrypt.hashSync(req.password, await bcrypt.genSaltSync(10));
        const user = new User({
            email: req.email,
            password: securePassword,
        })
        await user.save();
        const token = JWT.sign({_id: req._id}, process.env.JWT_SECRET);
        return NextResponse.json({token:token, success:true}, {status: 200})
    }
    catch(err){
        console.log(err);
        return NextResponse.json({error:"Internal Server Error Occured!",success:false}, {status:500} )
    }
}