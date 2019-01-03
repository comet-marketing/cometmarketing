import Layout from "../components/Layout";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player';

export default class Index extends Component {
  render() {
    return (
      <Layout title="Home" pageName='...' intro='...' banner='/static/homeBanner.jpg'>
        <Container>
          <Row>
            <Col></Col>
            <Col xs='auto'>
              <ReactPlayer className='video' width='624px' url='https://www.youtube.com/watch?v=qLmomGuId6Y' playing />
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}
