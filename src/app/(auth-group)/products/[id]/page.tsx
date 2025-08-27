"use client"

import ProductCard from "@/components/cards/product-card"
import AddSaleButton from "@/components/product-page/add-sale-btn"
import ProductSaleChart from "@/components/product-page/product-sale-chart"
import { GET_PROD } from "@/lib/gql/queries"
import gqlClient from "@/lib/services/gql"
import { ProductWithSale } from "@/lib/types"
import { Badge, Card, Flex, Skeleton, Text } from "@radix-ui/themes"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProductPage() {
  const [product, setProduct] = useState<ProductWithSale>()
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const id = params.id

  useEffect(() => {
    async function getProduct() {
      try {
        const data: { getProduct: ProductWithSale } = await gqlClient.request(
          GET_PROD,
          { getProductId: id }
        )

        if (data.getProduct) {
          setProduct(data.getProduct)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) getProduct()
  }, [id])

  const charData =
    product?.sales?.map((sales) => {
      const date = new Date(Number(sales.createdAt))
      const format = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`
      const quantity = sales?.quantity

      return {
        date: format,
        quantity,
      }
    }) || []

  return (
    <div className="flex flex-col items-center lg:flex-row gap-6 px-4 lg:px-10 py-6">
      <div className="flex-1">
        {/* <ProductCard product={product as ProductWithSale} loading={loading} />
         */}
         <Skeleton loading={loading} >
            <div className=" max-h-max ">

                <Card className="p-4 md:min-h-[390px] min-h-[200px] flex md:flex-col md:w-md w-screen m-2  ">

                    {product?.imageUrl && (
                        <div className="mb-3 flex items-center justify-center overflow-hidden rounded-md bg-gray-50 md:min-h-[100px] min-h-[90px] ">
                            <div className="relative md:w-64 md:h-50 w-40 h-35">

                                <Image
                                    src={product?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png"}
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
      </div>
      <div className="flex flex-col flex-1 gap-6">
        {charData.length > 0 ? (
          <div className="w-full h-64 lg:h-80">
            <ProductSaleChart data={charData} />
          </div>
        ) : (
          <div className="text-center text-gray-500">No Sale Yet</div>
        )}
        <div className="flex justify-center lg:justify-start">
          <AddSaleButton product={product as ProductWithSale} />
        </div>
      </div>
    </div>
  )
}
