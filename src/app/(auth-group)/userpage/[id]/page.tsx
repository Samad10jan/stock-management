"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { User } from "../../../../../generated/prisma"
import gqlClient from "@/lib/services/gql"
import { GET_USER } from "@/lib/gql/queries"
import { Avatar, Badge, Card, Flex, Skeleton } from "@radix-ui/themes"
import EditUserRoleBtn from "@/components/admin-components/edit-user-role-btn"

export default function UserPage() {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const id = params.id

  useEffect(() => {
    async function getUser() {
      try {
        const data: { getUser: User } = await gqlClient.request(GET_USER, {
          getUserId: id,
        })
        if (data.getUser) {
          setUser(data.getUser)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (id) getUser()
  }, [id])

  return (
    <div className="max-w-2xl border border-gray-300 mx-auto rounded-2xl p-6 shadow-sm">
      <Flex gap="4" direction="column" align="center">
        <Skeleton loading={loading}>
          <Avatar
            src={user?.avatar || undefined}
            fallback={user?.name?.[0] || "U"}
            size="9"
            radius="full"
          />
        </Skeleton>

        <Skeleton loading={loading}>
          <Badge size="3" color="indigo">
            {user?.role}
          </Badge>
        </Skeleton>

        <Skeleton loading={loading}>
          <Card className="w-full space-y-4 p-4">
            <Card>
              <span className="text-gray-600">Username: </span>
              {user?.username}
            </Card>
            <Card>
              <span className="text-gray-600">Name: </span>
              {user?.name}
            </Card>
          </Card>
        </Skeleton>
      </Flex>

      <Flex justify="end" gap="5" className="mt-6">
        <EditUserRoleBtn user={user} />
      </Flex>
    </div>
  )
}
