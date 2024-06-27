import styled from 'styled-components';
import { FormRow, SubmitButton } from '../components';
import { Form, redirect, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import customFetch from '../utils/customFetch';
import FormRowSelect from '../components/FormRowSelect';

// eslint-disable-next-line react-refresh/only-export-components
export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/jobs', data);
      queryClient.invalidateQueries(['jobs']);
      toast.success('Job added successfully ');
      return redirect('all-jobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();
  return (
    <Wrapper>
      <Form className='form' method='post'>
        <h4 className='form-title'>Add job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='Job location'
            defaultValue={user.location}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='Job status'
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name='jobType'
            labelText='Job type'
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default AddJob;
