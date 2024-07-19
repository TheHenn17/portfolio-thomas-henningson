"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface NavItem {
  name: string;
  path: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(0); //which nav item is selected
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); //popup status
  const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null); //determine screen size after resize

  //refereneces
  const sliderRef = useRef<HTMLDivElement>(null);
  const verticalSliderRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  //Set nav bar items
  const navItems: NavItem[] = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Experience", path: "/experience" },
    { name: "Education", path: "/education" },
    { name: "Projects", path: "/projects" },
  ];

  //change active nav item
  useEffect(() => {
    const index = navItems.findIndex(item => item.path === pathname);
    setActiveIndex(index);
  }, [pathname, navItems]);

  const refreshSlider = () => {
    if (sliderRef.current && !isSmallScreen) { //horizontal slider
      const navbarElements = Array.from(sliderRef.current.parentElement?.children || []);
      const activeElement = navbarElements[activeIndex] as HTMLElement; // find active element

      if (activeElement) {
        sliderRef.current.style.transform = `translateX(${activeElement.offsetLeft}px)`; //move slider
        sliderRef.current.style.width = `${activeElement.offsetWidth}px`; //resize slider
        sliderRef.current.style.height = `2px`; //keep height consistant
      }
    }
    else if (verticalSliderRef.current && isSmallScreen) { //vertical slider (on popup)
      const navbarElements = Array.from(verticalSliderRef.current.parentElement?.children || []);
      const activeElement = navbarElements[activeIndex] as HTMLElement; // find active element

      if (activeElement) {
        verticalSliderRef.current.style.transform = `translateY(${activeElement.offsetTop}px)`; //move slider
        verticalSliderRef.current.style.height = `${activeElement.offsetHeight}px`; //resize slider
        verticalSliderRef.current.style.width = `2px`; //keep width consistant
      }
    }
  };

  //resize event handler
  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth >= 516) {
        setIsPopupOpen(false); //close popup if they resize to large screen
        refreshSlider();
      }
      setIsSmallScreen(window.innerWidth < 516); //set screen size variable
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup the event listener on component unmount
    };
  }, [activeIndex]);

  //click event handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsPopupOpen(false); // close popup if click outside element
      }
    };

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside); //dont add listener if popup is not open
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup the event listener on component unmount
    };
  }, [isPopupOpen]);

  //refresh slider when nav item changes or popup opens
  useEffect(() => {
    refreshSlider();
  }, [activeIndex, isPopupOpen]);

  return (
    <>
      {isSmallScreen ? (
        <div className="navbar pr-2">
          <div className="navbar-element">
            <button ref={buttonRef} onClick={(e) => {e.stopPropagation(); setIsPopupOpen(!isPopupOpen);}}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          {isPopupOpen && (
              <div className="navbar-vertical" ref={popupRef}>
                {navItems.map((item, index) => (
                  <div
                    key={item.path}
                    className={`navbar-element-vertical ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => {
                      router.push(item.path);
                      setActiveIndex(index);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
                <div className="navbar-slider-vertical ml-1" ref={verticalSliderRef}></div>
              </div>
            )}
        </div>
      ) : (
        <div className="navbar pr-6">
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
          <div className="navbar-slider mb-1" ref={sliderRef}></div>
        </div>
      )}
    </>
  );
};

export default Navbar;