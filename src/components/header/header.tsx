"use client"
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes"
import { Moon, Search, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { ThemeContext } from "../contexts/theme-context"
import { UserContext } from "../contexts/user-context"
import DropMenu from "./menu-btn"

export default function Header() {
    const { user } = useContext(UserContext)
    const { isDark, setIsDark } = useContext(ThemeContext)

    
    return (
        <header
            className={`flex justify-between items-center px-5 py-3 sticky top-0 left-0 right-0 z-50 rounded backdrop-blur-sm transition-all duration-300 ${
                isDark 
                    ? "bg-gray-950/90 text-white shadow-blue-800/20 shadow-xl border-b border-gray-800" 
                    : "bg-white/90 text-black shadow-lg border-b border-gray-200"
            }`}
        >
          
            <Link href={"/"} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="relative md:h-12 md:w-12 w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500/20">
                    <Image
                        src="https://cdn-icons-png.flaticon.com/512/12474/12474329.png"
                        alt="Store Management"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="hidden sm:block">
                    <Text size="2" weight="bold" className="text-blue-600">
                       Product Stock Manager
                    </Text>
                </div>
            </Link>

           
                
              
                <div className="hidden lg:flex items-center relative">
                    <Search className="absolute left-3 size-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Quick search..."
                        className={`pl-10 pr-4 py-2 rounded-full text-sm w-80 border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isDark 
                                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
                                : "bg-gray-50 border-gray-300 text-black placeholder-gray-500"
                        }`}
                    />
                </div>
          

           
            <div className="flex items-center gap-3">
            
             
                <Button
                    className="md:!size-12 !size-10 !rounded-full transition-all hover:scale-105"
                    variant="outline"
                    onClick={() => setIsDark(!isDark)}
                >
                    {isDark ? 
                        <Moon className="!md:size-5 !size-4" /> : 
                        <Sun className="!md:size-5 !size-4" />
                    }
                </Button>

                <Box className="max-w-[150px] md:max-w-[240px]">
                    <Card className="px-3 py-2 hover:shadow-md transition-shadow cursor-pointer">
                        <Flex gap="3" align="center">
                            <div className="relative">
                                <Avatar
                                    src={user?.avatar || ""}
                                    radius="full"
                                    fallback={user?.name?.[0] || "U"}
                                    className="md:!size-12 !size-8 ring-2 ring-blue-500/20"
                                />
                             

                                <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            
                            <Box className="flex-1 min-w-0">
                                <Text as="div" size="2" weight="bold" className="truncate">
                                    {user?.name?.split(" ")[0]}
                                    <span className="md:inline hidden ml-1">
                                        {user?.name?.split(" ")[1]}
                                    </span>
                                </Text>
                                <Text as="div" size="1" color="gray" className="truncate">
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