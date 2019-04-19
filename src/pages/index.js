import React from 'react'

import {
  Map as MapIcon,
  QuestionAnswer as FeedIcon,
} from '@material-ui/icons'
import withRoot from '../util/withRoot'
import Layout from '../components/layout'
import Card from '../components/card'
import PropTypes from 'prop-types'

class IndexPage extends React.Component {

  render() {
    return (
      <Layout title={"Emergence"}>
        <Card title="Feed" to={"/feed"}><FeedIcon/></Card>
        <Card title="Map" to={"/map"}><MapIcon/></Card>
      </Layout>
    )
  }
}

export default IndexPage
