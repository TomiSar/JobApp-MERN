import styled from 'styled-components';
import { FormRow, Logo } from '../components';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful', { autoClose: 1000 });
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form className='form' method='post'>
        <Logo />
        <h4>Login</h4>
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
        <button className='btn btn-block' type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button className='btn btn-block' type='button'>
          Explore the App
        </button>
        <p>
          Not a member yet?
          <Link className='member-btn' to='/register'>
            Register
          </Link>
        </p>
      </Form>
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

export default Login;
