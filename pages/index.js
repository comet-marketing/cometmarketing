import Layout from "../components/Layout";
import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player';

export default class Index extends Component {
  render() {
    return (
      <div>
      <div className='player-wrapper'>
        <ReactPlayer className='player' 
          url='https://www.youtube.com/watch?v=qLmomGuId6Y' 
          playing 
          muted 
          width='100%'
          height='100%'/>
      </div>
      <div className='parallax-div'>
        <Layout title="Home" pageName='Comet Marketing' intro='Here to help you, market you.'>
          <Container>
            <Row>
              
            </Row>
            <Row>

            </Row>
          </Container>
        </Layout>
      </div>
      </div>
    )
  }
}
