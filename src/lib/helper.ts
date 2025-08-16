import { verifyToken } from "@/lib/services/jwt";
import prismaClient from "@/lib/services/prisma";
import { cookies } from "next/headers";

export default async function getUserFromCookies() {
    try {

        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value
        // console.log(token);
        
        if (!token) {
            return null
        }
        const data= verifyToken(token)
        // console.log("data",data?.id);
        
        if(!data) return null
        
        const user = await prismaClient.user.findUnique({
            where:{
                id:data.id
            },
            omit:{
                password:true
            }
        })
        // console.log(user);
        
        if(!user) return null;

        return user

    } catch (err) {

        return null
    }
}