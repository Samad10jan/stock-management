"use client"

import CallOut from "@/components/reuseable-componets/call-out";
import { LOGIN_USER } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { Box, Button, Card, Flex, Heading, Table, Text, TextField, } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [userCred, setUserCred] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<{ message?: string }>({});
    const [loading, setLoading] = useState(false);
    // const router = useRouter();

    async function handelLogin() {
        setError({});
        setLoading(true);
        try {
            const user: { loginUser: boolean } = await gqlClient.request(LOGIN_USER, {
                userCred,
                password,
            });

            if (user.loginUser) {
                console.log("Login Success");
                setLoading(true)
                window.location.href = "/";
            } else {
                setError({ message: "Unable to Login. Check Your Credentials" });
            }
        } catch (err) {
            setError({
                message: "Something went wrong, try again later",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl items-center md:items-start">

                <Card
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "1.5rem",
                        width: "100%",

                        minWidth: "70%",
                    }}
                >
                    <Heading align="center" className="mb-4">
                        Product Stock Management
                    </Heading>

                    <div className="relative h-16 w-16 rounded-full my-5">
                        <Image
                            src="https://cdn-icons-png.flaticon.com/512/12474/12474329.png"
                            alt="Store Management"
                            fill
                            loading="lazy"
                        />
                    </div>

                    <TextField.Root
                        className="w-full mb-4"
                        placeholder="Username or email"
                        type="text"
                        value={userCred}
                        onChange={(e) => setUserCred(e.target.value)}
                    />

                    <TextField.Root
                        className="w-full"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        className="w-full"
                        style={{ marginTop: "10px" }}
                        onClick={handelLogin}
                        disabled={loading}
                    >
                        <Text>Login</Text>
                    </Button>

                    {error.message && (
                        <div className="mt-4 w-full">
                            <CallOut message={error.message} />
                        </div>
                    )}
                </Card>


                <Card className="p-6 w-full md:w-1/2 overflow-x-auto">
                    <Flex direction="column" gap="3">
                        <Heading size="4" align="center">
                            Demo Credentials
                        </Heading>
                        <Text size="2" color="gray" align="center">
                            Use these credentials to test different roles:
                        </Text>

                        <Box>
                            <Table.Root size="2">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Password</Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.RowHeaderCell>Admin</Table.RowHeaderCell>
                                        <Table.Cell>abd_samad</Table.Cell>
                                        <Table.Cell>abdulsamad@gmail.com</Table.Cell>
                                        <Table.Cell>12345</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.RowHeaderCell>Manager</Table.RowHeaderCell>
                                        <Table.Cell>abd_sam</Table.Cell>
                                        <Table.Cell>abdulsamad10jan@gmail.com</Table.Cell>
                                        <Table.Cell>121231231</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.RowHeaderCell>Staff</Table.RowHeaderCell>
                                        <Table.Cell>abd_sa</Table.Cell>
                                        <Table.Cell>abd@gmail.com</Table.Cell>
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
    );
}
