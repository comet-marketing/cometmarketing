import Layout from "../components/Layout";
import DynamicLink from "../components/DynamicLink";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player';
import InstagramEmbed from 'react-instagram-embed'


export default class Index extends Component {

  static async getInitialProps() {
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/projects?featured=true&_sort=createdAt')
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
      <div class='home'>
        <Layout title='Home' pageName='Comet Marketing' intro='Here to help you, market you.'>
        <div class='child1'>
          <div class='d-flex flex-row justify-content-center'>
            <ReactPlayer class='player' 
              url='https://www.youtube.com/watch?v=qLmomGuId6Y' 
              playing 
              muted
              controls
              loop/>
          </div>
        </div>
        <div class='child2'>
          <Container>
              <a href='/portfolio'>
                <div class='title'>Check Out Our Latest Projects</div>
              </a>
            <Row>
              {this.props.projects.reverse().map((project) => (
                  <Col className='project-listing' sm="3" key={project.id}>
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
            </Row>
          </Container>
        </div>
        <a href='/people'>
          <div class='child3'>
              <div class='title'>
                <Container>
                  <div class='d-flex flex-row justify-content-end'> Meet Our Team</div>
                </Container>
              </div>
          </div>
        </a>
        <div class='child4'>
          <Container>
            <Row><div class='title'>Follow Us On Social Media</div></Row>
            <Row class='d-flex flex-row'>
              <Col sm='1'></Col>
              <Col sm='4'class='insta-embed'>
                <InstagramEmbed 
                  url='http://instagr.am/p/BrItl_Wgf1v/'
                  />
              </Col>
              <Col sm='6'>
                <iframe class='facebook-embed'
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Futdcometmarketing&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                scrolling="no"
                frameborder="0" 
                allowTransparency="true" 
                allow="encrypted-media"
                height="100%"/>
              </Col>
            </Row>        
          </Container>
        </div>
        </Layout>
      </div>
    )
  }
}
