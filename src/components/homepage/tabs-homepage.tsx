"use client"
import { Box, Card, Flex, Tabs } from "@radix-ui/themes";
import { useContext } from "react";
import AddProductsButton from "../admin-components/add-products-btn";
import AdminDashBoard from "../admin-components/admin-dashbord";
import { UserContext } from "../contexts/user-context";
import ProductList from "./products list";

export default function TabsHome() {
    const { user } = useContext(UserContext)

    // if(!user) return <LoadingScreen/>
    return (

        <Tabs.Root defaultValue="products">
            <Tabs.List style={{ alignContent: "center" }} >
                <Tabs.Trigger value="products">Products</Tabs.Trigger>
                {
                    user?.role === "admin" &&
                    <Tabs.Trigger value="admin">Admin DashBoard</Tabs.Trigger>
                }

            </Tabs.List>
            <Flex direction={"column"} justify={"center"} align={"center"}>

                <Box pt="3">
                    <Tabs.Content value="products" className=" ">
                        <Card className="w-fit mx-auto p-5 mb-5">

                            <AddProductsButton />
                        </Card>

                        <div>

                            <ProductList />
                        </div>

                    </Tabs.Content>

                    <Tabs.Content value="admin">

                        <AdminDashBoard />

                    </Tabs.Content>

                </Box>
            </Flex>
        </Tabs.Root>

    )
}