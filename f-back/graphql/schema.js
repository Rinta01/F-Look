const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    id: ID!
    first_name: String
    last_name: String
    password: String!
    country: String
    tel: String!
    sex: String!
    age: Int
    wealth: String
}
type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}
type Apparel {
    id: ID!
    article: String!
    brand: String!
    sex: String!
    category: String!
    material: String
    image: String
}
input ApparelInput {
    article: String!
    brand: String!
    sex: String!
    category: String!
    material: String
    image: String
}
input CreateUserInput {
  first_name: String!  
  tel: String!
  password: String!
  sex: String!
}
input EditUserInput {
    first_name: String
    last_name: String
    country: String
    tel: String
    age: Int
    wealth: String
}
type RootQuery {
    findUser(userId: String!): User
    allUsers: [User!]!
    findApparel(itemArticle: String!): Apparel
    allApparel: [Apparel!]!
}
type RootMutation {
    login(tel: String!, password: String!): AuthData!
    createUser(userInput: CreateUserInput): User
    editUser(editUserInput: EditUserInput): User!
    createApparel(apparelInput: ApparelInput): Apparel
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);