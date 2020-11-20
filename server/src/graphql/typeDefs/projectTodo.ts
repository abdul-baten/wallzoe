import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    hasProjectTodoName(name: String!): Boolean! @auth
    hasTodoListByProjectId(projectId: ID!): [ProjectTodo] @auth
    hasProjectTodoById(_id: ID!): ProjectTodo @auth
  }
  extend type Mutation {
    addTodo(
      name: String!
      detail: String
      projectId: ID!
    ): ProjectTodo @auth
    editTodo(
      name: String!
      detail: String
      id: ID!
    ): ProjectTodo @auth
    deleteTodo(
      id: ID!
      isDelete: Boolean!
    ): ProjectTodo @auth
    addTodoAssign(
      id: ID!
      desc: String!
      assignUsers: [ID]!
      notifyUsers: [ID]
      specDate: String
      startDate: String
      endDate: String
      extra: String
      isActive: Boolean
      dueDateType: String
    ): [ProjectTodo] @auth
    addTodoComment(
      id: ID!
      createdBy: ID!
      content: String
    ): [ProjectTodoComment] @auth
  }
  type ProjectTodo {
    _id: ID!
    name: String!
    detail: String
    projectId: ID!
    assign: [ProjectTodoAssign]
    comment: [ProjectTodoComment]
  }
  type ProjectTodoAssign {
    desc: String
    assignUsers: [PUser]
    notifyUsers: [PUser]
    specDate: String
    startDate: String
    endDate: String
    extra: String
    isActive: Boolean
    dueDateType: String
  }
  type PUser {
    _id: ID
    username: String
    email: String
  }
  type ProjectTodoComment {
    _id: ID
    content: String
    createdBy: PUser
    createdDate: String
  }
`