
import { Avatar, Badge, Box, Card, Flex, Skeleton, Text } from "@radix-ui/themes"
import { User } from "../../generated/prisma"

export default function UserCard({ user }: {
    user: User,
   
}) {
   
    
    return (
        <div>
            <Box  minWidth="300px" my={"3"}>
               
                <Card>
                    <Flex gap="3" align="center">
                        <Avatar
                            size="3"
                            src={user?.avatar||""}
                            radius="full"
                            fallback={user.name[0]}
                        />
                        <Box>
                            <Text as="div" size="2" weight="bold">
                                {user.name}
                            </Text>
                            
                        </Box>
                        <Badge>{user.role}</Badge>
                    </Flex>
                </Card>
             
            </Box>

        </div>
    )
}