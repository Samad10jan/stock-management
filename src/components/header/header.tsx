"use client"
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes"
import { Moon, Search, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../contexts/theme-context"
import { UserContext } from "../contexts/user-context"
import DropMenu from "./menu-btn"
import prismaClient from "@/lib/services/prisma"
import { Product } from "../../../generated/prisma"
import gqlClient from "@/lib/services/gql"
import { GET_SUGGESTIONS } from "@/lib/gql/queries"

export default function Header() {
    const { user } = useContext(UserContext)
    const { isDark, setIsDark } = useContext(ThemeContext)
    const [input, setInput] = useState("")
    const [suggestions, setSuggestions] = useState<{ title: string, id: string }[] | null>([])

    useEffect(() => {
        // setSuggestions([])
        async function getSuggestions() {
            try {

                const data: { getAllPorductsSugestions: { title: string, id: string }[] } = await gqlClient.request(
                    GET_SUGGESTIONS,
                    { query: input }
                )

                if (data.getAllPorductsSugestions) {
                    setSuggestions(data.getAllPorductsSugestions)
                }


            } catch (err: any) {
                console.log(err.message);
                setSuggestions([])

            }

        }

        let x: any;
        //getSuggestions only if when any input but delay 400ms
        if (input) {
            x = setTimeout(() => {
                getSuggestions();
            }, 400);
        } else {
            setSuggestions([]);
        }

        return () => {
            if (x) clearTimeout(x);
        };
    }, [input]);
    // console.log("sugges", suggestions);



    return (
        <header
            className={`flex justify-between items-center px-5 py-3 sticky top-0 left-0 right-0 z-50 rounded  transition-all duration-300   ${isDark
                ? "bg-gray-950/90 text-white border-b shadow-xl border-gray-800 shadow-blue-800/25"
                : "bg-white/90 text-black shadow-lg border-b border-gray-200"
                }`}
        >

            <Link href={"/"} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="relative md:h-12 md:w-12 w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500/20">
                    <Image
                        src="https://cdn-icons-png.flaticon.com/512/12474/12474329.png"
                        alt="Store Management"
                        fill
                        sizes="(max-width: 768px) 40px, 48px"
                        className="object-cover"
                    />
                </div>
                <div className="hidden sm:block">
                    <Text size="2" weight="bold" className="text-blue-600">
                        Product Stock Manager
                    </Text>
                </div>
            </Link>




            <div className="flex items-center relative w-full max-w-lg">
                <Search className="absolute left-3 size-4 text-gray-400" />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Quick search..."
                    className={`pl-10 pr-4 py-2 rounded-full text-sm w-full border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-black placeholder-gray-500"
                        }`}
                />

                {/* Suggestions dropdown */}
                {suggestions && suggestions.length > 0 && (
                    <ul
                        className={`absolute top-full mt-2 w-full rounded-lg border shadow-md max-h-64 overflow-y-auto z-50 ${isDark
                                ? "bg-gray-900 border-gray-700 text-white"
                                : "bg-white border-gray-200 text-black"
                            }`}
                    >
                        {suggestions.map((s) => (
                            <li
                                key={s.id}
                                className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition"
                            >
                                <Link href={`/products/${s.id}`} className="block w-full" onClick={()=>{setInput("")}}>
                                    {s.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>




            <div className="flex items-center gap-3">


                <Button
                    className="md:!size-12 !size-10 !rounded-full transition-all hover:scale-105"
                    variant="outline"
                    title="ThemeButton"
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
                                    sizes="(max-width: 768px) 32px, 48px"
                                    className="md:!size-12 !size-8 ring-2 ring-blue-500/20"
                                    alt="UserProfile"
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