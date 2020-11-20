import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { adopt } from 'react-adopt'
import { ApolloConsumer, Mutation, Query } from 'react-apollo'
import { cache, ADD_TODO, TODO_LIST_BY_PROJECTID, ALL_USERS } from '../../../../graphql'

import { isEmpty } from 'lodash'

import TodoList from './TodoList'
import { ProjectTodoNameField } from '../../../InputFields'

import Collapse from '@material-ui/core/Collapse';

import FontAwesome from "../../../UI/Icons/FontAwesome/FontAwesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import classes from './index.module.scss'

import WysiwygEditor from '../../../WYSIWYG/index'

class ProjectToDo extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      todoListExpanded: false,
      extraExpanded: false,
      model: ''
    }
  }

  handleExtraExpandClick = () => {
    this.setState({
      extraExpanded: !this.state.extraExpanded
    })
  }

  handleTodoListExpandClick = () => {
    this.setState({
      todoListExpanded: !this.state.todoListExpanded
    })
  }

  handleModelChange = (model) => {
    this.setState({
      model: model
    });
  }

  _resetTodoList = () => {
    this.setState({
      model: '',
      todoListExpanded: false
    })
  }

  render () {
    const { extraExpanded, todoListExpanded, model } = this.state
    const { addTodoHandler, addTodoAssignHandler } = this.props
    const pathArray = this.props.location.pathname.split('/')
    const projectPath = '/' + pathArray[1] + '/' + pathArray[2]
    const projectId = pathArray[2]
    let todoList = []
    let userList = []
    const Composed = adopt({
      todoListQuery: ({ render }) => (
        <Query query={TODO_LIST_BY_PROJECTID} variables={{ projectId: this.props.location.pathname.split('/')[2] }}>
          {render}
        </Query>
      ),
      usersQuery: ({ render }) => (
        <Query query={ALL_USERS}>
          {render}
        </Query>
      )
    })
    return (
      <React.Fragment>
        <div className={classes.panelBreadCrumb}>
          <Link to='/projects'>
            <div className={classes.breadCrumbItem}>
              <span className={classes.breadCrumbName}>
                <span>Projects</span>
              </span>
            </div>
          </Link>
          <Link to={projectPath}>
            <div className={classes.breadCrumbItem}>
              <span className={classes.breadCrumbName}>
                <span>{localStorage.getItem('selectedProjectName')}</span>
              </span>
            </div>
          </Link>
        </div>
        <div className={classes.panelTodo}>
          <header className={classes.header}>
            <h1 className={classes.title}>
              <span>To-dos</span>
            </h1>
            <label className={classes.todoNewList}>
              <button
                className={classes.todoFormInputSubmit}
                onClick={this.handleTodoListExpandClick}
              >
                <FontAwesome icon={faPlus} />
                &nbsp;&nbsp;New list
              </button>
            </label>
          </header>
          <Collapse
            in={todoListExpanded}
            timeout='auto'
            unmountOnExit
          >
            <div className={classes.todoForm}>
              <ApolloConsumer>
                {client => (
                  <Mutation
                    mutation={ADD_TODO}
                    onCompleted={data => {
                      if (isEmpty(data.addTodo)) return false
                      this._resetTodoList()
                      todoList.push(data.addTodo)
                      cache.writeData({
                        data: { hasTodoListByProjectId: todoList }
                      })
                    }}
                  >
                    {(addTodo, { loading, error }) => {
                      if (error) return error
                      return (
                        <form
                          autoComplete="off"
                          onSubmit={(event) => addTodoHandler(addTodo, projectId, model, event)}
                          noValidate
                        >
                          <header className={classes.todoFormHeader}>
                            <h3>
                              <ProjectTodoNameField />
                            </h3>
                          </header>
                          <section className={classes.todoFormDetails}>
                            <div className={classes.todoFormDesc}>
                              <div
                                className={`${extraExpanded ? classes.expanded : classes.collapsed}`}
                              >
                                <input
                                  className={classes.todoFormInputAddDetail}
                                  type='text'
                                  placeholder='Add extra details or attach a file...'
                                  readOnly
                                  onClick={this.handleExtraExpandClick}
                                />
                              </div>
                              <Collapse
                                in={extraExpanded}
                                timeout='auto'
                                unmountOnExit
                              >
                                <div>
                                  <WysiwygEditor
                                    model={model}
                                    onModelChange={this.handleModelChange}
                                  />
                                </div>
                              </Collapse>
                            </div>
                            <div className={classes.todoFormSubmit}>
                              <input
                                className={classes.todoFormInputSubmit}
                                type='submit'
                                value='Add this list'
                              />
                              <button
                                type='button'
                                className={classes.todoFormCancelBtn}
                                onClick={this.handleTodoListExpandClick}
                              >
                                Cancel
                              </button>
                            </div>
                          </section>
                        </form>
                      )
                    }}
                  </Mutation>
                )}
              </ApolloConsumer>
            </div>
          </Collapse>
          <div className={classes.todoList}>
            <ApolloConsumer>
              {client => (
                <Composed>
                  {({ todoListQuery, usersQuery}) => {
                    if (todoListQuery.loading || usersQuery.loading) return <span>loading....</span>
                    if (todoListQuery.error || usersQuery.error) return false
                    todoList = todoListQuery.data.hasTodoListByProjectId
                    usersQuery.data.hasAllUsers.forEach(item => {
                      userList.push({
                        label: item.username,
                        value: item._id
                      })
                    })
                    return (
                      <TodoList
                        data={todoList}
                        users={userList}
                        addTodoAssignHandler={addTodoAssignHandler}
                      />
                    )
                  }}
                </Composed>
              )}
            </ApolloConsumer>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(ProjectToDo)