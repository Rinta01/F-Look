const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    id: ID!
    first_name: String!
    last_name: String
    password: String!
    country: String
    email: String
    tel: String!
    sex: String!
    age: Int
    wealth: String
    size: String
    favBrands: [Brand!]
    wishlist: [Apparel!]
}
type LoggedUser {
    first_name: String!
    last_name: String
    country: String
    email: String
    tel: String!
    sex: String!
    age: Int
    wealth: String!
    size: String!
    favBrands: [Brand!]
    wishlist: [Apparel!]
    userId: String!
    token: String!
    tokenExpiration: Int!
}
type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}
type Material{
    name: String!
    share: String!
}
type Apparel {
    id: ID!
    article: String!
    brand: Brand!
    sex: String!
    category: String!
    materials: [Material!]
    image: String
    price: Int!
}
type Brand{
    id: ID!
    name: String!
    clothes: [Apparel!]
}
input BrandInput{
    name: String!
    clothes: [String!]
}
input MaterialInput{
    name: String!
    share: Int!
}
input ApparelInput {
    article: String!
    brand: String!
    sex: String!
    category: String!
    materials: [MaterialInput!]!
    image: String
    price: Int!
}
input CreateUserInput {
    first_name: String!  
    tel: String!
    password: String!
    sex: String!
}
input EditUserInput {
    id: String!
    first_name: String!
    last_name: String
    country: String
    tel: String!
    email: String
    age: Int
    sex: String!
    wealth: String!
    size: String!
    favBrands: [String]
    wishlist: [String]
}
type RootQuery {
    findUser(userId: String!): User
    allUsers: [User!]!
    findApparel(itemArticle: String!): Apparel
    allApparel: [Apparel!]!
}
type RootMutation {
    login(tel: String!, password: String!): AuthData!
    createUser(userInput: CreateUserInput): LoggedUser!
    editUser(editUserInput: EditUserInput): User!
    addApparel(apparelInput: ApparelInput): Apparel
    addBrand(brandInput: BrandInput): Brand
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
