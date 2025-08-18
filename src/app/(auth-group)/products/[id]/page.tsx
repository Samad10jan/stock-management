"use client"

import ProductCard from "@/components/cards/product-card"
import AddSaleButton from "@/components/product-page/add-sale-btn"
import ProductSaleChart from "@/components/product-page/product-sale-chart"
import { GET_PROD } from "@/lib/gql/queries"
import gqlClient from "@/lib/services/gql"
import { ProductWithSale } from "@/lib/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProductPage() {
    const [product, setProduct] = useState<ProductWithSale>()
    const [loading, setLoading] = useState(true)

    const params = useParams()
    const id = params.id


    useEffect(() => {

        async function getProduct() {
            const data: { getProduct: ProductWithSale } = await gqlClient.request(GET_PROD, {
                getProductId: id

            })
            console.log(data.getProduct);


            if (data.getProduct) {
                setProduct(data.getProduct)
                // setSales(data.getProduct.sales)
            }
        }
        getProduct();
        setLoading(false)

    }, [id])
    //?? quntity null
    console.log("productsales :", product);

    const charData= product?.sales?.map((sales) => {
        const date  = new Date(Number(sales.createdAt));
        const format = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const quantity = sales?.quantity;
        // console.log("quntity", quantity);

        return {
            date: format,
            quantity
        };
    }) || [];

    return (
        <div className="flex gap-5 justify-evenly *:mx-5">



            <div >
                <ProductCard product={product as ProductWithSale} loading={loading} />


            </div>






            <div className="flex flex-col justify-evenly grow-3">

                {
                    charData.length > 0 ?
                        <div className="w-full h-67 grow">

                            <ProductSaleChart data={charData} />
                        </div> : <div>No Sale Yet</div>
                }

                <div >
                    <AddSaleButton product={product as ProductWithSale} />
                </div>
            </div>
        </div>
    )
}