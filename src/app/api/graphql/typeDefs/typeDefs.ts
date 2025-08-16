import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    loginUser(userCred:String!,password:String!):Boolean
    currentUser:User
    getAllUsers:[User]
    getAllPorducts:[Product]
    getProduct(id:String):Product
  },
  type Mutation{
    createUser(name:String!,email:String!,username:String!,password:String!,role:String!):User
    updateUserRole(userId:String,role:String):Boolean
    updateUserProfile(userId:String!,name:String!,email:String!,username:String!,avatar:String):Boolean
    addProducts(title:String!,description:String!,category:String!,price:Float!,stock:Int!,imageUrl:String!):Product

    createSale(id:String!,quntity:Int!):Boolean
  

  }
  type User{
  id:String
   name:String,
   email:String,
   username:String,
   avatar:String,
   role:String
  }
  type Product {
  id:          String          
  title:       String
  description: String
  category:    String
  price:       Float
  stock:       Int
  imageUrl:    String
  sales:       [Sale]
 
}
type Sale{
  id:String
  productId:String
  quantity:Int
  createdAt:String

}
`;
export default typeDefs;