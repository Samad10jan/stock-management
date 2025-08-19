import { gql, GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient("https://stock-management-sigma-sepia.vercel.app/api/graphql");
export default gqlClient;