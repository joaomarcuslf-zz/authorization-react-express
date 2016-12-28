/* @flow */
import React from 'react';
export default class Footer extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(): boolean {
    return false;
  }

  render(): ?React$Element<footer> {
    const footerStyles = {
      'position': 'absolute',
      'bottom': '0',
      'width': '100%',
      'height': '40px'
    };

    return (
      <footer id='footer' className='footer hero is-dark is-bold' style={footerStyles}>
        <p className='subtitle has-text-centered'>
          Made by: <a href="http://joaomarcuslf.github.io/">@joaomarcuslf</a>
        </p>
      </footer>
    );
  }
}
