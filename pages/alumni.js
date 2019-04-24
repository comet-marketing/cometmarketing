import React, { Component } from 'react';
import Layout from "../components/Layout";
import { Container, Row, Col } from 'reactstrap';
import fetch from "node-fetch";
import DynamicLink from "../components/DynamicLink"

export default class Alumni extends Component {
    static async getInitialProps() {
        const res = await fetch('https://utdcometmarketing-api.herokuapp.com/members?Alum=true&_sort=gradyear:DESC')
        let people = await res.json()
        return { people }
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

    render () {
    return (
        <Layout title='Alumni - UTD Comet Marketing' pageName='Alumni' intro='This Was Us' banner='/static/Group_pic.jpg' description='These are the talented people that helped make Comet Marketing a reality. Their hardwork and dedication has brought us to where we are today.' keywords='comet marketing,Comet Marketing,CM,UTD,this was us,people,members,alumni' author='Mustafa Sadriwala'>
        <Container>
            <Row>
            <Col sm='8'>
                <p className='lead'>Alumni:</p>
                {this.props.people.map((person) => (
                <DynamicLink key={person.id} displayRoute='people' actualRoute='person' slug={person.slug}>
                    <h2 className='lead'>{person.name}</h2>
                </DynamicLink>
                ))}
            </Col>
            <Col sm='4' className='justify-text-right'>
            <p className='lead'>Graduated UTD:</p>
            {this.props.people.map((person) => (
                <h3 className='lead'>{person.gradyear}</h3>
            ))}
            </Col>
            </Row>
        </Container>
        </Layout>    
    )
    }
}