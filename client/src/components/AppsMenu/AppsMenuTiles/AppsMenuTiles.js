import React from 'react'

import MtGroupIcon from '@material-ui/icons/Group'

import AppsMenuTile from '../Tile/Tile'

import { FAIcon } from '../../UI'
import { faProjectDiagram, faImages } from '@fortawesome/free-solid-svg-icons'

const AccountTiles = () => {
  const appList = [
    {
      label: 'Social Media',
      icon: <MtGroupIcon />,
      borderColor: '#1DA1F2 #4267B2 #4267B2 #1DA1F2'
    },
    {
      label: 'Project Management',
      icon: <FAIcon icon={faProjectDiagram} />,
      borderColor: '#888'
    },
    {
      label: 'Photo Editor',
      icon: <FAIcon icon={faImages} />,
      borderColor: '#888'
    }
  ]
  return appList.map(item => (
    <AppsMenuTile
      key={item.label}
      label={item.label}
      icon={item.icon}
      borderColor={item.borderColor}
      backColor={item.backColor}
    />
  ))
}

export default AccountTiles
