import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/');
  const [headerState, setHeaderState] = useState('full'); // 'full', 'nav-only', 'hidden'
  const lastScrollYRef = useRef(0);

  const navLinks = [
    { label: 'Home', href: '/home', section: 'home' },
    { label: 'Retail Shops', href: '/home', section: 'retail' },
    { label: 'Luxury Brands', href: '/home', section: 'luxury' },
    { label: 'Dining', href: '/home', section: 'dining' },
    { label: 'Entertainment', href: '/home', section: 'entertainment' },
    { label: 'Events', href: '/home', section: 'events' },
    { label: 'Plans', href: '/home', section: 'cta' },
    { label: 'Map', href: '/map', section: 'map' },
  ];

  const handleNavClick = (link) => {
    setActiveLink(link.href);
    if (link.href === '/map') {
      navigate('/map');
    } else {
      if (location.pathname !== '/home') {
        navigate('/home');
      }
      // Smooth scroll to section
      setTimeout(() => {
        if (link.section === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(link.section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    }
  };

  useEffect(() => {
    setActiveLink(location.pathname);
    // Reset scroll to top when navigating to home page
    if (location.pathname === '/home') {
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;

      if (currentScrollY < 20) {
        // At top of page - show full header
        setHeaderState('full');
      } else if (isScrollingDown) {
        // Scrolling down in any section - hide entire header
        setHeaderState('hidden');
      } else {
        // Scrolling up in any section - show only nav bar
        setHeaderState('nav-only');
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl overflow-hidden"
      animate={{
        y: headerState === 'full' ? 0 : headerState === 'nav-only' ? -96 : -170,
        opacity: headerState === 'hidden' ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="top-header border-b border-gray-200">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex h-20 items-center justify-center px-6 md:h-24"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/home')}
            src={require('../assets/images/Logo.png')}
            alt="King of Prussia Logo"
            className="h-12 md:h-16 object-contain cursor-pointer transition-transform"
          />
        </motion.div>
      </div>
      <nav className="bottom-header">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-0">
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center justify-center gap-2 md:gap-4 flex-wrap py-3 md:py-4"
          >
            {navLinks.map((link, index) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.05, duration: 0.4 }}
              >
                <motion.button
                  onClick={() => handleNavClick(link)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative px-3 md:px-4 py-2 text-xs md:text-sm font-semibold tracking-[0.3px] transition-colors duration-300 ${
                    activeLink === link.href
                      ? 'text-gray-950'
                      : 'text-gray-600 hover:text-gray-950'
                  }`}
                >
                  {link.label}
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </nav>
    </motion.header>
  );
}

export default Header;