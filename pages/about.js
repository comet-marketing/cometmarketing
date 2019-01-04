import Layout from "../components/Layout";
import { Container } from 'reactstrap';

export default () => {
  return (
    <Layout title="about" pageName='Our Mission' intro='What are we trying to do here?'>
      <Container>
        <p>THis is the about page</p>
      </Container>
    </Layout>
  )
}
