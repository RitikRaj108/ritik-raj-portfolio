import React, { ReactNode } from 'react';
import '../AccentureCard.css';

interface MiniCardProps {
  children: ReactNode;
  className?: string;
}

export function MiniCard({ children, className = '' }: MiniCardProps) {
  return (
    <div className={`accenture-card mini ${className}`}>
      <div className="accenture-card-glow" />
      <div className="accenture-card-border">
        <div className="accenture-card-mask" />
      </div>
      <div className="accenture-card-content p-6">
        {children}
      </div>
    </div>
  );
}
