import React from 'react'

import {
  Map as MapIcon,
  QuestionAnswer as FeedIcon,
} from '@material-ui/icons'

import Layout from '../components/layout'
import Card from '../components/card'


export default () => (
  <Layout title={"Emergence"}>
    <Card title="Feed" to={"/feed"}><FeedIcon/></Card>
    <Card title="Map" to={"/map"}><MapIcon/></Card>
  </Layout>
)