"use client"
import { GET_All_PROD } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { useEffect, useState } from "react"
import { Product } from "../../generated/prisma";
import ProductCard from "./product-card";
import Link from "next/link";
import { ProductWithSale } from "@/lib/types";

export default function ProductList({loading}:{loading:boolean}){
   const [products,setProducts]= useState<ProductWithSale[]>([])
  useEffect(() => {
          async function getAllProducts() {
  
              const data :{getAllPorducts:ProductWithSale[]}= await gqlClient.request(GET_All_PROD);
              console.log(data);
              
              const products = data?.getAllPorducts || []
              setProducts(products)
  
  
          }
          getAllProducts()
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