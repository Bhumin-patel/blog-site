import { NextResponse } from "next/server";
import { supabase } from "../../../../../../utils/supabase";

export async function DELETE(request,content) {
  
    try{   
        
        const authorId = await request.headers.get('user');
        
        const { error } = await supabase
            .from('blog')
            .delete()
            .eq('id', content.params.id)
            .eq('author_id', authorId)   

        if(error){
            return NextResponse.json(error);
        }

        return NextResponse.json({
            status: 200,
            message: 'Blog is deleted successfully!',
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