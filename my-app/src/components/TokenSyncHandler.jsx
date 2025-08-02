import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const TokenSyncHandler = () => {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const username = queryParams.get('username');
    const userId = queryParams.get('userId');

    if (token && username && userId) {
      login({ token, user: { username, userId } });

      // Remove query params from URL
      const path = location.pathname;
      navigate(path, { replace: true }); // Keeps route but removes ?token=...
    }
  }, [location, login, navigate]);

  return null;
};

export default TokenSyncHandler;
