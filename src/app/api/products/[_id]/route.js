import { NextResponse } from "next/server";
import { connectMongoDB } from "../../libs/MongoConnect";
import Products from "../../models/ProductsSchema";

export async function GET(request, params){
    try{
        const req = request.json();
        await connectMongoDB();
        const product = await Products.findOne({_id:params.params._id});
        if(!product){
            return NextResponse.json({error:"No Product Found", success:false}, {status:404});
        }
        return NextResponse.json(product, {status:200})
    }   
    catch(err){
        console.log(err);
        return NextResponse.json({error:"Internal Server Error Occured!",success:false}, {status:500} )
    }
}