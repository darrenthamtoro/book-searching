const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    # There is now a field to store the user's password
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  # Set up an Auth type to handle returning data from a user
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me:User
  }
  input BookInput{
    authors: [String]
    description: String
    title: String
    bookId: ID
    image: String
    link: String
  }

  type Mutation {
    # Set up mutations to handle creating a profile or logging into a profile and return Auth type
    
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput): User

    removeBook(bookId: ID!): User

  }
`;

module.exports = typeDefs;