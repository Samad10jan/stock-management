"use client"

import { GET_All_USER } from "@/lib/gql/queries"
import gqlClient from "@/lib/services/gql"
import { Card, Heading, Spinner } from "@radix-ui/themes"
import { useContext, useEffect, useState } from "react"
import { User } from "../../../generated/prisma"
import UserCard from "../cards/user-card"
import { UserContext } from "../contexts/user-context"
import AddUserButton from "./add-user"

function LoadingScreen() {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center gap-4">
      <h1 className="text-lg font-medium">Loading...</h1>
      <Spinner size="3" />
    </div>
  )
}

export default function AdminDashBoard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useContext(UserContext)

  // restrict non-admins
  if (user?.role !== "admin") return null

  useEffect(() => {
    async function getAllUsers() {
      try {
        setLoading(true)
        const { getAllUsers } = await gqlClient.request<{ getAllUsers: User[] }>(
          GET_All_USER
        )
        setUsers(getAllUsers || [])
      } catch (error) {
        console.error("Error fetching users:", error)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }
    getAllUsers()
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="min-h-[90vh] p-6 flex justify-between gap-6">
    
      <div className="flex flex-col items-evenly gap-4 grow max-wxl">

        <div className="flex justify-start">
          <AddUserButton />
        </div>

       
        <div className="flex gap-6 align-center ">
          <Card variant="surface" className="flex-1 p-6 text-center">
            <Heading>Users</Heading>
            <div className="mt-4 text-4xl font-bold">{users.length}</div>
          </Card>
        </div>
      </div>

      {/* User List */}
      <Card className="flex-1 p-6">
        <Heading className="text-center mb-4">User List</Heading>
        {users.length > 0 ? (
          <div className="flex flex-col gap-2 max-h-[400px] overflow-auto">
            {users.map((u) => (
              <UserCard key={u.id} user={u} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </Card>
    </div>
  )
}
