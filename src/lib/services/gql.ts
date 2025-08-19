import { gql, GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient("https://stock-management-sigma-sepia.vercel.app/api/graphql", {
  headers: {
    
  },
  credentials: "include", // This helps send cookies if needed
});

export default gqlClient;