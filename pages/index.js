import Layout from "../components/Layout";
import fetch from "node-fetch";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardDeck,
  CardTitle, CardSubtitle, Button } from 'reactstrap'
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
    return (    
      <div class='home'>
        <Layout title="Home" pageName='Comet Marketing' intro='Here to help you, market you.'>
          <Container>
            <div class='d-flex flex-row justify-content-center'>
              <div class='child1'>
              <ReactPlayer class='player' 
                url='https://www.youtube.com/watch?v=qLmomGuId6Y' 
                playing 
                muted/>
              </div>
            </div>
            <div class='d-flex flex-row justify-content-center'>
              <div class='child2'>
                <Row>
                <h2>Recent Projects</h2>
                 <CardDeck class='project-card'> 
                 {this.props.projects.reverse().map((project) => (
                        <Col sm='4'>
                          <Card>
                            <CardImg top src={project.pictures[0].url} alt="Card image cap" />
                            <CardBody>
                              <CardTitle>{project.title}</CardTitle>
                              <CardSubtitle>{project.partners}</CardSubtitle>
                              <CardText>{project.description.substring(0,100) + '...'}</CardText>
                              <Button>View More</Button>
                            </CardBody>
                          </Card>
                      </Col>
                  ))}
                  </CardDeck>
                </Row>
              </div>
            </div>
          </Container>
        </Layout>
      </div>
    )
  }
}
