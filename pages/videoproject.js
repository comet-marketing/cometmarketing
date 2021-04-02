import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import BreadcrumbRow from '../components/Breadcrumb'
import ProjectCredits from '../components/ProjectCredits';
import ReactPlayer from 'react-player'

class Photoproject extends Component {
  constructor(){
    super();
  }

  static async getInitialProps({query}) {
    const res = await fetch(`https://utdcmpatch.herokuapp.com/videoprojects/?slug=${query.slug}`)
    const data = await res.json()
    return {
      project: data[0]
    }
  }

  render() {
    return(
      <Layout pageName={this.props.project.title} title={this.props.project.title} description={this.props.project.description.substring(0,70)} keywords={'Comet Marketing,UTD,video,'+this.props.project.title}>
        <Container>
        <BreadcrumbRow parentHref="/portfolio" parentText="Portfolio" activeText={this.props.project.title}>
        </BreadcrumbRow>
        <Row className='justify-content-center'>
          <Col sm='8'>
            <p className='lead'>{this.props.project.description}</p>
          </Col>
        </Row>

        <ProjectCredits members={this.props.project.members} date={this.props.project.date}></ProjectCredits>

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
          
        </Container>
      </Layout>
    )
  }
}

export default withRouter(Photoproject);