import { Product, Sale } from "../../generated/prisma";

export type ProductWithSale= Product&{sales:Sale[]} 

