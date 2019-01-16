import Layout from "../components/Layout";
import DynamicLink from "../components/DynamicLink";
import FluidSectionHeader from '../components/FluidSectionHeader';
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CallToAction from "../components/CallToAction";
import ReactPlayer from 'react-player'


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
      <Layout title='Comet Marketing' pageName='Comet Marketing' isHome={true}>
        <Container className='services-grid'>
          <Row className='grid-row row-no-margin'>
            <Col sm='6' className='grid-square top-left'>
              <Row className='row-no-margin'>
                <Col md='6'>
                  <h1 className='title'>Photography</h1>
                  <ul>
                    <li><p>We can help cover large or small events with our amazing photographers.</p></li>
                    <li><p>After an editing period, we'll provide you with high-quality, edited photos for you to use as you see fit.</p></li>
                    <li><p>A great way to make a legacy for the future of your club.</p></li>
                  </ul>
                </Col>
                <Col md='6'>
                  <img className='img-fluid' height='100%' width='100%' src='https://source.unsplash.com/random/400x600/'></img>
                </Col>
              </Row>
            </Col>
            <Col sm='6' className='grid-square top-right'>
              <Row className='row-no-margin'>
                <Col md='6'>
                  <h1 className='title'>Graphic Design</h1>
                  <ul>
                    <li><p>Our team of designers can help inspire new designs and ideas to advertise your upcoming events!</p></li>
                    <li><p>With custom flyers and posters to put around campus and online your event will be as bustling as ever.</p></li>
                  </ul>
                  </Col>
                <Col md='6'>
                  <img className='img-fluid' height='100%' width='100%' src='https://source.unsplash.com/random/400x600/'></img>
                </Col>
              </Row>
            </Col>
          </Row>          
          <Row className='grid-row'>
            <Col sm='6' className='grid-square bottom-left'>
              <Row className='row-no-margin'>
                <Col md='6'>
                  <h1 className="title">Web Design</h1>
                  <ul>
                    <li><p><span>&#191;</span>Like our website?</p></li>
                    <li><p>We can help you make a new or update an old website to cater to your clubs needs on the internet.</p></li>
                    <li><p>Having an online presence will help to keep your organization relevant in the 21st century.</p></li>
                  </ul>
                </Col>
                <Col md='6'>
                  <img className='img-fluid' height='100%' width='100%' src='https://source.unsplash.com/random/400x600/'></img>
                </Col>
              </Row>
            </Col>
            <Col sm='6' className='grid-square bottom-right'>
              <Row className='row-no-margin'>
                <Col md='6'>
                  <h1 className='title'>Videography</h1>
                  <ul>
                    <li><p>Invite some of our talented film crew to your events and we can create you a video to highlight your organization.</p></li>
                    <li><p>Whether it be for spreading information or promoting an upcoming event, video advertising is a powerful tool we can help you with.</p></li>
                  </ul>
                </Col>
                <Col md='6'>
                  <img className='img-fluid' height='100%' width='100%' src='https://source.unsplash.com/random/400x600/'></img>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <FluidSectionHeader text='Recent Projects' className='projects-header' backgroundImage='/static/bookparty_optimized.jpg'></FluidSectionHeader>
        <Container>
          <div className='recent-projects'>
          <Row className='home-video justify-content-center'>
            <div className='player-wrapper justify-content-center'>
              <ReactPlayer
                url='https://www.youtube.com/watch?v=SNR5vzwwrj0'
                className='react-player'
                controls
                width='100%'
                height='100%'
              />
            </div>
          </Row>
          </div>
        </Container>
        <FluidSectionHeader text='Meet Our Team' className='team-header' backgroundImage='/static/group-home-optimized.jpg'></FluidSectionHeader>
        <Container>
          <div className='meet-our-team'>
            <Row className='recent-projects-row row-no-margin'>
              {this.props.members.map((person) => (
                <Col md='4' className='person-listing' key={person.id}>
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
                <CallToAction dark href='/people'>View all</CallToAction>
              </Col>
            </Row>
          </div>
        </Container>
      </Layout>
    )
  }
}
