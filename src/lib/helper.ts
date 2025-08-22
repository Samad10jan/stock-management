
import { verifyToken } from "@/lib/services/jwt";
import prismaClient from "@/lib/services/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import gqlClient from "./services/gql";
import { GET_USER } from "./gql/queries";
import { UserWithoutPassword } from "@/components/contexts/user-context";

export default async function getUserFromCookies() {
    try {

        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value
        console.log("token:", token);



        if (!token) {
            return null
        }
        const data = verifyToken(token)
        console.log("totken verify:", data);


        if (!data) return null

        const userData: { getUser: UserWithoutPassword } = await gqlClient.request(GET_USER, {
            getUserId: data.id
        })
        const user = userData.getUser
        // const user = await prismaClient.user.findUnique({
        //     where: {
        //         id: data.id
        //     },
        //     omit: {
        //         password: true
        //     }
        // })

        console.log("user:", user);


        if (!user) return null;

        console.log("user", user);


        return user

    } catch (err: any) {
        console.log("Error:", err.message);

        return null
    }
}

export async function logOut() {
    const userCookies = await cookies();
    userCookies.delete('name')
    redirect("/login")
}