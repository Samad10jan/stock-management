
import { Avatar, Badge, Box, Button, Card, Flex, Text } from "@radix-ui/themes"
import Link from "next/link"
import { User } from "../../../generated/prisma"

export default function UserCard({ user }: {
    user: User,

}) {


    return (
        <div>

            <Box minWidth="300px" my={"3"}>

                <Card>
                    <Flex gap="3" justify={"between"}>

                        <Box className="flex flex-col ">
                            <Avatar
                                size="3"
                                src={user?.avatar || ""}
                                radius="full"
                                fallback={user.name[0]}
                            />

                            <div>

                                <Badge>{user.role}</Badge>
                            </div>

                        </Box>

                        <Text as="div" size="5" weight="bold">
                            {user.name}
                        </Text>

                        <Box>

                            <Link href={"userpage/" + user.id}>
                                <Button variant="surface">Details</Button>
                            </Link>
                        </Box>
                    </Flex>
                </Card>

            </Box>

        </div>
    )
}