import React from 'react'

import accountInfoList from './accountInfoList'

import Tile from '../Tile/Tile'

const Tiles = () => {
  return accountInfoList.map(item => (
    <Tile
      key={item.label}
      label={item.label}
      link={item.link}
      icon={item.icon}
      backColor={item.backColor}
    />
  ))
}

export default Tiles
