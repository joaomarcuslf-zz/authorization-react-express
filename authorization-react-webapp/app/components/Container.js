import React from 'react';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

const Container = ({ children }) => (
  <div className="app-container">
    <Navbar />

    {children}

    <Footer profileUrl="http://joaomarcuslf.github.io/">
      @joaomarcuslf
    </Footer>
  </div>
);

Container.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Container;
