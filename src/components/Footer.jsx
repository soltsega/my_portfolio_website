import React from 'react';
import { Github, Linkedin, Mail, Twitter, Globe } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'Github', url: 'https://github.com/soltsega', icon: <Github size={20} />, class: 'social-github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/solomontsega/', icon: <Linkedin size={20} />, class: 'social-linkedin' },
    { name: 'Twitter', url: 'https://x.com/SolomonTse567', icon: <Twitter size={20} />, class: 'social-x' },
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
