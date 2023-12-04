import { NextResponse } from "next/server";
import { supabase } from "../../../../../utils/supabase";

export async function POST(request) {

    try{
        const requestData = await request.json();

        let {data: signUpData, error: signUpError} = await supabase.auth.signUp({
            email: requestData.email,
            password: requestData.password
        });

        if(signUpError){
            return NextResponse.json(signUpError);
        }
        
        delete requestData.password
        requestData.id = signUpData.user.id;

        const { data: insertData, error: insertError } = await supabase
            .from('user')
            .insert([requestData])
            .select();
        
        if(insertError){
            return NextResponse.json(insertError);
        }

        return NextResponse.json({
            success: true,
            status: insertData.status,
            message: 'User is created successfully!',
            data: {data: insertData, token: signUpData.session.access_token}
        });
    } catch (error){
        console.log(error);
        return NextResponse.json({
            success: false,
            status: 401,
            message: 'Something went wrong!',
            data: error,
        });
    }
}