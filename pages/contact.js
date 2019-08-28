import Layout from "../components/Layout";
import CallToAction from '../components/CallToAction';
import { Component } from 'react';
import { Container,
          Button, 
          Form, FormGroup, FormText, Label, Input, 
          Row, Col,
          Modal, ModalHeader, ModalBody, ModalFooter,
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
  { value: 'Word of Mouth', label: 'Word of Mouth'},
  { value: 'Email Announcement', label: 'Email Announcement'},
  { value: 'Google search', label: 'Google Search'},
  { value: 'UTD event', label: 'UTD Event'},
  { value: 'Comet Marketing Member', label: 'Comet Marketing Member'},
  { value: 'Presence', label: 'Presence'},
  { value: 'Other', label: 'Other'}
];

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.onRecaptchaChange = this.onRecaptchaChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.displayEmailInvalid = this.displayEmailInvalid.bind(this);
    this.onWhomSelect = this.onWhomSelect.bind(this);
    this.onWhereSelect = this.onWhereSelect.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

  }

  static async getInitialProps() {
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/testimonials?')
    let testimonials = await res.json()
    return {testimonials}
  }

  componentDidMount() {
    this.setState({
      modal: true,
    })
  }

  async submitHandler(e) {
    e.preventDefault();
    if (!(this.state.where == '' || this.state.whom == '' || this.state.email == '' || this.state.name == '' || this.state.message == '' || this.state.emailInvalid || this.state.recaptchaScore == "")) {
      this.setState({ displayEmptyMessage: false });
      let response = await fetch('https://utdcometmarketing-api.herokuapp.com/contactmessages', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          name: this.state.name,
          message: this.state.message,
          whom: this.state.whom.toString(),
          where: this.state.where.toString(),
          recaptchaScore: this.state.recaptchaScore,
        })
      });
      if (response.status == 200) {
        this.setState({displaySuccessMessage: true});

        this.setState({
          email: "",
          name: "",
          message: "",
          whom: "",
          where: "",
          emailInvalid: false,
          displayInvalidMessage: false,
          displayEmptyMessage: false,
          recaptchaScore: ""
        });
      } else {
        this.setState({displayErrorMessage: true})
      }
      grecaptcha.reset();
    }
    else 
      this.setState({displayEmptyMessage: true});
  }

  onRecaptchaChange(e) {
    this.setState({recaptchaScore: e});
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    let emailInvalid = e.target.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null;
    this.setState({ emailInvalid: emailInvalid}); 
  }

  displayEmailInvalid() {
    if (this.state.emailInvalid) {
      this.setState({displayInvalidMessage: true})
    } else {
      this.setState({displayInvalidMessage: false})
    }
  }

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onMessageChange(e) {
    this.setState({ message: e.target.value })
  }

  onWhomSelect(e) {
    this.setState({ whom: e.target.value})
  }

  onWhereSelect(e) {
    this.setState({ where: e.target.value})
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  render() {
    return (
      <Layout title="Contact Us - UTD Comet Marketing" pageName='Contact Us' intro='Hit Us Up' description='Shoot us an email to inquire about future projects or collaborations! We can do graphic design, photography, videography, web design, and help with your general marketing needs!' keywords='UTD,Comet Marketing,CM,UT Dallas,Contact,contact,form,email' author='Al Madireddy,Mustafa Sadriwala'>
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
              <p className='lead text-center'>
                <b>Comet Marketing Creation Timelines:</b> <br></br>
                One week for a flyer <br></br>  
                3 days for event photography or group pictures <br></br>  
                Videos under one minute: ~2 weeks <br></br>  
                Videos over one minute: ~1 month <br></br>  
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