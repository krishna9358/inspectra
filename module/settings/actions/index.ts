"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";


export async function getUserProfile(){
    try {
        const session = await auth.api.getSession();
        if  (!session){
            throw new Error("Unauthorized");
        }
        const user = await prisma.user.findUnique({
            where:{
                id: session.user.id
            },
            select:{
                id:true,
                name:true,
                email:true,
                image:true,
                createdAt:true,

            }

        })
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export 