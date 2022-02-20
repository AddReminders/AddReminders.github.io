/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Form,
  Modal,
} from "reactstrap";

// core components
import DemoNavbar from "../../components/Navbars/DemoNavbar.js";
import CardsFooter from "../../components/Footers/CardsFooter.js";

import axios from "axios";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value});
  }

  handleSubmit(event) {
    console.log('Contact us form Submitted: ' + JSON.stringify(this.state));
    const { email, name, message } = this.state;

    if (!this.validateEmail(email) || !name.trim() || !message.trim()) {
      alert('Please enter a valid email, name and message.');
    }

    this.setState({ sendingContactUsMessage: true });
    axios.post('https://adoring-nightingale-054469.netlify.app/.netlify/functions/contact', {
      email,
      name,
      message,
    }).then(function (response) {
      if (response.status === 200) {
        console.log('Successfully sent contact us message', response);
        this.toggleModal('contactUsFormSentConfirmationModal');
      } else {
        console.log('Failed to send contact us message. Response: ', response);
        this.toggleModal('contactUsFormSentErrorModal');
      }
    }.bind(this)).catch(function (error) {
      console.log('Caught Error', error);
      this.toggleModal('contactUsFormSentErrorModal');
    }.bind(this))
    .finally(function () {
      this.setState({ sendingContactUsMessage: false, name: undefined, email: undefined, message: undefined });
    }.bind(this));

    event.preventDefault();
  }

  validateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail || '')) {
      return true;
    }
    return false;
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex" style={{marginTop: '50px'}}>
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h1 className="display-3 text-white">
                        Create Reminders {" "}
                        <span>within Rocket.Chat</span>
                      </h1>
                      <p className="lead text-white">
                      Automate reminders for you and your team, track who has completed tasks, and keep your work and personal life organized with reminders, right from Rocket.Chat. 
                      </p>
                      <div className="btn-wrapper">
                        <Button
                          className="btn-icon mb-3 mb-sm-0"
                          color="info"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alerts?ref=adsr-landing-page"
                        >
                          <span className="btn-inner--icon mr-1">
                          <i className="ni ni-cloud-download-95" />
                          </span>
                          <span className="btn-inner--text">Get Started</span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
          <section id="contact-us" className="section section-lg  section-contact-us">
            <Container style={{marginTop: '250px'}}>
              <Row className="justify-content-center mt--300">
                <Col lg="8">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">Want to contact us?</h4>
                      <p className="mt-0">
                        Send us a question, wish or criticism.We will get back to you as soon as possible.
                      </p>
                      <Form role="form" onSubmit={this.handleSubmit}>
                        <FormGroup
                          className={classnames("mt-5", {
                            focused: this.state.nameFocused,
                            'has-success': this.state.name?.trim(),
                            'has-danger': this.state.name !== undefined && !this.state.name.trim(),
                          })}
                        >
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-user-run" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Your name"
                              type="text"
                              onFocus={e => this.setState({ nameFocused: true })}
                              onBlur={e => this.setState({ nameFocused: false })}
                              value={this.state.name || ''}
                              onChange={this.handleNameChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup
                          className={classnames({
                            focused: this.state.emailFocused,
                            'has-success': this.validateEmail(this.state.email),
                            'has-danger': this.state.email !== undefined && !this.validateEmail(this.state.email),
                          })}
                        >
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email address"
                              type="email"
                              onFocus={e => this.setState({ emailFocused: true })}
                              onBlur={e => this.setState({ emailFocused: false })}
                              value={this.state.email || ''}
                              onChange={this.handleEmailChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup
                          className={classnames("mb-4", {
                            focused: this.state.message,
                            'has-success': this.state.message?.trim(),
                            'has-danger': this.state.message !== undefined && !this.state.message.trim(),
                          })}>
                          <Input
                            className="form-control-alternative"
                            cols="80"
                            name="name"
                            placeholder="Type a message..."
                            rows="4"
                            type="textarea"
                            value={this.state.message || ''}
                            onChange={this.handleMessageChange}
                          />
                        </FormGroup>
                        <div>
                          <Button
                            block
                            className="btn-round"
                            color="default"
                            size="lg"
                            type="submit"
                            disabled={this.state.sendingContactUsMessage || !this.state.name?.trim() || !this.validateEmail(this.state.email) || !this.state.message?.trim()}
                          >
                            Send Message
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
          <section id="contact-us-confirmation" className="section section-shaped section-lg">
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col md="4">
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.contactUsFormSentConfirmationModal}
                    toggle={() => this.toggleModal("contactUsFormSentConfirmationModal")}
                  >
                    <div className="modal-header">
                      <h6 className="modal-title" id="modal-title-default">
                        Message Recorded Successfully
                      </h6>
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("contactUsFormSentConfirmationModal")}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>
                        Thank you for your message. We will get back to you as soon as possible.
                      </p>
                      <p>
                        In the meantime, if you wish to send us any further messages then please contact us at <a href="mailto:remindersinchat@gmail.com">remindersinchat@gmail.com</a> and we'll quickly get back to you.
                      </p>
                    </div>
                    <div className="modal-footer">
                      <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("contactUsFormSentConfirmationModal")}
                      >
                        Close
                      </Button>
                    </div>
                  </Modal>
                </Col>
                <Col md="4">
                  <Modal
                    className="modal-dialog-centered modal-danger"
                    contentClassName="bg-gradient-danger"
                    isOpen={this.state.contactUsFormSentErrorModal}
                    toggle={() => this.toggleModal("contactUsFormSentErrorModal")}
                  >
                    <div className="modal-header">
                      <h6 className="modal-title" id="modal-title-notification">
                        Error occurred while recording your message
                      </h6>
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("contactUsFormSentErrorModal")}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="py-3 text-center">
                        <i className="ni ni-bell-55 ni-3x" />
                        <h4 className="heading mt-4">Sorry! We weren't able to record your message due to some technical difficulty</h4>
                        <p>
                          Your message is very valuable to us, so could you please try sending this message again here or contact us at <a href="mailto:remindersinchat@gmail.com">remindersinchat@gmail.com</a> directly if this website form isn't working. Really appreciate your patience and we'll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <Button
                        className="btn-white"
                        color="default"
                        type="button"
                        onClick={() => this.toggleModal("contactUsFormSentErrorModal")}
                      >
                        Ok, Got it
                      </Button>
                    </div>
                  </Modal>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Landing;
