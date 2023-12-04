import { NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase";

export async function POST(request) {
  
    try{
        const requestData = await request.json();

        requestData.author_id = await request.headers.get('user');

        const { data,error } = await supabase
            .from("blog")
            .insert([requestData])
            .select();
        
            if(error){
                return NextResponse.json(error);
            }

        return NextResponse.json({
            status: data.status,
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