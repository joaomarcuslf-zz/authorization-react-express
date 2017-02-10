import R from 'ramda';
import { reduxForm } from 'redux-form';
import { registerUser } from '../actions/index';
import RegisterPage from '../components/register/RegisterPage';

const validate = R.cond([
  [R.equals({}), () => {}],
  [R.T, ({ username, password, email }) => ({
    username: !username,
    password: !password,
    email: !email,
  })],
]);

export default reduxForm({
  form: 'RegistrationForm',
  fields: ['username', 'password', 'email'],
  validate,
}, null, { registerUser })(RegisterPage);
