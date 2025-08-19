import { Product, Sale } from "../../generated/prisma";

export type ProductWithSale = Product & { sales: Sale[] }

export type CallOutMessage = string | undefined

export type ProductCardProps = {
    product: Product & { sales: Sale };
    loading: boolean;
};

export type UserWithoutPasswordAndRole = {
    id     :  string
  name     :string
  email    :string
  username :string
  avatar?   :string 


}