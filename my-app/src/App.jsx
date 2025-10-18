import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// User pages
import BeforeLogin from './pages/landingPage/BeforeLogin';
import LoginPage from './components/auth/login/loginPage';
import SignupForm from './components/auth/signup/SignupForm';
import OnboardingPage from './pages/onboarding/OnboardingPage';
import AfterLogin from './pages/landingPage/AfterLogin';
import OAuthSuccessHandler from './components/auth/login/OAuthSuccessHandler';

// Admin pages

import AdminPanel from './pages/AdminPannel/AdminPanel';
import AdminLogin from './pages/AdminPannel/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AboutPage from './pages/onboarding/About/AboutPage';
import QuizPage from './pages/Quiz/QuizMainPage';
import TokenSyncHandler from './components/TokenSyncHandler';

function App() {
  const adminToken = localStorage.getItem('adminToken');
  const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');

  return (
    <>
    <TokenSyncHandler/>
      <div>
        <Toaster position="top-center" toastOptions={{ className: 'p-4 w-[400px]' }} />
      </div>

      <Routes>
        <Route path="/auth/success" element={<OAuthSuccessHandler />} />
        {/* Landing Page */}
        <Route path="/" element={<BeforeLogin />} />

        {/* User Auth */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupForm />} />

        {/* Onboarding and Dashboard */}
        <Route path="/preferences" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<AfterLogin />} />

        {/* About-us */}
        <Route path="/about-us" element={<AboutPage/>} />

        <Route path="/quiz" element={<QuizPage/>}/>


        {/* Redirects */}

        {/* Admin Auth and Panel */}
        <Route path='/admin' element={<AdminLogin/>}/>
      
        <Route
          path="/admin/dashboard"
          element={
          <ProtectedRoute>
          <AdminPanel/>
          </ProtectedRoute>
          }

        />
      </Routes>
    </>
  );
}

export default App;
