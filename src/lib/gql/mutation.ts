import { gql } from "graphql-request";
import gqlClient from "../services/gql";

export const CREATE_USER=gql`

mutation Mutation($name: String!, $email: String!, $username: String!, $password: String!, $role: String!) {
  createUser(name: $name, email: $email, username: $username, password: $password, role: $role) {
    id
    name
    email
    username
    avatar
    role
  }
}`

export const ADD_PROD= gql`
mutation AddProducts($title: String!, $description: String!, $category: String!, $price: Float!, $stock: Int!, $imageUrl: String!) {
  addProducts(title: $title, description: $description, category: $category, price: $price, stock: $stock, imageUrl: $imageUrl) {
    id
    title
    description
    category
    price
    stock
    imageUrl
  }
}`

export const CREATE_SALE= gql`
mutation Mutation($productId: String!, $quntity: Int!) {
  createSale(id: $productId, quntity: $quntity)
}`