import React, { Component } from "react";
import fetch from "node-fetch";
import Layout from '../components/Layout';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

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
      <Layout title='People' pageName='Blah' intro='Comet Marketing members are awesome'>
        <Container>
          {this.props.people.map((row) => (
            <Row>
              {row.map((person) => (
                <Col sm='3'>
                  <h2>{person.name}</h2>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </Layout>
    )
  }
}