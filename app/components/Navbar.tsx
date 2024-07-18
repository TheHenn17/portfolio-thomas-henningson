"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  name: string;
  path: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);

  const [navItems, setNavItems] = useState<NavItem[]>([
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Experience", path: "/experience" },
    { name: "Education", path: "/education" },
    { name: "Projects", path: "/projects" },
  ]);

  useEffect(() => {
    const index = navItems.findIndex(item => item.path === pathname);
    setActiveIndex(index);
  }, [pathname, navItems]);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight >= window.innerWidth);
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (sliderRef.current && isPortrait !== null) {
      const navbarElements = Array.from(sliderRef.current.parentElement?.children || []);
      const activeElement = navbarElements[activeIndex] as HTMLElement;

      if (activeElement) {
        if (!isPortrait) {
          sliderRef.current.style.transform = `translateX(${activeElement.offsetLeft}px)`;
          sliderRef.current.style.width = `${activeElement.offsetWidth}px`;
          sliderRef.current.style.height = `2px`;
        } else {
          sliderRef.current.style.transform = `translateY(${activeElement.offsetTop}px)`;
          sliderRef.current.style.height = `${activeElement.offsetHeight}px`;
          sliderRef.current.style.width = `2px`;
        }
      }
    }
  }, [activeIndex, isPortrait]);

  return (
    <div className="navbar">
      {navItems.map((item, index) => (
        <div
          key={item.path}
          className={`navbar-element ${activeIndex === index ? 'active' : ''}`}
          onClick={() => {
            router.push(item.path);
            setActiveIndex(index);
          }}
        >
          {item.name}
        </div>
      ))}
      <div className="navbar-slider" ref={sliderRef}></div>
    </div>
  );
};

export default Navbar;
