"use client"

import AddSaleButton from "@/components/product-page/add-sale-btn"
import ProductSaleChart from "@/components/product-page/product-sale-chart"
import { GET_PROD } from "@/lib/gql/queries"
import gqlClient from "@/lib/services/gql"
import { ProductWithSale } from "@/lib/types"
import { Badge, Box, Button, Card, Flex, Skeleton, Text } from "@radix-ui/themes"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProductPage() {
  const [product, setProduct] = useState<ProductWithSale | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const params = useParams()
  const router = useRouter()
  const id = params.id

  useEffect(() => {
    async function getProduct() {
      try {
        setError(null)
        const data: { getProduct: ProductWithSale } = await gqlClient.request(
          GET_PROD,
          { getProductId: id }
        )

        if (data.getProduct) {
          setProduct(data.getProduct)
        } else {
          setError("Product not found")
        }
      } catch (err: any) {
        console.error("Error fetching product:", err)
        setError(err.message || "Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    if (id) getProduct()
  }, [id])

  const chartData =
    product?.sales?.map((sale) => {
      const date = new Date(Number(sale.createdAt))
      const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
      
      return {
        date: formattedDate,
        quantity: sale?.quantity || 0,
      }
    }) || []

  const totalSales = chartData.reduce((sum, item) => sum + item.quantity, 0)

  if (error) {
    return (
      <Flex 
        direction="column" 
        align="center" 
        justify="center" 
        className="!min-h-[500px] !gap-4"
      >
        <Text size="6" weight="bold" className="!text-red-600">
          Error Loading Product
        </Text>
        <Text size="3" className="">
          {error}
        </Text>
        <Button 
          onClick={() => router.back()}
          size="3"
          className="!cursor-pointer !mt-2"
        >
          Go Back
        </Button>
      </Flex>
    )
  }

  return (
    <div className="!w-full !min-h-screen  !py-8">
      <div className="!max-w-7xl !mx-auto !px-4 lg:!px-8">
        <Flex 
          direction={{ initial: "column", lg: "row" }}
          gap="6"
          className="!w-full"
        >
          {/* Product Card Section */}
          <Box className="!flex-1 !max-w-md lg:!max-w-lg">
            <Skeleton loading={loading}>
              <Card className="!p-6 !shadow-lg hover:!shadow-xl !transition-shadow !duration-300">
                {product?.imageUrl && (
                  <Box className="!mb-4 !flex !items-center !justify-center !overflow-hidden !rounded-lg !p-4">
                    <div className="!relative !w-full !h-64 md:!h-80">
                      <Image
                        src={product.imageUrl}
                        alt={product.title || "Product image"}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="!object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png"
                        }}
                        priority
                      />
                    </div>
                  </Box>
                )}

                <Flex direction="column" gap="3">
                  <Text size="6" weight="bold" className="!text-gray-900">
                    {product?.title}
                  </Text>

                  <Text size="3" className="!text-gray-600 !leading-relaxed">
                    {product?.description}
                  </Text>

                  {product && (
                    <>
                      <Flex justify="between" align="center" className="!pt-2">
                        <Badge color="blue" size="2" className="!font-semibold">
                          {product.category}
                        </Badge>
                        <Text size="5" weight="bold" className="!text-green-600">
                          ₹{product.price?.toFixed(2)}
                        </Text>
                      </Flex>

                      <Card className=" !p-4 !mt-2">
                        <Flex justify="between" align="center">
                          <Flex direction="column" gap="1">
                            <Text size="2" className="">
                              Available Stock
                            </Text>
                            <Text size="4" weight="bold" className="">
                              {product.stock} units
                            </Text>
                          </Flex>
                          <Badge
                            color={product.stock > 0 ? "green" : "red"}
                            size="2"
                            className="!font-semibold"
                          >
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </Flex>
                      </Card>
                    </>
                  )}
                </Flex>
              </Card>
            </Skeleton>
          </Box>

          {/* Sales Chart Section */}
          <Box className="!flex-1">
            <Card className="!p-6 !shadow-lg !h-full">
              <Flex direction="column" gap="4" className="!h-full">
                <Flex justify="between" align="center">
                  <Text size="5" weight="bold" className="">
                    Sales Analytics
                  </Text>
                  {totalSales > 0 && (
                    <Badge color="green" size="2">
                      Total: {totalSales} units
                    </Badge>
                  )}
                </Flex>

                {loading ? (
                  <Skeleton className="!w-full !h-80" />
                ) : chartData.length > 0 ? (
                  <Box className="!w-full !h-80 lg:!h-96">
                    <ProductSaleChart data={chartData} />
                  </Box>
                ) : (
                  <Flex 
                    direction="column" 
                    align="center" 
                    justify="center"
                    className="!flex-1 !min-h-[300px] !gap-3"
                  >
                    <Text size="4" weight="bold" className="">
                      No Sales Yet
                    </Text>
                    <Text size="2" className="">
                      Sales data will appear here once recorded
                    </Text>
                  </Flex>
                )}

                <Box className="!mt-auto !pt-4 !mx-auto">
                  <AddSaleButton product={product as ProductWithSale} />
                </Box>
              </Flex>
            </Card>
          </Box>
        </Flex>
      </div>
    </div>
  )
}