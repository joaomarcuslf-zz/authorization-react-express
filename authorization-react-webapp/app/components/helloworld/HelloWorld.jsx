/* @flow */
import React from 'react';

export default class HelloWorld extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(): boolean {
    return true;
  }

  render(): ?React$Element<section> {
    return(
      <section className='hero is-light'>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title has-text-centered'>
              Hello World,
            </h1>
            <div className='subtitle has-text-centered'>
              <h2>this is the Front-end boilerplate</h2>
              <hr />
              <p className='container'>
                Check the project page on <a href='https://github.com/joaomarcuslf/frontend-boilerplate'>Github</a>,
                <br />
                Also check the <a href='https://github.com/joaomarcuslf/frontend-boilerplate/blob/master/README.md'>
                README.md</a> for the complete explanation of how to start this.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
