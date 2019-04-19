import React from 'react'
import { Link } from 'gatsby'

import {Fab} from '@material-ui/core'
import {Edit as WriteIcon} from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import Layout from '../components/layout'
import Post from "../components/post"
import {notifications} from '../util/deviceData'
import {getJson} from "../util/io"

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
})

class Feed extends React.Component {

  static async getInitialProps ()  {
    return {
      posts: await getJson("posts")
    }
  }

  componentDidMount(){
    notifications()
  }

  render() {
    const { classes } = this.props

    return (
      <Layout title={"Messages"}>
        {
          !(this.props.posts)?"Nothing to display": this.props.posts.map((post) =>
            <Post key={post.id} post={post}/>
          )
        }

        <Link to={"/compose"}><Fab color="secondary"   className={classes.fab}><WriteIcon/></Fab></Link>
      </Layout>
    )
  }
}

export default withStyles(styles)(Feed)
