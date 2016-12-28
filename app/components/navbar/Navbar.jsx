/* @flow */
import React from 'react';

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(): boolean {
    return false;
  }

  render(): ?React$Element<nav> {
    return (
      <nav id='nav' className='nav has-shadow hero is-primary is-bold'>
        <header className='nav-left'>
          <h2 className='nav-item is-brand title'>
            Front-end Boilerplate
          </h2>
        </header>
      </nav>
    );
  }
}
