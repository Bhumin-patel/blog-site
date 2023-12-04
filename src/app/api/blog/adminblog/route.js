import { NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase";

export async function GET(request,content) {
  
    try{
        
        const authorId = await request.headers.get('user');

        const { data,error } = await supabase
            .from("blog")
            .select('id, title')
            .eq('author_id',authorId);
        
        console.log(data);

        if(error){
            return NextResponse.json(error);
        }

        return NextResponse.json({
            status: 200,
            data: data,
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