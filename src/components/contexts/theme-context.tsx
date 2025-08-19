"use client"

import { Theme } from "@radix-ui/themes";
import { createContext, ReactNode, useState } from "react"
export const ThemeContext = createContext<{
    isDark: boolean;
    setIsDark: (x: boolean) => void;
}>({
    isDark: true,
    setIsDark: () => {} 
});

export default function ThemeProvider({ children }:{
    children:ReactNode
}) {
    const [isDark, setIsDark] = useState(false)

    return (
        <ThemeContext.Provider value={{
            isDark, setIsDark
        }}><Theme appearance={isDark?"dark":"light"}>

                {children}
            </Theme>
        </ThemeContext.Provider>
    )
}