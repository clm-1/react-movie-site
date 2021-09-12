import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const scrollToTopBtn = () => {
  window.scrollTo({
    top: 0,
    behaviour: 'smooth'
  })
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop
