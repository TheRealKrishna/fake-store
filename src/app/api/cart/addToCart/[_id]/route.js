import { connectMongoDB } from "@/app/api/libs/MongoConnect";
import Products from "@/app/api/models/ProductsSchema";
import User from "@/app/api/models/UserSchema";
import { NextResponse } from "next/server";
import JWT from "jsonwebtoken"
import { headers } from 'next/headers';

export async function POST(request, params){
    try{
        const header = headers();
        const token = header.get('auth-token');
        await connectMongoDB();
        const _id = JWT.verify(token, process.env.JWT_SECRET)._id
        const user = await User.findOne({_id:_id})
        if(!user){
            return NextResponse.json({error:"Invalid User!",success:false}, {status:500})
        }
        const product = await Products.findOne({_id:params.params._id})
        if(!product){
            return NextResponse.json({error:"Invalid Product!",success:false}, {status:500})
        }
        let cart = await user.cart
        if(product._id in cart){
            cart[product._id] += 1;
        }
        else{
            cart[product._id] = 1;
        }
        const newUser = await User.findOneAndUpdate({_id:_id},{cart:cart})
        await newUser.save();
        return NextResponse.json({cart, success:true}, {status:200})
    }
    catch(err){
        console.log(err);
        return NextResponse.json({error:"Internal Server Error Occured!",success:false}, {status:500} )
    }
}