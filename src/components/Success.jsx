import React from 'react'
import { Layout } from './Layout'
import { GoHome } from './GoHome'
export class Success extends React.Component {
  render () {
    return (
      <Layout title="Success">
        <GoHome text='Email confirmed.
Your registration is now completed'/>
      </Layout>
    )
  }
}
