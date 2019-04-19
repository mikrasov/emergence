import React from 'react'

import {Grid, Input, InputLabel, TextField, FormControl, NativeSelect} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Layout from '../components/layout'
import { postJson } from '../util/io'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: "90%"
  }
})

class ProfilePage extends React.Component {

  constructor() {
    super();

    //Set Defaults
    this.state = {
      firstname: "",
      lastname: "",
      address: "",
      state: "",
      zipcode: "",
      city: "",
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = name => event => {
    this.setState( {[name]: event.target.value})
  }

  render() {

    const { classes } = this.props;

    return (
      <Layout title={"Profile"}>
        <Grid container spacing={16} >

          <Grid item xs={6}>
            <TextField
              id="firstname"
              label="First Name"
              defaultValue={this.state.firstname}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange("firstname")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="lastname"
              label="Last Name"
              defaultValue={this.state.lastname}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange("lastname")}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="address"
              label="Street Address"
              defaultValue={this.state.address}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange("address")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="city"
              label="City"
              defaultValue=""
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange("city")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel  htmlFor="state">State</InputLabel>
              <NativeSelect
                value={this.state.state}
                onChange={this.handleChange('state')}
                input={<Input name="state" id="state" />}
              >
                <option value=""/>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="zipcode"
              label="Postal Code"
              defaultValue={this.state.zipcode}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange("zipcode")}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="phone"
              label="Phone Number"
              defaultValue={this.state.phone}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange("phone")}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="email"
              label="Email"
              defaultValue={this.state.email}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange("email")}
            />
          </Grid>
        </Grid>

      </Layout>
    )
  }
}

export default withStyles(styles)(ProfilePage)
