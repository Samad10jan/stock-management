"use client"
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "../contexts/theme-context";
import { UserContext } from "../contexts/user-context";
import DropMenu from "./menu-btn";
import { Moon, Sun } from "lucide-react";


export default function Header() {
    const { user } = useContext(UserContext)
    const { isDark, setIsDark } = useContext(ThemeContext)

    return (
        <header className={`flex justify-between items-center *:mx-5 sticky top-0 left-0 right-0 z-50 ${isDark?'bg-gray-950':`bg-white`} `}>
            <div className="relative h-13 w-13 rounded-full my-5">
                <Image src={"https://cdn-icons-png.flaticon.com/512/12474/12474329.png"} alt="Store Management" fill />
            </div>
            <div className="flex  items-center gap-2 ">
                <Box><Button className="transition-all delay-100" variant="outline" onClick={() => { setIsDark(!isDark) }}> {isDark?<Moon/>:<Sun/>}</Button></Box>
                <Box className="md:max-w-60 max-w-36  ">
                    <Card>
                        <Flex gap="3" align="center">
                            <Avatar
                                size="3"
                                src={user?.avatar || ""}
                                radius="full"
                                fallback={user?.name[0] || "U"}
                            />
                            <Box className="turncate">
                                <Text as="div" size="2" weight="bold">
                                    {user?.name}
                                </Text>
                                <Text as="div" size="2" color="gray">
                                    {user?.role}
                                </Text>


                            </Box>
                            <DropMenu />
                        </Flex>
                    </Card>
                </Box>

            </div>
        </header>
    )
}