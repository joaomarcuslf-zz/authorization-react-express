/* @flow */
import React from 'react';
import { Link } from 'react-router';

const Navbar = (): ?React$Element<nav> => {
  return (
    <nav id='nav' className='nav has-shadow hero is-bold'>
      <header className='nav-left is-fullwidth'>
        <h2 className='nav-item is-brand title'>
          <Link to='/'>Authorization-React-Express</Link>
        </h2>
      </header>
      <div className="nav-right">
        <div role='navigation' className='is-pulled-right'>
          <Link to='/register'>Register</Link> / <Link to='/login'>Login</Link>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
