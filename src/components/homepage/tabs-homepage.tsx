"use client"
import { Box, Card, Tabs } from "@radix-ui/themes";
import { useContext } from "react";
import AddProductsButton from "../admin-components/add-products-btn";
import AdminDashBoard from "../admin-components/admin-dashbord";
import { UserContext } from "../contexts/user-context";
import ProductList from "./products list";

export default function TabsHome() {
    const { user } = useContext(UserContext)
    return (
        <div>
            <Tabs.Root defaultValue="products">
                <Tabs.List>
                    <Tabs.Trigger value="products">Products</Tabs.Trigger>
                    {
                        user?.role === "admin" &&
                        <Tabs.Trigger value="admin">Admin DashBoard</Tabs.Trigger>
                    }

                </Tabs.List>

                <Box pt="3">
                    <Tabs.Content value="products" className="flex flex-col">
                        <Card className="w-fit mx-auto p-5 mb-5">

                            <AddProductsButton />
                        </Card>


                        <ProductList />

                    </Tabs.Content>

                    <Tabs.Content value="admin">

                        <AdminDashBoard />

                    </Tabs.Content>

                </Box>
            </Tabs.Root>
        </div>
    )
}