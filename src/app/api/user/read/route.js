import { NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase";

export async function GET(request,content) {
  
    try{
        const { data,error } = await supabase
            .from('user')
            .select('*')
            .single();
        
        console.log(data);

        if(error){
            return NextResponse.json(error); 
        }
        return NextResponse.json({
            success: true,
            status: data.status,
            message: 'User data is displayed successfully!',
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