import { NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase";

export async function PUT(request) {
  
    try{
        const requestData = await request.json();

        const blogId = requestData.id;
        delete requestData.id;

        const { data,error } = await supabase
            .from('blog')
            .update(requestData)
            .eq('id', blogId)
            .select();

        if(error){
            return NextResponse.json(error);
        }

        return NextResponse.json({
            status: data.status,
            data: data
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