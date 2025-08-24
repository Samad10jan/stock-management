import { ProductWithSale } from "@/lib/types";
import { Badge, Card, Flex, Skeleton, Text } from "@radix-ui/themes";
import Image from "next/image";
import { Product } from "../../../generated/prisma";



export default function ProductCard({ product, loading }: { product: ProductWithSale | Product, loading: boolean }) {
    return (
        <Skeleton loading={loading} >
            <div className=" max-h-max ">

                <Card className="p-4 md:min-h-[390px] min-h-[200px] flex md:flex-col md:w-md w-screen m-2  ">

                    {product?.imageUrl && (
                        <div className="mb-3 flex items-center justify-center overflow-hidden rounded-md bg-gray-50 md:min-h-[100px] min-h-[90px] ">
                            <div className="relative md:w-64 md:h-50 w-40 h-35">

                                <Image
                                    src={product?.imageUrl}
                                    alt={product?.title}
                                    fill
                                    sizes="(max-width: 768px) 160px, 256px"
                                    className="object-contain w-full h-full"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />

                            </div>

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
