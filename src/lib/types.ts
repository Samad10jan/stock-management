import { Product, Sale } from "../../generated/prisma";

export type ProductWithSale= Product&{sales:Sale[]} 

export type CallOutMessage = string|undefined

export type ProductCardProps = {
    product: Product & { sales: Sale };
    loading: boolean;
};