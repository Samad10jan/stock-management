import { ADD_PROD, CREATE_USER } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";

import { useState } from "react";
import { Product } from "../../../generated/prisma";
// import { UserWithoutprice } from "../contexts/user-context";

export default function AddProductsButton() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("others")
    const [price, setPrice] = useState(99.9)
    const [stock, setStock] = useState(1)
    const [imageUrl, setImageUrl] = useState("")
    

   async function hnadleSubmit() {
        try{
            const  data:{addProducts:Product} = await gqlClient.request(ADD_PROD,{
                title,description,category,price,stock,imageUrl

                
            })
            // console.log("data cretae",data);
            
            if(data.addProducts){
                alert("added")
                setTitle("")
                setCategory("others")
                setPrice(99.9)
                setStock(1)
                setDescription("")
                setImageUrl("")
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
                    <Button>Add Products</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Add Products</Dialog.Title>
                    <Dialog.Description size="2" mb="4" className="text-gray-400">
                        Add Items
                    </Dialog.Description>

                    <form >
                        <Flex direction="column" gap="3">

                            <label>
                                <Text as="div" size="2" mb="1" weight="bold" >
                                    title
                                </Text>
                                <TextField.Root

                                    placeholder="Enter your full title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>

                            <label>
                                <Text as="div" size="2" mb="1" weight="bold" >
                                    Description
                                </Text>
                                <TextField.Root

                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>

                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Stocks
                                </Text>
                                <TextField.Root
                                type="number"
                                    placeholder="Enter category"
                                    value={stock}
                                    onChange={(e) => setStock(Number.parseInt(e.target.value)||0)}
                                />
                            </label>
                             <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    Price
                                </Text>
                                <TextField.Root

                                    placeholder="Enter price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(parseFloat(e.target.value)||99.9)}
                                />
                            </label>
                             <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    ImageUrl
                                </Text>
                                <TextField.Root

                                    placeholder="Enter price"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                            </label>
                            <label>
                                <Select.Root value={category} onValueChange={(value)=>setCategory(value)} >
                                    
                                    <Select.Trigger />
                                    <Select.Content >
                                        
                                        <Select.Group >
                                            <Select.Label>Category</Select.Label>
                                            {/* <Select.Item value="admin">Admin</Select.Item> */}
                                            <Select.Item value="accessories">Accessories</Select.Item>
                                            <Select.Item value="Beauty">Beauty</Select.Item>
                                            <Select.Item value="furniture">Furniture</Select.Item>
                                            <Select.Item value="others">Others</Select.Item>
                                           
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