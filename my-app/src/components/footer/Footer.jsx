import React from "react";
import {
	FaFacebookF,
	FaInstagram,
	FaEnvelope,
	FaLinkedinIn,
	FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-black text-white px-6 md:px-16 py-10 Roboto Serif">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
				<div>
					<h4 className="font-semibold mb-3">About Us</h4>
					<ul className="space-y-2 text-sm text-gray-300">
						<li>Our Story</li>
						<li>Our Team</li>
						<li>Mission & Vision</li>
					</ul>
				</div>

				<div>
					<h4 className="font-semibold mb-3">Legal & Policies</h4>
					<ul className="space-y-2 text-sm text-gray-300">
						<li>Terms & Conditions</li>
						<li>Privacy Policies</li>
						<li>Refund & Cancellation Policies</li>
					</ul>
				</div>

				<div>
					<h4 className="font-semibold mb-3">Our Work</h4>
					<ul className="space-y-2 text-sm text-gray-300">
						<li>Our Work</li>
					</ul>
				</div>

				<div>
					<h4 className="font-semibold mb-3">Support Us</h4>
					<ul className="space-y-2 text-sm text-gray-300">
						<li>Donation</li>
					</ul>
				</div>
			</div>

			<hr className="border-gray-600 mb-6" />

			<div className="flex justify-center space-x-8 text-white text-xl">
				<FaFacebookF className="hover:text-gray-300 cursor-pointer" />
				<FaInstagram className="hover:text-gray-300 cursor-pointer" />
				<FaEnvelope className="hover:text-gray-300 cursor-pointer" />
				<FaLinkedinIn className="hover:text-gray-300 cursor-pointer" />
				<FaPhoneAlt className="hover:text-gray-300 cursor-pointer" />
			</div>
		</footer>
	);
};

export default Footer;
