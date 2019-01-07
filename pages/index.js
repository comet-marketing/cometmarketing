import Layout from "../components/Layout";
import DynamicLink from "../components/DynamicLink";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player';

export default class Index extends Component {

  static async getInitialProps() {
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/projects?featured=true&_sort=createdAt')
    let projects = await res.json()
    projects = projects.slice(0,2)
    return { projects }
  }

  componentWillMount() {
    this.setState({
      posts: this.props.projects
    })
  }

  render() {
    const divStyle={
      marginBottom: 0
    }
    return (    
      <div class='home'>
        <Layout title='Home' pageName='Comet Marketing' intro='Here to help you, market you.'>
        <div class='child1'>
          <div class='d-flex flex-row justify-content-center'>
            <ReactPlayer class='player' 
              url='https://www.youtube.com/watch?v=qLmomGuId6Y' 
              playing 
              muted
              controls/>
          </div>
        </div>
        <div class='child2'>
          <Container>
              <div class='title'>Recent Projects</div>
            <Row>
              {this.props.projects.reverse().map((project) => (
                  <Col className='project-listing' sm="4" key={project.id}>
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
        <div class='child3'>
        </div>
        </Layout>
      </div>
    )
  }
}
