import UserProvider from "@/components/contexts/user-context";
import Header from "@/components/header/header";
import getUserFromCookies from "@/lib/helper";
import Head from "next/head";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: {
    children: ReactNode
}) {

    const user = await getUserFromCookies();

    console.log("layout:",user);

    if (!user) redirect("/login")

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