/* @flow */
import React from 'react';

const LoginPage = (): ?React$Element<section> => {
  return(
    <section className='hero is-light'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title has-text-centered'>
            Login Page
          </h1>
          <div className='subtitle has-text-centered' />
        </div>
      </div>
    </section>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
