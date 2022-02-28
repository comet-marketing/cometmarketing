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
  { value: 'all', label: 'All Members' },
  { value: 'exec', label: 'Executive Members' },
  { value: 'gen', label: 'General Members' },
  { value: 'photo', label: 'Photo Team' },
  { value: 'design', label: 'Design Team' },
  { value: 'video', label: 'Video Team' },
  { value: 'admin', label: 'Administrative' },
  { value: 'creative', label: 'Creative' }
];

export default class People extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      people: this.props.people,
      unchunkedPeople: this.props.unchunkedPeople,
      memberOfTheMonth: this.props.people.flat().find(person => person.name == "Samin Rahman")
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
    const res = await fetch('https://utdcmpatch.herokuapp.com/members?_sort=name&Alum=false')
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
    if (state == 'exec') {
      newPeople = newPeople.filter(function (element) {
        return element.Exec
      })
    }
    else if (state == 'gen') {
      newPeople = newPeople.filter(function (element) {
        return !element.Exec
      })
    }
    else if (state == 'photo') {
      newPeople = newPeople.filter(function (element) {
        var str = element.role.toString().toLowerCase()
        return (element.Exec && str != 'president' && !str.includes('web')) || str.includes('photo')
      })
    }
    else if (state == 'design') {
      newPeople = newPeople.filter(function (element) {
        var str = element.role.toString().toLowerCase()
        return (str.includes('design') && !str.includes('web')) || str.includes('creative')
      })
    }
    else if (state == 'video') {
      newPeople = newPeople.filter(function (element) {
        var str = element.role.toString().toLowerCase()
        return str.includes('video') || str.includes('sound') || str.includes('creative')
      })
    }
    else if (state == 'admin') {
      newPeople = newPeople.filter(function (element) {
        var str = element.role.toString().toLowerCase()
        return !(str.includes('design') || str.includes('creat') || str.includes('vid') || str.includes('sound') || str.includes('pho'))
      })
    }
    else if (state == 'creative') {
      newPeople = newPeople.filter(function (element) {
        var str = element.role.toString().toLowerCase()
        return str.includes('design') || str.includes('crea') || str.includes('vid') || str.includes('sound') || str.includes('pho')
      })
    }

    this.setState({ people: this.constructor.chunk(newPeople, 3) })
  }

  render() {
    console.log(this.state.people);
    console.log(this.state.memberOfTheMonth);
    return (
      <Layout title='People - UTD Comet Marketing' pageName='People' intro='This Is Us' banner='/static/Group_pic2_optimized.jpg' description='Meet the talented UTD students that make Comet Marketing a reality. From gifted graphic designers to skilled marketing gurus, we are incredibly proud of our exceptionally talented team.' keywords='comet marketing,Comet Marketing,CM,UTD,this is us,people,members,team' author='Al Madireddy,Mustafa Sadriwala'>
        <Container>
          {/* <Row className='justify-content-center'>
          <Col sm='6'>
            <p className='lead'>Creative, talented, and looking for a way to show it off?</p>
            <p className='lead'>Comet Marketing is looking for designers, photographers, videographers, illustrators, and more to join the team!</p>
            <p className='lead'>We work on flyers, posters, social media posts, short videos, photoshoots, and more!</p>
            <CallToAction dark href='https://forms.gle/fyE5cY3HnGthryW99' target="_blank">Join Here!</CallToAction>
          </Col>
          </Row> */}
            <DynamicLink displayRoute='people' actualRoute='person' slug={this.state.memberOfTheMonth.slug}>
          <Row className='justify-content-center row-no-margin'>
            <Col sm='4'>
              <h2 className='heading justify-content-center'>Member of the Month</h2>
            </Col>
          </Row>

<br/>
          <Row className='justify-content-center row-no-margin'>
            <Col sm="3">
              {!!this.state.memberOfTheMonth.profilepicture &&
                <LazyLoad offset={500}>
                  <div className='crop'>
                    <img alt={'comet_marketing' + this.state.memberOfTheMonth.name} title={'comet_marketing' + this.state.memberOfTheMonth.name} className='img-fluid' src={this.state.memberOfTheMonth.profilepicture.url}></img>
                  </div>
                </LazyLoad>
              }
            </Col>
          </Row>
          <br />

          <Row className='justify-content-center row-no-margin'>
              <h2 className='heading justify-content-center'>{this.state.memberOfTheMonth.name}</h2>
          </Row>
          </DynamicLink>

          <Row className='row-no-margin'>
            <Col sm={{ size: 3, order: 2, offset: 9 }}>
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
                          <img alt={'comet_marketing' + person.name} title={'comet_marketing' + person.name} className='img-fluid' src={person.profilepicture.url}></img>
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
          {/* <Row className ='justify-content-center row-no-margin'>
            <Col sm='1'>
                    <CallToAction dark href='/alumni' className='alumni-btn'>Alumni</CallToAction>
            </Col>
          </Row> */}
        </Container>
      </Layout >
    )
  }
}
