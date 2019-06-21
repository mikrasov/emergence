import React from 'react'

import {Card, CardHeader, CardMedia, CardContent, Collapse, IconButton, Typography} from '@material-ui/core'
import {ExpandMore as ExpandMoreIcon} from '@material-ui/icons'


const styles = theme => ({
  card: {
    maxWidth: 800,
    marginBottom:"1em"
  },
  media: {
    height: 0,
    width: '50px',
    paddingTop: '50px',
  },
  mainImg: {
    width: '100%'
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})

class RecipeReviewCard extends React.Component {

  constructor() {
    super()

    //Set Defaults
    this.state = {
      expanded: false,
    }

    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { classes, post } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            post.image && <CardMedia
              className={classes.media}
              image={post.image}
              title="Post Thumbnail"
            />
          }
          action={
            (post.image || post.body) && <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
          title={post.title}
          subheader={post._updated}
        />

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {post.body}
            </Typography>
            {post.image && (<img
              className={classes.mainImg}
              src={post.image}
              title="Post Thumbnail"
            />)}
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}


export default withStyles(styles)(RecipeReviewCard)
