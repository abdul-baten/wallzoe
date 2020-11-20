import gql from 'graphql-tag'

export const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $createdBy: ID!
  ) {
    addProject(
      name: $name
      createdBy: $createdBy
    ) {
      _id
      name
      createdBy
    }
  }
`

export const EDIT_PROJECT = gql`
  mutation EditProject(
    $name: String!
    $desc: String
    $id: ID!
  ) {
    editProject(
      name: $name
      desc: $desc
      id: $id
    ) {
      _id
      name
      desc
      createdBy
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation DeleteProject(
    $id: ID!
    $isDelete: Boolean!
  ) {
    deleteProject(
      id: $id
      isDelete: $isDelete
    ) {
      _id
      name
      desc
      createdBy
    }
  }
`

export const PROJECTS_BY_USERID = gql`
  query HasProjectByUserId (
    $createdBy: ID!
  ) {
    hasProjectByUserId(createdBy: $createdBy) {
      _id
      name
      desc
      createdBy
    }
  }
`

export const PROJECTS_BY_ID = gql`
  query HasProjectById (
    $_id: ID!
  ) {
    hasProjectById(_id: $_id) {
      _id
      name
      desc
      createdBy
    }
  }
`