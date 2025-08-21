"use client"
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes"
import Image from "next/image"
import { useContext } from "react"
import { ThemeContext } from "../contexts/theme-context"
import { UserContext } from "../contexts/user-context"
import DropMenu from "./menu-btn"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
    const { user } = useContext(UserContext)
    const { isDark, setIsDark } = useContext(ThemeContext)
    const path =usePathname()

    return (
        <header
            className={`flex justify-between px-5 items-center py-3 sticky top-0 left-0 right-0 z-50 rounded  ${isDark ? "bg-gray-950 text-white transform shadow-blue-800 shadow-xl/30" : "bg-white text-black" } `}
        >
            <Link href={"/"}>
            
                <div className="relative h-12 w-12 rounded-full">
                    <Image
                        src="https://cdn-icons-png.flaticon.com/512/12474/12474329.png"
                        alt="Store Management"
                        fill
                    />
                </div>
            </Link>

            <div className="flex items-center gap-3">
                <Button
                   
                    variant="outline"
                    onClick={() => setIsDark(!isDark)}
                >
                    {isDark ? <Moon /> : <Sun />}
                </Button>

                <Box className="max-w-[140px] md:max-w-[240px]">
                    <Card className="px-3 py-2">
                        <Flex gap="3" align="center">
                            <Avatar
                                size="3"
                                src={user?.avatar || ""}
                                radius="full"
                                fallback={user?.name?.[0] || "U"}
                                className="md:size-3 size-2"
                            />
                            <Box className="">
                                <Text as="div" size="1" weight="bold" className="">
                                    <h1>{user?.name.split(" ")[0]}</h1>
                                    <h1 className="md:inline-block hidden">{user?.name.split(" ")[1]}</h1>
                                </Text>
                                <Text as="div" size="1" color="gray" className="">
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
