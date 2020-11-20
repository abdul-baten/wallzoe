import React from 'react'
import { Link } from 'react-router-dom'

import { ApolloConsumer, Mutation } from 'react-apollo'
import { cache, EDIT_PROJECT, DELETE_PROJECT } from '../../../graphql'
import { isEmpty } from 'lodash'

import Grid from '@material-ui/core/Grid'

import ProjectTypeCardList from './ProjectTypeCardList'
import EditProjectDialog from '../Dialogs/EditProjectDialog'
import DeleteProjectDialog from '../Dialogs/DeleteProjectDialog'

import classes from './index.module.scss'

import projectType from '../../../config/projectType.json'

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isActionSheetOpen: false
    }
  }

  _handleActionSheet = () => {
    this.setState({
      isActionSheetOpen: !this.state.isActionSheetOpen
    })
  }

  _redirectToProject = () => {
    window.location.href = "/projects"
  }
  render () {
    const { 
      data,
      openEditProjectDialog,
      openDeleteProjectDialog,
      editProjectName,
      _handleEditProject,
      _handleDeleteProject,
      _handleEditProjectDialogOpen,
      _handleDeleteProjectDialogOpen,
      _handleEditProjectDialogClose,
      _handleDeleteProjectDialogClose,
      _handleEditProjectNameChange,
      _handleEditProjectNameValidation,
      _handleFillWithValue
    } = this.props
    return (
      <React.Fragment>
        <ApolloConsumer>
          {client => (
            <Mutation
              mutation={EDIT_PROJECT}
              onCompleted={data => {
                if (isEmpty(data.editProject)) return false
                _handleEditProjectDialogClose()
                this._handleActionSheet()
                cache.writeData({
                  data: { hasProjectById: data.editProject }
                })
              }}
            >
              {(editProject, { loading, error }) => {
                if (error) return error
                return (
                  <EditProjectDialog
                    open={openEditProjectDialog}
                    onClose={_handleEditProjectDialogClose}
                    editProject={editProject}
                    onEditProjectHandler={_handleEditProject}
                    data={data}
                    editProjectName={editProjectName}
                    onEditProjectNameChangeHandler={_handleEditProjectNameChange}
                    onEditProjectNameValidationHandler={_handleEditProjectNameValidation}
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
              mutation={DELETE_PROJECT}
              onCompleted={data => {
                if (isEmpty(data.deleteProject)) return false
                _handleDeleteProjectDialogClose()
                this._handleActionSheet()
                this._redirectToProject()
              }}
            >
              {(deleteProject, { loading, error }) => {
                if (error) return error
                return (
                  <DeleteProjectDialog
                    open={openDeleteProjectDialog}
                    onClose={_handleDeleteProjectDialogClose}
                    deleteProject={deleteProject}
                    onDeleteProjectHandler={_handleDeleteProject}
                    data={data}
                  />
                )
              }}
            </Mutation>
          )}
        </ApolloConsumer>
        <div className={classes.panelBreadCrumb}>
          <Link to='/projects'>
            <div className={classes.breadCrumbItem}>
              <span className={classes.breadCrumbName}>
                <span>Projects</span>
              </span>
            </div>
          </Link>
        </div>
        <div className={classes.panelProject}>
          <aside className={classes.permaToolbar}>
            <div>
              <button
                type="button"
                className={classes.overflowBtn}
                onClick={this._handleActionSheet}
               />
              <div className={`${classes.actionSheet} ${this.state.isActionSheetOpen ? classes.actionSheetOpen : classes.actionSheetClose}`}>
                <button
                  type="button"
                  className={classes.closeBtn}
                  onClick={this._handleActionSheet}
                />
                <div className={classes.actionEdit} onClick={_handleEditProjectDialogOpen}>
                  Edit name, description
                </div>
                <div className={classes.actionDel} onClick={_handleDeleteProjectDialogOpen}>
                  Archive or delete
                </div>
              </div>
            </div>
          </aside>
          <header className={classes.projectHeader}>
            <div className={classes.projectHeaderDetail}>
              <h1 className={classes.projectHeaderTitle}>
                {data.name}
              </h1>
            </div>
          </header>
          <section className={classes.projectDock}>
            <Grid container justify='center'>
              <Grid item xs={12}>
                <Grid container spacing={32}>
                  <ProjectTypeCardList
                    data={projectType}
                  />
                </Grid>
              </Grid>
            </Grid>          
          </section>
          <h3 className={classes.projectActivityName}>
            <span>Project Activity</span>
          </h3>
        </div>
      </React.Fragment>
    )
  }
}

export default Project