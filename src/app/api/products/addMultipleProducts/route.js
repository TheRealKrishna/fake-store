import { connectMongoDB } from "../../libs/MongoConnect";
import Products from "../../models/ProductsSchema";
import User from "../../models/UserSchema";
import { NextResponse } from "next/server";
import JWT from "jsonwebtoken"
import { headers } from 'next/headers';

export async function POST(request){
    try{
        const req = await request.json();
        const header = headers();
        const token = header.get('auth-token');
        await connectMongoDB();
        const _id = JWT.verify(token, process.env.JWT_SECRET)._id
        const user = await User.findOne({_id:_id})
        if(user && user.type !== "admin"){
            return NextResponse.json({error:"Access Denied!",success:false}, {status:500})
        }
        const response = [];
        for(let productInfo of req){
            const product = await new Products(productInfo)
            await product.save();
            response.push(String(product._id))
        }
        return NextResponse.json({success:true, _id:response}, {status:200})
    }
    catch(err){
        console.log(err);
        return NextResponse.json({error:"Internal Server Error Occured!",success:false}, {status:500} )
    }
}