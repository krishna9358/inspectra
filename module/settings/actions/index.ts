"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";


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


export async function updateUserProfile(data:{name? : string, email? : string}){
    try {
        const session = await auth.api.getSession();
        if  (!session){
            throw new Error("Unauthorized");
        }
        const updateUser = await prisma.user.update({
            where:{
                id: session.user.id
            },
            data:{
                name: data.name,
                email: data.email,
            },
            select:{
                id:true,
                name:true,
                email:true,

            }
        });
        revalidatePath("/dashboard/settins", "page")
        return {
            success: true,
            user: updateUser
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error
        };
    }
}