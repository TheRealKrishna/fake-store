import { NextResponse } from "next/server";
import { connectMongoDB } from "../../libs/MongoConnect";
import Products from "../../models/ProductsSchema";
 
export async function POST(request){
    try{
        const req = await request.json();
        await connectMongoDB();
        const products = [];
        for(let _id in req){
            const product = await Products.findOne({_id:_id});
            if(product){
                products.push(product);
            }
        }
        return NextResponse.json(products, {status:200})
    }
    catch(err){
        console.log(err);
        return NextResponse.json({error:"Internal Server Error Occured!",success:false}, {status:500} )
    }
}