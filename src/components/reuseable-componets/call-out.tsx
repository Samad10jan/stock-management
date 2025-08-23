"use client"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Callout } from "@radix-ui/themes"
import { useState, useEffect } from "react"

export default function CallOutMessage({ message }: { message: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!message || message.trim().length === 0) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)
    
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 9000)

    return () => clearTimeout(timer)
  }, [message])

 
  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      <Callout.Root variant="soft" mt="5">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>{message || ''}</Callout.Text>
      </Callout.Root>
    </div>
  )
}