import React, {Component} from  'react';
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import DynamicLink from '../components/DynamicLink';
import {
  Container, 
  Row, Col,
  Button,
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import LazyLoad from 'react-lazy-load';

const sortOptions = [
  { value: 'recent', label: 'Newest' },
  { value: 'old', label: 'Oldest'},
  { value: 'abc', label: 'Alphabetically' },
];

const filterOptions = [
  { value: 'all', label: 'All Projects'},
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
        <img alt={project.title} title={project.title} className='img-fluid' src={'https://utdcmpatch.herokuapp.com' + project.photos[0].url}></img>
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
        <img alt={project.title} title={project.title} className='img-fluid' src={url}></img>
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
        <img alt={project.title} title={project.title} className='img-fluid' src={'https://utdcmpatch.herokuapp.com' + project.thumbnail.url}></img>
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
    const pageCount = Math.ceil(this.props.projects.length / 9) || 1;
    this.state={
      sort: "recent",
      filter: "",
      projects: this.props.projects,
      chunkedprojects: this.props.chunkedprojects,
      pageCount: pageCount,
      currentPage: 0,
    };
    this.onSortSelect = this.onSortSelect.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.sort = this.sort.bind(this);
    this.filter = this.filter.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
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
    const res = await fetch('https://utdcmpatch.herokuapp.com/photoprojects?_sort=date')
    const photoprojects = await res.json()
    console.log(photoprojects)
    const res2 = await fetch('https://utdcmpatch.herokuapp.com/videoprojects?_sort=date')
    const videoprojects = await res2.json()
    const res3 = await fetch('https://utdcmpatch.herokuapp.com/designprojects?_sort=date')
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
    let chunkedprojects = this.chunk(projects, 3)
    return { projects, designprojects, photoprojects, videoprojects, chunkedprojects }
  }

  onSortSelect(e) {
    this.setState({ sort: e.target.value})
    this.sort(e.target.value, this.state.projects)
  }

  sort(state, projects){
    if(state == 'old')
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
    else if(state == 'abc')
    {
      projects.sort((a, b) => {
        // positive results sort b before a
        // negative results sort a before b
        // return 0 when order doesn't matter
        return a.title.localeCompare(b.title)
      })
    }
    else if(state == 'recent')
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
    this.setState({projects: projects})
    this.setState({chunkedprojects: this.constructor.chunk(projects, 3)})
  }

  onFilterSelect(e) {
    this.setState({ filter: e.target.value})
    this.filter(e.target.value)
  }

  filter(state){
    let projects = []
    if(state == 'photo')
    {
      Array.prototype.push.apply(projects, this.props.photoprojects)
    }
    else if(state == 'design')
    {
      Array.prototype.push.apply(projects, this.props.designprojects)
    }
    else if(state == 'video')
    {
      Array.prototype.push.apply(projects, this.props.videoprojects)
    }
    else {
      Array.prototype.push.apply(projects, this.props.photoprojects)
      Array.prototype.push.apply(projects, this.props.designprojects)
      Array.prototype.push.apply(projects, this.props.videoprojects)
    }
    let pageCount = Math.ceil(projects.length / 9)
    this.setState({
                    projects: projects,
                    pageCount: pageCount,
                    currentPage: 0})
    this.sort(this.state.sort, projects)
  }

  onPageClick(e, index){
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  }

  render() {
    const currentPage = this.state.currentPage;
    const currentProjects = [];
    for(let i = (currentPage)*3; i < Math.min((currentPage+1)*3, this.state.chunkedprojects.length); i++){
      currentProjects.push(this.state.chunkedprojects[i]);
    }
    return(
      <Layout pageName='Portfolio' title='Portfolio - UTD Comet Marketing' intro='Our Pride and Joy' description='A portfolio of past projects completed by Comet Marketing that showcase our past experience making promo videos, headshots, flyers, and much more.' keywords='Comet Marketing,UTD,utd,UT Dallas,cm,portfolio,projects,flyers,headshots,promos'>
        <Container>
            <Row className='row-no-margin'>
              <Col sm={{size: 3, order: 1, offset: 6}}>
              <select
                value={this.state.sort}
                onChange={this.onSortSelect}
                className='filter'>
                {sortOptions.map((option, i) => (
                  <option key={i} value={option.value}>{option.label}</option>
                ))
                }
              </select>
              </Col>
              <Col sm={{size:3, order: 2}}>
                <select
                  value={this.state.filter}
                  onChange={this.onFilterSelect}
                  className='filter'>
                  {filterOptions.map((option, i) => (
                    <option key={i} value={option.value}>{option.label}</option>
                  ))}
                  </select>
              </Col>
            </Row>
            <Row className='row-no-margin'>
              <Col sm={{size:6}}>
                <Pagination size="sm" aria-label="Page navigation">
                  <PaginationItem disabled={currentPage<=0}>
                    <PaginationLink
                      onClick={e => this.onPageClick(e, currentPage - 1)}
                      previous
                      href="#"
                    />
                  </PaginationItem>
                  {[...Array(this.state.pageCount)].map((page, i) => 
                    <PaginationItem active={i === currentPage} key={i}>
                      <PaginationLink onClick={e => this.onPageClick(e, i)} href="#">
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem disabled={currentPage >= this.state.pageCount-1}>
                    <PaginationLink
                      onClick={e => this.onPageClick(e, currentPage + 1)}
                      next
                      href="#"
                    />
                  </PaginationItem>
                </Pagination>
              </Col>
            </Row>
            {currentProjects
            .map((row, i ) => (
              <Row key={i} className='row-no-margin'>
                {row.map((project) => (
                  <HandleLink key={project.id} project={project}/>                
                ))}
              </Row>
            ))}
            <Row className='row-no-margin'>
              <Col sm={{size:6}}>
                <Pagination size="sm" aria-label="Page navigation">
                  <PaginationItem disabled={currentPage<=0}>
                    <PaginationLink
                      onClick={e => this.onPageClick(e, currentPage - 1)}
                      previous
                      href="#"
                    />
                  </PaginationItem>
                  {[...Array(this.state.pageCount)].map((page, i) => 
                    <PaginationItem active={i === currentPage} key={i}>
                      <PaginationLink onClick={e => this.onPageClick(e, i)} href="#">
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem disabled={currentPage >= this.state.pageCount-1}>
                    <PaginationLink
                      onClick={e => this.onPageClick(e, currentPage + 1)}
                      next
                      href="#"
                    />
                  </PaginationItem>
                </Pagination>
              </Col>
            </Row>
        </Container>
      </Layout>
    )
  }
}