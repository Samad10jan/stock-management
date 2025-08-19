"use client"
import { UserContext } from "@/components/contexts/user-context"
import EditProfileButton from "@/components/user/profile-edit-btn"
import { UserWithoutPasswordAndRole } from "@/lib/types"
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes"
import { useContext } from "react"

export default function ProfilePage() {
  const { user } = useContext(UserContext)

  if (!user) return null

  return (
    <div className="min-h-screen p-5">
      <Card className="w-full max-w-md mx-auto p-6 rounded-2xl shadow-md">
        <Flex gap="4" align="center" direction="column">
          <Avatar
            size="6"
            src={user?.avatar || undefined}
            radius="full"
            fallback={user.name[0] || "U"}
          />
          <Box className="text-center space-y-1">
            <Text as="div" size="3" weight="bold">
              {user.username}
            </Text>
            <Text as="div" size="2">
              {user.name}
            </Text>
            <Text as="div" size="2" color="gray">
              {user.role}
            </Text>
          </Box>
          <EditProfileButton user={user as UserWithoutPasswordAndRole} />
        </Flex>
      </Card>
    </div>
  )
}
