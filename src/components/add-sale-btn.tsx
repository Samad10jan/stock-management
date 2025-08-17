import { CREATE_SALE } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { ProductWithSale } from "@/lib/types";
import { Card } from "@radix-ui/themes";
import { useState } from "react";
import { Product } from "../../generated/prisma";
import CallOutMessage from "./reuseable-componets/call-out";
// import { useToast } from "./reuseable-componets/toast";

export default function AddSaleButton({ product }: { product: Product | ProductWithSale }) {
    const [quantity, setQuantity] = useState<number>(1);
    const [response, setResponse] = useState("")

    // const { showToast, ToastContainer } = useToast();
    let resp: string = ""


    async function handleSale() {
        setResponse("")

        if (product.stock !== undefined && quantity > product.stock) {
            // alert("Sale value must be less than or equal to current stock");
            resp = "Sale value must be less than or equal to current stock"
            return;
        }
        console.log(quantity);


        try {
            const data: { createSale: boolean } = await gqlClient.request(CREATE_SALE, {
                quantity,
                productId: product.id,
            });

            if (data.createSale) {
                // alert("Sale created successfully ✅");
                resp = "Sale created successfully ✅"
                // showToast("Sale created successfully ✅")



            }
        } catch (err: any) {
            console.error(err);
            //   alert("Failed to create sale ❌");
            resp = "Failed to create sale ❌"

        }
        setResponse(resp)
    }

    return (
        <div>

            <Card   className="w-fit p-3 flex items-center gap-3">
                <input
                    value={quantity}
                    type="number"
                    min={1}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    placeholder="Sale quantity"
                    className="border border-blue-600 rounded px-2 py-1"
                />
                <button
                    onClick={handleSale}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                    Add Sale
                </button>

            </Card>
            {/* {ToastContainer} */}
            <div className="fixed bottom-10 right-10">
                <CallOutMessage message={response} />
            </div>
        </div>

    );
}
