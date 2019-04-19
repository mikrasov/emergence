import React from 'react'
import Layout from '../components/layout'
import Map from '../components/map/map'
import MapControls from '../components/map/controls'
import {getJson} from "../util/io"

class MapPage extends React.Component {

  static async getInitialProps () {
    return {
      layers: await getJson("layers")
    }
  }

  render() {
    return(
      <Layout title={"Map"}>
        <MapControls/>
        <Map layers={this.props.layers}/>
      </Layout>
    )
  }
}

export default MapPage
