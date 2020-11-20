import React from 'react'
import { ApolloConsumer, Query } from 'react-apollo'

import { PROJECT_TODO_BY_ID } from '../../../../graphql'
import { validate } from '../../../../inputField/'
import ProjectTodoConsole from '../../../../components/ProjectManage/Project/ProjectTodo/detail'

class ProjectTodoDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openEditProjectTodoDialog: false,
      openDeleteProjectTodoDialog: false,
      editProjectTodoName: {
        value: '',
        isValid: true,
        errMsg: ''
      }
    }
  }

  _handleEditProjectTodoDialogOpen = () => {
    this.setState({
      openEditProjectTodoDialog: true
    })
  }

  _handleEditProjectTodoDialogClose = () => {
    this.setState({
      openEditProjectTodoDialog: false
    })
  }

  _handleDeleteProjectTodoDialogOpen = () => {
    this.setState({
      openDeleteProjectTodoDialog: true
    })
  }

  _handleDeleteProjectTodoDialogClose = () => {
    this.setState({
      openDeleteProjectTodoDialog: false
    })
  }

  _handleDeleteProjectTodo = (deleteProjectTodo, id, isDelete, event) => {
    event.preventDefault()

    deleteProjectTodo({
      variables: {
        id,
        isDelete
      }
    })
  }

  _handleEditProjectTodo = (editTodo, descModel, id, event) => {
    event.preventDefault()

    const { editProjectTodoName } = this.state

    if (editProjectTodoName.isValid) {
      editTodo({
        variables: {
          name: editProjectTodoName.value,
          detail: descModel,
          id
        }
      })
    }
  }

  _handleFillWithValue = (value) => {
    this.setState((prevState) => {
      return {
        editProjectTodoName: {
          ...prevState.editProjectTodoName,
          isValid: true,
          value
        } 
      }  
    })
  }

  _handleEditProjectTodoNameChange = (event) => {
    const value = event.target.value
    this.setState((prevState) => {
      return {
        editProjectTodoName: {
          ...prevState.editProjectTodoName,
          isValid: true,
          value
        } 
      }  
    })
  }

  _handleEditProjectTodoNameValidation = async() => {
    const { editProjectTodoName } = this.state
    const validation = await validate(editProjectTodoName.value, 'projectTodoName', {required: true, isEdit: true})
    if (validation !== true) {
      this.setState((prevState) => {
        return {
          editProjectTodoName: {
            ...prevState.editProjectTodoName,
            isValid: false,
            errMsg: validation
          }
        }
      })
    }
  }

  _handleSaveTodoComment = (addTodoComment, params, event) => {
    event.preventDefault()
    addTodoComment({
      variables: params
    })
  }

  render () {
    const Id = window.location.pathname.split('/')[4]
    const { openEditProjectTodoDialog, openDeleteProjectTodoDialog, editProjectTodoName } = this.state

    return (
      <ApolloConsumer>
        {client => (
          <Query query={PROJECT_TODO_BY_ID} variables={{ _id: Id}}>
            {({ data, loading, error }) => {
              if (error) return false
              if (loading) return (<div>loading...</div>)
              return (
                <ProjectTodoConsole
                  data={data.hasProjectTodoById}
                  openEditProjectTodoDialog={openEditProjectTodoDialog}
                  openDeleteProjectTodoDialog={openDeleteProjectTodoDialog}
                  editProjectTodoName={editProjectTodoName}
                  _handleEditProjectTodo={this._handleEditProjectTodo}
                  _handleDeleteProjectTodo={this._handleDeleteProjectTodo}
                  _handleEditProjectTodoDialogOpen={this._handleEditProjectTodoDialogOpen}
                  _handleDeleteProjectTodoDialogOpen={this._handleDeleteProjectTodoDialogOpen}
                  _handleEditProjectTodoDialogClose={this._handleEditProjectTodoDialogClose}
                  _handleDeleteProjectTodoDialogClose={this._handleDeleteProjectTodoDialogClose}
                  _handleEditProjectTodoNameChange={this._handleEditProjectTodoNameChange}
                  _handleEditProjectTodoNameValidation={this._handleEditProjectTodoNameValidation}
                  _handleFillWithValue={this._handleFillWithValue}
                  _handleSaveTodoComment={this._handleSaveTodoComment}
                />
              )
            }}
          </Query>
        )}
      </ApolloConsumer>
    )
  }
}

export default ProjectTodoDetail