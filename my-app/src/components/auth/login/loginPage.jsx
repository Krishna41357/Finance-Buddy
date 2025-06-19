import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    axios
      .post(`http://localhost:8000/api/v1/auth/login`, { email, password })
      .then((response) => {
        const data = response.data;

        
        // Debug logs to see what we're getting from the API
        console.log('=== DEBUG: Login Response ===');
        console.log('Full response:', response);
        console.log('Response data:', data);
        console.log('Token:', data.token);
        console.log('User object:', data.user);
        console.log('User properties:', Object.keys(data.user || {}));
        
        if (data && data.token) {
          login({ token: data.token, user: data.user });
          toast.success('Login successful');
          navigate('/dashboard' , {state : { username : data.user.username , userId : data.user.userId}});
        } else {
          toast.error('Incorrect Credentials');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        toast.error('An error occurred during login. Please try again.');
      });
  };

  return (
    <div className="min-h-screen bg-[#D9ECCD] w-screen flex flex-wrap  py-0 pb-10 ">
      <div className="flex w-[70%] overflow-hidden m-auto  rounded-3xl border-0 shadow-2xl bg-white mt-20 ">
        <div className="w-[30%] max-sm:hidden bg-green-800 flex flex-col items-center justify-center text-center">
          <img src="/Logo-login.png" alt="Logo" className="mb-2" />
          <p className="text-xs text-gray-200 max-w-60 font-extralight mb-36">
            Create your <span className="font-semibold">StudentCorner</span>{" "}
            profile for personalized job updates, expert blogs,
            <br />
            and exclusive mock tests!
          </p>
        </div>

        <div className="w-[70%] max-sm:w-[100%] p-4 flex items-center justify-center bg-white">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-serif">
                <span className="text-green-500 font-[Roboto-Serif]">Welcome </span>
                <span className="text-black">Back!</span> 
              </h2>
              <p className="text-[0.6rem] text-gray-500 font-[Roboto-flex] font-[100] text-sm ">
                Log in to Generate, Analyze, and Optimize with Ease!
              </p>
            </div>

            <form className="space-y-5 mx-14 mt-10" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="text-right">
                <a href="#" className="text-xs text-red-500 hover:underline">
                  Forgot password?
                </a>
              </div>

              <div className="flex items-center flex-wrap justify-between gap-4">
                <button
                  type="submit"
                  className="py-2 px-12 md:scale-95 border border-transparent text-xs font-medium rounded-4xl text-white bg-green-800 hover:bg-indigo-700 focus:outline-none"
                >
                  Log In
                </button>
                <p className="text-xs text-gray-400 whitespace-nowrap">
                  Not registered yet?{" "}
                  <a 
                    href="/auth/signup" 
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/auth/signup");
                    }} 
                    className="text-yellow-500 hover:underline"
                  >
                    Sign Up
                  </a>
                </p>
              </div>

              <p className="text-center text-xs text-gray-400">
                or Continue with
              </p>

              <div className="flex gap-4 m-0">
                <button
                  type="button"
                  className="flex items-center gap-2 w-full justify-center py-2 px-12 border border-gray-300 rounded-4xl shadow-sm hover:bg-gray-100"
                >
                  <img
                    src="/google-logo.png"
                    alt="Google"
                    className="h-5 w-5"
                  />
                  <span className="text-sm text-black font-medium">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 w-full justify-center py-2 px-10 border border-gray-300 rounded-4xl shadow-sm hover:bg-gray-100"
                >
                  <img
                    src="/facebook-logo.png"
                    alt="Facebook"
                    className="h-5 w-5"
                  />
                  <span className="text-sm text-black font-medium">Facebook</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
