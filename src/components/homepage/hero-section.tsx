"use client"
import { GET_All_PROD } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { ProductWithSale } from "@/lib/types";
import { Card, Heading, Spinner } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import PieChartHero from "./hero-section-pie-chart";

export default function HeroSection() {
    const [products, setProducts] = useState<ProductWithSale[] | null>(null)
    const [productsCount, setProductsCount] = useState<number>(0)
    const [stockCount, setStockCount] = useState<number>(0)
    const [salesCount, setSalesCount] = useState<number>(0)
    const [categoryCount, setCategoryCount] = useState<number>(0)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getAllProducts() {
            try {
                const data: { getAllPorducts: ProductWithSale[] } = await gqlClient.request(GET_All_PROD);

                const products = data?.getAllPorducts || []


                setProducts(products)

                
                setProductsCount(products.length)

                // Total stock count
                const totalStock = products.reduce((sum, product) => sum + product.stock, 0)
                setStockCount(totalStock)

                // Total sales count
                const totalSales = products.reduce((sum, product) => {
                    return sum + (product.sales ? product.sales.length : 0)
                }, 0)
                setSalesCount(totalSales)

                // Unique categories count
                const uniqueCategories = new Set(products.map(product => product.category).filter(Boolean))
                setCategoryCount(uniqueCategories.size)

            } catch (err: any) {
                console.log(err.message);
            } finally {
                setLoading(false)
            }
        }
        getAllProducts()
    }, [])




    if (loading) {
        return (
            <div className="min-h-90 flex justify-center items-center">
                <h1>Loading..</h1>
                <Spinner loading={loading} size={"3"} />
            </div>
        )
    }

    return (
        <div className="drop-shadow-blue-900 drop-shadow-xl/30">
            <div className="min-h-80 flex justify-between">
                <div className="flex flex-col gap-y-2 w-xl m-3">
                    <Card variant="surface">
                        <Heading className="py-auto">Products: {productsCount}</Heading>
                    </Card>

                    <Card variant="surface">
                        <Heading className="py-auto">Stocks: {stockCount}</Heading>
                    </Card>

                    <div className="flex justify-around gap-2 *:min-h-50">
                        <Card variant="surface" className="grow">
                            <Heading className="flex flex-col items-center space-y-10">
                                <div>Sales:</div>
                                <div className="font-extrabold text-4xl">{salesCount}</div>
                            </Heading>
                        </Card>

                        <Card variant="surface" className="grow">
                            <Heading className="flex flex-col items-center space-y-10">
                                <div>Categories:</div>
                                <div className="font-extrabold text-4xl">{categoryCount}</div>
                            </Heading>
                        </Card>
                    </div>
                </div>
                <Card variant="surface" className="min-w-2xl min-h-64 m-3 grow">
                    <PieChartHero />
                </Card>
            </div>
        </div>
    )
}