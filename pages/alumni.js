import React, { Component } from 'react';
import Layout from "../components/Layout";
import { Container, Row, Col } from 'reactstrap';
import fetch from "node-fetch";
import DynamicLink from "../components/DynamicLink"

export default class Alumni extends Component {
    constructor(props){
        super(props);
        this.getDate = this.getDate.bind(this);
      }

    static async getInitialProps() {
        const res = await fetch('https://utdcmpatch.herokuapp.com/members?Alum=true&_sort=gradyear:DESC')
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

    getDate(person) {
        var join = new Date(person.joinDate)
        var leave = new Date(person.leaveDate)
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var string = months[(join.getMonth())+1%11] + " " + join.getFullYear() + " - " + months[(leave.getMonth()+1)%11] + " " + leave.getFullYear()
        return string
      }

    render () {
    return (
        <Layout title='Alumni - UTD Comet Marketing' pageName='Alumni' intro='This Was Us' banner='/static/Group_pic.jpg' description='These are the talented people that helped make Comet Marketing a reality. Their hardwork and dedication has brought us to where we are today.' keywords='comet marketing,Comet Marketing,CM,UTD,this was us,people,members,alumni' author='Mustafa Sadriwala'>
        <Container>
            <Row className='row-no-margin'>
                <Col sm='8'>
                <p className='lead'>Alumni:</p>
                </Col>
                <Col sm='4'>
                <p className='lead'>Active Time Period:</p>
                </Col>
            </Row>
            {this.props.people.map((person) => (
            <Row className='row-no-margin'>
                <Col sm='8'>
                    <DynamicLink key={person.id} displayRoute='people' actualRoute='person' slug={person.slug}>
                        <h2 className='lead'>{person.name}</h2>
                    </DynamicLink>
                </Col>
                <Col sm='4' className='justify-text-right'>
                    <h3 className='lead'>{this.getDate(person)}</h3>
                </Col>
            </Row>
            ))}
        </Container>
        </Layout>    
    )
    }
}