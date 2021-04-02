import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import BreadcrumbRow from '../components/Breadcrumb';


class Person extends Component {
  static async getInitialProps({query}) {
    const res = await fetch(`https://utdcmpatch.herokuapp.com/members/?slug=${query.slug}`)
    const data = await res.json()

    return {
      person: data[0]
    }
  }
  render() {
    return(
      <Layout pageName={this.props.person.name} title={this.props.person.name} intro={this.props.person.role} description={'Comet Marketing\'s' +this.props.person.role+':'+this.props.person.name} keywords={'Comet Marketing,UTD,'+this.props.person.name}>
        <Container className='person'>
        {this.props.person.Alum && 
        <BreadcrumbRow parentText="Alumni" parentHref="/alumni" activeText={this.props.person.name}></BreadcrumbRow>
        } 
        {!this.props.person.Alum &&
        <BreadcrumbRow parentText="People" parentHref="/people" activeText={this.props.person.name}></BreadcrumbRow>
        }          
          <Row>
            <Col>
              <img alt={this.props.person.name + ' ' + this.props.person.role} title={this.props.person.name + ' ' + this.props.person.role} className='img-fluid profile' src={'https://utdcmpatch.herokuapp.com' + this.props.person.profilepicture.url}></img>
            </Col>
            <Col sm="7">
              <p className='lead'>{this.props.person.bio}</p>
            </Col>
          </Row>
          <Row>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default withRouter(Person);