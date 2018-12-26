import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import fetch from 'node-fetch';

class Person extends Component {
  static async getInitialProps({query}) {
    const res = await fetch(`http://localhost:1337/members/${query.slug}`)
    const data = await res.json()

    return {
      person: data
    }
  }
  render() {
    return(
      <Layout >
        <h1>{this.props.person.name}</h1>
        <p>{this.props.person.bio}</p>
      </Layout>
    )
  }
}

export default withRouter(Person);