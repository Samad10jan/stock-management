"use client"

import CallOut from "@/components/reuseable-componets/call-out";
import { LOGIN_USER } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { Box, Button, Card, Dialog, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";

export const dynamic = 'force-dynamic';

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
        <main className="min-h-screen flex items-center justify-center px-5 py-5">
            <div className="flex flex-col md:flex-row gap-5 w-full max-w-5xl items-center md:items-start">

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


                <Card className="p-6 w-full md:w-1/2 overflow-x-auto ">
                    <Flex direction="column" gap="3" align={"center"}>
                        <Heading size="4" align="center">
                            Demo Credentials
                        </Heading>
                        <Text size="2" color="gray" align="center">
                            Use these credentials to test different roles:
                        </Text>

                        <Box className="*:!mx-1 !flex !justify-center *:!text-xs *:md:!text-[15px]">
                           
                            <Dialog.Root>
                                <Dialog.Trigger >
                                    <Button variant="soft" color="blue">Admin</Button>
                                </Dialog.Trigger>
                                <Dialog.Content className="p-6 rounded-lg shadow-lg bg-white w-[300px]">
                                    <Dialog.Title className="text-lg font-bold mb-2">Admin Credentials</Dialog.Title>
                                    <Text as="p">Username: <b>abd_samadd</b></Text>
                                    <Text as="p">Email: <b>ab1245@gmail.com</b></Text>
                                    <Text as="p">Password: <b>12345</b></Text>
                                    <Dialog.Close >
                                        <Button className="mt-4" variant="soft">Close</Button>
                                    </Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Root>

                            
                            <Dialog.Root>
                                <Dialog.Trigger >
                                    <Button variant="soft" color="green">Manager</Button>
                                </Dialog.Trigger>
                                <Dialog.Content className="p-6 rounded-lg shadow-lg bg-white w-[300px]">
                                    <Dialog.Title className="text-lg font-bold mb-2">Manager Credentials</Dialog.Title>
                                    <Text as="p">Username: <b>abd_sam</b></Text>
                                    <Text as="p">Email: <b>abdulsamad10jan@gmail.com</b></Text>
                                    <Text as="p">Password: <b>121231231</b></Text>
                                    <Dialog.Close >
                                        <Button className="mt-4" variant="soft">Close</Button>
                                    </Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Root>

                            
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <Button variant="soft" color="orange">Staff</Button>
                                </Dialog.Trigger>
                                <Dialog.Content className="p-6 rounded-lg shadow-lg bg-white w-[300px]">
                                    <Dialog.Title className="text-lg font-bold mb-2">Staff Credentials</Dialog.Title>
                                    <Text as="p">Username: <b>raza_123</b></Text>
                                    <Text as="p">Email: <b>raza@gmail.com</b></Text>
                                    <Text as="p">Password: <b>678665</b></Text>
                                    <Dialog.Close>
                                        <Button className="mt-4" variant="soft">Close</Button>
                                    </Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Root>
                        
                    </Box>
                    <Text size="1" color="gray" align="center">
                        💡 You can use either email or username to login
                    </Text>
                </Flex>
            </Card>
        </div>
        </main >
    );
}
