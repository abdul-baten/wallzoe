import React from 'react'

import MtGroupIcon from '@material-ui/icons/Group'

import AppsMenuTile from '../Tile/Tile'
import { PHOTO_EDITOR_URL, PROJECT_MANAGE } from '../../../config'
import { FAIcon } from '../../UI'
import { faProjectDiagram, faImages } from '@fortawesome/free-solid-svg-icons'

const AccountTiles = (props) => {
  const appList = [
    {
      label: 'Social Media',
      icon: <MtGroupIcon />,
      borderColor: '#1DA1F2 #4267B2 #4267B2 #1DA1F2',
      link: ''
    },
    {
      label: 'Project Management',
      icon: <FAIcon icon={faProjectDiagram} />,
      borderColor: '#888',
      link: PROJECT_MANAGE
    },
    {
      label: 'Photo Editor',
      icon: <FAIcon icon={faImages} />,
      borderColor: '#888',
      link: PHOTO_EDITOR_URL
    }
  ]
  return appList.map(item => (
    <AppsMenuTile
      key={item.label}
      label={item.label}
      icon={item.icon}
      borderColor={item.borderColor}
      backColor={item.backColor}
      link={item.link}
    />
  ))
}

export default AccountTiles
