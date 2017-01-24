/* @flow */
import React from 'react';
import { Link } from 'react-router';

const RegisterPage = (): ?React$Element<section> => {
  return(
    <section className='app-body hero is-light'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title has-text-centered'>
            Registration Page
          </h1>
					<form className='subtitle has-shadow'>
						<label className='label'>Username:</label>
						<p className='control'>
							<input className='input' type='text' placeholder='Type your username' />
						</p>
						<label className='label'>Password:</label>
						<p className='control'>
							<input className='input' type='password' placeholder='Type your password' />
						</p>
						<label className='label'>E-mail:</label>
						<p className='control'>
							<input className='input' type='email' placeholder='Type your e-mail' />
						</p>
            <p className='control'>
						  <Link to='/login'>Already have an account?</Link>
						</p>

						<div className='control is-grouped is-pulled-right'>
							<p className='control'>
								<Link to='/'>
									<button type='submit' className='button is-primary'>Submit</button>
								</Link>
							</p>
							<p className='control'>
								<Link to='/'>
									<button className='button is-danger'>Cancel</button>
								</Link>
							</p>
						</div>
					</form>
        </div>
      </div>
    </section>
  );
};

RegisterPage.propTypes = {};

export default RegisterPage;
