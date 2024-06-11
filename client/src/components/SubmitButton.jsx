import { useNavigation } from 'react-router-dom';

const SubmitButton = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      className={`btn btn-block ${formBtn && 'form-btn'}`}
      type='submit'
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
};

export default SubmitButton;
