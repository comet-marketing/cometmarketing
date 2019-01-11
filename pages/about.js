import Layout from "../components/Layout";
import { Container, Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player';

export default () => {
  return (
    <Layout title="about" pageName='Our Mission' intro='What are we trying to do here?'>
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
    </Layout>
  )
}
