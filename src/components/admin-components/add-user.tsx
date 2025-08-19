import { CREATE_USER } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";

import { useState } from "react";
import { UserWithoutPassword } from "../contexts/user-context";

export default function AddUserButton() {
    const [name, setName] = useState("")
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("staff")

   async function hnadleSubmit() {
        try{
            const  data:{createUser:UserWithoutPassword} = await gqlClient.request(CREATE_USER,{
                name,email,username,password,role
            })
            // console.log("data cretae",data);
            
            if(data.createUser){
                alert("user created")
                setName("")
                setEmail("")
                setPassword("")
                setRole("")
                setUserName("")
            }else{
                alert("Not Added")
            }

        }catch(err){
            alert("unable to add user Error")
        }

    }


    return (
        <div >
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button variant="solid">Add Memeber</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Add Memeber</Dialog.Title>
                    <Dialog.Description size="2" mb="4" className="text-gray-400">
                        Add Memeber
                    </Dialog.Description>

                    <form >
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
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Email
                                </Text>
                                <TextField.Root

                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                             <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Password
                                </Text>
                                <TextField.Root

                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                            <label>
                                <Select.Root value={role} onValueChange={(value)=>setRole(value)} >
                                    
                                    <Select.Trigger />
                                    <Select.Content >
                                        
                                        <Select.Group >
                                            <Select.Label>Roles:</Select.Label>
                                            {/* <Select.Item value="admin">Admin</Select.Item> */}
                                            <Select.Item value="manager">Manager</Select.Item>
                                            <Select.Item value="staff">Staff</Select.Item>
                                           
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>

                            </label>
                          
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button onClick={hnadleSubmit}>Save</Button>
                            </Dialog.Close>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>

        </div>
    )
}