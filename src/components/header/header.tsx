"use client"

import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes"
import { Moon, Search, Sun, Menu, X } from "lucide-react"

import { ThemeContext } from "../contexts/theme-context"
import { UserContext } from "../contexts/user-context"
import DropMenu from "./menu-btn"
import gqlClient from "@/lib/services/gql"
import { GET_SUGGESTIONS } from "@/lib/gql/queries"

interface Suggestion {
  title: string
  id: string
}

export default function Header() {
  const { user } = useContext(UserContext)
  const { isDark, setIsDark } = useContext(ThemeContext)
  
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    async function getSuggestions() {
      try {
        const data: { getAllPorductsSugestions: Suggestion[] } = 
          await gqlClient.request(GET_SUGGESTIONS, { query: input })

        if (data.getAllPorductsSugestions) {
          setSuggestions(data.getAllPorductsSugestions)
        }
      } catch (err: any) {
        console.error("Error fetching suggestions:", err.message)
        setSuggestions([])
      }
    }

    let timeoutId: NodeJS.Timeout | undefined

    if (input.trim()) {
      timeoutId = setTimeout(() => {
        getSuggestions()
      }, 400)
    } else {
      setSuggestions([])
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [input])

  const handleSuggestionClick = () => {
    setInput("")
    setSuggestions([])
    setIsSearchOpen(false)
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark
          ? "bg-gray-950/95 text-white border-b border-gray-800 shadow-xl shadow-blue-800/25 backdrop-blur-md"
          : "bg-white/95 text-black border-b border-gray-200 shadow-lg backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 gap-4">
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity shrink-0"
          >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden ring-2 ring-blue-500/20">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/12474/12474329.png"
                alt="Store Management"
                fill
                sizes="(max-width: 640px) 40px, 48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden lg:block">
              <Text size="2" weight="bold" className="text-blue-600">
                Product Stock Manager
              </Text>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center relative flex-1 max-w-lg mx-4">
            <Search className="absolute left-3 size-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search products..."
              className={`pl-10 pr-4 py-2 rounded-full text-sm w-full border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-black placeholder-gray-500"
              }`}
            />

            {/* Desktop Suggestions */}
            {suggestions.length > 0 && (
              <ul
                className={`!absolute !top-full !mt-2 !w-full !rounded-lg !border !shadow-lg !max-h-80 !overflow-y-auto !z-50 ${
                  isDark
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/products/${s.id}`}
                      onClick={handleSuggestionClick}
                      className={`!block !px-4 !py-3 !transition-colors ${
                        isDark
                          ? "hover:bg-gray-800 text-white"
                          : "hover:bg-gray-50 text-black"
                      }`}
                    >
                      <Text size="2">{s.title}</Text>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Mobile Search Button */}
          <Button
            className="md:!hidden xl:!hidden lg:!hidden !flex  !size-10 !rounded-full"
            variant="outline"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="!size-4" />
          </Button>

          {/* Right Section - Actions */}
          <div className="!flex !items-center !gap-2 sm:!gap-3 !shrink-0">
            {/* Theme Toggle */}
            <Button
              className="!size-10 sm:!size-12 !rounded-full transition-all hover:scale-105"
              variant="outline"
              title="Toggle Theme"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? (
                <Moon className="!size-4 sm:!size-5" />
              ) : (
                <Sun className="!size-4 sm:!size-5" />
              )}
            </Button>

            {/* User Profile - Desktop */}
            <Box className=" !max-w-[180px] lg:!max-w-[240px]">
              <Card className="!px-3 !py-2 hover:!shadow-md !transition-shadow !cursor-pointer">
                <Flex gap="3" align="center">
                  <div className="relative shrink-0">
                    <Avatar
                      src={user?.avatar || ""}
                      radius="full"
                      fallback={user?.name?.[0] || "U"}
                      className="!size-10 lg:!size-12 ring-2 ring-blue-500/20"
                      alt="User Profile"
                    />
                    <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>

                  <Box className="flex-1 min-w-0">
                    <Text as="div" size="2" weight="bold" className="truncate">
                      {user?.name?.split(" ")[0]}
                      <span className="lg:!inline !hidden ml-1">
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
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:!hidden !pb-3 !animate-in !slide-in-from-top">
            <div className="relative ">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search products..."
                autoFocus
                className={`!pl-8 !pr-4 !py-2.5 !rounded-full !text-sm !w-full !border !transition-all focus:!outline-none focus:!ring-2 focus:!ring-blue-500 ${
                  isDark
                    ? "!bg-gray-800 !border-gray-700 !text-white !placeholder-gray-400"
                    : "!bg-gray-50 !border-gray-300 !text-black !placeholder-gray-500"
                }`}
              />

              {/* Mobile Suggestions */}
              {suggestions.length > 0 && (
                <ul
                  className={`!mt-2 !rounded-lg border !shadow-lg !max-h-60 !overflow-y-auto ${
                    isDark
                      ? "!bg-gray-900 !border-gray-700"
                      : "!bg-white !border-gray-200"
                  }`}
                >
                  {suggestions.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/products/${s.id}`}
                        onClick={handleSuggestionClick}
                        className={`!block !px-4 !py-3 !transition-colors ${
                          isDark
                            ? "hover:!bg-gray-800 !text-white"
                            : "hover:!bg-gray-50 !text-black"
                        }`}
                      >
                        <Text size="2">{s.title}</Text>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

      
        
      </div>
    </header>
  )
}