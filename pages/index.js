import Layout from "../components/Layout";
import DynamicLink from "../components/DynamicLink";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import ReactPlayer from 'react-player';


export default class Index extends Component {

  static async getInitialProps() {
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/projects?featured=true&_sort=createdAt:ASC')
    let projects = await res.json()
    projects = projects.slice(0,3)
    return { projects }
  }

  componentWillMount() {
    this.setState({
      posts: this.props.projects
    })
  }

  render() {
    return (    
      <Layout title='Home' pageName='Comet Marketing' isHome={true}>
        <Container>
          <Row className='home-video justify-content-center'>
            <div className='player-wrapper'>
              <ReactPlayer
                url='https://www.youtube.com/watch?v=qLmomGuId6Y'
                className='react-player'
                playing
                muted
                controls
                width='100%'
                height='100%'
              />
            </div>
          </Row>
          <div className='recent-projects'>
            <Row className='recent-projects-title title-row'>
              <Col sm='12' className='text-center'>
                <h2 className='display-4'>Recent Projects</h2>
              </Col>
            </Row>
            <Row className='recent-projects-row'>
              {this.props.projects.map((project) => (
                <Col className='project-listing' key={project.id}>
                  <DynamicLink displayRoute='portfolio' actualRoute='project' slug={project.slug}>
                    {!!project.pictures[0] &&
                      <img className='img-fluid' src={project.pictures[0].url}></img>
                    }
                    <h2 className='heading'>{project.title}</h2>
                    <p className='lead'>{project.partners}</p>
                    <p className='content'>{project.description.substring(0, 100) + '...'}</p>
                  </DynamicLink>
                </Col>
              ))}
              <Col sm='12' className='d-flex justify-content-center'>
                <a className='btn-call-to-action btn-call-to-action-dark' href='/portfolio'>View all</a>
              </Col>
            </Row>
          </div>
        </Container>
      </Layout>
    )
  }
}
