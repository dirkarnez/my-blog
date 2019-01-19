import * as React from "react";
import Header from "./header";
import Helmet from "react-helmet";
import { Button } from "../components/Button";
// import "../styles/layout-overide.css";
import Sidebar from "./sidebar";


interface IndexState {
  toggle: boolean
}

export default class Index extends React.Component<{}, IndexState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      toggle: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ toggle: !this.state.toggle });
  }
  
  render() {
    const { children } = this.props;
    const { toggle } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>Gatsby Default Starter</title>
          <meta charSet = "utf-8" />
          <meta name="description" content="HelSamplemet" />
          <meta name="keywords" content="sample, something" />
          <meta http-equiv = "x-ua-compatible" content = "ie = edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link href="//fonts.googleapis.com/css?family=Playfair+Display:700,900" rel="stylesheet"/>
          <title>Accordion</title>
        </Helmet>
        <div className="sidenav" style={{width: toggle ? "250px" : "0px"}}>
           <a href="javascript:void(0)" className="closebtn" onClick={this.toggle}>&times;</a>
           <a href="#">About</a>
           <a href="#">Services</a>
           <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>
        <Header toggle={this.toggle}/>
        <div className="container-fluid main">
          {children}
        </div>
        <footer className="blog-footer">
          <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
          <p>
            <a href="#">Back to top</a>
          </p>
        </footer>
      </React.Fragment>
    );
  }
}