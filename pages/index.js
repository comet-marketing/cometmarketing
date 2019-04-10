import Layout from "../components/Layout";
import DynamicLink from "../components/DynamicLink";
import FluidSectionHeader from '../components/FluidSectionHeader';
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CallToAction from "../components/CallToAction";
import LazyLoad from "react-lazy-load";

export default class Index extends Component {
  static async getInitialProps() {
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/projects?featured=true&_limit=3&_sort=createdAt:ASC')
    let projects = await res.json()
    const res2 = await fetch('https://utdcometmarketing-api.herokuapp.com/members?_limit=3&_sort=gradyear:ASC')
    let members = await res2.json()
    const one = await fetch('https://utdcometmarketing-api.herokuapp.com/photoprojects?_limit=1_sort=featured')
    let photoproj = await one.json()
    const two = await fetch('https://utdcometmarketing-api.herokuapp.com/designprojects?_limit=1_sort=featured')
    let designproj = await two.json()
    const three = await fetch('https://utdcometmarketing-api.herokuapp.com/videoprojects?_limit=1_sort=featured')
    let vidproj = await three.json()

    return { projects, members, photoproj, designproj, vidproj }
  }

  componentWillMount() {
    this.setState({
      projects: this.props.projects,
      members: this.props.members,
      photoproj: this.props.photoproj,
      designproj: this.props.designproj,
      vidproj: this.props.vidproj,
    })
  }

  render() {
    return (    
      <Layout title='UTD Comet Marketing' pageName='Comet Marketing' isHome={true} keywords='Comet Marketing,UT Dallas,UTD,University of Texas at Dallas,Graphic Design,Videography,Photography,Web Design,Marketing,CM' description='Comet Marketing is a UTD organization that provides professional photography, videography, graphic design, web design, and general marketing solutions to other UT Dallas organizations. Our goal is to help YOU market YOU!' author='Al Madireddy,Mustafa Sadriwala'>
        <Container fluid className='services-container'>
          <Container className='services-grid'>
            <Row className='grid-row'>
              <Col md='7'>
                <h3 className='title'>Photography</h3>
                <hr></hr>
                <div>
                  <p>We can help cover your events with trained and experienced photographers and professional photo editors.</p>
                  <p>We provide high-quality, edited photos for you to use as you see fit. A great way to create a lasting visual legacy for your club.</p>
                </div>
              </Col>
              <Col md='5'>
                <img alt='comet_marketing_photography' title='comet_marketing_photography' className='img-fluid' height='100%' width='100%' src='./static/photo.png'></img>
              </Col>
            </Row>
            <Row className='grid-row reverse-items'>
              <Col md='7' className='order-md-2'>
                <h3 className='title'>Graphic Design</h3>
                <hr></hr>
                <div>
                  <p>Our team of designers can help create and inspire new designs and ideas to advertise your upcoming events!</p>
                  <p>With attractive custom flyers and posters to put around campus and online, your club will have eye-catching design content.</p>
                </div>
              </Col>
              <Col md='5'>
                <img alt='comet_marketing_graphic_design' title='comet_marketing_graphic_design' className='img-fluid' height='100%' width='100%' src='./static/design.png'></img>
              </Col>
            </Row>
            <Row className='grid-row'>
              <Col md='7'>
                <h3 className="title">Web Design</h3>
                <hr></hr>
                <div>
                  <p><span>&#191;</span>Like our website?</p>
                  <p>We can help you make a new website or update an existing one to cater to your club's needs on the internet.</p>
                  <p>Having a beautiful online website will help to keep your organization relevant and visually stunning.</p>
                </div>
              </Col>
              <Col md='5'>
                <img alt='comet_marketing_web_design' title='comet_marketing_web_design' className='img-fluid' height='100%' width='100%' src='./static/web.png'></img>
              </Col>
            </Row>
            <Row className='grid-row reverse-items'>
              <Col md='7' className='order-md-2'>
                <h3 className='title'>Videography</h3>
                <hr></hr>
                <div>
                  <p>Invite some of our talented film crew to create a video to highlight any aspect of your organization!</p>
                  <p>Whether it be for spreading information or promoting an upcoming event, video advertising is a power story-telling tool that we can provide for your team.</p>
                </div>
              </Col>
              <Col md='5'>
                <img alt='comet_marketing_videography' className='img-fluid' height='100%' width='100%' src='./static/video.png'></img>
              </Col>
            </Row>
          </Container>
        </Container>
        <LazyLoad offset={3000}>
        <FluidSectionHeader text='Recent Projects' className='projects-header' backgroundImage='/static/bookparty_optimized.jpg'></FluidSectionHeader>
        </LazyLoad>
        <Container>
          <div className='recent-projects'>
          <Row className='recent-projects-row row-no-margin'>
            <Col className='photo-listing' md='4' key={this.props.photoproj[0].id}>
              <DynamicLink displayRoute='portfolio/photo-project' actualRoute='photoproject' slug={this.props.photoproj[0].slug}>
                <LazyLoad offset={2000}>
                  <div className='crop'>
                    <img alt={this.props.photoproj[0].title} className='img-fluid' src={this.props.photoproj[0].photos[0].url}></img>
                  </div>
                </LazyLoad>
                  <h2 className='heading'>{this.props.photoproj[0].title}</h2>
                  <p className='content'>{this.props.photoproj[0].description.substring(0, 100) + '...'}</p>
              </DynamicLink>
            </Col>
            <Col className='video-listing' md='4' key={this.props.vidproj[0].id}>
              <DynamicLink displayRoute='portfolio/video-project' actualRoute='videoproject' slug={this.props.vidproj[0].slug}>
                <LazyLoad offset={2000}>
                <div className='crop'>
                  <img alt={this.props.vidproj[0].title} className='img-fluid' src={'https://img.youtube.com/vi/'+ this.props.vidproj[0].videoURLs[0].url.match(/https:\/\/www\.youtube\.com\/watch\?v=(.+)/)[1] + '/0.jpg'}></img>
                </div>
                </LazyLoad>
                <h2 className='heading'>{this.props.vidproj[0].title}</h2>
                <p className='content'>{this.props.vidproj[0].description.substring(0, 100) + '...'}</p>
              </DynamicLink>
            </Col>
            <Col className='design-listing' md='4' key={this.props.designproj[0].id}>
              <DynamicLink displayRoute='portfolio/design-project' actualRoute='designproject' slug={this.props.designproj[0].slug}>
                <LazyLoad offset={2000}>
                <div className='crop'>
                  <img alt={this.props.designproj[0].title} className='img-fluid' src={this.props.designproj[0].thumbnail.url}></img>
                </div>
                </LazyLoad>
                <h2 className='heading'>{this.props.designproj[0].title}</h2>
                <p className='content'>{this.props.designproj[0].description.substring(0, 100) + '...'}</p>
              </DynamicLink>
            </Col>
          </Row>
          <Row>
            <Col sm='12' className='d-flex justify-content-center'>
                <CallToAction dark href='/portfolio'>View all</CallToAction>
            </Col>
          </Row>
          </div>
        </Container>
        <LazyLoad offset={4000}>
        <FluidSectionHeader text='Meet Our Team' className='team-header' backgroundImage='/static/group-home-optimized.jpg'></FluidSectionHeader>
        </LazyLoad>
        <Container>
          <div className='meet-our-team'>
            <Row className='recent-projects-row row-no-margin'>
              {this.props.members.map((person) => (
                <Col md='4' className='person-listing' key={person.id}>
                                      
                  <DynamicLink displayRoute='people' actualRoute='person' slug={person.slug}>
                    {!!person.profilepicture &&
                      <LazyLoad offset={2000}>
                      <div className='crop'>
                        <img alt={person.name} className='img-fluid' src={person.profilepicture.url}></img>
                      </div>
                      </LazyLoad>

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
