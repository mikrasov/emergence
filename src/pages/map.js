import React from 'react'
import Layout from '../components/layout'
import Map from '../components/map/map'
import MapControls from '../components/map/controls'

class MapPage extends React.Component {

  render() {
    return(
      <Layout title={"Map"}>
        <MapControls/>
        <Map/>
      </Layout>
    )
  }
}

export default MapPage
