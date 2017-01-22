/* @flow */
import React from 'react';

const Navbar = (): ?React$Element<nav> => {
  return (
    <nav id='nav' className='nav has-shadow hero is-primary is-bold'>
      <header className='nav-left'>
        <h2 className='nav-item is-brand title'>
          Front-end Boilerplate
        </h2>
      </header>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
