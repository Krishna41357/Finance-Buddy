import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import UserPillar from '../../components/UserPillar/UserPillar';
import BlogPage from '../../components/newsfeed/BlogPage';

const AfterLogin = () => {
  const { user, isAuthenticated, isLoading } = useContext(AuthContext);

  console.log('=== DEBUG: AfterLogin Component ===');
  console.log('user:', user);
  console.log('isAuthenticated:', isAuthenticated());
  console.log('isLoading:', isLoading);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  // If user is not authenticated
  if (!isAuthenticated() || !user) {
    return (
      <div className="text-red-500 text-center p-4">
        Please log in again to continue.
      </div>
    );
  }

  const username = user.username || 'No Username';
  const userId = user.userId || user._id;

  console.log('username:', username);
  console.log('userId:', userId);

  return (
    <div className="bg-[#D9ECCD] flex bg-gray-100 min-h-screen w-[100vw] px-2 py-4">
      <div className="sticky top-0 position-fixed">
        <UserPillar username={username} />
      </div>
      <div className="flex-grow p-6">
        <BlogPage userId={userId} type="Blog"/>
      </div>
    </div>
  );
};

export default AfterLogin;
