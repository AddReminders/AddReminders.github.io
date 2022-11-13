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

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Modal,
} from "reactstrap";

import DemoNavbar from "../../components/Navbars/DemoNavbar.js";
import SimpleFooter from "../../components/Footers/SimpleFooter.js";
import axios from "axios";

class License extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleWorkspaceChange = this.handleWorkspaceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleWorkspaceChange(event) {
    this.setState({workspaceAddress: event.target.value});
  }

  handleSubmit(event) {
    console.log('Submitted: ' + JSON.stringify(this.state));
    const { email, workspaceAddress } = this.state;

    const isEmailValid = this.validateEmail(email);
    const isUrlValid = this.validateUrl(workspaceAddress);

    if (!isEmailValid || !isUrlValid) {
      alert('Please enter a valid email and workspace address');
    }

    this.setState({ sendingLicenseRequest: true });
    axios.post('https://reliable-yeot-b60f66.netlify.app/.netlify/functions/license', {
      email,
      workspaceAddress
    }).then(function (response) {
      if (response.status === 200) {
        console.log('Successfully sent license', response);
        this.toggleModal('licenseSentConfirmationModal');
      } else {
        console.log('Failed to send license. Unknown response received: ', response);
        this.toggleModal('licenseSentErrorModal');
      }
    }.bind(this)).catch(function (error) {
      console.log('Caught Error', error);
      this.toggleModal('licenseSentErrorModal');
    }.bind(this)).finally(function () {
      this.setState({sendingLicenseRequest: false, email: undefined, workspaceAddress: undefined});
    }.bind(this));

    event.preventDefault();
  }

  validateUrl(url) {
    return !!url && (url.startsWith('http') || url.startsWith('https'));
  }

  validateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(mail || '')) {
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
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="8" style={{'marginTop': '20px'}}>
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <span className="h5">
                        Get Premium License{" "}
                        <small className="text-muted">for FREE</small>
                      </span>
                      {/* <h1 className="display-4">Get Premium License</h1>*/}
                      <div className="text-muted mb-4">
                        <small>Please fill the following details & we'll mail your License to the provided Email</small>
                        <br/>
                        <small className="text-center">Checkout <a href="https://add-reminders.gitbook.io/docs/guides/premium-license">the following guide</a> to learn more about Premium License setup</small>
                      </div> 
                      <Form role="form" onSubmit={this.handleSubmit}>
                        <FormGroup className={`mb-3 ${ this.validateEmail(this.state.email) ? 'has-success' : this.state.email !== undefined && 'has-danger' }`}>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email" type="email" className={`${ this.validateEmail(this.state.email) ? 'is-valid' : this.state.email !== undefined && 'is-invalid' }`} value={this.state.email || ''} onChange={this.handleEmailChange} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className={`mb-3 ${ this.validateUrl(this.state.workspaceAddress) ? 'has-success' : this.state.workspaceAddress && 'has-danger' }`}>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-link" aria-hidden="true"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Site Url for Rocket.Chat server" className={`${ this.validateUrl(this.state.workspaceAddress) ? 'is-valid' : this.state.workspaceAddress !== undefined && 'is-invalid' }`} type="string" value={this.state.workspaceAddress || ''} onChange={this.handleWorkspaceChange} />
                          </InputGroup>
                          <div className="mb-5" style={{ "fontSize": "0.9rem"}}>
                            <small>Please make sure this is same as <i>"Site_URL"</i> setting on your Rocket.Chat server.<br/> <i>Goto "Administrator -{'>'} General -{'>'} Site URL"</i> on your Rocket.Chat server to confirm this</small>
                          </div>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                            disabled={this.state.sendingLicenseRequest || !this.validateEmail(this.state.email) || !this.validateUrl(this.state.workspaceAddress)}
                          >
                            Get License on Email
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md="4">
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.licenseSentConfirmationModal}
                    toggle={() => this.toggleModal("licenseSentConfirmationModal")}
                  >
                    <div className="modal-header">
                      <h6 className="modal-title" id="modal-title-default">
                        License sent Successfully
                      </h6>
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("licenseSentConfirmationModal")}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>
                        Your Premium License has been mailed to your email address {this.state.email}. Please check your email and get your license key.
                      </p>
                      <p>
                        If you don't receive the email within a few minutes, please check your spam folder. If you still don't receive the email, please contact us at <a href="mailto:remindersinchat@gmail.com">remindersinchat@gmail.com</a> with your workspace address and we'll quickly get back to you.
                      </p>
                    </div>
                    <div className="modal-footer">
                      <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("licenseSentConfirmationModal")}
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
                    isOpen={this.state.licenseSentErrorModal}
                    toggle={() => this.toggleModal("licenseSentErrorModal")}
                  >
                    <div className="modal-header">
                      <h6 className="modal-title" id="modal-title-notification">
                        Error occurred while Sending License
                      </h6>
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("licenseSentErrorModal")}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="py-3 text-center">
                        <i className="ni ni-bell-55 ni-3x" />
                        <h4 className="heading mt-4">Sorry! We weren't able to send you a License</h4>
                        <p>
                          Please try again later or contact us at <a href="mailto:remindersinchat@gmail.com">remindersinchat@gmail.com</a> with your workspace address and we'll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <Button className="btn-white" color="default" type="button" onClick={() => this.toggleModal("licenseSentErrorModal")}>
                        Ok, Got it
                      </Button>
                    </div>
                  </Modal>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default License;
