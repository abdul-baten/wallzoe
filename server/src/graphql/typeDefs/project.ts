import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    hasProjectName(name: String!): Boolean! @auth
    hasProjectByUserId(createdBy: ID!): [Project] @auth
    hasProjectById(_id: ID!): Project @auth
  }
  extend type Mutation {
    addProject(
      name: String!
      createdBy: ID!
    ): Project @auth
    editProject(
      name: String!
      desc: String
      id: ID!
    ): Project @auth
    deleteProject(
      id: ID!
      isDelete: Boolean!
    ): Project @auth
  }
  type Project {
    _id: ID!
    name: String!
    desc: String
    createdBy: ID
  }
`