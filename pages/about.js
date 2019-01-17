import Layout from "../components/Layout";
import { Container, Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player';
import CallToAction from "../components/CallToAction";

export default () => {
  return (
    <Layout title="about" pageName='Our Mission' intro="We're here to help you market you">
      <Container>
          <Row className='home-video justify-content-center'>
            <div className='player-wrapper justify-content-center'>
              <ReactPlayer
                url='https://www.youtube.com/watch?v=5iL6a54k1-8'
                className='react-player'
                playing
                muted
                controls
                width='100%'
                height='100%'
              />
            </div>
          </Row>
          <Row className='about-text justify-content-center row-no-margin'>
            <Col md='8'>
              <p className='lead'>So what is Comet Marketing?</p>
              <p>We’re a student run marketing organization that promotes events, awards, or any information that needs to be dispersed to the UTD student body by means of digital media. What does this mean? Basically, we’re here to help you effectively spread the message YOU want to spread. Need to get the word out on your upcoming event? No problem. Need a creative graphic to spread on social media? We got your back. Need an informative yet artistic video made for your team? Comet Marketing has you covered. From digital graphics to videos and photography - we do it all. You want to know what the best part of this is? All our services are FREE. Just sit back and relax. Our mission is to bring your great ideas to life. We’re here to help YOU market YOU. </p>
              <p className='lead'>Don't believe us?</p>
              <p>Just check out our Projects page featuring some of our best work (coming soon)! Be sure to check out our social media pages for more content that we have covered.</p>
              <p className='lead'>How are we organized?</p>
              <p>We have two teams. Our Administrative Team does outreach and manages all the accounts. They’re the ones you’ll be communicating with for you to get the most out of your project. Our Creative Team is in charge of all our digital media. They’re the artists behind the scenes working to make your creative design come to life. Together, the two teams form Comet Marketing.</p>
              <p className='lead'>Want to join the team?</p>
              <p>We're always looking for amazing, talented people to join the team. Click on Join Us above and apply today!</p>
            </Col>
          </Row>
          <Row>
            <Col className='text-center'>
              <CallToAction dark href='/contact'>Contact us now!</CallToAction>
            </Col>
          </Row>
        </Container>
    </Layout>
  )
}
