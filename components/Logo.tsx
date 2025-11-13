import React from 'react';

interface LogoProps {
  className?: string;
}

const logoUrl = "https://i.ibb.co/nNgwS7QP/LogoNow.webp";

const Logo: React.FC<LogoProps> = ({ className = 'h-8 w-auto' }) => (
    <img 
        className={className} 
        src={logoUrl}
        alt="Now Soluções Logo"
    />
);

export default Logo;