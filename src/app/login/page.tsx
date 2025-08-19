"use client"

import CallOut from "@/components/reuseable-componets/call-out";
import { LOGIN_USER } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { Box, Button, Card, Flex, Heading, Table, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [userCred, setUserCred] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState<{
        message?: string | undefined
    }>({})

    const [loading, setLoading] = useState(false)
    const router=useRouter()

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
                const url=process.env.NEXT_PUBLIC_HOST_URL

               
                router.push(url as string)
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
            <div className="h-screen flex gap-5 justify-center items-center ">


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

                <Card className="p-6 w-full max-w-sm">
                    <Flex direction="column" gap="3">
                        <Heading size="4" align="center">
                            Demo Credentials
                        </Heading>
                        <Text size="2" color="gray" align="center">
                            Use these credentials to test different roles:
                        </Text>

                        <Box>
                            <Table.Root size="1">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Password</Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.RowHeaderCell>Admin</Table.RowHeaderCell>
                                        <Table.Cell>abd_samad</Table.Cell>
                                        <Table.Cell>12345</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.RowHeaderCell>Manager</Table.RowHeaderCell>
                                        <Table.Cell>abd_sam</Table.Cell>
                                        <Table.Cell>121231231</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.RowHeaderCell>Staff</Table.RowHeaderCell>
                                        <Table.Cell>abd_sa</Table.Cell>
                                        <Table.Cell>312312</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table.Root>
                        </Box>

                        <Text size="1" color="gray" align="center">
                            💡 You can use either email or username to login
                        </Text>
                    </Flex>
                </Card>

            </div>
        </main>
    )
}