import React, { useEffect, useState } from 'react';
import BeforeLogin from '../landingPage/BeforeLogin';

const Preview = () => {
  const [content, setContent] = useState({});
  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_API}/api/v1/content`);
        const data = await res.json();
        const map = {};
        data.forEach(item => {
          map[item.key] = item.content;
        });
        setContent(map);
      } catch (error) {
        console.error('Error fetching content for preview:', error);
      }
    };
    fetchData();
  }, []);

  return <BeforeLogin content={content} />;
};

export default Preview;
