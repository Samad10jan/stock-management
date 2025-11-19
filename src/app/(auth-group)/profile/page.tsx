"use client"

import { Avatar, Badge, Card, Flex, Separator, Text } from "@radix-ui/themes"
import { CheckCircle2, Mail, Shield, User as UserIcon } from "lucide-react"
import { useContext } from "react"

import { UserContext } from "@/components/contexts/user-context"
import EditProfileButton from "@/components/user/profile-edit-btn"
import { UserWithoutPasswordAndRole } from "@/lib/types"

interface ProfileStatProps {
  icon: React.ReactNode
  label: string
  value: string | undefined
}

function ProfileStat({ icon, label, value }: ProfileStatProps) {
  return (
    <Flex 
      gap="3" 
      align="center" 
      className="!p-4 !rounded-lg ! hover:!bg-gray-100  !transition-colors"
    >
      <div className="!  shrink-0">
        {icon}
      </div>
      <Flex direction="column" gap="1" className="!flex-1 !min-w-0">
        <Text size="1" color="gray" weight="medium" className="!uppercase !tracking-wide">
          {label}
        </Text>
        <Text size="3" weight="bold" className="!truncate">
          {value || "Not provided"}
        </Text>
      </Flex>
    </Flex>
  )
}

export default function ProfilePage() {
  const { user } = useContext(UserContext)

  if (!user) {
    return (
      <div className="!min-h-screen !flex !items-center !justify-center !p-5">
        <Card className="!p-8 !text-center">
          <Text size="5" weight="bold" color="gray">
            No user data available
          </Text>
        </Card>
      </div>
    )
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "red"
      case "manager":
        return "blue"
      case "user":
        return "green"
      default:
        return "gray"
    }
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="!min-h-screen !p-4 sm:!p-6 lg:!p-8">
      <div className="!max-w-4xl !mx-auto !space-y-6">
        {/* Header Card */}
        <Card className="!p-6 sm:!p-8">
          <Flex direction="column" align="center" gap="5">
            {/* Avatar with Status */}
            <div className="!relative">
              <Avatar
                size="9"
                src={user?.avatar || undefined}
                radius="full"
                fallback={user.name?.[0] || "U"}
                className="!ring-4 !ring-blue-500/20"
              />
              <div className="!absolute !bottom-2 !right-2 !w-8 !h-8 !bg-green-500 !rounded-full   !flex !items-center !justify-center">
                <CheckCircle2 className="!w-8 !h-8 " />
              </div>
            </div>

            {/* User Info */}
            <Flex direction="column" align="center" gap="3" className="!text-center">
              <div>
                <Text size="7" weight="bold" className="!block !mb-2">
                  {user.name}
                </Text>
                <Text size="3" color="gray" className="!block !mb-3">
                  @{user.username}
                </Text>
              </div>

              <Badge 
                size="3" 
                color={getRoleBadgeColor(user.role)}
                variant="soft"
                radius="full"
                className="!px-4 !py-2"
              >
                <Shield className="!w-4 !h-4 !mr-2" />
                {user.role}
              </Badge>
            </Flex>
          </Flex>
        </Card>

        {/* Details Card */}
        <Card className="!p-6 sm:!p-8">
          <Flex direction="column" gap="5">
            
              <Text size="5" weight="bold" className="!mb-2">
                Account Information
              </Text>
              
            

            <Separator size="4" />

            <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
              <ProfileStat
                icon={<UserIcon className="!w-5 !h-5" />}
                label="Username"
                value={user.username}
              />

              <ProfileStat
                icon={<UserIcon className="!w-5 !h-5" />}
                label="Full Name"
                value={user.name}
              />

              <ProfileStat
                icon={<Mail className="!w-5 !h-5" />}
                label="Email"
                value={user.email || "Not provided"}
              />

             
            </div>
          </Flex>
        </Card>

        {/* Actions Card */}
        <Card className="!p-6">
          <Flex 
            justify="between" 
            align="center" 
            gap="4" 
            wrap="wrap"
            className="!flex-col sm:!flex-row"
          >
            <div className="!text-center sm:!text-left">
              <Text size="3" weight="bold" className="!block !mb-1">
                Profile Settings
              </Text>
              <Text size="2" color="gray">
                Update your personal information
              </Text>
            </div>
            <EditProfileButton user={user as UserWithoutPasswordAndRole} />
          </Flex>
        </Card>

       
       
      </div>
    </div>
  )
}