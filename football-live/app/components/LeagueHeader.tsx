import React from 'react';

interface LeagueHeaderProps {
  title: string;
  icon?: React.ReactNode;
  leftContent?: React.ReactNode;
  children?: React.ReactNode;
}

export default function LeagueHeader({ title, icon, leftContent, children }: LeagueHeaderProps) {
  return (
    <div 
      className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 border-r-2 border-r-[#8B1E1E]"
      dir="rtl"
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex items-center justify-center text-xl w-6 h-6">
            {icon}
          </div>
        )}
        <h2 className="text-[15px] md:text-base font-bold text-gray-800 whitespace-nowrap">
          {title}
        </h2>
        {children}
      </div>
      
      {leftContent && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {leftContent}
        </div>
      )}
    </div>
  );
}
