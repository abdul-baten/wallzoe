import React from 'react'
import { Link } from 'react-router-dom'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { cache, ADD_TODO_COMMENT, EDIT_TODO, DELETE_TODO } from '../../../../graphql'
import ReactHtmlParser from 'react-html-parser'
import { isEmpty } from 'lodash'

import Collapse from '@material-ui/core/Collapse';

import TodoAssignList from './TodoItem/TodoAssignList/'
import TodoCommentList from './TodoCommentList/'
import WysiwygEditor from '../../../WYSIWYG/index'
import EditProjectTodoDialog from '../../Dialogs/EditProjectTodoDialog'
import DeleteProjectTodoDialog from '../../Dialogs/DeleteProjectTodoDialog'

import './detail.scss'

class ProjectToDoDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isActionSheetOpen: false,
      commentExpanded: false,
      commentModel: ''
    }
  }

  _handleModelChange = (model) => {
    this.setState({
      commentModel: model
    });
  }

  _handleCommentExpandClick = () => {
    this.setState({
      commentExpanded: !this.state.commentExpanded
    })
  }

  _handleActionSheet = () => {
    this.setState({
      isActionSheetOpen: !this.state.isActionSheetOpen
    })
  }

  _resetCommentForm = () => {
    this.setState({
      commentExpanded: false,
      commentModel: ''
    })
  }

  _redirectToProject = () => {
    window.location.href = "/projects"
  }

  render () {
    const pathArray = window.location.pathname.split('/')
    const projectPath = '/' + pathArray[1] + '/' + pathArray[2]
    const projectTodoPath = '/' + pathArray[1] + '/' + pathArray[2] + '/' + pathArray[3]
    const signInUser = JSON.parse(localStorage.getItem('user'))

    const {
      data,
      openEditProjectTodoDialog,
      openDeleteProjectTodoDialog,
      editProjectTodoName,
      _handleEditProjectTodo,
      _handleDeleteProjectTodo,
      _handleEditProjectTodoDialogOpen,
      _handleDeleteProjectTodoDialogOpen,
      _handleEditProjectTodoDialogClose,
      _handleDeleteProjectTodoDialogClose,
      _handleEditProjectTodoNameChange,
      _handleEditProjectTodoNameValidation,
      _handleFillWithValue,
      _handleSaveTodoComment
    } = this.props
    const { isActionSheetOpen, commentExpanded, commentModel } = this.state
    return (
      <React.Fragment>
        <ApolloConsumer>
          {client => (
            <Mutation
              mutation={EDIT_TODO}
              onCompleted={data => {
                if (isEmpty(data.editTodo)) return false
                _handleEditProjectTodoDialogClose()
                this._handleActionSheet()
                cache.writeData({
                  data: { hasProjectTodoById: data.editTodo }
                })
              }}
            >
              {(editTodo, { loading, error }) => {
                if (error) return error
                return (
                  <EditProjectTodoDialog
                    open={openEditProjectTodoDialog}
                    onClose={_handleEditProjectTodoDialogClose}
                    editTodo={editTodo}
                    onEditProjectTodoHandler={_handleEditProjectTodo}
                    data={data}
                    editProjectTodoName={editProjectTodoName}
                    onEditProjectTodoNameChangeHandler={_handleEditProjectTodoNameChange}
                    onEditProjectTodoNameValidationHandler={_handleEditProjectTodoNameValidation}
                    onFillWithValueHandler={_handleFillWithValue}
                  />
                )
              }}
            </Mutation>
          )}
        </ApolloConsumer>
        <ApolloConsumer>
          {client => (
            <Mutation
              mutation={DELETE_TODO}
              onCompleted={data => {
                if (isEmpty(data.deleteTodo)) return false
                _handleDeleteProjectTodoDialogClose()
                this._handleActionSheet()
                this._redirectToProject()
              }}
            >
              {(deleteTodo, { loading, error }) => {
                if (error) return error
                return (
                  <DeleteProjectTodoDialog
                    open={openDeleteProjectTodoDialog}
                    onClose={_handleDeleteProjectTodoDialogClose}
                    deleteTodo={deleteTodo}
                    onDeleteProjectTodoHandler={_handleDeleteProjectTodo}
                    data={data}
                  />
                )
              }}
            </Mutation>
          )}
        </ApolloConsumer>
        <div className='panel-bread-crumb'>
          <Link to='/projects'>
            <div className='panel-bread-crumb_item'>
              <span className='panel-bread-crumb-name'>
                <span>Projects</span>
              </span>
            </div>
          </Link>
          <Link to={projectPath}>
            <div className='panel-bread-crumb_item'>
              <span className='panel-bread-crumb-name'>
                <span>{localStorage.getItem('selectedProjectName')}</span>
              </span>
            </div>
          </Link>
          <Link to={projectTodoPath}>
            <div className='panel-bread-crumb_item'>
              <span className='panel-bread-crumb-name'>
                <span>To-dos</span>
              </span>
            </div>
          </Link>
        </div>
        <div className='panel-todolist'>
          <aside className='perma-toolbar'>
            <div>
              <button
                type="button"
                className='perma-toolbar_overflow__btn'
                onClick={this._handleActionSheet}
               />
              <div className={`perma-toolbar_actionsheet ${isActionSheetOpen ? 'perma-toolbar_actionsheet__open' : 'perma-toolbar_actionsheet__close'}`}>
                <button
                  type="button"
                  className='close__btn'
                  onClick={this._handleActionSheet}
                />
                <div className='action__edit' onClick={_handleEditProjectTodoDialogOpen}>
                  Edit name, description
                </div>
                <div className='action__del' onClick={_handleDeleteProjectTodoDialogOpen}>
                  Archive or delete
                </div>
              </div>
            </div>
          </aside>
          <header className='todolist__header'>
            <h3 className='todolist__title'>
              { data.name }
            </h3>
            <div className='todolist__description'>
              { ReactHtmlParser(data.detail) }
            </div>
            <TodoAssignList
              data={data.assign}
            />
          </header>
          <div>
            <h2 className='thread__headline'>
              <span>
                {
                  data.comment && data.comment.length > 0 ?
                  <span>
                    <span className='comments-balloon comments-balloon--mega'>
                      {data.comment.length}
                    </span>
                    <span>
                      Comment
                    </span>
                  </span>
                  : <span>Discussion</span>
                }
              </span>
            </h2>
            <div className='thread__comment'>
              <TodoCommentList
                data={data.comment}
              />
            </div>
            <section className='thread__comment thread_entry__form'>
              <div
                className={`${commentExpanded ? 'comment__expanded' : 'comment__collapsed'}`}
              >
                <input
                  className='comment_input__expanded'
                  type='text'
                  placeholder='Add a comment or upload a file...'
                  readOnly
                  onClick={this._handleCommentExpandClick}
                />
              </div>
              <Collapse
                in={commentExpanded}
                timeout='auto'
                unmountOnExit
              >
                <ApolloConsumer>
                  {client => (
                    <Mutation
                      mutation={ADD_TODO_COMMENT}
                      onCompleted={result => {
                        if (isEmpty(result.addTodoComment)) return false
                        data.comment = result.addTodoComment
                        this._resetCommentForm()
                        cache.writeData({
                          data: { hasProjectTodoById: data }
                        })
                      }}
                    >
                      {(addTodoComment, { loading, error }) => {
                        if (error) return error
                        if (loading) return <div>loading...</div>
                        return (
                          <div>
                            <WysiwygEditor
                              model={commentModel}
                              onModelChange={this._handleModelChange}
                            />
                            <div className='comment-submit__buttons'>
                              <input
                                className='form-add__button'
                                type='submit'
                                value='Add this comment'
                                onClick={(e) => _handleSaveTodoComment(addTodoComment, { id: data._id, content: commentModel, createdBy: signInUser._id }, e)}
                              />
                              <button
                                type='button'
                                className='form-cancel__button'
                                onClick={this._handleCommentExpandClick}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )
                      }}
                    </Mutation>
                  )}
                </ApolloConsumer>
              </Collapse>
            </section>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ProjectToDoDetail