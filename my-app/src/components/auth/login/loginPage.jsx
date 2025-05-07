import React, { useState } from "react";
import axios from "axios";







    const LoginPage = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }
        // Handle login logic here
        console.log("Email:", email);
        console.log("Password:", password);
        axios.post("https://savingsyogi.onrender.com/api/v1/auth/login", { email , password })
            .then(response => {
                // Handle successful login
               const data = response.data;
               if (data) {
                
                console.log(data)
                alert("Login successful:");
               }
               else {
                alert(data.message || 'Login failed!');
               }
    
            })
            .catch(error => {
                console.error("Login error:", error);
                alert('An error occurred during login. Please try again.');
              });
          };
    
	return (
	
		<div className="min-h-screen flex py-10 px-52 bg-gray-100">
			<div className="flex overflow-hidden rounded-3xl border-0 shadow-2xl bg-white mt-20">
				<div className="w-[30%] bg-[#7A57D3] flex flex-col items-center justify-center text-center">
					<img src="/Logo-login.png" alt="Logo" className="mb-2" />
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
							<h2
								className="text-3xl font-serif"
								style={{ fontFamily: "Roboto Serif" }}
							>
								<span className="text-yellow-500">Welcome</span> Back!
							</h2>
							<p className="text-[0.6rem] text-gray-500">
								Log in to Generate, Analyze, and Optimize with Ease!
							</p>
						</div>

						<form className="space-y-5 mx-14">
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

							<div className="flex items-center justify-between gap-4">
								<button
									type="submit"
                                    onClick={handleSubmit}
									className="py-2 px-12 border border-transparent text-xs font-medium rounded-4xl text-white bg-[#7A57D3] hover:bg-indigo-700 focus:outline-none"
								>
									Log In
								</button>
								<p className="text-xs text-gray-400 whitespace-nowrap">
									Not registered yet?{" "}
									<a href="#" className="text-yellow-500 hover:underline">
										Sign Up
									</a>
								</p>
							</div>

							<p className="text-center text-xs text-gray-400">
								or Continue with
							</p>

							<div className="flex gap-4 justify-between">
								<button
									type="button"
									className="flex items-center gap-2 w-full justify-center py-2 px-12 border border-gray-300 rounded-4xl shadow-sm hover:bg-gray-100"
								>
									<img
										src="/google-logo.png"
										alt="Google"
										className="h-5 w-5"
									/>
									<span className="text-sm font-medium">Google</span>
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
									<span className="text-sm font-medium">Facebook</span>
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
