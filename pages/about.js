import Layout from "../components/Layout";
import { Container, Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player';
import CallToAction from "../components/CallToAction";

export default () => {
  return (
    <Layout title="About Comet Marketing" pageName='About' intro="We're here to help you market you">
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
              <p className='lead'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                  anim id est laborum.
              </p>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
                occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est
                et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis
                voluptas assumenda est, omnis dolor repellendus.
              </p>
              <p>
                Temporibus autem quibusdam et aut
                officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
                repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a
                sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
              </p>
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
