import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const SignupForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetName = (e) => setUserName(e.target.value);
  const handleSetEmail = (e) => setEmail(e.target.value);
  const handleSetPassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/register", {
        username,
        email,
        password,
      });

      const { success, token, user, message } = response.data;

      if (success && token && user) {
        // Save auth data in context and localStorage
        login({ token, user });

        toast.success("Signup successful! Let's set up your preferences.");

        // Navigate to onboarding/preferences page
        navigate("/preferences");
      } else {
        toast.error(message || "User already exists with this email.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#D9ECCD] flex py-10 px-52 ">
      <div className="flex overflow-hidden  rounded-3xl border-0 shadow-2xl bg-white mt-20">
        <div className="w-[30%] bg-green-800 flex flex-col items-center justify-center text-center">
          <img src="/logo-register.png" alt="Logo" className="mb-2" />
          <p className="text-[0.7rem] text-gray-200 max-w-60 font-extralight mb-36">
            Create your <span className="font-semibold">StudentCorner</span>{" "}
            profile for personalized job updates, expert blogs,
            <br />
            and exclusive mock tests!
          </p>
        </div>

        <div className="w-[70%] flex items-center justify-center bg-white">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-serif">
                <span className="text-green-500 font-[800] font-[Poppins]">Create</span>{" "}
                <span className="text-black font-[500]">Account</span>
              </h2>
            </div>

            <form className="space-y-5 mx-14" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="userfullname" className="block text-xs font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="userfullname"
                  name="userfullname"
                  type="text"
                  value={username}
                  onChange={handleSetName}
                  placeholder="Enter your name"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleSetEmail}
                  placeholder="Enter your email address"
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleSetPassword}
                  placeholder="Enter your password"
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  type="submit"
                  className="py-2 px-12 border border-transparent text-xs font-medium rounded-4xl text-white bg-green-800 hover:bg-indigo-700 focus:outline-none"
                >
                  Sign Up
                </button>
                <p className="text-xs text-gray-400 whitespace-nowrap">
                  Already have account?{" "}
                  <a
                    href="/auth/login"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/auth/login");
                    }}
                    className="text-yellow-500 hover:underline"
                  >
                    Log In
                  </a>
                </p>
              </div>

              <p className="text-center text-xs text-gray-400">or Continue with</p>

              <div className="flex gap-4 justify-between">
                <button
                  type="button"
                  className="flex items-center gap-2 w-full justify-center py-2 px-12 border border-gray-300 rounded-4xl shadow-sm hover:bg-gray-100"
                >
                  <img src="/google-logo.png" alt="Google" className="h-5 w-5" />
                  <span className="text-sm font-medium text-black">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 w-full justify-center py-2 px-10 border border-gray-300 rounded-4xl shadow-sm hover:bg-gray-100"
                >
                  <img src="/facebook-logo.png" alt="Facebook" className="h-5 w-5" />
                  <span className="text-sm font-medium text-black">Facebook</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
