import React from 'react'

import { navigate } from 'gatsby'
import Layout from '../components/layout'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import PostIcon from '@material-ui/icons/Send'
import GpsIcon from '@material-ui/icons/GpsFixed'
import GpsNoIcon from '@material-ui/icons/GpsNotFixed'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import FileIcon from '@material-ui/icons/Image'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import withRoot from '../util/withRoot'
import {geoLocation} from "../util/deviceData"
import {postJson} from "../util/io"

import Camera from "../components/camera"

let fileReader
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: "100%"
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },

})

class ComposePage extends React.Component {

  constructor() {
    super()

    //Set Defaults
    this.state = {
      showCamera: false,
      title: "",
      body: "",
      image: null,
      latitude: null,
      longitude: null
    }

    this.showCamera = this.showCamera.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCapture = this.handleCapture.bind(this)
  }

  componentDidMount(){

    //Get location when page first loads
    geoLocation(this)
  }

  showCamera = () => {
    this.setState({showCamera: true})
  }

  //Do this when we change a field (Such as selecting a file)
  handleChange = name => event => {

    if(name === "file"){
      fileReader = new FileReader()
      fileReader.onloadend = (e) => {
        this.setState({image: fileReader.result})
      }
      fileReader.readAsDataURL(event.target.files[0]);
    }
    else {
      this.setState( {[name]: event.target.value})
    }
  }

  //Do this when we submit the form
  handleSubmit = (event) => {
    //Make a network call somewhere
    event.preventDefault()
    postJson("posts", this.state)
    navigate("feed")
  }

  //Do this when we capture an image from a device camera
  handleCapture = (capturedImage) => {
    this.setState({image: capturedImage, showCamera: false})
    console.log("Image Captured")
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout title={"Compose"}>
        {this.state.showCamera && (
          <Camera onCapture={this.handleCapture}/>
        )}

        { this.state.image!=null && (<img src={this.state.image} width="100%"/>) }

        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={16} justify="flex-end">

            <Grid item xs={12}>
              <TextField
                required
                id="title"
                label="Title"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange("title")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="body"
                label="Post"
                placeholder="Remember the content of your post is publicly visible."
                multiline
                rows="6"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange("body")}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton color="primary"
                          className={classes.button}
                          component="span">
                {this.state.latitude?<GpsIcon/>:<GpsNoIcon/>}
              </IconButton>
            </Grid>

            <Grid item xs={1}>
              <IconButton color="primary"
                          className={classes.button}
                          component="span"
                          onClick={this.showCamera}
              >
                <CameraIcon />
              </IconButton>
            </Grid>

            <Grid item xs={1}>
              <input accept="image/*"
                     className={classes.input}
                     id="image-file"
                     onChange={this.handleChange("file")}
                     type="file"
                     accept=".jpg,.png"
              />
              <label htmlFor="image-file">
                <IconButton color="primary"
                            className={classes.button}
                            component="span">
                  <FileIcon />
                </IconButton>
              </label>
            </Grid>

            <Grid item xs={2} >
              <Button variant="contained"
                      color="secondary"
                      className={classes.button}
                      disabled={!this.state.title}
                      type="submit">
                Post <PostIcon className={classes.rightIcon} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Layout>
    )
  }
}

export default withRoot(withStyles(styles)(ComposePage))
