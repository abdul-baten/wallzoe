import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { startCase } from 'lodash'

import { Facebook, Instagram, Twitter, Linkedin } from '../Single/'
import { SMIcon } from '../../../../components'
import {
  setScheduleFor,
  setScheduleId,
  setScheduleToken,
  selectedSMAccount
} from '../../../../store/actions'
import { SCHEDULER_URL } from '../../../../config'

import classes from '../List.module.scss'

class All extends Component {
  selectHandler = async (sType, pageId, accessToken) => {
    await this.props.setScheduleFor({
      value: sType,
      isValid: true,
      errMsg: ''
    })
    await this.props.setScheduleId({
      value: pageId,
      isValid: true,
      errMsg: ''
    })
    await this.props.setScheduleToken({
      value: accessToken,
      isValid: true,
      errMsg: ''
    })
    this.props.history.push(SCHEDULER_URL)
    this.props.selectedSMAccount()
  }

  render() {
    return (
      <div className={classes.AccountList}>
        {this.props.accounts.map(account => {
          switch (account.accountType) {
            case 'facebook-page':
              return account.pages.map(page => {
                return (
                  <Facebook
                    key={page.id}
                    id={page.id}
                    scheduleId={this.props.scheduleId}
                    pictureUrl={page.pictureUrl}
                    name={page.name}
                    subTitle={startCase(account.accountType)}
                    selectHandler={this.selectHandler.bind(
                      this,
                      account.accountType,
                      page.id,
                      page.accessToken
                    )}
                  >
                    <SMIcon
                      size="small"
                      type="facebook-page"
                      right="-10px"
                      top="20px"
                    />
                  </Facebook>
                )
              })
            case 'facebook-group':
              return account.groups.map(group => {
                return (
                  <Facebook
                    key={group.id}
                    id={group.id}
                    scheduleId={this.props.scheduleId}
                    pictureUrl={group.pictureUrl}
                    name={group.name}
                    subTitle={startCase(account.accountType)}
                    selectHandler={this.selectHandler.bind(
                      this,
                      account.accountType,
                      group.id,
                      group.accessToken
                    )}
                  >
                    <SMIcon
                      size="small"
                      type="facebook-group"
                      right="-10px"
                      top="20px"
                    />
                  </Facebook>
                )
              })
            case 'instagram':
              return (
                <Instagram
                  key={account.accountId}
                  accountId={account.accountId}
                  pictureUrl={account.pictureUrl}
                  userName={account.userName}
                  subTitle={'Instagram'}
                  scheduleId={this.props.scheduleId}
                  selectHandler={this.selectHandler.bind(
                    this,
                    account.accountType,
                    account.accountId,
                    account.accessToken
                  )}
                >
                  <SMIcon
                    size="small"
                    type="instagram"
                    right="-10px"
                    top="20px"
                  />
                </Instagram>
              )
            case 'twitter':
              return (
                <Twitter
                  key={account.accountId}
                  accountId={account.accountId}
                  pictureUrl={account.pictureUrl}
                  userName={account.userName}
                  subTitle={'Twitter'}
                  scheduleId={this.props.scheduleId}
                  selectHandler={this.selectHandler.bind(
                    this,
                    account.accountType,
                    account.accountId,
                    account.accessToken
                  )}
                >
                  <SMIcon
                    size="small"
                    type="twitter"
                    right="-10px"
                    top="20px"
                  />
                </Twitter>
              )
            case 'linkedin':
              return (
                <Linkedin
                  key={account.accountId}
                  accountId={account.accountId}
                  pictureUrl={account.pictureUrl}
                  email={account.email}
                  subTitle={'Linkedin'}
                  scheduleId={this.props.scheduleId}
                  selectHandler={this.selectHandler.bind(
                    this,
                    account.accountType,
                    account.accountId,
                    account.accessToken
                  )}
                >
                  <SMIcon
                    size="small"
                    type="linkedin"
                    right="-10px"
                    top="20px"
                  />
                </Linkedin>
              )
            default:
              return ''
          }
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    scheduleId: state.scheduler.scheduleId,
    scheduleFor: state.scheduler.scheduleFor,
    scheduleToken: state.scheduler.scheduleToken
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setScheduleFor: sType => dispatch(setScheduleFor(sType)),
    setScheduleId: id => dispatch(setScheduleId(id)),
    setScheduleToken: token => dispatch(setScheduleToken(token)),
    selectedSMAccount: () => dispatch(selectedSMAccount())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(All))
