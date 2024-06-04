import Logo from '../components/Logo';
import styled from 'styled-components';
import { FormRow } from '../components';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow
          type='text'
          name='name'
          labelText='Name'
          defaultValue='Please enter your name...'
        />
        <FormRow
          type='text'
          name='lastName'
          labelText='Last Name'
          defaultValue='Please enter your last name...'
        />
        <FormRow
          type='text'
          name='location'
          labelText='Location'
          defaultValue='Please enter your location...'
        />
        <FormRow
          type='email'
          name='email'
          labelText='Email'
          defaultValue='Please enter your email...'
        />
        <FormRow
          type='password'
          name='password'
          labelText='Password'
          defaultValue='Please enter your password...'
        />
        <button className='btn btn-block' type='submit'>
          Submit
        </button>
        <p>
          Already a member?
          <Link className='member-btn' to='/login'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;

export default Register;
