
import React, { useState } from "react";
import {
	useNavigate,
  } from "react-router-dom";

const LandingPageNavbar = () => {
	 const [isMenuOpen, setIsMenuOpen] = useState(false);
	 const navigate = useNavigate();



	const handleLoginClick = () => {
	navigate("/auth/login");
	 };

     const handleSignupClick = () => {
	 	navigate("/auth/signup");
	 };

	// const handleAboutUsClick = () => {
	// 	router.push("/about-us");
	// };

	// const handleContactUsClick = () => {
	// 	router.push("/contact-us");
	// };

	// const handleHomeClick = () => router.push("/");

	return (
        
		<div className=" backdrop-blur-md bg-[#309565] w-screen shadow-md fixed pr-10 p-2 left-0 right-0 z-50">
			<div className="container mx-auto px-4 ">
				<div className="relative flex items-center justify-between py-2">

					{/* Centered navigation */}
					<nav className="absolute left-1/3 transform -translate-x-1/2 hidden md:flex space-x-8">
						<button
							// onClick={handleHomeClick}
							className="text-white font-semibold hover:text-gray-300 transition"
						>
							Home
						</button>
						<button
							// onClick={handleAboutUsClick}
							className="text-white font-semibold hover:text-gray-300 transition"
						>
							About Us
						</button>
						<button
							// onClick={handleContactUsClick}
							className="text-white font-semibold hover:text-gray-300 transition"
						>
							Contact Us
						</button>
					</nav>

					{/* Right side - login/signup */}
					<div className="flex-1 flex justify-end items-center space-x-4">
						<button
							onClick={handleLoginClick}
							className="bg-white text-[#309565] cursor-pointer text-white px-8 py-2 rounded-full font-medium hover:opacity-90 transition-all duration-300"
						>
							Login
						</button>
						<button
							 onClick={handleSignupClick}
							className="cursor-pointer text-white px-5 py-1 rounded-full font-medium transition-all duration-300 border-2 border-transparent hover:border-white hover:bg-transparent hover:text-white"
						>
							Sign Up
						</button>
					</div>



					<div className="md:hidden">
						<button
							// onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
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

				{isMenuOpen && (
					<nav className="md:hidden">
						<a
							href="#"
							className="block py-2 px-4 text-gray-600 hover:bg-gray-100"
						>
							Home
						</a>
						<a
							href="#"
							className="block py-2 px-4 text-gray-600 hover:bg-gray-100"
						>
							About Us
						</a>
						<a
							href="#"
							className="block py-2 px-4 text-gray-600 hover:bg-gray-100"
						>
							Contact Us
						</a>
						<button
							// onClick={handleLoginClick}
							className="block py-2 px-4 text-white hover:bg-gray-100"
						>
							Login
						</button>
						<button
							// onClick={handleSignupClick}
							href="#"
							className="block py-2 px-4 bg-blue-600 text-white hover:bg-blue-700"
						>
							Sign Up
						</button>
					</nav>
				)}
			</div>
		</div >
	);
};

export default LandingPageNavbar;
