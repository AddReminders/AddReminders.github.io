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
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Landing from "./views/examples/Landing.js";
import License from "./views/examples/License.js";

ReactDOM.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      {/* <Route path="/" exact render={props => <Index {...props} />} /> */}
      <Route
        path="/"
        exact
        render={props => <Landing {...props} />}
      />
      <Route path="/license" exact render={props => <License {...props} />} />

      <Redirect to="/" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
