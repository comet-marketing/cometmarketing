import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Link from "next/link";
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import BreadcrumbRow from '../components/Breadcrumb'
import DynamicLink from '../components/DynamicLink';
import ReactPlayer from 'react-player'

class Photoproject extends Component {
  constructor(){
    super();
    this.getDate = this.getDate.bind(this);
  }

  static async getInitialProps({query}) {
    const res = await fetch(`https://utdcometmarketing-api.herokuapp.com/videoprojects/${query.slug}`)
    const data = await res.json()
    return {
      project: data
    }
  }

  getDate() {
    var d = new Date(this.props.project.date)
    var string = d.toDateString()
    return string
  }

  render() {
    return(
      <Layout pageName={this.props.project.title} title={this.props.project.title}>
        <Container>
        <BreadcrumbRow parentHref="/portfolio" parentText="Portfolio" activeText={this.props.project.title}>
          </BreadcrumbRow>
          <Row className='justify-content-center'>
            <Col sm='8'>
              <p className='lead'>{this.props.project.description}</p>
            </Col>
          </Row>
          {this.props.project.videoURLs.map((videoURL) => (
            <Row className='home-video justify-content-center'>
                    <div className='player-wrapper justify-content-center'>
                        <ReactPlayer
                        url={videoURL.url}
                        className='react-player'
                        controls
                        width='100%'
                        height='100%'
                        />
                    </div>
            </Row>
          ))}
          <Row className='recent-projects-row row-no-margin project-members'>
          <Col sm='8'>
            <p className='lead'>Project Members:</p>
            {this.props.project.members.map((person) => (
              <DynamicLink displayRoute='people' actualRoute='person' slug={person.slug}>
                  <h2 className='lead'>{person.name}</h2>
              </DynamicLink>
            ))}
          </Col>
          <Col sm='4'>
              <p className='lead text-right'>{this.getDate()}</p>
          </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default withRouter(Photoproject);