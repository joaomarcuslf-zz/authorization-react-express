import React from 'react';
import { Link } from 'react-router';

const LoginPage = () => {
  return(
    <section className='app-body hero is-light'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title has-text-centered'>
            Login Page
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
						<p className='control'>
							<Link to='/register'>Don't have an account yet?</Link>
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

LoginPage.propTypes = {};

export default LoginPage;
