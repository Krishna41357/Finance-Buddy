import './App.css'
import BeforeLogin from './pages/landingPage/BeforeLogin'
import { Routes , Route } from 'react-router-dom'
import LoginPage from './components/auth/login/loginPage'
import SignupForm from './components/auth/signup/signupForm'
import { Toaster } from 'react-hot-toast';
import NewsCard from './components/newsfeed/NewsCard'
import Feeds from './components/newsfeed/Feeds'
import BlogPage from './components/newsfeed/BlogPage'
import UserPillar from './components/UserPillar/UserPillar'
import AfterLogin from './pages/landingPage/AfterLogin'
import OnboardingPage from './pages/onboarding/OnboardingPage'


function App() {
  return (
    <>
      <div>
        <Toaster position='top-center' toastOptions={{
          className: 'p-4 w-[400px]',
        }}></Toaster>
      </div>
     {/* <PageTransition variant="blur"> */}
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<BeforeLogin />} />
        
        {/* Authentication Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupForm />} /> 
        
        {/* Onboarding Flow */}
        <Route path="/preferences" element={<OnboardingPage />} />
        
        {/* Main Dashboard */}
        <Route path="/dashboard" element={<AfterLogin />} />
        
        {/* Other existing routes (uncomment as needed) */}
        {/* <Route path="/news" element={<NewsCard />} /> */}
        {/* <Route path="/feeds" element={<Feeds />} /> */}
        {/* <Route path="/blog" element={<BlogPage />} /> */}
        {/* <Route path="/user" element={<UserPillar />} /> */}
      </Routes>
      
    </>
  )
}

export default App