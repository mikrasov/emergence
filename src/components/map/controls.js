import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  Input, MenuItem, InputLabel, FormControl, Select } from '@material-ui/core'
import {ExpandMore as ExpandMoreIcon} from '@material-ui/icons'
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

const styles = theme => ({
  panel: {
    margin: "-24px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
})

class MapControl extends React.Component {

  constructor() {
    super()

    //Set Defaults
    this.state = {
      type: "points",
      field: "",
      subfield: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

  }
  componentWillMount() {}

  render() {
    const { classes } = this.props
    return(
      <>
        <ExpansionPanel  className={classes.panel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Layers</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="layer-type">Type</InputLabel>
              <Select
                value={this.state.type}
                onChange={this.handleChange}
                inputProps={{
                  name: 'Type',
                  id: 'layer-type',
                }}
              >
                <MenuItem value={"points"}>Points</MenuItem>
                <MenuItem value={"heatmap"}>Heatmap</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="layer-field">Field</InputLabel>
              <Select
                value={this.state.field}
                onChange={this.handleChange}
                inputProps={{
                  name: 'field',
                  id: 'layer-field',
                }}
              >
                <MenuItem >None</MenuItem>
                <MenuItem value={"RSSI"}>RSSI</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="layer-subfield">Sub-Field</InputLabel>
              <Select
                value={this.state.subfield}
                onChange={this.handleChange}
                inputProps={{
                  name: 'subfield',
                  id: 'layer-subfield',
                }}
              >
                <MenuItem >None</MenuItem>
                <MenuItem value={"RSSI"}>50MHz</MenuItem>
              </Select>
            </FormControl>

            <Range/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    )
  }
}

export default withStyles(styles)(MapControl)
