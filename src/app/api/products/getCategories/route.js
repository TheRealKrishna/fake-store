import { NextResponse } from "next/server";
import { connectMongoDB } from "../../libs/MongoConnect";
import Products from "../../models/ProductsSchema";

export async function GET(request){
    try{
        await connectMongoDB();
        const products = await Products.find();
        const categories = []
        for(let product of products){
            if(!categories.includes(product.category)){
                categories.push(product.category)
            }
        }
        return NextResponse.json({categories:categories}, {status:200})
    }
    catch(err){
        console.log(err);
        return NextResponse.json({error:"Internal Server Error Occured!",success:false}, {status:500} )
    }
}