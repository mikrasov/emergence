import React from 'react'
import Layout from '../components/layout'
import Map from '../components/map/map'
import MapControls from '../components/map/controls'


export default () =>
  <Layout title={"Map"}>
    <MapControls/>
    <Map/>
  </Layout>
