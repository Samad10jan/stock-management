import { useState } from "react";
import { Product } from "../../generated/prisma";
import { Card } from "@radix-ui/themes";
import gqlClient from "@/lib/services/gql";
import { CREATE_SALE } from "@/lib/gql/mutation";
import { ProductWithSale } from "@/lib/types";

export default function AddSaleButton({product}:{product:Product|ProductWithSale}){
    const [quntity,setQuntity]= useState(1)
    async function hnadleSale() {
        if(product.stock<quntity){
            alert("Sale value must be less than current stock")
            return 
        }
        try{

            const data :{createSale:boolean}= await gqlClient.request(CREATE_SALE,{
                quantity:quntity,
                productId:product.id
            })
            if(data.createSale){
                alert("created Sale")
                
            }
        }catch(err:any){
            console.log(err.message);
            alert("NOT created Sale")
            
        }
        
    }
    return(
        <Card style={{width:"85%"}}>
            <input value={quntity} onChange={e=>setQuntity(Number.parseInt(e.target.value))} placeholder="Sale" className="border-blue-600 border-l border-t border-b rounded m-3"/>
            <button onClick={hnadleSale}>Add Sale</button>
        </Card>
    )
}