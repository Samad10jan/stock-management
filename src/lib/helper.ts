import { verifyToken } from "@/lib/services/jwt";
import prismaClient from "@/lib/services/prisma";
import { cookies } from "next/headers";

export default async function getUserFromCookies() {
    try {

        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value


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

        console.log(user);


        return user

    } catch (err) {

        return null
    }
}