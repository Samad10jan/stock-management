import { CREATE_SALE } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { ProductWithSale } from "@/lib/types";
import { Card } from "@radix-ui/themes";
import { useState } from "react";
import { Product } from "../../../generated/prisma";
import CallOutMessage from "../reuseable-componets/call-out";



export default function AddSaleButton({ product }: { product: Product | ProductWithSale }) {
    const [quantity, setQuantity] = useState<number>(1);
    const [response, setResponse] = useState("")


    let resp: string = ""
    

    async function handleSale() {
        setResponse("")

        if (product.stock !== undefined && quantity > product.stock) {

            resp = "To High Sale"
            setResponse(resp)
            return;
        }


        try {
            const data: { createSale: boolean } = await gqlClient.request(CREATE_SALE, {
                quantity,
                productId: product.id,
            });

            if (data.createSale) {

                resp = "Sale ✅"

            }
        } catch (err: any) {
            console.error(err);

            resp = "Failed to Sale ❌"

        }
        setResponse(resp)
    }

    return (
        <div>

            <Card className="w-fit p-3 flex items-center gap-3">
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

            <div className="fixed bottom-10 right-15 ">
                <CallOutMessage message={response} />
            </div>

        </div>

    );
}
