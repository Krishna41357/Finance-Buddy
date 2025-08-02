import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

const OAuthSuccessHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const username = queryParams.get('username');
    const userId = queryParams.get('userId');

    if (token && username && userId) {
      // Store token and user in context and localStorage
      login({ token, user: { username, userId } });

      toast.success('Logged in successfully');

      // ⏳ Wait for context to update before navigating
      setTimeout(() => {
        navigate('/preferences');
      }, 300); // Try 300ms delay
    } else {
      toast.error('Google login failed');
      navigate('/auth/login');
    }
  }, [location.search, login, navigate]);

  return null;
};

export default OAuthSuccessHandler;
