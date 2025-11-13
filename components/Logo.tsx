import React from 'react';

interface LogoProps {
  className?: string;
}

const logoUrl = "https://nowsolucoes.com.br/wp-content/uploads/2025/05/cropped-now_branco-1-180x57.webp";

const Logo: React.FC<LogoProps> = ({ className = 'h-8 w-auto' }) => (
    <img 
        className={className} 
        src={logoUrl}
        alt="Now Soluções Logo"
    />
);

export default Logo;