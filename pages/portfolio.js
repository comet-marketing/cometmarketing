import React, {Component} from  'react';
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import DynamicLink from '../components/DynamicLink';
import {
  Container, 
  Row, Col,
  Button,
} from 'reactstrap';
import LazyLoad from 'react-lazy-load';

const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'old', label: 'Oldest'},
  { value: 'abc', label: 'Alphabetically' },
];

const filterOptions = [
  { value: 'photo', label: 'Photo Projects' },
  { value: 'design', label: 'Design Projects' },
  { value: 'video', label: 'Video Projects' }
];

const HandleLink = ({project}) => {
  if(project.type == 'photoproject') {
    return(
    <Col className='photo-listing' sm='4' key={project.id}>
    <DynamicLink displayRoute='portfolio/photo-project' actualRoute='photoproject' slug={project.slug}>
      <LazyLoad offset={500}>
      <div className='crop'>
        <img alt={project.title} className='img-fluid' src={project.photos[0].url}></img>
      </div>
      </LazyLoad>
      <h2 className='heading'>{project.title}</h2>
      <p className='content'>{project.description.substring(0, 100) + '...'}</p>
      <Button>Read more</Button>
    </DynamicLink>
    </Col>
    )
  }
  else if(project.type == 'videoproject') {
    var result = project.videoURLs[0].url.match(/https:\/\/www\.youtube\.com\/watch\?v=(.+)/)
    var url = 'https://img.youtube.com/vi/'+ result[1] + '/0.jpg'
    return(
    <Col className='video-listing' sm='4' key={project.id}>
    <DynamicLink displayRoute='portfolio/video-project' actualRoute='videoproject' slug={project.slug}>
      <LazyLoad offset={500}>
      <div className='crop'>
        <img alt={project.title} className='img-fluid' src={url}></img>
      </div>
      </LazyLoad>
      <h2 className='heading'>{project.title}</h2>
      <p className='content'>{project.description.substring(0, 100) + '...'}</p>
      <Button>Read more</Button>    </DynamicLink>
    </Col>
    )
  }
  else if(project.type == 'designproject') {
    return(
    <Col className='design-listing' sm='4' key={project.id}>
    <DynamicLink displayRoute='portfolio/design-project' actualRoute='designproject' slug={project.slug}>
      <LazyLoad offset={500}>
      <div className='crop'>
        <img alt={project.title} className='img-fluid' src={project.thumbnail.url}></img>
      </div>
      </LazyLoad>
      <h2 className='heading'>{project.title}</h2>
      <p className='content'>{project.description.substring(0, 100) + '...'}</p>
      <Button>Read more</Button>
    </DynamicLink>
    </Col>
    )
  }
  console.log("type not found")
  return(<p>ERROR</p>)
}

export default class Portfolio extends Component {

  constructor(props){
    super(props);
    this.state={
      sort: "recent",
      filter: "",
      projects: this.props.projects,
    };
    this.onSortSelect = this.onSortSelect.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
  }

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
    return { projects, designprojects, photoprojects, videoprojects }
  }

  onSortSelect(e) {
    this.setState({ sort: e.target.value})
    let projects = []
    Array.prototype.push.apply(projects, this.props.photoprojects)
    Array.prototype.push.apply(projects, this.props.designprojects)
    Array.prototype.push.apply(projects, this.props.videoprojects)
    if(this.state.sort == 'old')
    {
      projects.sort((a, b) => {
        var aTime = new Date(a.date).getTime()
        var bTime = new Date(b.date).getTime()
        // positive results sort b before a
        // negative results sort a before b
        // return 0 when order doesn't matter
        return bTime - aTime
      })
    }
    else if(this.state.sort == 'abc')
    {
      projects.sort((a, b) => {
        var aName = a.title.toString()
        var bName = b.title.toString()
        // positive results sort b before a
        // negative results sort a before b
        // return 0 when order doesn't matter
        return aName - bName
      })
    }
    else
    {
      projects.sort((a, b) => {
        var aTime = new Date(a.date).getTime()
        var bTime = new Date(b.date).getTime()
        // positive results sort b before a
        // negative results sort a before b
        // return 0 when order doesn't matter
        return aTime - bTime
      })
    }
    this.setState({projects: this.constructor.chunk(projects, 3)})
  }

  onFilterSelect(e) {
    this.setState({ filter: e.target.value})
  }

  render() {
    return(
      <Layout pageName='Portfolio' title='Portfolio' intro='Our Pride and Joy' description='A portfolio of past projects completed by Comet Marketing.' keywords='Comet Marketing,UTD,utd,cm,portfolio,projects'>
        <Container>
            <Row>
              <Col>
              <select
                value={this.state.sort}
                onChange={this.onSortSelect}
                className='whom'>
                {sortOptions.map((option, i) => (
                  <option key={i} value={option.value}>{option.label}</option>
                ))
                }
              </select>
              </Col>
            </Row>
            {this.state.projects.map((row, i ) => (
              <Row key={i} className='row-no-margin'>
                {row.map((project) => (
                  <HandleLink project={project}/>                
                ))}
              </Row>
            ))}
        </Container>
      </Layout>
    )
  }
}