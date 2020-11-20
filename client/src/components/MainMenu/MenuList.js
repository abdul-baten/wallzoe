import React from 'react'
import _ from 'lodash'

import menuInfos from '../../config/mainmenu'

import MenuItem from './MenuItem'

import FontAwesome from '../UI/Icons/FontAwesome/FontAwesome'
import {
  faUserFriends,
  faCodeBranch,
  faImages
} from '@fortawesome/free-solid-svg-icons'

class MenuList extends React.Component {
  render() {
    const menuInfoList = [
      {
        label: _.capitalize(menuInfos.socialmedia.provider),
        link: menuInfos.socialmedia.callbackPath,
        icon: <FontAwesome icon={faUserFriends} />,
        backColor: menuInfos.socialmedia.brandColor
      },
      {
        label: _.capitalize(menuInfos.projectmanager.provider),
        link: menuInfos.projectmanager.callbackPath,
        icon: <FontAwesome icon={faCodeBranch} />,
        backColor: menuInfos.projectmanager.brandColor
      },
      {
        label: _.capitalize(menuInfos.photoeditor.provider),
        link: menuInfos.photoeditor.callbackPath,
        icon: <FontAwesome icon={faImages} />,
        backColor: menuInfos.photoeditor.brandColor
      }
    ]
    return (
      menuInfoList.map(item => (
        <MenuItem
          key={item.label}
          label={item.label}
          link={item.link}
          icon={item.icon}
          backColor={item.backColor}
          close={this.props.close}
        />
      ))
    )
  }
}

export default MenuList