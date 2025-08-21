"use client"
import UserProvider, { UserWithoutPassword } from "@/components/contexts/user-context";
import Header from "@/components/header/header";
import LoadingScreen from "@/components/reuseable-componets/loading-spinner";
import getUserFromCookies from "@/lib/helper";
import Head from "next/head";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Layout({ children }: {
    children: ReactNode
}) {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<UserWithoutPassword | null>(null)
    const router = useRouter()

    useEffect(() => {
        async function getUser() {


            try {

                const user = await getUserFromCookies();

                console.log("layout:", user);

                // if (!user) router.push("/login")
                setUser(user)
                setLoading(false)

            } catch (error: any) {
                console.log(error.message);

            }
        }
        getUser()


    }, [])



    if (!user) router.push("/login")
    if (loading) return <LoadingScreen />



    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <UserProvider user={user} >
                <Header />

                {children}

            </UserProvider>
        </>
    )
}