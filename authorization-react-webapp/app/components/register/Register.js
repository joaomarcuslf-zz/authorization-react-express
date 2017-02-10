import React from 'react';
import RegistrationForm from '../../containers/RegistrationForm';

const Register = () => {
  return (
    <section className="app-body hero is-light">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">
            Registration Page
          </h1>
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
};

export default Register;
