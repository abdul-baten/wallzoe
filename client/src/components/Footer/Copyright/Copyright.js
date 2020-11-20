import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Copyright.module.scss'

import Logo from '../../Logo/Logo'
import { HOME_URL } from '../../../config'

import ShareBtns from '../ShareBtns/ShareBtns'

const copyright = () => {
  const copySymb = ' ' + String.fromCharCode(169) + ' '
  const copyrightText =
    'Copyright' + copySymb + new Date().getFullYear() + ' wallzoe.com'
  return (
    <div className={classes.FooterCopyright}>
      <div className={classes.FooterLogo}>
        <Link to={HOME_URL}>
          <Logo alt='Footer Logo' />
        </Link>
      </div>
      <ShareBtns />
      <p className={classes.CopyrightText}>{copyrightText}</p>
    </div>
  )
}

export default copyright
