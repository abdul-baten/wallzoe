import React from 'react'
import { connect } from 'react-redux'

import { startCase, upperFirst } from 'lodash'

import { setProjectTodoName } from '../../../../store/actions'
import ProjectTodoConsole from '../../../../components/ProjectManage/Project/ProjectTodo'

class ProjectTodo extends React.Component {

  addTodoHandler = (addTodo, projectId, model, event) => {
    event.preventDefault()
    const { projectTodoName } = this.props
    if (projectTodoName.isValid) {
      const requiredFields = { projectTodoName: projectTodoName.value }
      for (let fieldName in requiredFields) {
        if (!requiredFields[fieldName]) {
          const setterMethodName = `set${upperFirst(fieldName)}`
          this.props[setterMethodName]({
            value: '',
            isValid: false,
            errMsg: `${startCase(fieldName)} is required`
          })
        }
      }
  
      if (!this.isValidFields()) return false
  
      addTodo({
        variables: {
          name: projectTodoName.value,
          detail: model,
          projectId
        }
      })
    }
  }

  addTodoAssignHandler = (addTodoAssign, id, assignData, event) => {
    event.preventDefault()
    let assignUsers=[], notifyUsers=[]
    assignData.assignUsers.forEach(item => {
      assignUsers.push(item.value)
    })
    assignData.notifyUsers.forEach(item => {
      notifyUsers.push(item.value)
    })

    addTodoAssign({
      variables: {
        id,
        desc: assignData.desc,
        assignUsers,
        notifyUsers,
        specDate: assignData.dueDateValue === '1' ? assignData.specDate : null,
        startDate: assignData.dueDateValue === '2' ? assignData.multiFromDate : null,
        endDate: assignData.dueDateValue === '2' ? assignData.multiToDate : null,
        extra: assignData.extra,
        isActive: false,
        dueDateType: assignData.dueDateValue
      }
    })
  }

  isValidFields = () => {
    if (
      this.props.projectTodoName.value
    ) {
      return true
    }
    return false
  }

  render () {
    return (
      <ProjectTodoConsole
        addTodoHandler={this.addTodoHandler}
        addTodoAssignHandler={this.addTodoAssignHandler}
      />
    )
  }
}

const mapStateToProps = state => ({
  projectTodoName: state.project.projectTodoName
})

const mapDispatchToProps = dispatch => {
  return {
    setProjectTodoName: projectTodoName => dispatch(setProjectTodoName(projectTodoName)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTodo)