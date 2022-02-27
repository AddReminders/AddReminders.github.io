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
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

// import { animateScroll as scroll } from "react-scroll";


class DemoNavbar extends React.Component {

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  getOffset = ( el ) => {
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = el.getBoundingClientRect();
    return elemRect.top - bodyRect.top;
  }

  onClick=(event) => {
    // if (!event?.target?.href && event.target.href.indexOf('#') === -1) {
    //   return;
    // }
    // // TODO: temporary solution - find a permanent solution for this issue
    // if (window.location.pathname === '/') {
    //   const targetDiv = event.target.href.split('#')[1];
    //   event.preventDefault();
    //   var x = this.getOffset(document.getElementById(targetDiv)); 
    //   scroll.scrollTo(x);
    //   window.location = event.target.href;
    //   // auto close navbar if its not collapsed
    //   document.getElementById('navbar_global').click();
    // } 
  }

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("../../assets/img/theme/remind-app-icon.png")}
                  style={{ width: "75px", height: "auto" }}
                /> <br/>
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("../../assets/img/theme/remind-app-icon.png")}
                          style={{ width: "50px", height: "auto" }}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink
                      aria-expanded={false}
                      aria-haspopup={true}
                      className="nav-link-icon"
                      data-toggle="dropdown"
                      href="/#/#contact-us" 
                      onClick={this.onClick}
                      role="button"
                      >
                        Contact Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      aria-expanded={false}
                      aria-haspopup={true}
                      className="nav-link-icon" 
                      color="primary"
                      data-toggle="dropdown"
                      href="/#/license"
                      role="button"
                      >
                        Get License
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="https://add-reminders.gitbook.io/docs/"
                      target="_blank"
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-cloud-download mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Get Started
                      </span>
                    </Button>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
