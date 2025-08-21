"use server"
import { verifyToken } from "@/lib/services/jwt";
import prismaClient from "@/lib/services/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getUserFromCookies() {
    try {

        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value
        console.log("totken:",token);
        


        if (!token) {
            return null
        }
        const data = verifyToken(token)


        if (!data) return null

        const user = await prismaClient.user.findUnique({
            where: {
                id: data.id
            },
            omit: {
                password: true
            }
        })


        if (!user) return null;

        console.log("user",user);


        return user

    } catch (err) {

        return null
    }
}

export async function logOut(){
    const userCookies=await cookies();
    userCookies.delete('name')
    redirect("/login")
}