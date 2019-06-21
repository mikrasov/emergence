import React, { useState } from 'react'

import classNames from 'classnames'
import Helmet from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Drawer, Toolbar,Typography,IconButton} from '@material-ui/core'
import {Menu as MenuIcon, ChevronLeft as ChevronLeftIcon} from '@material-ui/icons/'
import Divider from '@material-ui/core/Divider/Divider'


import Menu from './menu'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  pageTitle: {
    marginLeft: 24,
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(21),
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))



export default function Layout(props) {
  const classes = useStyles()

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Helmet
        title="EmerGence"
      >
        <html lang="en" />
      </Helmet>
      <div className={classes.root}>

        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
        >
          <Toolbar disableGutters={!drawerOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={ ()=>{setDrawerOpen(true)} }
              className={classNames(classes.menuButton, {
                [classes.hide]: drawerOpen,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.pageTitle}>
              {props.title || "Emergence"}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            }),
          }}
          open={drawerOpen}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={ ()=>{setDrawerOpen(false)} }> <ChevronLeftIcon /></IconButton>
          </div>
          <Divider />
          <Menu />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>

      </div>
    </>
  )

}
