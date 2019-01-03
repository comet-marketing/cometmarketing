import React, { Component } from "react";
import fetch from "node-fetch";
import Layout from '../components/Layout';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import DynamicLink from "../components/DynamicLink";

export default class People extends Component {
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
    const res = await fetch('http://localhost:1337/members')
    let people = await res.json()
    people = this.chunk(people, 4)
    return { people }
  }

  componentWillMount() {
    this.setState({
      posts: this.props.people
    })
  }

  render() {
    return(
      <Layout title='People' pageName='People' intro='Comet Marketing members are awesome' banner='/static/Group_pic.jpg'>
        <Container>
          {this.props.people.map((row, i) => (
            <Row key={i}>
              {row.map((person) => (
                <Col key={person.id}>
                  <DynamicLink displayRoute='people' actualRoute='person' slug={person.slug}>
                    <img className='img-fluid' src='https://unsplash.it/400'></img>
                    <h2>{person.name}</h2>
                    <p className='lead'>{person.role}</p>
                    <p>{person.bio.substring(0, 100) + '...'}</p>
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
