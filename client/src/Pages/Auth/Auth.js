import React from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'

import bgImage from '../../media/header-bg.png'
import Info from '../../components/Auth/Info/Info'
import SignUp from '../../containers/Auth/SignUp/SignUp'
import { SignIn } from '../../containers/Auth/'
import classes from './Auth.module.scss'

class AuthPage extends React.Component {
  render() {
    const style = {
      backgroundImage: `url(${bgImage})`
    }
    return (
      <section className={classes.AuthPage}>
        <div style={style} className={classes.Background} />
        <Grid container alignContent="center">
          <Grid item sm={5} xs={12}>
            <div className={classes.AuthContent}>
              {!this.props.isSignUp ? <SignIn /> : <SignUp />}
            </div>
          </Grid>
          <Grid item sm={7} xs={12} className={classes.AuthInfo}>
            <Info />
          </Grid>
        </Grid>
      </section>
    )
  }
}
const mapStateToProps = state => {
  return {
    isSignUp: state.auth.isSignUp
  }
}

export default connect(mapStateToProps)(AuthPage)
