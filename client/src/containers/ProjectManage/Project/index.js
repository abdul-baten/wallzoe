import React from 'react'
import { ApolloConsumer, Query } from 'react-apollo'

import { isEmpty } from 'lodash'

import { PROJECTS_BY_ID } from '../../../graphql'

import ProjectConsole from '../../../components/ProjectManage/Project'
import { validate } from '../../../inputField/'

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openEditProjectDialog: false,
      openDeleteProjectDialog: false,
      editProjectName: {
        value: '',
        isValid: true,
        errMsg: ''
      }
    }
  }

  _handleEditProjectDialogOpen = () => {
    this.setState({
      openEditProjectDialog: true
    })
  }

  _handleEditProjectDialogClose = () => {
    this.setState({
      openEditProjectDialog: false
    })
  }

  _handleDeleteProjectDialogOpen = () => {
    this.setState({
      openDeleteProjectDialog: true
    })
  }

  _handleDeleteProjectDialogClose = () => {
    this.setState({
      openDeleteProjectDialog: false
    })
  }

  _handleDeleteProject = (deleteProject, id, isDelete, event) => {
    event.preventDefault()

    deleteProject({
      variables: {
        id,
        isDelete
      }
    })
  }

  _handleEditProject = (editProject, descModel, id, event) => {
    event.preventDefault()

    const { editProjectName } = this.state

    if (editProjectName.isValid) {
      editProject({
        variables: {
          name: editProjectName.value,
          desc: descModel,
          id
        }
      })
    }
  }

  _handleFillWithValue = (value) => {
    this.setState((prevState) => {
      return {
        editProjectName: {
          ...prevState.editProjectName,
          isValid: true,
          value
        } 
      }  
    })
  }

  _handleEditProjectNameChange = (event) => {
    const value = event.target.value
    this.setState((prevState) => {
      return {
        editProjectName: {
          ...prevState.editProjectName,
          isValid: true,
          value
        } 
      }  
    })
  }

  _handleEditProjectNameValidation = async() => {
    const { editProjectName } = this.state
    const validation = await validate(editProjectName.value, 'projectName', {required: true, isEdit: true})
    if (validation !== true) {
      this.setState((prevState) => {
        return {
          editProjectName: {
            ...prevState.editProjectName,
            isValid: false,
            errMsg: validation
          }
        }
      })
    }
  } 

  render () {
    const Id = window.location.pathname.split('/')[2]
    const { openEditProjectDialog, openDeleteProjectDialog,editProjectName } = this.state
    return (
      <ApolloConsumer>
        {client => (
          <Query query={PROJECTS_BY_ID} variables={{ _id: Id}}>
            {({ data, loading, error }) => {
              if (error) return false
              if (!isEmpty(data) && data.hasProjectById) {
                localStorage.setItem('selectedProjectName', data.hasProjectById.name)
                return (
                  <ProjectConsole
                    data={data.hasProjectById}
                    openEditProjectDialog={openEditProjectDialog}
                    openDeleteProjectDialog={openDeleteProjectDialog}
                    editProjectName={editProjectName}
                    _handleEditProject={this._handleEditProject}
                    _handleDeleteProject={this._handleDeleteProject}
                    _handleEditProjectDialogOpen={this._handleEditProjectDialogOpen}
                    _handleDeleteProjectDialogOpen={this._handleDeleteProjectDialogOpen}
                    _handleEditProjectDialogClose={this._handleEditProjectDialogClose}
                    _handleDeleteProjectDialogClose={this._handleDeleteProjectDialogClose}
                    _handleEditProjectNameChange={this._handleEditProjectNameChange}
                    _handleEditProjectNameValidation={this._handleEditProjectNameValidation}
                    _handleFillWithValue={this._handleFillWithValue}
                  />
                )
              } else {
                return <div />
              }
            }}
          </Query>
        )}
        </ApolloConsumer>
    )
  }
}

export default Project