import Layout from "../components/Layout";
import CallToAction from '../components/CallToAction';
import { Component } from 'react';
import { Container, Button, Form, FormGroup, FormText, Label, Input, Row, Col } from 'reactstrap';
import ReCAPTCHA from "react-google-recaptcha";
import Select from 'react-select';
import fetch from "node-fetch";
import Slider from 'react-animated-slider';

const options = [
  { value: 'client', label: 'Student Organization' },
  { value: 'partner', label: 'Business' },
  { value: 'other', label: 'Other' }
];

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20
  }),
  control : (provided, state) => ({
    ...provided,
    borderColor: state.isSelected ? 'rgb(253, 153, 23)' : 'black',
    borderWidth: '2',
    '&:focus': { outline: 0, borderColor: 'orange', boxShadow: '0 0 0 0.2rem peachpuff', },
    '&:hover': { outline: 0, borderColor: 'orange', boxShadow: '0 0 0 0.2rem peachpuff', },
    transition: 'all .2s',
    borderRadius: 0
  })
}

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      message: "",
      whom: "",
      emailInvalid: false,
      displayInvalidMessage: false,
      displayEmptyMessage: false,
      displaySuccessMessage: false,
      displayErrorMessage: false,
      recaptchaScore: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.onRecaptchaChange = this.onRecaptchaChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.displayEmailInvalid = this.displayEmailInvalid.bind(this);
    this.onWhomChange = this.onWhomChange.bind(this);
  }

  static async getInitialProps() {
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/testimonials?')
    let testimonials = await res.json()
    return {testimonials}
  }

  async submitHandler(e) {
    e.preventDefault();
    if (!(this.state.whom == '' || this.state.email == '' || this.state.name == '' || this.state.message == '' || this.state.emailInvalid || this.state.recaptchaScore == "")) {
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
          whom: this.state.whom.value,
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

  onWhomChange(option) {
    this.setState({ whom: option });
  }

  render() {
    return (
      <Layout title="Contact Us" pageName='Contact Us'>
        <Container>
          <Row className='justify-content-center'>
            <Slider className='slider' autoplay={3000} infinite='true' >
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
              <p className='lead text-center'>Email us about your project ideas!</p>
              <p className='lead text-center'>Remember, we can help with event photography, flyer/graphic design, videoshoots, and much more!</p>
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col sm='12' md='6'>
              {this.state.displaySuccessMessage &&
                <div className='success-message'>
                  <h3>Thanks for reaching out!</h3>
                  <p>We will get back to you at the email you provided.</p>
                </div>
              }
              {this.state.displayErrorMessage &&
                <div className='error-message'>
                  <h3 className='text-danger'>Something went wrong</h3>
                  <p>Try submitting the form again.</p>
                </div>
              }
              <Form id='contact-form' className='contact-form' onSubmit={this.submitHandler}>
                <FormGroup>
                  <Label for="contactWhom">Who are you?</Label>
                  <Select styles={selectStyles} value={this.state.whom} onChange={this.onWhomChange} options={options}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                            ...theme.colors,
                              primary: 'black',
                            },
                          })}
                   />
                </FormGroup>
                <FormGroup>
                  <Label for="contactEmail">Email</Label>
                  <Input onBlur={this.displayEmailInvalid} onChange={this.onEmailChange} value={this.state.email} type="email" name="email" id="email" placeholder="your_org@mail.com" />
                  {this.state.displayInvalidMessage && 
                    <span className='text-danger'>Enter a valid email!</span>
                  }
                </FormGroup>
                <FormGroup>
                  <Label for="contactSubject">Name</Label>
                  <Input onChange={this.onNameChange} value={this.state.name} type="text" name="Name" id="Name" placeholder="Temoc" />
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