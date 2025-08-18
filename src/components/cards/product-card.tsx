import { Badge, Button, Card, Flex, Skeleton, Text } from "@radix-ui/themes";
import { Product, Sale } from "../../../generated/prisma";
import Image from "next/image";
import { ProductWithSale } from "@/lib/types";



export default function ProductCard({ product, loading }: { product: ProductWithSale | Product, loading: boolean }) {
    return (
        <Skeleton loading={loading} >
            <div className="w-90 h-[550px]"> {/* Fixed width & height */}

                <Card className="p-4 h-full flex flex-col">

                    {product?.imageUrl && (
                        <div className="mb-3 flex items-center justify-center overflow-hidden rounded-md bg-gray-50 h-[352px]">
                            <Image
                                src={product?.imageUrl}
                                alt={product?.title}
                                width={300}
                                height={192}
                                className="object-contain w-full h-full"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                        </div>
                    )}


                    <Flex direction="column" gap="2" className="flex-1">
                        <Text size="4" weight="bold" className="line-clamp-1">
                            {product?.title}
                        </Text>

                        <Text size="2" className="text-gray-600 line-clamp-2">
                            {product?.description}
                        </Text>
                        {product && <>

                            <Flex justify="between" align="center">
                                <Badge color="blue" variant="soft">
                                    {product?.category}
                                </Badge>
                                <Text size="3" weight="bold" className="text-green-600">
                                    ₹{product?.price?.toFixed(2)}
                                </Text>
                            </Flex>

                            <Flex justify="between" align="center">
                                <Text size="2" className="text-gray-500">
                                    Stock: {product?.stock}
                                </Text>
                                <Badge
                                    color={product?.stock > 0 ? "green" : "red"}
                                    variant="soft"
                                >
                                    {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                                </Badge>
                            </Flex>


{/* 
                            <Flex gap="2">
                                <Button size="2" style={{ flex: 1 }}>
                                    Edit
                                </Button>
                                <Button size="2" color="red" variant="soft" style={{ flex: 1 }}>
                                    Delete
                                </Button>
                            </Flex> */}

                        </>
                        }
                    </Flex>
                </Card>
       
        </div >
         </Skeleton>
    );
}
