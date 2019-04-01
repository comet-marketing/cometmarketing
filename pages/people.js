import React, { Component } from "react";
import fetch from "node-fetch";
import Layout from '../components/Layout';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import DynamicLink from "../components/DynamicLink";
import CallToAction from "../components/CallToAction";
import LazyLoad from "react-lazy-load";

const filterOptions = [
  { value: 'all', label: 'All Members'},
  { value: 'exec', label: 'Executive Members' },
  { value: 'gen', label: 'General Members' },
  { value: 'photo', label: 'Photo Team' },
  { value: 'design', label: 'Design Team' },
  { value: 'video', label: 'Video Team' },
  { value: 'admin', label: 'Administrative' },
  { value: 'creative', label: 'Creative' }
];

export default class People extends Component {

  constructor(props){
    super(props);
    this.state={
      filter: 'all',
      projects: this.props.projects,
      chunkedprojects: this.props.chunkedprojects,
    };
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.filter = this.filter.bind(this);
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
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/members?_sort=name')
    let unchunkedPeople = await res.json()
    let people = this.chunk(unchunkedPeople, 3)
    return { people, unchunkedPeople }
  }

  componentWillMount() {
    this.setState({
      people: this.props.people,
      unchunkedPeople: this.props.unchunkedPeople
    })
  }

  onFilterSelect(e) {
    this.setState({ filter: e.target.value })
    this.filter(e.target.value)
  }

  filter(state) {
    console.log(state)
    let newPeople = this.props.unchunkedPeople
    if(state == 'exec')
    {
      newPeople = newPeople.filter(function(element) {
        return element.Exec
      })
    }
    else if(state == 'gen')
    {
      newPeople = newPeople.filter(function(element) {
        return !element.Exec
      })
    }
    else if(state == 'photo')
    {
      newPeople = newPeople.filter(function(element){
        var str = element.role.toString().toLowerCase()
        return (element.Exec && str != 'president' && !str.includes('web')) || str.includes('photo')
      })
    }
    else if(state == 'design')
    {
      newPeople = newPeople.filter(function(element){
        var str = element.role.toString().toLowerCase()
        return (str.includes('design') && !str.includes('web')) || str.includes('creative')
      })
    }
    else if(state == 'video')
    {
      newPeople = newPeople.filter(function(element){
        var str = element.role.toString().toLowerCase()
        return str.includes('video') || str.includes('sound') || str.includes('creative')
      })
    }
    else if(state == 'admin')
    {
      newPeople = newPeople.filter(function(element){
        var str = element.role.toString().toLowerCase()
        return !(str.includes('design') || str.includes('creat') || str.includes('vid') || str.includes('sound') || str.includes('pho'))
      })
    }
    else if(state == 'creative')
    {
      newPeople = newPeople.filter(function(element){
        var str = element.role.toString().toLowerCase()
        return str.includes('design') || str.includes('crea') || str.includes('vid') || str.includes('sound') || str.includes('pho')
      })
    }

    this.setState({people: this.constructor.chunk(newPeople, 3)})
  }

/*
    <Row className='justify-content-center'>
      <Col sm='6'>
        <p className='lead'>Creative, talented, and looking for a way to show it off?</p>
        <p className='lead'>Comet Marketing is looking for designers, photographers, videographers, illustrators, and more to join the team!</p>
        <p className='lead'>We work on flyers, posters, social media posts, short videos, photoshoots, and more!</p>
        <CallToAction dark href='https://goo.gl/forms/vCYE7wFGCeralb9B3'>Join Here!</CallToAction>
      </Col>
    </Row>
*/
  render() {
    return(
      <Layout title='People' pageName='People' intro='This Is Us' banner='/static/Group_pic2_optimized.jpg' description='Meet the talented UTD students behind Comet Marketing' keywords='comet marketing,Comet Marketing,UTD,this is us,people,members' author='Al Madireddy,Mustafa Sadriwala'>
        <Container>
          <Row className = 'row-no-margin'>
            <Col sm={{size:3, order: 2, offset: 9}}>
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
          {this.state.people.map((row, i) => (
            <Row key={i} className='row-no-margin'>
              {row.map((person) => (
                <Col className='person-listing' sm="4" key={person.id}>
                  <DynamicLink displayRoute='people' actualRoute='person' slug={person.slug}>
                    {!!person.profilepicture &&
                      <LazyLoad offset={500}>
                      <div className='crop'>
                        <img alt={'comet_marketing' + person.name} className='img-fluid' src={person.profilepicture.url}></img>
                      </div>
                      </LazyLoad>
                    }
                    <h2 className='heading'>{person.name}</h2>
                    <p className='lead'>{person.role}</p>
                    <p className='content'>{person.bio.substring(0, 100) + '...'}</p>
                    <Button>Read more</Button>
                  </DynamicLink>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </Layout>
    )
  }
}
