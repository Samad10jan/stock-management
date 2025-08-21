"use client"

import { GET_All_USER } from "@/lib/gql/queries"
import gqlClient from "@/lib/services/gql"
import { Card, Heading, Spinner } from "@radix-ui/themes"
import { useContext, useEffect, useState } from "react"
import { User } from "../../../generated/prisma"
import UserCard from "../cards/user-card"
import { UserContext } from "../contexts/user-context"
import AddUserButton from "./add-user"
import LoadingScreen from "../reuseable-componets/loading-spinner"
import CallOutMessage from "../reuseable-componets/call-out"



export default function AdminDashBoard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useContext(UserContext)

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
        return <CallOutMessage message={`Error fetching users:",${error} `} />
      } finally {
        setLoading(false)
      }
    }
    getAllUsers()
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="flex flex-col gap-6">

      <Card className="w-fit mx-auto p-5 mb-5">
        <AddUserButton />
      </Card>

      <Card className="*:text-center w-fit p-5 mx-auto">
        <Heading className="font-extrabold ">Users</Heading>
        <div className="mt-4 text-4xl font-mono">{users.length}</div>
      </Card>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((u) => (
            <Card key={u.id} className="p-6">
              <UserCard user={u} />
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No users found</p>
        )}
      </div>
    </div>
  )
}
