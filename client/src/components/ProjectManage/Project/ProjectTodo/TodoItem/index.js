import React from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { cache, ADD_TODO_ASSIGN } from '../../../../../graphql'

import { isEmpty } from 'lodash'

import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'

import Select from 'react-select'

import _classes from './index.module.scss'

import TodoAssignList from './TodoAssignList'
import DatePicker from '../../../../Pickers/datePicker'
import WysiwygEditor from '../../../../WYSIWYG/index'

class TodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      expanded: false,
      assignData: {
        desc: '',
        specDate: new Date(),
        multiFromDate: new Date(),
        multiToDate: new Date(),
        extra: '',
        assignUsers: [],
        notifyUsers: [],
        dueDateValue: '0'
      }
    }
  }

  handleExpandClick = e => {
    e.preventDefault()
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleDueRadioChange = e => {
    const dueDateValue = e.target.value
    this.setState(prevState => ({
      assignData: {
        ...prevState.assignData,
        dueDateValue
      }
    }))
  }

  handleSpecDateChange = (date, type) => {
    switch (type) {
      case 0:
        this.setState(prevState => ({
          assignData: {
            ...prevState.assignData,
            specDate: date
          }
        }))
        break
      case 1:
        this.setState(prevState => ({
          assignData: {
            ...prevState.assignData,
            multiFromDate: date
          }
        }))
        break
      case 2:
        this.setState(prevState => ({
          assignData: {
            ...prevState.assignData,
            multiToDate: date
          }
        }))
        break
      default:
        break
    }
  }

  handleModelChange = (model) => {
    this.setState(prevState => ({
      assignData: {
        ...prevState.assignData,
        extra: model
      }
    }))
  }

  hangleDescChange = e => {
    const desc = e.target.value
    this.setState(prevState => ({
      assignData: {
        ...prevState.assignData,
        desc
      }
    }))
  }

  onAssignUserHandler = value => {
    this.setState(prevState => ({
      assignData: {
        ...prevState.assignData,
        assignUsers: value
      }
    }))
  }

  onNotifyUsersHandler = value => {
    this.setState(prevState => ({
      assignData: {
        ...prevState.assignData,
        notifyUsers: value
      }
    }))
  }

  render() {
    const { title, desc, users, id, addTodoAssignHandler, assign } = this.props
    const { expanded, assignData } = this.state
    const currentUrl = window.location.pathname
    
    return (
      <div className={_classes.todoItem}>
        <header className={_classes.header}>
          <h3 className={_classes.title}>
            <Link className={_classes.permaLink} to={currentUrl + '/' + id}>
              {title}
            </Link>
          </h3>
          {ReactHtmlParser(desc)}
        </header>
        <TodoAssignList
          data={assign}
        />
        <Collapse
          in={expanded}
          timeout='auto'
          unmountOnExit
        >
          <div className={_classes.assignForm}>
            <ApolloConsumer>
              {client => (
                <Mutation
                  mutation={ADD_TODO_ASSIGN}
                  onCompleted={data => {
                    if (isEmpty(data.addTodoAssign)) return false
                    cache.writeData({
                      data: { hasTodoListByProjectId: data.addTodoAssign }
                    })
                  }}
                >
                  {(addTodoAssign, { loading, error }) => {
                    if (error) return error
                    return (
                      <div>
                        <header className={_classes.todoHeader}>
                          <TextField
                            autoFocus
                            fullWidth
                            margin="dense"
                            id="todo-desc"
                            label="Describe this to-do..."
                            type="text"
                            value={assignData.desc}
                            onChange={this.hangleDescChange}
                          />
                        </header>
                        <section className={_classes.todoDetail}>
                          <div className={_classes.todoField}>
                            <label htmlFor="todos-assign" className={_classes.todoFieldLabel}>
                              Assigned to
                            </label>
                            <div className={_classes.todoFieldContent}>
                              <Select
                                isMulti
                                options={users}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Type names to assign..."
                                value={assignData.assignUsers}
                                onChange={this.onAssignUserHandler}
                              />
                            </div>
                          </div>
                          <div className={_classes.todoField}>
                            <label htmlFor="todos-assign" className={_classes.todoFieldLabel}>
                              When done, notify
                            </label>
                            <div className={_classes.todoFieldContent}>
                              <Select
                                isMulti
                                options={users}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Type names to notify..."
                                value={assignData.notifyUsers}
                                onChange={this.onNotifyUsersHandler}
                              />
                            </div>
                          </div>
                          <div className={_classes.todoField}>
                            <label htmlFor="todos-assign" className={_classes.todoFieldLabel}>
                              Due on
                            </label>
                            <div className={_classes.todoFieldContent}>
                              <div className={_classes.todoMultiDateContent}>
                                <Radio
                                  checked={assignData.dueDateValue === '0'}
                                  onChange={this.handleDueRadioChange}
                                  value="0"
                                  name="radio-button-demo"
                                  inputProps={{ 'aria-label': 'A' }}
                                />
                                <span>No due date</span> 
                              </div>
                              <div className={_classes.todoMultiDateContent}>
                                <Radio
                                  checked={assignData.dueDateValue === '1'}
                                  onChange={this.handleDueRadioChange}
                                  value="1"
                                  name="radio-button-demo"
                                  inputProps={{ 'aria-label': 'B' }}
                                />
                                {
                                  assignData.dueDateValue === '1'
                                  ? <DatePicker
                                      selectedDateTime={assignData.specDate}
                                      handleDateTimeChange={dateTime =>
                                        this.handleSpecDateChange(dateTime, 0)
                                      }
                                    />
                                  : "A special day"
                                }
                              </div>
                              <div className={_classes.todoMultiDateContent}>
                                <Radio
                                  checked={assignData.dueDateValue === '2'}
                                  onChange={this.handleDueRadioChange}
                                  value="2"
                                  name="radio-button-demo"
                                  inputProps={{ 'aria-label': 'C' }}
                                />
                                {
                                  assignData.dueDateValue === '2'
                                  ?
                                    <div className={_classes.todoMultiDateContent}>
                                      <DatePicker
                                        selectedDateTime={assignData.multiFromDate}
                                        handleDateTimeChange={dateTime =>
                                          this.handleSpecDateChange(dateTime, 1)
                                        }
                                      />
                                      &nbsp;To&nbsp;
                                      <DatePicker
                                        selectedDateTime={assignData.multiToDate}
                                        handleDateTimeChange={dateTime =>
                                          this.handleSpecDateChange(dateTime, 2)
                                        }
                                      />
                                    </div>
                                  : "Runs for multiple days"
                                }
                              </div>
                            </div>
                          </div>
                          <div className={_classes.todoField}>
                            <WysiwygEditor
                              model={assignData.extra}
                              onModelChange={this.handleModelChange}
                            />
                          </div>
                          <div className={_classes.todoSubmitField}>
                            <button
                              className={_classes.todoFormInputSubmit}
                              type='button'
                              onClick={(event) => addTodoAssignHandler(addTodoAssign, id, assignData, event)}
                            >
                              Add this to-do
                            </button>
                            <button
                              className={_classes.todoFormCancelBtn}
                              onClick={this.handleExpandClick}
                            >
                              Cancel
                            </button>
                          </div>
                        </section>
                      </div>
                    )
                  }}
                </Mutation>
              )}
            </ApolloConsumer>
          </div>
        </Collapse>
        {
          !expanded &&
          <div className={_classes.todoItemActions}>
            <button
              className={_classes.todoItemAddButton}
              onClick={this.handleExpandClick}
            >
              Add a to-do
            </button>
          </div>
        }
      </div>
    )
  }
}

export default TodoItem