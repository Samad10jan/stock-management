// import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
// import { useState } from "react";

// export default function Form() {
//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     function hnadleSubmit() {

//     }


//     return (
//         <div>
//             <Dialog.Root>
//                 <Dialog.Trigger>
//                     <Button>Add User</Button>
//                 </Dialog.Trigger>

//                 <Dialog.Content maxWidth="450px">
//                     <Dialog.Title>Form</Dialog.Title>
//                     <Dialog.Description size="2" mb="4">
//                         Create User
//                     </Dialog.Description>

//                     <form action="" onSubmit={hnadleSubmit}>
//                     <Flex direction="column" gap="3">
                        
//                         <label>
//                             <Text as="div" size="2" mb="1" weight="bold" >
//                                 Name
//                             </Text>
//                             <TextField.Root
//                                 defaultValue="Freja Johnsen"
//                                 placeholder="Enter your full name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                             />
//                         </label>

//                         <label>
//                             <Text as="div" size="2" mb="1" weight="bold">
//                                 Email
//                             </Text>
//                             <TextField.Root
//                                 defaultValue="freja@example.com"
//                                 placeholder="Enter your email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </label>
//                         <label>
//                             <Text as="div" size="2" mb="1" weight="bold">
//                                 Password
//                             </Text>
//                             <TextField.Root
//                                 defaultValue="freja@example.com"
//                                 placeholder="Enter your email"
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </label>
//                     </Flex>

//                     <Flex gap="3" mt="4" justify="end">
//                         <Dialog.Close>
//                             <Button variant="soft" color="gray">
//                                 Cancel
//                             </Button>
//                         </Dialog.Close>
//                         <Dialog.Close>
//                             <Button type="submit">Save</Button>
//                         </Dialog.Close>
//                     </Flex>
//                     </form>
//                 </Dialog.Content>
//             </Dialog.Root>

//         </div>
//     )
// }