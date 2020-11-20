import gql from 'graphql-tag'

export const ADD_TODO = gql`
  mutation AddTodo($name: String!, $detail: String, $projectId: ID!) {
    addTodo(name: $name, detail: $detail, projectId: $projectId) {
      _id
      name
      detail
      projectId
      assign {
        desc
        assignUsers {
          _id
          username
          email
        }
        notifyUsers {
          _id
          username
          email
        }
        specDate
        startDate
        endDate
        extra
        isActive
        dueDateType
      }
    }
  }
`

export const EDIT_TODO = gql`
  mutation EditTodo($name: String!, $detail: String, $id: ID!) {
    editTodo(name: $name, detail: $detail, id: $id) {
      _id
      name
      detail
      projectId
      assign {
        desc
        assignUsers {
          _id
          username
          email
        }
        notifyUsers {
          _id
          username
          email
        }
        specDate
        startDate
        endDate
        extra
        isActive
        dueDateType
      }
      comment {
        _id
        createdBy {
          _id
          username
          email
        }
        content
        createdDate
      }
    }
  }
`

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!, $isDelete: Boolean!) {
    deleteTodo(id: $id, isDelete: $isDelete) {
      _id
      name
    }
  }
`

export const TODO_LIST_BY_PROJECTID = gql`
  query HasTodoListByProjectId($projectId: ID!) {
    hasTodoListByProjectId(projectId: $projectId) {
      _id
      name
      detail
      projectId
      assign {
        desc
        assignUsers {
          _id
          username
          email
        }
        notifyUsers {
          _id
          username
          email
        }
        specDate
        startDate
        endDate
        extra
        isActive
        dueDateType
      }
    }
  }
`

export const ADD_TODO_ASSIGN = gql`
  mutation AddTodoAssign(
    $id: ID!
    $desc: String!
    $assignUsers: [ID]!
    $notifyUsers: [ID]
    $specDate: String
    $startDate: String
    $endDate: String
    $extra: String
    $isActive: Boolean
    $dueDateType: String
  ) {
    addTodoAssign(
      id: $id
      desc: $desc
      assignUsers: $assignUsers
      notifyUsers: $notifyUsers
      specDate: $specDate
      startDate: $startDate
      endDate: $endDate
      extra: $extra
      isActive: $isActive
      dueDateType: $dueDateType
    ) {
      _id
      name
      detail
      projectId
      assign {
        desc
        assignUsers {
          _id
          username
          email
        }
        notifyUsers {
          _id
          username
          email
        }
        specDate
        startDate
        endDate
        extra
        isActive
        dueDateType
      }
    }
  }
`
export const PROJECT_TODO_BY_ID = gql`
  query HasProjectTodoById($_id: ID!) {
    hasProjectTodoById(_id: $_id) {
      _id
      name
      detail
      assign {
        desc
        assignUsers {
          _id
          username
          email
        }
        notifyUsers {
          _id
          username
          email
        }
        specDate
        startDate
        endDate
        extra
        isActive
        dueDateType
      }
      comment {
        _id
        createdBy {
          _id
          username
          email
        }
        content
        createdDate
      }
    }
  }
`

export const ADD_TODO_COMMENT = gql`
  mutation AddTodoComment($id: ID!, $content: String, $createdBy: ID!) {
    addTodoComment(id: $id, content: $content, createdBy: $createdBy) {
      _id
      content
      createdBy {
        _id
        username
        email
      }
      createdDate
    }
  }
`
