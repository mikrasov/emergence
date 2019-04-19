import React from 'react'

import classNames from 'classnames'
import Helmet from 'react-helmet'
import { withStyles } from '@material-ui/core/styles'
import {AppBar, Drawer, Toolbar,Typography,IconButton} from '@material-ui/core'
import {Menu as MenuIcon, ChevronLeft as ChevronLeftIcon} from '@material-ui/icons/'
import Divider from '@material-ui/core/Divider/Divider'

import withRoot from '../util/withRoot'

import Menu from './menu'

const drawerWidth = 240

const styles = theme => ({

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
      marginLeft: theme.spacing.unit * 9 + 12,
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
      width: theme.spacing.unit * 9 + 1,
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
    padding: theme.spacing.unit * 3,
  },
})

class Layout extends React.Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, theme } = this.props

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
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap className={classes.pageTitle}>
                {this.props.title || "Emergence"}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}> <ChevronLeftIcon /></IconButton>
            </div>
            <Divider />
            <Menu />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.props.children}
          </main>

        </div>
      </>
    )
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(Layout))
