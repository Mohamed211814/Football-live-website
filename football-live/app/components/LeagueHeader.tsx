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
      className="flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 bg-white border-b border-gray-200 border-r-2 border-r-[#8B1E1E]"
      dir="rtl"
    >
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        {icon && (
          <div className="flex items-center justify-center text-lg md:text-xl w-5 h-5 md:w-6 md:h-6 shrink-0">
            {icon}
          </div>
        )}
        <h2 className="text-[14px] md:text-base font-bold text-gray-800 truncate">
          {title}
        </h2>
        {children}
      </div>
      
      {leftContent && (
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 shrink-0 ml-1">
          {leftContent}
        </div>
      )}
    </div>
  );
}
