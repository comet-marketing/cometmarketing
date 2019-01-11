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
    const res2 = await fetch('https://utdcometmarketing-api.herokuapp.com/members?_limit=3&_start=1&_sort=gradyear:ASC')
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
        <Container className='services-grid'>
          <Row className='grid-row'>
            <Col sm='6' className='grid-square'>
              <Row>
                <Col>
                  <h1 className='title'>Photo and Video</h1>
                  <ul>
                    <li><h5>We can help cover large or small events with our amazing photographers and/or videographers.</h5></li>
                    <li><h5>After an editing period, we'll provide you with high-quality, edited photos and/or videos.</h5></li>
                    <li><h5>A great way to make a legacy for the future of your club.</h5></li>
                  </ul>
                </Col>
                <Col>
                  <img height='100%' width='100%' src='https://source.unsplash.com/random/400x600/'></img>
                </Col>
              </Row>
            </Col>
            <Col sm='6' className='grid-square'>
              <Row>
                <Col>
                  <h1 className='title'>Graphic Design</h1>
                  <ul>
                    <li><h5>Our team of designers can help inspire new designs and ideas to advertise your upcoming events!</h5></li>
                    <li><h5>With custom flyers and posters to put around campus and online your event will be as bustling as ever.</h5></li>
                  </ul>
                </Col>
                <Col>
                  <img height='100%' width='100%' src='https://source.unsplash.com/random/400x600/'></img>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='grid-row'>
            <Col sm='6' className='grid-square'>
            <Row>
                <Col>
                  <h1 className="title">Web Design</h1>
                  <ul>
                    <li><h5><span>&#191;</span>Like our website?</h5></li>
                    <li><h5>We can help you make a new or update an old website to cater to your clubs needs on the internet.</h5></li>
                    <li><h5>Having an online presence will help to keep your organization relevant in the 21st century.</h5></li>
                  </ul>
                </Col>
                <Col>
                  <img height='100%' width='100%' src='https://source.unsplash.com/random/400x600/'></img>
                </Col>
              </Row>
            </Col>
            <Col sm='6' className='grid-square'>
            <Row>
                <Col>
                  <h1 className='title'>Social Media</h1>
                  <ul>
                    <li><h5>Running social media and understanding its inner workings is difficult.</h5></li>
                    <li><h5>We gotchu fam, our pros can help you manage your social media account.</h5></li>
                    <li><h5>With equal parts edginess and relatability we'll help keep your organization on the rise ;)</h5></li>
                  </ul>
                </Col>
                <Col>
                  <img height='100%' width='100%' src='https://source.unsplash.com/random/400x600/'></img>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
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
