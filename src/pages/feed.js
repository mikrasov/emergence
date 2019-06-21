import React, {useEffect} from 'react'
import { Link } from 'gatsby'

import {Fab} from '@material-ui/core'
import {Edit as WriteIcon} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import Layout from '../components/layout'
import Post from "../components/post"
import {notifications} from '../util/deviceData'


const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))


export default function Feed(props) {

  const classes = useStyles()


  //Run when component mounts
  useEffect( () => {notifications()}, [])


  return (
    <Layout title={"Messages"}>
      {
        !(props.posts)?"Nothing to display": props.posts.map((post) =>
          <Post key={post.id} post={post}/>
        )
      }

      <Link to={"/compose"}><Fab color="secondary"  className={classes.fab}><WriteIcon/></Fab></Link>
    </Layout>
  )

}
