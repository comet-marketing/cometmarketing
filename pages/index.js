import Layout from "../components/Layout";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player';

export default class Index extends Component {
  render() {
    return (
      <Layout title="Home" pageName='Comet Marketing' intro='Welcome to Comet Marketing'>
        <Container>
          <Row className='justify-content-center'>
            <Col xs='auto'>
              <ReactPlayer className='video' width='624px' url='https://www.youtube.com/watch?v=qLmomGuId6Y' />
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}
