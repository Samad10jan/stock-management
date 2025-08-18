"use client"
import { GET_All_PROD } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { useEffect, useState } from "react";
import { Product } from "../../../generated/prisma";
import PieChartHero from "./hero-section-pie-chart";
import { ProductWithSale } from "@/lib/types";
import { Card, Heading, Separator, Spinner, Text } from "@radix-ui/themes";

export default function HeroSection() {
    const [products, setProducts] = useState<Product[] | null>(null)
    const [productsCount, setProductsCount] = useState<number | undefined>(0)
    const [loading, setLoading] = useState(true)
    // const [stocksCount, setStockCount] = useState<number | undefined>(0)

    useEffect(() => {
        async function getAllProducts() {
            try {
                const data: { getAllPorducts: Product[] } = await gqlClient.request(GET_All_PROD);
                //   console.log(data);

                const products = data?.getAllPorducts || []
                setProducts(products)
                setProductsCount(products.length)

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
                <h1>
                    Loading..
                </h1>
                <Spinner loading={loading} size={"3"} />
            </div>
        )
    }


    return (
        <div className="drop-shadow-blue-900 drop-shadow-xl/30 " >
            <div className="min-h-80 flex justify-between ">
                <div className=" flex flex-col gap-y-2 w-xl m-3">
                    <Card variant="surface">
                        <Heading className="py-auto" >  Products: {productsCount}</Heading>
                    </Card>

                    <Card variant="surface" >
                        <Heading className="py-auto" >  Stocks: {productsCount}</Heading>
                    </Card>

                    <div className="flex justify-around gap-2 *:min-h-50">

                        <Card variant="surface" className="grow" >
                             <Heading className="flex flex-col items-center space-y-10" > <div>Category:</div><div className="font-extrabold text-4xl">{productsCount}</div></Heading>
                        </Card>

                        <Card variant="surface" className=" grow ">
                            <Heading className="flex flex-col items-center space-y-10" > <div>Category:</div><div className="font-extrabold text-4xl">{productsCount}</div></Heading>
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