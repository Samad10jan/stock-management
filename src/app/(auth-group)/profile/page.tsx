"use client"
import { UserContext } from "@/components/contexts/user-context"
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes"

import { useContext, useState } from "react"

export default function ProfilePage() {
    const { user } = useContext(UserContext)
    const [name,setName]= useState(user?.name||"")
    const [username,setUserName]= useState(user?.username||"")
    const [avatar,setAvatar]= useState(user?.avatar||"")
    if (!user) return
    return (
        <div>

            <Box className="min-h-screen  m-5 rounded">
                <Card>
                    <Flex gap="3" align="center" direction={"column"}>
                        <Avatar
                            size="5"
                            src={user?.avatar}
                            radius="full"
                            fallback={user.name[0]||"U"}
                            
                        />
                        {/*to do Dialog for Avatar */}
                        <Box>
                            <Text as="div" size="2" weight="bold">
                                Username: {user.username}
                            </Text>
                            {/* to do: Dialog for UserName */}

                            <Text as="div" size="2" weight="bold">
                                Name: {user.name}
                            </Text>
                            {/* to do: Dialog for Name */}
                            {/* or use one dialog for all */}

                            {/* we have to use updateprofile resolver route for current user  */}

                            {/* after this admin can chnage roles of other users */}

                            <Text as="div" size="2" color="gray">
                                Role: {user.role}
                            </Text>
                        </Box>
                    </Flex>
                    <Button>Save Changes</Button>
                </Card>
            </Box>



        </div>
    )
}