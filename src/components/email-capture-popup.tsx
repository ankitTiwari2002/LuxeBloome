"use client";

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function EmailCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem('popupShown');
    if (shown !== 'true') {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('popupShown', 'true');
      }, 5000); // Show after 5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
             <Mail className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center font-headline text-2xl">Get 15% Off!</DialogTitle>
          <DialogDescription className="text-center">
            Join our mailing list and get an exclusive discount on your first order.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col space-y-4">
          <Input type="email" placeholder="Your best email address" />
          <Button type="submit">Claim My Discount</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
