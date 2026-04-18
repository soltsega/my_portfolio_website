import React from 'react';
import { Mail, Globe, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/soltsega', icon: <FaGithub size={20} />, class: 'social-github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/solomontsega/', icon: <FaLinkedin size={20} />, class: 'social-linkedin' },
    { name: 'Twitter', url: 'https://x.com/SolomonTse567', icon: <FaTwitter size={20} />, class: 'social-x' },
    { name: 'Email', url: 'mailto:tsegasolomon538@gmail.com', icon: <Mail size={20} />, class: 'social-email' },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Solomon Tsega. All rights reserved.</p>
        <div className="footer-socials">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={link.name}
              className={link.class}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
