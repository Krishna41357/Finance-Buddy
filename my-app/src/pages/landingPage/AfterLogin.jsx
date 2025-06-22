import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import UserPillar from '../../components/UserPillar/UserPillar';
import BlogPage from '../../components/newsfeed/BlogPage';
import Subscribe from '../../components/landingPage/Subscribe';
import Footer from '../../components/footer/Footer';

const AfterLogin = () => {
  const { user, isAuthenticated, isLoading } = useContext(AuthContext);
  const [showOverlay, setShowOverlay] = useState(false); 

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated() || !user) {
    return (
      <div className="text-red-500 text-center p-4">
        Please log in again to continue.
      </div>
    );
  }

  const username = user.username || 'No Username';
  const userId = user.userId || user._id;

  return (
    <>
      <div className="bg-[#EAF3E7] flex min-h-screen w-[100vw] px-2 py-4 relative">
        <div className="sticky top-0">
          <UserPillar username={username} />
        </div>
        <div className="flex-grow">
          <BlogPage userId={userId} setShowOverlay={setShowOverlay} />
        </div>

        {/* ✅ FULL PAGE OVERLAY */}
        {showOverlay && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-6 w-6 text-teal-800 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <p className="text-base font-medium text-gray-700">Loading more feeds for you...</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#EAF3E7]">
        <Subscribe />
      </div>
      <Footer />
    </>
  );
};

export default AfterLogin;
