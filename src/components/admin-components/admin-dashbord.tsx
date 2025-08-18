"use client";

import { useContext, useEffect, useState } from "react";
import { GET_All_USER } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { Card, Heading, Skeleton, Spinner } from "@radix-ui/themes";
import { User } from "../../../generated/prisma";
import UserCard from "../cards/user-card";
import AddUserButton from "./add-user";
import AddProductsButton from "./add-products-btn";
import ProductList from "../homepage/products list";
import { UserContext } from "../contexts/user-context";

export default function AdminDashBoard() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(UserContext)
    
    if(user?.role!="admin") return null

    useEffect(() => {
        async function getAllUsers() {
            try {
                setLoading(true);
                const { getAllUsers } = await gqlClient.request<{ getAllUsers: User[] }>(
                    GET_All_USER
                );
                setUsers(getAllUsers || []);
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        }
        getAllUsers();
    }, []);

    return (
        <div className="flex flex-wrap gap-8 justify-between p-6">

            <div className="flex-1 min-w-[390px]">
                <div className="mb-4">
                    <AddProductsButton />
                </div>
                <ProductList loading={loading} />
            </div>


            <div className="flex flex-col gap-6 w-full sm:w-[400px]">
                <div className="flex justify-end">
                    <AddUserButton />
                </div>

                <Skeleton loading={loading}>
                    <Card>
                        <Heading className="text-center mb-4">User List</Heading>

                        {
                            users.length > 0 ? (
                                <div className="flex flex-col gap-2 max-h-[400px] overflow-auto">
                                    {users.map((user) => (
                                        <UserCard key={user.id} user={user} />
                                    ))}
                                </div>
                            ) : (
                                !loading && (
                                    <p className="text-center text-gray-500">No users found</p>
                                )
                            )
                        }
                    </Card>
                </Skeleton>
            </div>
        </div>
    );
}
