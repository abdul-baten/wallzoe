import React from 'react'
import { ApolloConsumer, Mutation, Query } from 'react-apollo'
import { isEmpty } from 'lodash'

import { cache, ADD_PROJECT, PROJECTS_BY_USERID } from '../../graphql'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'

import { faBars, faTh } from '@fortawesome/free-solid-svg-icons'

import AddNewDialog from './Dialogs/AddNewDialog'
import ProjectCardList from './ProjectCardList/index'

import FontAwesome from '../UI/Icons/FontAwesome/FontAwesome'
import classes from './index.module.scss'

class ProjectManage extends React.Component {
  render() {
    const {
      openNewDialog,
      isCardFormat,
      isListFormat,
      addProjectName,
      _handleClickNewOpen,
      _handleClickNewClose,
      _handleClickCard,
      _handleClickList,
      _handleNewProject,
      _handleAddProjectNameChange,
      _handleAddProjectNameValidation
    } = this.props
    const signinUser = JSON.parse(localStorage.getItem('user'))
    let projectArray = []
    return (
      <div className={classes.panel}>
        <ApolloConsumer>
          {client => (
            <Mutation
              mutation={ADD_PROJECT}
              onCompleted={data => {
                if (isEmpty(data.addProject)) return false
                _handleClickNewClose()
                projectArray.push(data.addProject)
                cache.writeData({
                  data: { hasProjectByUserId: projectArray }
                })
              }}
            >
              {(addProject, { loading, error }) => {
                if (error) return error
                return (
                  <AddNewDialog
                    open={openNewDialog}
                    onClose={_handleClickNewClose}
                    addProject={addProject}
                    addProjectName={addProjectName}
                    onNewProjectHandler={_handleNewProject}
                    onAddProjectNameChangeHandler={_handleAddProjectNameChange}
                    onAddProjectNameValidationHandler={_handleAddProjectNameValidation}
                  />
                )
              }}
            </Mutation>
          )}
        </ApolloConsumer>
        <section>
          <header className={classes.centered}>
            <h3 className={classes.title}>
              <span>Projects</span>
            </h3>
            <div className={`${classes.projectToolbar} ${classes.projectToolbarNew}`}>
              <Button
                className={`${classes.projectBtn} ${classes.projectBtnNew}`}
                onClick={_handleClickNewOpen}
              >
                New
              </Button>
            </div>
            <div className={classes.projectToolbar}>
              <Button
                className={`${classes.projectBtn} ${classes.projectBtnSlide} ${isCardFormat && classes.projectBtnSlideActive}`}
                onClick={_handleClickCard}
              >
                <FontAwesome icon={faTh} />
              </Button>
              <Button
                className={`${classes.projectBtn} ${classes.projectBtnSlide} ${isListFormat && classes.projectBtnSlideActive}`}
                onClick={_handleClickList}
              >
                <FontAwesome icon={faBars} />
              </Button>
            </div>
          </header>
          <ApolloConsumer>
            {client => (
              <Query query={PROJECTS_BY_USERID} variables={{ createdBy: signinUser._id}}>
                {({ data, loading, error }) => {
                  if (error) return false
                  if (!isEmpty(data)) {
                    projectArray = data.hasProjectByUserId
                    return (
                      <Grid container justify='center'>
                        <Grid item xs={12}>
                          <Grid container spacing={32}>
                            <ProjectCardList
                              data={data.hasProjectByUserId}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  } else {
                    projectArray = []
                    return (
                      <div />
                    )
                  }
                }}
              </Query>
            )}
          </ApolloConsumer>
          <hr className="projectEndLine"/>
        </section>
      </div>
    )
  }
}

export default ProjectManage;