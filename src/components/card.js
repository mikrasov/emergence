import React from 'react'
import { Link } from 'gatsby'

import { Card, CardContent, CardActionArea, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 20,
    minWidth: 100,
    maxWidth: 250
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}))



export default function SimpleCard(props)  {

  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Link to={props.to}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
              {props.title}
            </Typography>
            {props.children}
          </CardContent>
        </Link>
      </CardActionArea>

    </Card>
  )
}
