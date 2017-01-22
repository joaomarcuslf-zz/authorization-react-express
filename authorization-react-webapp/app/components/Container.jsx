/* @flow */
import React from 'react';
import Navbar from './navbar/Navbar.jsx';
import Footer from './footer/Footer.jsx';

const Container = ({ children }: object): ?React$Element<div> => {
    return(
      <div>
        <Navbar />

        {children}

        <Footer profileUrl='http://joaomarcuslf.github.io/'>
          @joaomarcuslf
        </Footer>
      </div>
    );
};

Container.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default Container;
