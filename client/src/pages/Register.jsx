import Logo from '../components/Logo';
import styled from 'styled-components';
import { FormRow, SubmitButton } from '../components';
import { Form, redirect, Link } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful', { autoClose: 1000 });
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' labelText='Name' />
        <FormRow type='text' name='lastName' labelText='Last Name' />
        <FormRow type='text' name='location' labelText='Location' />
        <FormRow type='email' name='email' labelText='Email' />
        <FormRow type='password' name='password' labelText='Password' />
        <SubmitButton />
        <p>
          Already a member?
          <Link className='member-btn' to='/login'>
            Login
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

export default Register;
