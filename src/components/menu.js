import React from 'react'
import { Link } from 'gatsby'

import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import {
  Dashboard as DashboardIcon,
  QuestionAnswer as FeedIcon,
  Map as MapIcon,
  Help as HelpIcon,
  Person as ProfileIcon,
  Edit as ComposeIcon
} from '@material-ui/icons'
import Divider from '@material-ui/core/Divider/Divider'

export default () => (
  <>
    <List >
      <Link to={"/"}>
        <ListItem button >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>

      <Link to={"/map"}>
        <ListItem button >
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Map" />
        </ListItem>
      </Link>

      <Link to={"/feed"}>
        <ListItem button >
          <ListItemIcon>
            <FeedIcon />
          </ListItemIcon>
          <ListItemText primary="Feed" />
        </ListItem>
      </Link>

      <Link to={"/compose"}>
        <ListItem button >
          <ListItemIcon>
            <ComposeIcon />
          </ListItemIcon>
          <ListItemText primary="Message" />
        </ListItem>
      </Link>

      <Link to={"/help"}>
        <ListItem button >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </Link>
    </List>

    <Divider />
    <List>
      <Link to={"/profile"}>
        <ListItem button >
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </Link>
    </List>
  </>
)
