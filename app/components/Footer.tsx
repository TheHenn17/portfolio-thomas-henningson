"use client";

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC<{}> = ({}) => {
    return (
        <div className="footer">
          <div className="flex items-center justify-center space-x-5">
            {/* Email Icon */}
            <a href="mailto:thomashenningson7@gmail.com" className="footer-element">
              <FontAwesomeIcon icon={faSquareEnvelope} size="xl" />
            </a>
            {/* LinkedIn Icon */}
            <a href="https://www.linkedin.com/in/thomashenningson" target="_blank" rel="noopener noreferrer" className="footer-element">
              <FontAwesomeIcon icon={faLinkedin} size="xl" />
            </a>
            {/* GitHub Icon */}
            <a href="https://github.com/TheHenn17" target="_blank" rel="noopener noreferrer" className="footer-element">
              <FontAwesomeIcon icon={faSquareGithub} size="xl" />
            </a>
          </div>
        </div>
    );
};
    
export default Footer;