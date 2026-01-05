import React from 'react';

// Define the interface for TypeScript
interface SocialBadgeProps {
  icon: React.ReactNode;
  href: string;
}

const SocialBadge = ({ icon, href }: SocialBadgeProps) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      // Added a flex container to center the icon perfectly
      className="flex items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all hover:scale-110 active:scale-95 border border-slate-700/50"
    >
      {icon}
    </a>
  );
};

export default SocialBadge;