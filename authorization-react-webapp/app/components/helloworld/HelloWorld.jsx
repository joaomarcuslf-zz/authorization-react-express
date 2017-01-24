/* @flow */
import React from 'react';

const HelloWorld = (): ?React$Element<section> => {
  return(
    <section className='app-body hero is-light'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title has-text-centered'>
            Hello World,
          </h1>
          <div className='subtitle has-text-centered'>
            <h2><a href='https://github.com/joaomarcuslf/authorization-react-express'>Project Page</a></h2>
            <hr />
            <p className='container'>
              This is a small application, using React with Redux and Express REST API.
              <br />
              In this application both API and Webapp set communication via JSON, each one
              has each own responsible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

HelloWorld.propTypes = {};

export default HelloWorld;
