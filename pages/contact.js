import Layout from "../components/Layout";
import { Component } from 'react';
import { Container, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

export default class Contact extends Component {
  render() {
    return (
    <Layout title="Contact Us" pageName='Contact Us'>
        <Container>
            <Row className='justify-content-center'>
                <Col sm='6'>
                    <p className='lead text-center'>Email us about your project ideas!</p>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col sm='6'>
                    <Form>
                        <FormGroup>
                            <Label for="contactEmail">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="123@domain.com" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="contactSubject">Subject</Label>
                            <Input type="text" name="subject" id="subject" placeholder="Input subject text..." />
                        </FormGroup>
                        <FormGroup>
                            <Label for="contactBody">Message Body</Label>
                            <Input type="textarea" name="message" id="message" placeholder="Input message text..." />
                        </FormGroup>
                        <Button>Send</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </Layout>
    )
  }
}