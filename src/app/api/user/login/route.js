import { NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase";

export async function POST(request){
    
    try{
        const requestData = await request.json();
        
        let { data, error } = await supabase.auth.signInWithPassword({
            email: requestData.email,
            password: requestData.password
        });

        if(error){
            return NextResponse.json(error);
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: 'User is logged in successfully!',
            data: data.session
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            data: error,
            message: 'Something went wrong!',
            status: 401
        });
    }
}