import { Avatar, Badge, Box, Button, Card, Flex, Text } from "@radix-ui/themes"
import Link from "next/link"
import { User } from "../../../generated/prisma"

export default function UserCard({ user }: { user: User }) {
    const getRoleBadgeColor = (role: string) => {
        switch (role.toUpperCase()) {
            case 'ADMIN':
                return 'red'
            case 'MODERATOR':
                return 'orange'
            case 'USER':
                return 'blue'
            default:
                return 'gray'
        }
    }

    return (
        
            
                <Flex gap="4" align="center" justify="between" className="!flex-wrap">
                    
                    <Flex gap="3" className="!flex-shrink-0 xl:flex-row lg:flex-row flex-col w-full  ">
                        <Avatar
                            size="3"
                            src={user?.avatar || ""}
                            radius="full"
                            fallback={user.name?.[0]?.toUpperCase() || "U"}
                            className="!ring-2 !ring-gray-200 xl:mx-0 lg:mx-0 mx-auto "
                        />
                        
                        <Box className="!flex !flex-col !gap-1 ">
                            <Text as="div" size="4" weight="bold" className="!">
                                {user.name}
                            </Text>
                            <Text as="div" size="2" className=" !truncate ">
                                {user.email}
                            </Text>
                        </Box>
                    </Flex>

                    <Flex gap="2" align="center" className="!ml-auto">
                        <Badge 
                            color={getRoleBadgeColor(user.role)} 
                            size="2"
                            className="!font-semibold"
                        >
                            {user.role}
                        </Badge>
                        
                        <Link 
                            href={`/userpage/${user.id}`}
                            aria-label={`View details for ${user.name}`}
                        >
                            <Button 
                                variant="surface" 
                                size="2"
                                className="!cursor-pointer hover:!bg-blue-700"
                            >
                                Details
                            </Button>
                        </Link>
                    </Flex>
                    
                </Flex>
           
       
    )
}