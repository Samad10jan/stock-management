import { gql, GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_HOST_URL+"/api/graphql");

export default gqlClient;
