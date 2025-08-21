"use client"
import { GET_All_PROD } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { ProductWithSale } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../cards/product-card";
import { Skeleton, Spinner } from "@radix-ui/themes";
import LoadingScreen from "../reuseable-componets/loading-spinner";

export default function ProductList() {
    const [products, setProducts] = useState<ProductWithSale[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function getAllProducts() {
            try {


                const data: { getAllPorducts: ProductWithSale[] } = await gqlClient.request(GET_All_PROD);

                const products = data?.getAllPorducts || []
                setProducts(products)

            } catch (err: any) {
                console.log(err.message);
            }
            finally {
                setLoading(false)
            }


        }
        getAllProducts()

    }, [])

    if (loading) {
        return (
            <LoadingScreen/>
        )
    }

    return (

        <div className="flex flex-wrap justify-center">


            {
                products?.map((product, index) => {
                    return (
                        <div key={index}>

                            <Link href={"/products/" + product.id}>
                                <ProductCard product={product} loading={loading} />
                            </Link>
                        </div>
                    )
                })
            }


        </div>

    )
}