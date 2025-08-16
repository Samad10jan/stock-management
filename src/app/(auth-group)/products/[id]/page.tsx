"use client"
import { useEffect, useState } from "react"
import { Product, Sale } from "../../../../../generated/prisma"
import gqlClient from "@/lib/services/gql"
import { GET_PROD } from "@/lib/gql/queries"
import { useParams } from "next/navigation"
import { Skeleton, Spinner } from "@radix-ui/themes"
import ProductCard from "@/components/product-card"
import AddSaleButton from "@/components/add-sale-btn"
import ProductSaleChart from "@/components/product-sale-chart"
import { ProductWithSale } from "@/lib/types"

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

    const charData = product?.sales?.map((sales) => {
        const date = new Date(Number.parseInt(sales.createdAt));
        const format = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const quantity = sales?.quantity;
        // console.log("quntity", quantity);

        return {
            date: format,
            quantity
        };
    }) || [];

    return (
        <div className="flex gap-5 justify-around">
            <div>

                
                    <div >
                        <ProductCard product={product} loading={loading} />

                        <AddSaleButton product={product} />
                    </div>
               



            </div>
            {
              charData.length>0 ? 
              <div className="w-1/2 h-67">

                <ProductSaleChart data={charData} />
            </div>:<div>No Sale Yet</div>
            }

        </div>
    )
}