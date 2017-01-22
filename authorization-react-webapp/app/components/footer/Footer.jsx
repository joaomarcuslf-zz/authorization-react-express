/* @flow */
import React from 'react';

const footerStyles = {
  'position': 'absolute',
  'bottom': '0',
  'width': '100%',
  'height': '40px'
};

const Footer = ({ children, profileURL }: object): ?React$Element<footer> => {
  if (!children) {
    return <footer />;
  }

  return (
    <footer id='footer' className='footer hero is-dark is-bold' style={footerStyles}>
      <p className='subtitle has-text-centered'>
      Made with {'<3'} by <a href={profileURL}>{children}</a>
      </p>
    </footer>
  );
};

Footer.propTypes = {
  children: React.PropTypes.node,
  profileURL: React.PropTypes.string
};

export default Footer;
