
import { Avatar, Badge, Box, Button, Card, Flex, Skeleton, Text } from "@radix-ui/themes"
import { User } from "../../../generated/prisma"
import { Delete, DeleteIcon, EditIcon } from "lucide-react"
import Link from "next/link"

export default function UserCard({ user }: {
    user: User,

}) {


    return (
        <div>
            <Link href={"userpage/"+user.id}>
                <Box minWidth="300px" my={"3"}>

                    <Card>
                        <Flex gap="3" justify={"between"}>

                            <Box> <Avatar
                                size="3"
                                src={user?.avatar || ""}
                                radius="full"
                                fallback={user.name[0]}
                            />

                                <Text as="div" size="2" weight="bold">
                                    {user.name}
                                </Text>

                            </Box>
                            
                            <Badge>{user.role}</Badge>

                            <Box>


                                {/* <Button>Edit Role </Button>
                            <Button>User Role</Button> */}
                            </Box>
                        </Flex>
                    </Card>

                </Box>
            </Link>

        </div>
    )
}