import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListIcon from '@material-ui/core/ListItemIcon'
import Link from '@material-ui/core/Link'
import Email from '@material-ui/icons/Email'
import EmailOutline from '@material-ui/icons/MailOutline'
import PhoneInTalk from '@material-ui/icons/PhoneInTalk'

const Address = () => {
  const allAddress = [
    {
      label: '347-284-6118',
      link: '#',
      icon: <PhoneInTalk />
    },
    {
      label: 'marisa@wallzoe.com',
      link: '#',
      icon: <EmailOutline />
    },
    {
      label: 'info@app.wallzoe.com',
      link: '#',
      icon: <Email />
    }
  ]
  const allAddressJsx = allAddress.map((item, index) => {
    return (
      <ListItem key={index}>
        <ListIcon>{item.icon}</ListIcon>
        <Link component="button" color="inherit">
          {item.label}
        </Link>
      </ListItem>
    )
  })
  return <List>{allAddressJsx}</List>
}

export default Address
