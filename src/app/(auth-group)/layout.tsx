import UserProvider from "@/components/contexts/user-context";
import Header from "@/components/header/header";
import LoadingScreen from "@/components/reuseable-componets/loading-spinner";
import getUserFromCookies from "@/lib/helper";
import { Spinner } from "@radix-ui/themes";
import Head from "next/head";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const dynamic = 'force-dynamic'

export default async function Layout({ children }: {
    children: ReactNode
}) {

    const user = await getUserFromCookies();


    // console.log("layout:",user);

    if (!user) redirect("/login")

    if (!user) {

        return (<div className="min-h-[90vh] flex flex-col justify-center items-center gap-4">
            <h1 className="text-lg font-medium">Loading...</h1>
            <Spinner size="3" />
        </div>)
    }

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