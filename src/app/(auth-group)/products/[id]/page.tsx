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
    <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-10 py-6">
      <div className="flex-1">
        <ProductCard product={product as ProductWithSale} loading={loading} />
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
