"use client"
import { EDIT_USER_PROFILE } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

import { useState } from "react";
import { User } from "../../../generated/prisma";
import CallOutMessage from "../reuseable-componets/call-out";
import { UserWithoutPasswordAndRole } from "@/lib/types";

export default function EditProfileButton({ user }: {
    user: UserWithoutPasswordAndRole
}) {

    const [name, setName] = useState(user?.name || "")
    const [username, setUserName] = useState(user?.username || "")
    const [email, setEmail] = useState(user?.email || "")
    const [avatar, setAvatar] = useState(user?.avatar || "")
    const [message, setMessage] = useState("")

    async function hnadleSubmit() {

        try {
            const data: { updateUserProfile: User } = await gqlClient.request(EDIT_USER_PROFILE, {

                userId: user.id,
                name: name,
                email: email,
                username: username,
                avatar: avatar

            })
            if (data.updateUserProfile) {
                setMessage("Upadted")

            }


        } catch (err: any) {
            console.log(err.message);
            setMessage("Role Unable To Update")



        } 
        // finally {

        // }
    }


    return (
        <div >
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Edit Profile</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Edit Profile</Dialog.Title>
                    <Dialog.Description size="2" mb="4" className="text-gray-400">
                       Edit Profile
                    </Dialog.Description>


                    <Flex direction="column" gap="3">

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold" >
                                Name
                            </Text>
                            <TextField.Root

                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold" >
                                UserName
                            </Text>
                            <TextField.Root

                                placeholder="Enter UserName"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold" >
                                Email
                            </Text>
                            <TextField.Root

                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold" >
                                Avatar
                            </Text>
                            <TextField.Root

                                placeholder="Enter Avatar Link"
                                value={avatar}
                                type="url"
                                onChange={(e) => setAvatar(e.target.value)}
                            />
                        </label>


                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>

                        <Button onClick={hnadleSubmit}>Save</Button>

                    </Flex>
                    <CallOutMessage message={message} />

                </Dialog.Content>
            </Dialog.Root>

        </div>
    )
}