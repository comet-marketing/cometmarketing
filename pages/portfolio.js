import React, {Component} from  'react';
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import DynamicLink from '../components/DynamicLink';
import {
  Container, 
  Row,
  Col
} from 'reactstrap';

const HandleLink = ({type, slug, title}) => {
  console.log(type)
  if(type == 'photoproject') {
    return(
    <DynamicLink displayRoute='portfolio/photo-project' actualRoute='photoproject' slug={slug}>
      <h1>{title}</h1>
    </DynamicLink>
    )
  }
  else if(type == 'videoproject') {
    return(
    <DynamicLink displayRoute='portfolio/video-project' actualRoute='videoproject' slug={slug}>
      <h1>{title}</h1>
    </DynamicLink>
    )
  }
  else if(type == 'designproject') {
    return(
    <DynamicLink displayRoute='portfolio/design-project' actualRoute='designproject' slug={slug}>
      <h1>{title}</h1>
    </DynamicLink>
    )
  }
  return(<p>fuck off</p>)
}

export default class Portfolio extends Component {

  static chunk(array, size) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunked_arr;
  }

  static async getInitialProps() {
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/photoprojects?_sort=date')
    const photoprojects = await res.json()
    const res2 = await fetch('https://utdcometmarketing-api.herokuapp.com/videoprojects?_sort=date')
    const videoprojects = await res2.json()
    const res3 = await fetch('https://utdcometmarketing-api.herokuapp.com/designprojects?_sort=date')
    const designprojects = await res3.json()
    photoprojects.map(element => {
      element.type = 'photoproject'
    })    
    videoprojects.map(element => {
      element.type = 'videoproject'
    })
    designprojects.map(element => {
      element.type = 'designproject'
    })
    let projects = []
    Array.prototype.push.apply(projects, photoprojects)
    Array.prototype.push.apply(projects, designprojects)
    Array.prototype.push.apply(projects, videoprojects)
    projects.sort((a, b) => {
      var aTime = new Date(a.date).getTime()
      var bTime = new Date(b.date).getTime()
      // positive results sort b before a
      // negative results sort a before b
      // return 0 when order doesn't matter
      return bTime - aTime
    })
    projects = this.chunk(projects, 3)
    return { projects }
  }

  render() {
    return(
      <Layout pageName='Portfolio' title='Portfolio'>
        <Container>
            {this.props.projects.map((row, i ) => (
              <Row key={i} className='row-no-margin'>
                {row.map((project) => (
                  <Col className='person-listing' sm='4' key={project.id}>
                    <HandleLink title={project.title} type={project.type} slug={project.slug}/>                </Col>
                ))}
              </Row>
            ))}
        </Container>
      </Layout>
    )
  }
}