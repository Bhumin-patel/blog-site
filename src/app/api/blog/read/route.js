import { NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase";

export async function GET() {
  
    try{
        const data = await supabase
            .from("blog")
            .select('id, title, author_id');

        return NextResponse.json({
            status: data.status,
            data: data.data,
        });
    } catch (error){
        console.log(error);
        return NextResponse.json({
            success: false,
            data: error,
            message: 'Something went wrong!',
            status: 401
        });
    }
}