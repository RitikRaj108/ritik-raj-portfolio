import React, { ReactNode } from 'react';
import './AccentureCard.css';

interface AccentureCardProps {
  children: ReactNode;
  className?: string;
}

export function AccentureCard({ children, className = '' }: AccentureCardProps) {
  return (
    <div className={`accenture-card ${className}`}>
      <div className="accenture-card-glow" />
      <div className="accenture-card-border">
        <div className="accenture-card-mask" />
      </div>
      <div className="accenture-card-content">
        {children}
      </div>
    </div>
  );
}
