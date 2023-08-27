import bcrypt from "bcryptjs/dist/bcrypt";
import { connectMongoDB } from "../../libs/MongoConnect";
import User from "../../models/UserSchema";
import { NextResponse } from "next/server";
import JWT from "jsonwebtoken"


export async function POST(request){
    try{
        const req = await request.json()
        await connectMongoDB();
        const user = await User.findOne({email: req.email})
        if(!user){
            return NextResponse.json({error:"Invalid Credentials!", success:false}, {status: 200})
        }
        const passwordCheck = await bcrypt.compareSync(req.password, user.password)
        if(!passwordCheck){
            return NextResponse.json({error:"Invalid Credentials!", success:false}, {status: 200})
        }
        const token = JWT.sign({_id: user._id}, process.env.JWT_SECRET);
        return NextResponse.json({token:token, success:true}, {status: 200})
    }
    catch(err){
        console.log(err);
        return NextResponse.json({error:"Internal Server Error Occured!",success:false}, {status:500} )
    }
}