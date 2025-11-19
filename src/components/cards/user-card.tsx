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
        
            <div className="xl:!w-md !w-full md:!w-md">
                <Flex gap="4" align="center" justify="between" className="!flex-wrap sm:!flex-nowrap">
                    
                    <Flex gap="3" align="center" className="!flex-shrink-0">
                        <Avatar
                            size="5"
                            src={user?.avatar || ""}
                            radius="full"
                            fallback={user.name?.[0]?.toUpperCase() || "U"}
                            className="!ring-2 !ring-gray-200"
                        />
                        
                        <Box className="!flex !flex-col !gap-1">
                            <Text as="div" size="4" weight="bold" className="!">
                                {user.name}
                            </Text>
                            <Text as="div" size="2" className=" !truncate !max-w-[180px]">
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
            </div>
       
    )
}