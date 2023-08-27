import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../libs/MongoConnect";
import Products from "../../../models/ProductsSchema";

export async function GET(request, params){
    try{
        await connectMongoDB();
        const products = await Products.find({category:params.params.category});
        return NextResponse.json(products, {status:200})
    }
    catch(err){
        console.log(err);
        return NextResponse.json({error:"Internal Server Error Occured!",success:false}, {status:500} )
    }
}