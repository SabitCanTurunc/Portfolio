"use client"

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FaArrowUp } from 'react-icons/fa';

// Türkçe açıklamalı scroll-to-top butonu
const ScrollToTop = () => {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label={t('scrollToTop.ariaLabel')}
          className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300 z-50"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default ScrollToTop; 