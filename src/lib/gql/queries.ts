import { gql } from "graphql-request";

export const LOGIN_USER = gql`
      query Query($userCred: String!, $password: String!) {
  loginUser(userCred: $userCred, password: $password)
}`

export const GET_All_USER =gql`
query GetAllUsers {
  getAllUsers {
    id
    name
    email
    username
    avatar
    role
  }
}
`
export const GET_USER =gql`
query GetUser($getUserId: String) {
  getUser(id: $getUserId) {
    id
    name
    email
    username
    avatar
    role
  }
}
`


export const GET_All_PROD =gql`
query GetAllPorducts {
  getAllPorducts {
    id
    title
    description
    category
    price
    stock
    imageUrl
  }
}`

export const GET_PROD=gql`
query GetProduct($getProductId: String) {
  getProduct(id: $getProductId) {
    id
    title
    description
    category
    price
    stock
    imageUrl
    sales {
      id
      productId
      quantity
      createdAt
    }
  }
}
`