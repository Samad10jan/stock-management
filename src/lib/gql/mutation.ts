import { gql } from "graphql-request";

export const CREATE_USER = gql`

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

export const ADD_PROD = gql`
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

export const CREATE_SALE = gql`
mutation Mutation($productId: String!, $quantity: Int!) {
  createSale(id: $productId, quantity: $quantity)
}`

export const EDIT_ROLE = gql`
mutation Mutation($userId: String, $role: String) {
  updateUserRole(userId: $userId, role: $role)
}`

export const EDIT_USER_PROFILE=gql`
mutation Mutation($userId: String!, $name: String!, $email: String!, $username: String!, $avatar: String) {
  updateUserProfile(userId: $userId, name: $name, email: $email, username: $username, avatar: $avatar)
}`
