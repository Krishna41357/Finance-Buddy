import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaLinkedinIn,
  FaPhoneAlt,
} from 'react-icons/fa';

const fallbackLinks = [
  { title: 'About Us', items: ['Our Story', 'Our Team', 'Mission & Vision'] },
  {
    title: 'Legal & Policies',
    items: ['Terms & Conditions', 'Privacy Policies', 'Refund & Cancellation Policies'],
  },
  { title: 'Our Work', items: ['Work'] },
  { title: 'Support Us', items: ['Donations'] },
];

const Footer = ({ content }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    const sanitize = (data) =>
      data.map((group) => ({
        title: group.title?.trim() || '',
        items: Array.isArray(group.items) ? group.items.map((i) => i.trim()) : [],
      }));

    if (content?.footerLinks && Array.isArray(content.footerLinks)) {
      setLinks(sanitize(content.footerLinks));
      setLoading(false);
      return;
    }

    axios
      .get(`${BASE_API}/api/v1/content`)
      .then((res) => {
        const footerData = res.data.find((entry) => entry.key === 'footerLinks');
        if (footerData && Array.isArray(footerData.content)) {
          setLinks(sanitize(footerData.content));
        } else {
          setLinks(fallbackLinks);
        }
      })
      .catch((err) => {
        console.error('Failed to load footerLinks:', err);
        setLinks(fallbackLinks);
      })
      .finally(() => setLoading(false));
  }, []);

  const socials = [
    { icon: FaFacebookF, color: 'hover:text-blue-400', shadow: 'hover:drop-shadow-[0_0_10px_#60a5fa]' },
    { icon: FaInstagram, color: 'hover:text-pink-400', shadow: 'hover:drop-shadow-[0_0_10px_#f472b6]' },
    { icon: FaEnvelope, color: 'hover:text-green-400', shadow: 'hover:drop-shadow-[0_0_10px_#22c55e]' },
    { icon: FaLinkedinIn, color: 'hover:text-blue-500', shadow: 'hover:drop-shadow-[0_0_10px_#3b82f6]' },
    { icon: FaPhoneAlt, color: 'hover:text-emerald-400', shadow: 'hover:drop-shadow-[0_0_10px_#10b981]' },
  ];

  if (loading) {
    return (
      <footer className="relative overflow-hidden px-6 md:px-16 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-gray-900" />
        <div className="flex justify-center items-center h-32">
          <div className="text-white text-lg">Loading footer...</div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden px-6 md:px-16 py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-gray-900" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-300/15 rounded-full blur-2xl animate-pulse delay-500" />

      <div className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {links.map((group, gi) => (
            <div key={gi} className="group">
              <h4 className="font-bold mb-4 text-white text-lg group-hover:text-green-400 transition-colors">
                {group.title}
              </h4>
              <ul className="space-y-3 text-sm">
                {group.items.map((item, ii) => (
                  <li key={ii}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-green-400 transition-colors hover:drop-shadow-[0_0_10px_#22c55e]"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative mb-8">
          <hr className="border-gray-600/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent blur-sm" />
        </div>

        <div className="flex justify-center space-x-8">
          {socials.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <div className="relative w-12 h-12 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-lg cursor-pointer transition-all hover:scale-110 hover:border-green-400/50">
                  <Icon className={`text-white text-xl transition-all ${s.color} ${s.shadow}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
