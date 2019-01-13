import Layout from "../components/Layout";
import { Container, Row, Col } from 'reactstrap';
import ReactPlayer from 'react-player';

export default () => {
  return (
    <Layout title="about" pageName='Our Mission' intro='What are we trying to do here?'>
      <Container>
          <Row className='home-video justify-content-center'>
            <div className='player-wrapper justify-content-center'>
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
          <div className='about-text'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
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
          </div>
        </Container>
    </Layout>
  )
}
