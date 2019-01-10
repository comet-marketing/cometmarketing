import Layout from "../components/Layout";
import DynamicLink from "../components/DynamicLink";
import FluidSectionHeader from '../components/FluidSectionHeader';
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import ReactPlayer from 'react-player';


export default class Index extends Component {
  static async getInitialProps() {
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/projects?featured=true&_limit=3&_sort=createdAt:ASC')
    let projects = await res.json()
    const res2 = await fetch('https://utdcometmarketing-api.herokuapp.com/members?_limit=3&_sort=gradyear:ASC')
    let members = await res2.json()
    return { projects, members }
  }

  componentWillMount() {
    this.setState({
      projects: this.props.projects,
      members: this.props.members
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
        </Container>
        <FluidSectionHeader text='Recent Projects'></FluidSectionHeader>
        <Container>
          <div className='recent-projects'>
            <Row className='recent-projects-row'>
              {this.props.projects.map((project) => (
                <Col className='project-listing' key={project.id}>
                  <DynamicLink displayRoute='portfolio' actualRoute='project' slug={project.slug}>
                    {!!project.pictures[0] &&
                      <img className='img-fluid' src={project.pictures[0].url}></img>
                    }
                    <h2>{project.title}</h2>
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
        <FluidSectionHeader text='Meet Our Team' className='team-header'></FluidSectionHeader>
        <Container>
          <div className='meet-our-team'>
            <Row className='recent-projects-row'>
              {this.props.members.map((person) => (
                <Col className='person-listing' key={person.id}>
                  <DynamicLink displayRoute='people' actualRoute='person' slug={person.slug}>
                    {!!person.profilepicture &&
                        <img className='img-fluid' src={person.profilepicture.url}></img>
                    }
                      <h2 className='heading'>{person.name}</h2>
                      <p className='lead'>{person.role}</p>
                      <p className='content'>{person.bio.substring(0, 100) + '...'}</p>
                  </DynamicLink>
                </Col>
              ))}
              <Col sm='12' className='d-flex justify-content-center'>
                <a className='btn-call-to-action btn-call-to-action-dark' href='/people'>View all</a>
              </Col>
            </Row>
          </div>
        </Container>
      </Layout>
    )
  }
}
