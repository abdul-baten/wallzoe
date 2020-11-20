import React from 'react'
import { startCase } from 'lodash'

import accountsInfo from '../../../../config/accounts'
import { SERVER_HOST_URL } from '../../../../config'

import { FAIcon } from '../../../UI'
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'
export default [
  {
    label: startCase(`${accountsInfo.facebook.provider} Page`),
    link: SERVER_HOST_URL + accountsInfo.facebook.pageAuthPath,
    icon: <FAIcon icon={faFacebookF} />,
    backColor: accountsInfo.facebook.brandColor
  },
  {
    label: startCase(accountsInfo.instagram.provider),
    link: SERVER_HOST_URL + accountsInfo.instagram.callbackPath,
    icon: <FAIcon icon={faInstagram} />,
    backColor: accountsInfo.instagram.brandColor
  },
  {
    label: startCase(`${accountsInfo.linkedin.provider} Page`),
    link: SERVER_HOST_URL + accountsInfo.linkedin.callbackPath,
    icon: <FAIcon icon={faLinkedin} />,
    backColor: accountsInfo.linkedin.brandColor
  },
  {
    label: startCase(`${accountsInfo.facebook.provider} Group`),
    link: SERVER_HOST_URL + accountsInfo.facebook.groupAuthPath,
    icon: <FAIcon icon={faFacebookF} />,
    backColor: accountsInfo.facebook.brandColor
  },
  {
    label: startCase(accountsInfo.twitter.provider),
    link: SERVER_HOST_URL + accountsInfo.twitter.callbackPath,
    icon: <FAIcon icon={faTwitter} />,
    backColor: accountsInfo.twitter.brandColor
  },
  {
    label: startCase(`${accountsInfo.linkedin.provider} Profile`),
    link: SERVER_HOST_URL + accountsInfo.linkedin.callbackPath,
    icon: <FAIcon icon={faLinkedin} />,
    backColor: accountsInfo.linkedin.brandColor
  }
]
