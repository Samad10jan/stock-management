import prismaClient from "@/lib/services/prisma"
import { ProductCategory } from "../../../../../generated/prisma"
import { Quando } from "next/font/google"

export async function addProducts(_: any, args:
    {
        id: string
        title: string
        description: string
        category: ProductCategory
        price: number
        stock: number
        imageUrl: string

    }
) {
    try {
        const createdProducts = await prismaClient.product.create({
            data: args
        })
        return createdProducts
    } catch (error) {
        return null

    }

}

export async function getAllPorducts() {
    try {
        const products = await prismaClient.product.findMany({
            include:{
                sales:true
            }
        })

        return products
    } catch (error) {
        return null

    }

}
export async function getProduct(_:any,args:{id:string}) {
    try{

        const productId= args.id
        const product = await prismaClient.product.findUnique({
            where:{
                id:productId
            },
            include:{
                sales:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        })
    
    
        
        if(product) return product

        return null
    }catch(err:any){
        console.log(err.message);
        return null
        
    }
    
    
}
export async function createSale(_:any,args:{id:string,quantity:number}) {
    const id= args.id
    const quantity= args.quantity 
   
    
    try {
        // create sale
        const sale = await prismaClient.sale.create({
           
            data:{
                productId:id,
                quantity:quantity
            }
        })

       
        if(sale){
            await prismaClient.product.update({
                where:{
                    id:args.id
                },
                data:{
                    stock:{
                        decrement:args.quantity
                    }
                }
            })
        }
        return true
        
    } catch (error) {
        return false
        
    }
    
}