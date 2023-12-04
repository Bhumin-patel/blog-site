import { NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase";

export async function POST(request){
    
    try{
        let { error } = await supabase.auth.signOut()

        if(error){
            return NextResponse.json(error);
        }
        
        return NextResponse.json({
            success: true,
            status: 200,
            message: 'User is logged out successfully!'
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