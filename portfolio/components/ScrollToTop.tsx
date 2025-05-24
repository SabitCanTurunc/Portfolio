"use client"

import { useEffect, useState } from "react";

// Türkçe açıklamalı scroll-to-top butonu
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-secondary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-secondary/80 transition-colors z-50"
      aria-label="Yukarı dön"
    >
      ↑
    </button>
  );
};

export default ScrollToTop; 