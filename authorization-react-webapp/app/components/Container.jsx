/* @flow */
import React from 'react';
import Navbar from './navbar/Navbar.jsx';
import Footer from './footer/Footer.jsx';

export default class Container extends React.Component {
  propTypes: {
    children: React.PropTypes.element.isRequired
  }

  constructor() {
    super();
  }

  shouldComponentUpdate(): boolean {
    return true;
  }

  render(): ?React$Element<div> {
    return(
      <div>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
