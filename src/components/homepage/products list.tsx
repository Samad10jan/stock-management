"use client"
import { GET_All_PROD } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { ProductWithSale } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../cards/product-card";

export default function ProductList(){
   const [products,setProducts]= useState<ProductWithSale[]>([])
   const [loading,setLoading] =useState(true)
  useEffect(() => {
          async function getAllProducts() {
  
              const data :{getAllPorducts:ProductWithSale[]}= await gqlClient.request(GET_All_PROD);
            
              
              const products = data?.getAllPorducts || []
              setProducts(products)
  
  
          }
          getAllProducts()
          setLoading(false)
      }, [])

    return(
        <div className="flex flex-wrap gap-5">
            {
                products?.map((product,index)=>{
                    return(
                        <div key={index}>

                          <Link href={"/products/"+product.id}>
                           <ProductCard product={product} loading={loading}/>
                          </Link>
                        </div>
                    )
                })
            }

        </div>
    )
}