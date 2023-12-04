import { supabase } from "../utils/supabase";
import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export const middleware = async (request) => {
    try{
        console.log("middleware");
        const token = request.headers.get('authorization').replace('Bearer ', '');
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        const user = await supabase.from("user").select('*').eq('id',payload.sub);

        if(!user){
            throw new Error();
        }

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('user', user.data[0].id);

        return NextResponse.next({
            request: {
              headers: requestHeaders,
            },
        })
    } catch (error){
        console.log(error);
        return NextResponse.json({
            status: 401,
            message: 'Please authenticate',
        });
    }
}
  
export const config = {
    matcher: ['/api/blog/create', '/api/blog/update', '/api/blog/delete/:path*', '/api/blog/adminblog']
}