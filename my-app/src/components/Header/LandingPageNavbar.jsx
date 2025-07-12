import React, { useState } from "react";
import {
	useNavigate,
  } from "react-router-dom";
  import { Link } from "react-router-dom";

const LandingPageNavbar = () => {
	 const [isMenuOpen, setIsMenuOpen] = useState(false);
	 const navigate = useNavigate();



	const handleLoginClick = () => {
	navigate("/auth/login");
	 };

     const handleSignupClick = () => {
	 	navigate("/auth/signup");
	 };

	 const handleAboutUsClick = () => {
		navigate("/about-us");
	 };

	// const handleContactUsClick = () => {
	// 	router.push("/contact-us");
	// };

	const handleHomeClick = () => navigate("/");

	return (
        
		<div 
			className="backdrop-blur-xl w-screen shadow-2xl fixed pr-6 sm:pr-10 p-3 sm:p-4 left-0 right-0 z-50 border-b border-white/10"
			style={{
				background: 'linear-gradient(135deg, rgba(15, 32, 39, 0.9) 0%, rgba(32, 58, 67, 0.8) 25%, rgba(44, 83, 100, 0.7) 50%, rgba(26, 74, 58, 0.8) 75%, rgba(13, 61, 47, 0.9) 100%)',
				boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
			}}
		>
			{/* Background glow effect */}
			<div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-600/10 to-green-500/5 pointer-events-none" />
			
			<div className="container mx-auto px-4 relative z-10">
				<div className="relative flex items-center justify-between py-2">

					{/* Logo/Brand */}
					<div className="flex items-center">
						<div className="text-xl sm:text-2xl font-bold text-white">
							<span className="text-green-400">Savings</span>Yogi
						</div>
					</div>

					{/* Centered navigation */}
					<nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6 lg:space-x-8">
						<button
						 onClick={handleHomeClick}
							className="text-white font-semibold hover:text-green-400 transition-all duration-300 relative group px-2 py-1"
						>
							Home
							<div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300 shadow-sm shadow-green-400/50"></div>
						</button>
						<button
							onClick={handleAboutUsClick}
							className="text-white font-semibold hover:text-green-400 transition-all duration-300 relative group px-2 py-1"
						>
							About Us
							<div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300 shadow-sm shadow-green-400/50"></div>
						</button>
						<button
							// onClick={handleContactUsClick}
							className="text-white font-semibold hover:text-green-400 transition-all duration-300 relative group px-2 py-1"
						>
							Contact Us
							<div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300 shadow-sm shadow-green-400/50"></div>
						</button>
					</nav>

					{/* Right side - login/signup */}
					<div className="flex-1 flex justify-end items-center space-x-3 sm:space-x-4">
						<button
							onClick={handleLoginClick}
							className="backdrop-blur-md bg-white/90 text-slate-800 cursor-pointer px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg border border-white/20 text-sm sm:text-base"
							style={{
								boxShadow: '0 4px 15px rgba(255,255,255,0.1)',
							}}
						>
							Login
						</button>
						<button
							 onClick={handleSignupClick}
							className="cursor-pointer text-white px-4 sm:px-5 py-2 rounded-full font-medium transition-all duration-300 border-2 border-green-400/50 hover:border-green-400 hover:bg-green-400/10 hover:text-green-300 hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
							style={{
								background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
								boxShadow: '0 4px 15px rgba(34, 197, 94, 0.2)',
							}}
						>
							Sign Up
						</button>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-white hover:text-green-400 focus:outline-none focus:text-green-400 transition-colors duration-300"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								{isMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16m-7 6h7"
									/>
								)}
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{isMenuOpen && (
					<nav 
						className="md:hidden mt-4 pb-4 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl"
						style={{
							background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
							boxShadow: '0 10px 25px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
						}}
					>
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/5 to-emerald-500/5 pointer-events-none" />
						
						<div className="relative z-10 space-y-1 p-4">
							<button
								onClick={handleHomeClick}
								className="block w-full text-left py-3 px-4 text-white hover:bg-green-400/10 rounded-lg transition-all duration-300 hover:text-green-300"
							>
								Home
							</button>
							<button
								onClick={handleAboutUsClick}
								className="block w-full text-left py-3 px-4 text-white hover:bg-green-400/10 rounded-lg transition-all duration-300 hover:text-green-300"
							>
								About Us
							</button>
							<button
								// onClick={handleContactUsClick}
								className="block w-full text-left py-3 px-4 text-white hover:bg-green-400/10 rounded-lg transition-all duration-300 hover:text-green-300"
							>
								Contact Us
							</button>
							<div className="border-t border-white/10 my-2"></div>
							<button
								onClick={handleLoginClick}
								className="block w-full text-left py-3 px-4 bg-white/90 text-slate-800 hover:bg-white rounded-lg transition-all duration-300 font-medium"
							>
								Login
							</button>
							<button
								onClick={handleSignupClick}
								className="block w-full text-left py-3 px-4 bg-green-400/20 text-green-300 hover:bg-green-400/30 rounded-lg transition-all duration-300 font-medium border border-green-400/30"
							>
								Sign Up
							</button>
						</div>
					</nav>
				)}
			</div>
		</div >
	);
};

export default LandingPageNavbar;