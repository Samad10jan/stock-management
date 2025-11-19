"use client"
import { Box, Card, Flex, Heading, Tabs, Text } from "@radix-ui/themes";
import { useContext } from "react";
import AddProductsButton from "../admin-components/add-products-btn";
import AdminDashBoard from "../admin-components/admin-dashbord";
import { UserContext } from "../contexts/user-context";
import ProductList from "./products list";

export default function TabsHome() {
    const { user } = useContext(UserContext)

    return (
        <div className="!w-full !min-h-screen ">
            <Tabs.Root defaultValue="products" className="!w-full">
                <Box className="!sticky !top-0 !z-10 ">
                    <Tabs.List
                        className="!flex !justify-center !items-center !gap-2 !py-4 !px-4"
                    >
                        <Tabs.Trigger
                            value="products"
                            className="!p-5 !rounded-lg  !transition-all !duration-300  data-[state=active]:!bg-blue-600 data-[state=active]:!text-white !cursor-pointer"
                        >
                            <Text size="3" weight="medium">Products</Text>
                        </Tabs.Trigger>

                        {user?.role === "admin" && (
                            <Tabs.Trigger
                                value="admin"
                                className="!px-6 !py-2 !rounded-lg !transition-all !duration-300 data-[state=active]:!bg-blue-600 data-[state=active]:!text-white !cursor-pointer"
                            >
                                <Text size="3" weight="medium" >Admin Dashboard</Text>
                            </Tabs.Trigger>
                        )}
                    </Tabs.List>
                </Box>

                <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    className="!w-full !px-4 !py-6"
                >
                    <Box className="!w-full !max-w-7xl">
                        <Tabs.Content value="products" className="!w-full">
                            {user?.role === "admin" && (
                                <Card className="!p-6 sm:!p-8">
                                    <Flex justify="between" align="center" gap="4" wrap="wrap">
                                        <div>
                                            <Heading size="8" className="!mb-2">
                                                Add Products
                                            </Heading>
                                            <Text size="3" color="gray">
                                                Add your products track growth. 
                                            </Text>
                                        </div>
                                        <AddProductsButton />
                                    </Flex>
                                </Card>
                            )}

                            <Box className="!w-full">
                                <ProductList />
                            </Box>
                        </Tabs.Content>

                        <Tabs.Content value="admin" className="!w-full">
                            {user?.role === "admin" ? (
                                <AdminDashBoard />
                            ) : (
                                <Flex
                                    direction="column"
                                    align="center"
                                    justify="center"
                                    className="!min-h-[400px] !gap-4"
                                >
                                    <Text size="5" weight="bold" className="!text-red-600">
                                        Access Denied
                                    </Text>
                                    <Text size="3" className="">
                                        You don't have permission to view this page.
                                    </Text>
                                </Flex>
                            )}
                        </Tabs.Content>
                    </Box>
                </Flex>
            </Tabs.Root>
        </div>
    )
}