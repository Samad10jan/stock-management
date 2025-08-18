"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { User } from "../../../../../generated/prisma"
import gqlClient from "@/lib/services/gql"
import { GET_USER } from "@/lib/gql/queries"
import { Avatar, Badge, Button, Card, Flex, Skeleton } from "@radix-ui/themes"
import EditUserRoleBtn from "@/components/admin-components/edit-user-role-btn"

export default function UserPage() {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true)

    const params = useParams()
    const id = params.id


    useEffect(() => {

        async function getuser() {
            const data: { getUser: User } = await gqlClient.request(GET_USER, {
                getUserId: id

            })
            console.log(data.getUser);


            if (data.getUser) {
                setUser(data.getUser)
                setLoading(false)
                
            }
        }
        getuser();
        

    }, [id])

  

     
    return (
        <div className="w-3xl border border-gray-400 mx-auto rounded-2xl p-5">


            <Flex gap={"2"} direction={"column"} align={"center"}>
                <Skeleton loading={loading}>
                    <div>
                        <Avatar src={user?.avatar||undefined} fallback={user?.name[0] || "U"} size={"9"} radius="full" />

                    </div>
                </Skeleton>
                <Skeleton loading={loading}>
                    <div>
                        <Badge size={"3"}>
                            {user?.role}

                        </Badge>
                    </div>
                </Skeleton>


                <Skeleton loading={loading}>
                    <Card >
                        <Flex direction={"column"} gapY={"7"}>

                            <Card>
                                <span className="text-gray-600">Username: </span> {user?.username}
                            </Card>
                            <Card>

                                <span className="text-gray-600">Name: </span>{user?.name}
                            </Card>
                        </Flex>
                    </Card>
                </Skeleton>

            </Flex>
            <Flex justify={"end"} gapX={"5"}>

                <EditUserRoleBtn user={user}/>

                {/* <Button variant="soft" color="ruby">
                    Delete
                </Button> */}
            </Flex>





        </div>
    )
}