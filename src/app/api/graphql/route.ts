import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

import getUserFromCookies from "@/lib/helper";
import { createUser, getAllUsers, logginUser, updateUserProfile, updateUserRole } from "./resolver-functions/user/resolver";
import typeDefs from "./typeDefs/typeDefs";
import { addProducts, createSale, getAllPorducts, getProduct } from "./resolver-functions/products";
import { Sale } from "../../../../generated/prisma";
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

const resolvers = {
    Query: {
        loginUser: logginUser,
        currentUser: getUserFromCookies,
        getAllUsers:getAllUsers,
        getAllPorducts:getAllPorducts,
        getProduct:getProduct,
       
    },
    Mutation:{
        createUser:createUser,
        updateUserRole:updateUserRole,
        updateUserProfile:updateUserProfile,
        addProducts:addProducts,
        createSale:createSale
        
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };

