import { connectMongoDB } from "../../libs/MongoConnect";

export async function POST(request){
    try{
        const req = await request.json();
        await connectMongoDB();
        
    }
    catch(err){
        console.log(err);
        return NextResponse.json({error:"Internal Server Error Occured!",success:false}, {status:500} )
    }
}