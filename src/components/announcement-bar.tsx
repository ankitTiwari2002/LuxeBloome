"use client";

import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('announcementDismissed');
    if (dismissed !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('announcementDismissed', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn(
      "bg-accent text-accent-foreground relative flex items-center justify-center text-sm p-2 transition-all duration-300",
      isVisible ? "h-10 opacity-100" : "h-0 opacity-0 p-0"
    )}>
      <Gift className="h-4 w-4 mr-2" />
      <span>Free shipping on all orders over $50!</span>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-accent-foreground hover:bg-white/20"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </div>
  );
}
