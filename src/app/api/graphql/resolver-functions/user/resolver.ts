import getUserFromCookies from "@/lib/helper";
import { signToken } from "@/lib/services/jwt";
import prismaClient from "@/lib/services/prisma";
import { cookies } from "next/headers";
import { RoleType } from "../../../../../../generated/prisma";


export async function logginUser(_: any, args: { userCred: string, password: string }) {
    const userCred = args.userCred
    const password = args.password
    try {
        const cookiesStore = await cookies();
        const user = await prismaClient.user.findFirst({
            where: {
                OR: [
                    {
                        username: userCred
                    },
                    {
                        email: userCred
                    }

                ]

            }
        })

        if (!user) return false;
        if (user.password == password) {

            const token = signToken({ id: user.id }); // encrypt user id
            cookiesStore.set("token", token)           // set token to cookies
            if (token.length > 0) return true

        } else {
            return false
        }
    } catch (err) {
        return false

    }
}

export async function createUser(_: any, args: { name: string, email: string, username: string, password: string, role: RoleType }) {

    try {
        const user = await getUserFromCookies()

        if (!user) return null;
        if (user?.role !== "admin") return null


        const createUser = await prismaClient.user.create({
            data: args
        })
        return createUser
    } catch (err: any) {
        console.log(err.message);
        return null

    }

}

export async function updateUserRole(_: any, args: { userId: string, role: RoleType }) {
    try {
        const user = await getUserFromCookies()
        if (!user) return null
        if (user.role != "admin") { return false }
        const updatedRole = await prismaClient.user.update({
            where: {
                id: args.userId
            },
            data: {
                role: args.role
            }
        }
        );
        return true


    } catch (err: any) {
        console.log(err.message);
        return false

    }

}

export async function updateUserProfile(_: any, args: {
    userId: string,
    name: string,
    email: string,
    username: string,
    avatar: string
}) {
    try {
        const user = await getUserFromCookies();
        if (user?.role != "admin" && user?.id != args.userId) return false

        const data = {
            name: args.name,
            email: args.email,
            username: args.username,
            avatar: args.avatar

        }

        const updatedProfile = await prismaClient.user.update({
            where: {
                id: args.userId
            },
            data: data
        })
        return true
    } catch (err: any) {
        console.log(err.message);
        return false


    }


}

export async function getAllUsers() {

    try {
        const users = await prismaClient.user.findMany({
            where: {
                role: {
                    not: "admin"
                }
            }
        })
        return users
    } catch (err) {
        return null
    }
}

export async function getUser(_: any, args: { id: string }) {
    const userId = args.id
    try {

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }, omit: { password: true }

        })
        // console.log(user);


        if (user) return user

        return null
    }
    catch (err: any) {
        console.log(err.message);
        return null

    }


}