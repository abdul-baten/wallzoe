import React from 'react'

import ProjectManageConsole from '../../components/ProjectManage/index'
import { validate } from '../../inputField/'

class ProjectManage extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isCardFormat: true,
      isListFormat: false,
      openNewDialog: false,
      addProjectName: {
        value: '',
        isValid: true,
        errMsg: ''
      }
    }
  }

  _handleClickNewOpen = () => {
    this.setState({
      openNewDialog: true
    })
  }

  _handleClickNewClose = () => {
    this.setState((prevState) => {
      return {
        openNewDialog: false,
        addProjectName: {
          ...prevState.addProjectName,
          isValid: true,
          value: '',
          errMsg: ''
        } 
      }  
    })
  }

  _handleClickCard = () => {
    this.setState({
      isCardFormat: true,
      isListFormat: false
    })
  }

  _handleClickList = () => {
    this.setState({
      isCardFormat: false,
      isListFormat: true
    })
  }

  _handleNewProject = (addProject, event) => {
    event.preventDefault()

    const signinUser = JSON.parse(localStorage.getItem('user'))
    const { addProjectName } = this.state

    if (addProjectName.isValid) {
      addProject({
        variables: {
          name: addProjectName.value,
          createdBy: signinUser._id
        }
      })
    }
  }

  _handleAddProjectNameChange = (event) => {
    const value = event.target.value
    this.setState((prevState) => {
      return {
        addProjectName: {
          ...prevState.addProjectName,
          isValid: true,
          value
        } 
      }  
    })
  }

  _handleAddProjectNameValidation = async() => {
    const { addProjectName } = this.state
    const validation = await validate(addProjectName.value, 'projectName', {required: true, isEdit: false})
    if (validation !== true) {
      this.setState((prevState) => {
        return {
          addProjectName: {
            ...prevState.addProjectName,
            isValid: false,
            errMsg: validation
          }
        }  
      })
    }
  }

  render() {
    const { openNewDialog, isCardFormat, isListFormat, addProjectName } = this.state

    return (
      <ProjectManageConsole
        isCardFormat={isCardFormat}
        isListFormat={isListFormat}
        openNewDialog={openNewDialog}
        addProjectName={addProjectName}
        _handleClickNewOpen={this._handleClickNewOpen}
        _handleClickNewClose={this._handleClickNewClose}
        _handleClickCard={this._handleClickCard}
        _handleClickList={this._handleClickList}
        _handleNewProject={this._handleNewProject}
        _handleProjectNameInput={this._handleProjectNameInput}
        _handleAddProjectNameChange={this._handleAddProjectNameChange}
        _handleAddProjectNameValidation={this._handleAddProjectNameValidation}
      />
    )
  }
}

export default ProjectManage