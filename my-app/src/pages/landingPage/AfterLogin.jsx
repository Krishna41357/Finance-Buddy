import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import UserPillar from '../../components/UserPillar/UserPillar';
import BlogPage from '../../components/newsfeed/BlogPage';
import QuizMainPage from '../Quiz/QuizMainPage';
import SimulatorApp from '../VirtualSimulator/SimulatorApp';
import Dashboard from './dashboard/Dashboard';
import FinancialProfilePage from '../Financial_profile/FinancialProfilePage';
import MarketResearchHub from '../MarketResearch/MarketResearchHub';

const AfterLogin = () => {
  const { user, isAuthenticated, isLoading } = useContext(AuthContext);
  const [showOverlay, setShowOverlay] = useState(false); 
  const [selectedPage, setSelectedPage] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Mobile menu toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white bg-emerald-600 p-2 rounded-md shadow-md"
        >
          ☰
        </button>
      </div>

      <div className="bg-[#EAF3E7] flex flex-col lg:flex-row h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed z-40 inset-y-0 left-0 transform transition-transform duration-300 ease-in-out
            lg:relative lg:translate-x-0 lg:flex w-full max-w-[280px]
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <UserPillar
            username={username}
            userId={userId}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto  scrollbar-hide w-screen  lg:mt-0">
          {selectedPage === 'Home' && <Dashboard onActionClick={setSelectedPage} />}
          {selectedPage === 'Content Feed' && <BlogPage userId={userId} setShowOverlay={setShowOverlay} />}
          {selectedPage === 'Quiz' && <QuizMainPage />}
          {selectedPage === 'Paper Trading' && <SimulatorApp/>}
          {selectedPage === 'Portfolio' && <FinancialProfilePage username={username} />}
          {selectedPage === 'Market Research' && <MarketResearchHub />}
        </div>
      </div>

      {/* Loading Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-6 w-6 text-teal-800 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-base font-medium text-gray-700">Loading more feeds for you...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AfterLogin;
