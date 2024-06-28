import styled from 'styled-components';
import { FormRow, Logo, SubmitButton } from '../components';
import { Form, redirect, Link, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import axios from 'axios';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await axios.post('/api/v1/auth/login', data);
      queryClient.invalidateQueries();
      toast.success('Login successful', { autoClose: 1000 });
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error.response.data.msg, { autoClose: 1000 });
      return error;
    }
  };

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };
    try {
      await customFetch.post('/auth/login', data);
      toast.success('Testing the application', { autoClose: 1000 });
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg, { autoClose: 1000 });
    }
  };

  return (
    <Wrapper>
      <Form className='form' method='post'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' labelText='Email' />
        <FormRow type='password' name='password' labelText='Password' />
        <SubmitButton />
        <button className='btn btn-block' type='button' onClick={loginDemoUser}>
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
