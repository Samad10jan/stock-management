"use client"


import CallOut from "@/components/reuseable-componets/call-out";
import { LOGIN_USER } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { Button, Card, Heading, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
    const [userCred, setUserCred] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState<{
        message?: string | undefined
    }>({})

    const [loading, setLoading] = useState(false)

    async function handelLogin() {
        setError({})
        setLoading(true)
        try {

            const user: {
                loginUser: boolean
            } = await gqlClient.request(LOGIN_USER, {
                userCred,
                password

            })
            if (user.loginUser) {

                window.location.href = "/"
                setLoading(true)

            }
            else {

                setError({ message: "Unable to Login Check Your Credentials" })

            }


        } catch (err) {


            setError({
                message: "SomeThing Went worng try again later"
            })


        } finally {
            setLoading(false)
        }


    }

    return (
        <main>
            <div className="h-screen flex justify-center items-center ">


                <Card style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"


                }}>
                    <Heading align={"center"} style={{
                        margin: "20px 0",

                    }}>Product Stock Management</Heading>

                    <div className="relative h-16 w-16 rounded-full my-5">
                        <Image src={"https://cdn-icons-png.flaticon.com/512/12474/12474329.png"} alt="Store Management" fill />
                    </div>
                    <TextField.Root style={{
                        height: 36
                    }} className="w-96 mb-5" placeholder="username or email " type="text" value={userCred} onChange={(e) => { setUserCred(e.target.value) }} />
                    <TextField.Root style={{
                        height: 36
                    }} className="w-96" placeholder="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />



                    <Button style={{
                        width: "100%",
                        margin: "20px 0"
                    }} onClick={handelLogin} disabled={loading}>
                        <Text>
                            Login
                        </Text>
                    </Button>
                    {(Object.keys(error).length) > 0 &&

                        <div>
                            <CallOut message={error.message as string} />
                        </div>
                    }


                </Card>

            </div>
        </main>
    )
}