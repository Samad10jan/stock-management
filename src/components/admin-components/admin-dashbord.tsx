"use client"

import { useContext, useEffect, useState } from "react"
import { Card, Heading, Text, Badge, Flex, Separator } from "@radix-ui/themes"
import { Users, UserPlus, Shield, TrendingUp, Book } from "lucide-react"

import { User } from "../../../generated/prisma"
import { UserContext } from "../contexts/user-context"
import { GET_All_USER } from "@/lib/gql/queries"
import gqlClient from "@/lib/services/gql"
import UserCard from "../cards/user-card"
import AddUserButton from "./add-user"
import LoadingScreen from "../reuseable-componets/loading-spinner"
import CallOutMessage from "../reuseable-componets/call-out"

interface StatsCardProps {
  icon: React.ReactNode
  title: string
  value: number | string
  subtitle?: string
  color?: "blue" | "green" | "purple" | "red"
}

function StatsCard({ icon, title, value, subtitle, color = "blue" }: StatsCardProps) {
  const colorClasses = {
    blue: "!bg-blue-50 !text-blue-600",
    green: "!bg-green-50 !text-green-600",
    purple: "!bg-purple-50 !text-purple-600 ",
    red: "!bg-red-50  !text-red-600 ",
  }

  return (
    <Card className="!p-6 hover:!shadow-lg !transition-shadow">
      <Flex direction="column" gap="3">
        <Flex justify="between" align="center">
          <div className={`!p-3 !rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
          <Badge color={color} variant="soft" size="2">
            {title}
          </Badge>
        </Flex>
        
        <div>
          <Text size="8" weight="bold" className="!block !mb-1">
            {value}
          </Text>
          {subtitle && (
            <Text size="2" color="gray">
              {subtitle}
            </Text>
          )}
        </div>
      </Flex>
    </Card>
  )
}

export default function AdminDashBoard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user?.role !== "admin") return

    async function getAllUsers() {
      try {
        setLoading(true)
        setError(null)
        
        const { getAllUsers } = await gqlClient.request<{ getAllUsers: User[] }>(
          GET_All_USER
        )
        
        setUsers(getAllUsers || [])
      } catch (err) {
        console.error("Error fetching users:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch users")
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    getAllUsers()
  }, [user?.role])

  // Check authorization
  if (user?.role !== "admin") {
    return (
      <div className="!min-h-screen !flex !items-center !justify-center !p-5">
        <Card className="!p-8 !text-center !max-w-md">
          <Shield className="!w-16 !h-16 !mx-auto !mb-4 !text-red-500" />
          <Text size="5" weight="bold" className="!mb-2">
            Access Denied
          </Text>
          <Text size="3" color="gray">
            You don't have permission to access this page
          </Text>
        </Card>
      </div>
    )
  }

  if (loading) return <LoadingScreen />

  if (error) {
    return (
      <div className="!p-4 sm:!p-6">
        <CallOutMessage message={`Error fetching users: ${error}`} />
      </div>
    )
  }

  // Calculate stats
  const totalUsers = users.length
  const staffCount = users.filter(u => u.role === "staff").length
  const managerCount = users.filter(u => u.role === "manager").length
  

  return (
    <div className="!p-4 sm:!p-6 lg:!p-8 !space-y-6">
      {/* Header Section */}
      <Card className="!p-6 sm:!p-8">
        <Flex justify="between" align="center" gap="4" wrap="wrap">
          <div>
            <Heading size="8" className="!mb-2">
              Admin Dashboard
            </Heading>
            <Text size="3" color="gray">
              Manage users and monitor system activity
            </Text>
          </div>
          <AddUserButton />
        </Flex>
      </Card>

      {/* Stats Grid */}
      <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 !gap-4 lg:!gap-6">
        <StatsCard
          icon={<Users className="!w-6 !h-6" />}
          title="Total Users"
          value={totalUsers}
          subtitle="All registered users"
          color="blue"
        />

        <StatsCard
          icon={<Book className="!w-6 !h-6" />}
          title="Staff"
          value={staffCount}
          subtitle="Staff accounts"
          color="red"
        />

        <StatsCard
          icon={<TrendingUp className="!w-6 !h-6" />}
          title="Managers"
          value={managerCount}
          subtitle="Manager accounts"
          color="purple"
          
        />

        
      </div>

      {/* Users List Section */}
      <Card className="!p-6 sm:!p-8">
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center" wrap="wrap" gap="3">
            <div>
              <Heading size="6" className="!mb-1">
                All Users
              </Heading>
              <Text size="2" color="gray">
                {totalUsers} {totalUsers === 1 ? "user" : "users"} registered
              </Text>
            </div>
            
            <Badge size="3" color="blue" variant="soft">
              <Users className="!w-4 !h-4 !mr-1" />
              {totalUsers} Total
            </Badge>
          </Flex>

          <Separator size="4" />

          {/* Users Grid */}
          <div className="!flex !flex-wrap gap-2 !mt-4">
            {users.length > 0 ? (
              users.map((u) => (
                <Card key={u.id} className="!p-5 hover:!shadow-lg !transition-shadow">
                  <UserCard user={u} />
                </Card>
              ))
            ) : (
              <div className="!col-span-full !text-center !py-12">
                <Users className="!w-16 !h-16 !mx-auto !mb-4 " />
                <Text size="4" weight="bold" color="gray" className="!mb-2">
                  No Users Found
                </Text>
                <Text size="2" color="gray">
                  Start by adding your first user
                </Text>
              </div>
            )}
          </div>
        </Flex>
      </Card>

      {/* Additional Info Card */}
      <Card className="!p-6  dark:!bg-blue-900/20 !border-blue-200 dark:!border-blue-800">
        <Flex gap="3" align="start">
          <Shield className="!w-5 !h-5 !text-blue-600 dark:!text-blue-400 !mt-1 shrink-0" />
          <div>
            <Text size="3" weight="bold" className="!block !mb-1 !text-blue-900 ">
              Admin Privileges
            </Text>
            <Text size="2" className="!text-blue-700 dark:!text-blue-300">
              You have full access to manage users, assign roles, and monitor system activity. 
              Use these privileges responsibly.
            </Text>
          </div>
        </Flex>
      </Card>
    </div>
  )
}