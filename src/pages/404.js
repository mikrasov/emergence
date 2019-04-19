import React from 'react'
import Layout from '../components/layout'
import withRoot from '../util/withRoot'

class ErrorPage extends React.Component {

  render() {
    return (
      <Layout>
        <h1>Page Not Found</h1>
        <p>The specified file was not found on this website. Please check the for mistakes and try again.</p>
      </Layout>
    )
  }
}

export default withRoot(ErrorPage)
