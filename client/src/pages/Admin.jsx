import styled from 'styled-components';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { FormRow, StatItem } from '../components';
import { Form, useNavigation, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import customFetch from '../utils/customFetch';
import FormRowSelect from '../components/FormRowSelect';

export const loader = async () => {
  try {
    const response = await customFetch.get('/users/admin/app-stats');
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page', {
      autoClose: 1000,
    });
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        count={users}
        icon={<FaSuitcaseRolling />}
        title='current users'
        color='#e9b949'
        bcg='#fcefc7'
      />
      <StatItem
        count={jobs}
        title='total jobs'
        icon={<FaCalendarCheck />}
        color='#647acb'
        bcg='#e0e8f9'
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default Admin;
