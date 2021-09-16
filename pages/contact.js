import Layout from "../components/Layout";
import CallToAction from '../components/CallToAction';
import { Component } from 'react';
import {
  Container,
  Button,
  Form, FormGroup, FormText, Label, Input,
  Row, Col,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Popover, PopoverHeader, PopoverBody,
  Collapse, Card, CardBody
} from 'reactstrap';
import ReCAPTCHA from "react-google-recaptcha";
import fetch from "node-fetch";
import Slider from 'react-animated-slider';

const whomOptions = [
  { value: 'client', label: 'Student Organization' },
  { value: 'partner', label: 'Business' },
  { value: 'other', label: 'Other' }
];

const whereOptions = [
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'YouTube', label: 'YouTube' },
  { value: 'Word of Mouth', label: 'Word of Mouth' },
  { value: 'Email Announcement', label: 'Email Announcement' },
  { value: 'Google search', label: 'Google Search' },
  { value: 'UTD event', label: 'UTD Event' },
  { value: 'Comet Marketing Member', label: 'Comet Marketing Member' },
  { value: 'Presence', label: 'Presence' },
  { value: 'Other', label: 'Other' }
];

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      name: "",
      message: "",
      whom: "",
      where: "",
      emailInvalid: false,
      displayInvalidMessage: false,
      displayEmptyMessage: false,
      displaySuccessMessage: false,
      displayErrorMessage: false,
      recaptchaScore: "",
      dropdownOpen: false,
      modal: false,
      tosBox: true
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.onRecaptchaChange = this.onRecaptchaChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.displayEmailInvalid = this.displayEmailInvalid.bind(this);
    this.onWhomSelect = this.onWhomSelect.bind(this);
    this.onWhereSelect = this.onWhereSelect.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

  }

  static async getInitialProps() {
    const res = await fetch('https://utdcmpatch.herokuapp.com/testimonials?')
    let testimonials = await res.json()
    return { testimonials }
  }

  componentDidMount() {
    this.setState({
      modal: true,
    })
  }

  async submitHandler(e) {
    e.preventDefault();
    if (!(this.state.where == '' || this.state.whom == '' || this.state.email == '' || this.state.name == '' || this.state.message == '' || this.state.emailInvalid || this.state.recaptchaScore == "" || this.state.tosBox == true)) {
      this.setState({ displayEmptyMessage: false });
      let response = await fetch('https://utdcmpatch.herokuapp.com/contactmessages', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          name: this.state.name,
          phone: this.state.phone,
          message: this.state.message,
          whom: this.state.whom.toString(),
          where: this.state.where.toString(),
          recaptchaScore: this.state.recaptchaScore,
        })
      });
      if (response.status == 200) {
        this.setState({ displaySuccessMessage: true });

        this.setState({
          email: "",
          name: "",
          phone: "",
          message: "",
          whom: "",
          where: "",
          emailInvalid: false,
          displayInvalidMessage: false,
          displayEmptyMessage: false,
          recaptchaScore: ""
        });
      } else {
        this.setState({ displayErrorMessage: true })
      }
      grecaptcha.reset();
    }
    else
      this.setState({ displayEmptyMessage: true });
  }

  onRecaptchaChange(e) {
    this.setState({ recaptchaScore: e });
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    let emailInvalid = e.target.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null;
    this.setState({ emailInvalid: emailInvalid });
  }

  displayEmailInvalid() {
    if (this.state.emailInvalid) {
      this.setState({ displayInvalidMessage: true })
    } else {
      this.setState({ displayInvalidMessage: false })
    }
  }

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onPhoneChange(e) {
    this.setState({ phone: e.target.value });
  }

  onMessageChange(e) {
    this.setState({ message: e.target.value })
  }

  onWhomSelect(e) {
    this.setState({ whom: e.target.value })
  }

  onWhereSelect(e) {
    this.setState({ where: e.target.value })
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggle = () => this.setState({tosBox: !this.state.tosBox});


  render() {
    return (
      <Layout title="Contact Us - UTD Comet Marketing" pageName='Contact Us' intro='Contact us for more information on our services- let us help YOU market YOU!' description='Shoot us an email to inquire about future projects or collaborations! We can do graphic design, photography, videography, web design, and help with your general marketing needs!' keywords='UTD,Comet Marketing,CM,UT Dallas,Contact,contact,form,email' author='Al Madireddy,Mustafa Sadriwala'>
        <Container>
          <Row className='justify-content-center'>
            <Slider className='slider' autoplay={5000} infinite='true' >
              {this.props.testimonials.map((testimonial, i) =>
                <div className='justify-content-center testimonial' key={i}>
                  <div className='text-center'>
                    <p className='testimonial-quote'>" {testimonial.quote} "</p>
                    <h4 className='testimonial-author'>- {testimonial.client}</h4>
                  </div>
                </div>
              )}
            </Slider>
          </Row>
          <Row className='justify-content-center'>
            <Col sm='6'>
              <p className='lead text-center'>Contact us below about your project ideas!</p>
              <p className='lead text-center'>Remember, we can help with event photography, flyer/graphic design, videoshoots, and much more!</p>
              <p className='lead text-center'>Are you a SOC organization? Our services are <b>free</b>!<br></br></p>
              <p className='lead text-center'>
                <p className='text-center'>
                  <br></br>
                  <br></br>
                  <br></br>
                  <b>Comet Marketing Creation Timelines:</b> <br></br>
                </p>
                Two weeks for a flyer <br></br>
                One month for a custom designed logo<br></br>
                One week notice for small event photography or group pictures <br></br>
                Two weeks for photography edits <br></br>
                Around 1 month for videos <br></br>
              </p>
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col sm='12' md='6'>
              {this.state.displaySuccessMessage &&
                <div className='success-message'>
                  <h3>Thanks for reaching out! 🎉</h3>
                  <p>We will get back to you at the email you provided.</p>
                </div>
              }
              {this.state.displayErrorMessage &&
                <div className='error-message'>
                  <h3 className='text-danger'>Something went wrong 😔</h3>
                  <p>Try submitting the form again.</p>
                </div>
              }
              <Form id='contact-form' className='contact-form' onSubmit={this.submitHandler}>
                <FormGroup>
                  <Label for="contactWho">Who are you?</Label><br></br>
                  <select
                    value={this.state.whom}
                    onChange={this.onWhomSelect}
                    className='whom'>
                    <option value='' disabled >Select...</option>
                    {whomOptions.map((option, i) => (
                      <option key={i} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <Label for="contactWho">How did you hear about us?</Label><br></br>
                  <select
                    value={this.state.where}
                    onChange={this.onWhereSelect}
                    className='whom'>
                    <option value='' disabled>Select...</option>
                    {whereOptions.map((option, i) => (
                      <option key={i} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <Label for="contactEmail">Email</Label>
                  <Input onBlur={this.displayEmailInvalid} onChange={this.onEmailChange} value={this.state.email} type="email" name="email" id="email" placeholder="your_org@mail.com" />
                  {this.state.displayInvalidMessage &&
                    <span className='text-danger'>Enter a valid email!</span>
                  }
                </FormGroup>
                <FormGroup>
                  <Label for="contactPhone">Phone Number</Label>
                  <Input onChange={this.onPhoneChange} value={this.state.phone} type="text" name="Phone" id="Phone" placeholder="111-222-1234" />
                </FormGroup>
                <FormGroup>
                  <Label for="contactSubject">Name &#160;(Organization)</Label>
                  <Input onChange={this.onNameChange} value={this.state.name} type="text" name="Name" id="Name" placeholder="Temoc   (University of Texas at Dallas)" />
                </FormGroup>
                <FormGroup>
                  <Label for="contactBody">Message Body</Label>
                  <FormText rows='8' color='#2b2b2b' className='message-input' tag='textarea' onChange={this.onMessageChange} value={this.state.message} type="textarea" name="message" id="message"
                    placeholder="If enquiring about a future project please also include a probable timeline/deadline."></FormText>
                </FormGroup>
                {this.state.displayEmptyMessage &&
                  <p className='text-danger'>Make sure everything is filled out!</p>
                }
                <FormGroup>
                    <Label check>
                      <Input type="checkbox" onClick={this.toggle} />
                      I Agree to the Terms and Conditions
                    </Label>
                    <br />
                  <Collapse isOpen={this.state.tosBox}>
                    <Card>
                      <CardBody>
                      Hello Valued Client! 
                      
                      We here at Comet Marketing (CM) value our clients and want to give you the best product 
                      possible! However, we also value our artists and specialists so we ask you to agree to these 
                      terms and conditions before we start working on your projects. This way we can keep our clients and 
                      our CM members happy! 
                      
                      As a reminder, all our services are FREE and only cost the time of our dedicated members. 
                      Please understand that along with being artists, our members are also students. 
                      
                      Ground Rules 
                      
                      We ask that you do not remove any Comet Marketing logos on any content, including 
                      photography, videography, and graphic design. We also ask that you do not change any content 
                      with our logo without approval from our team. 
                      
                      Graphic Design 
                      
                      We are limiting the number of major revisions on a design to 2 free revisions. Minor revisions 
                      will be done at the inclination of the graphic designer.After 2, the project will be forwarded to 
                      the graphic designer for a fee based on the designer. 
                      
                      Videography 
                      
                      Confirmations must be made 7 days in advance of the event. Cancellations must be done 24 
                      hours in advance of the event. The only exception would be for emergencies. 
                      
                      Photography 
                      
                      Confirmations must be made 7 days in advance of the event. Cancellations must be done 24 
                      hours in advance of the event. The only exception would be for emergencies.
                      
                      Penalty 
                      
                      Unfortunately, if you break the Terms and Conditions, we will no longer be able to prioritize 
                      your project. Continued failure to uphold the Terms and Conditions will lead to a yearlong ban 
                      of your organization from working with Comet Marketing. We know this sounds drastic, but if 
                      you value our artists’ time like we do, it will not come to this. 
                      
                      Thank you for your understanding and we look forward to working with you! 
                      </CardBody>
                    </Card>
                  </Collapse>
                </FormGroup>
                <br />
                <FormGroup>
                  <ReCAPTCHA
                    sitekey="6LeyIokUAAAAAD86i0PeGaQUFDNzpa4pIuePOIp8"
                    onChange={this.onRecaptchaChange}
                  />
                </FormGroup>
                <CallToAction className='submit-button' dark>Submit</CallToAction>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}