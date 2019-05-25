import React, { Component } from "react";
import DynamicLink from "./DynamicLink"
import {
  Container,
  Row,
  Col
} from 'reactstrap';

export default class ProjectCredits extends Component {
  constructor() {
    super();
    this.getDate = this.getDate.bind(this); 
  }

  getDate() {
    var d = new Date(this.props.date)
    var string = d.toDateString()
    return string
  }

  render() {
    return(
      <Row className='px-0 recent-projects-row row-no-margin justify-content-center project-members'>
        <Col sm='8'>
          <Row className='px-0'>
            <Col sm="8">
              <p className='lead'>Project Members:</p>
              {this.props.members.map((person) => (
                <DynamicLink displayRoute='people' actualRoute='person' slug={person.slug}>
                  <h2 className='lead'>{person.name}</h2>
                </DynamicLink>
              ))}
            </Col>
            <Col sm='4'>
              <p className='lead text-right'>{this.getDate()}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}