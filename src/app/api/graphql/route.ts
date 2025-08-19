import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import getUserFromCookies from "@/lib/helper";
import { addProducts, createSale, getAllPorducts, getProduct } from "./resolver-functions/products";
import { createUser, getAllUsers, getUser, logginUser, updateUserProfile, updateUserRole } from "./resolver-functions/user/resolver";
import typeDefs from "./typeDefs/typeDefs";

const resolvers = {
    Query: {
        loginUser: logginUser,
        currentUser: getUserFromCookies,
        getAllUsers:getAllUsers,
        getAllPorducts:getAllPorducts,
        getProduct:getProduct,
        getUser:getUser
       
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

// const handler = startServerAndCreateNextHandler<NextRequest>(server, {
//     context: async req => ({ req }),
// });

// export { handler as GET, handler as POST };

const handler = startServerAndCreateNextHandler(server, {
  context: async req => ({ req }),
});


export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}