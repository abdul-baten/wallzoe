import React from 'react'
import FAIcon from '../FontAwesome/FontAwesome'
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

import classes from './SocialMedia.module.scss'

export default props => {
  const {
    type,
    size,
    left = 'auto',
    top = 'auto',
    right = 'auto',
    bottom = 'auto'
  } = props
  let sizeClass = classes.Medium

  if (size === 'small') sizeClass = classes.Small
  if (size === 'medium') sizeClass = classes.Medium
  if (size === 'large') sizeClass = classes.Large

  return (
    <React.Fragment>
      {(type === 'facebook-page' || type === 'facebook-group') && (
        <div
          className={`${sizeClass} ${classes.SingleIcon} ${classes.Facebook}`}
          style={{ left, top, right, bottom }}
        >
          <FAIcon icon={faFacebook} />
        </div>
      )}
      {type === 'twitter' && (
        <div
          className={`${sizeClass} ${classes.SingleIcon} ${classes.Twitter}`}
          style={{ left, top, right, bottom }}
        >
          <FAIcon icon={faTwitter} />
        </div>
      )}
      {type === 'linkedin' && (
        <div
          className={`${sizeClass} ${classes.SingleIcon} ${classes.Linkedin}`}
          style={{ left, top, right, bottom }}
        >
          <FAIcon icon={faLinkedin} />
        </div>
      )}
      {type === 'instagram' && (
        <div
          className={`${sizeClass} ${classes.SingleIcon} ${classes.Instagram}`}
          style={{ left, top, right, bottom }}
        >
          <FAIcon icon={faInstagram} />
        </div>
      )}
    </React.Fragment>
  )
}
