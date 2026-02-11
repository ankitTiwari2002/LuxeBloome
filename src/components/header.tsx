'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, LogOut, User as UserIcon, Search, Loader2 } from 'lucide-react';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { CartDrawer } from './cart-drawer';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { getAllProducts } from '@/lib/api';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  const handleLogout = () => {
    signOut(auth);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
      return;
    }

    setIsLoading(true);
    const timerId = setTimeout(async () => {
      try {
        const allProducts = await getAllProducts();
        const lowercasedQuery = searchQuery.toLowerCase();
        const results = allProducts
          .filter(
            (product) =>
              product.name.toLowerCase().includes(lowercasedQuery) ||
              product.description.toLowerCase().includes(lowercasedQuery) ||
              product.category.toLowerCase().includes(lowercasedQuery)
          )
          .slice(0, 5); // Limit suggestions

        setSuggestions(results);
        setIsSuggestionsVisible(true);
      } catch (error) {
        console.error("Failed to fetch search suggestions:", error);
        setSuggestions([]);
        setIsSuggestionsVisible(false);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSuggestionsVisible(false);
    }
  };

  const closeAndClearSearch = () => {
    setIsSuggestionsVisible(false);
    setSearchQuery('');
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Back to homepage">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-primary',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex-1 flex justify-center px-4 hidden md:flex">
          <Popover open={isSuggestionsVisible && searchQuery.length >= 2} onOpenChange={setIsSuggestionsVisible}>
            <PopoverAnchor asChild>
              <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="query"
                  placeholder="Search for products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoComplete="off"
                />
              </form>
            </PopoverAnchor>
            <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] mt-1 p-0">
              {isLoading && (
                <div className="p-4 text-center text-sm text-muted-foreground flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Searching...
                </div>
              )}
              {!isLoading && suggestions.length > 0 && (
                <div className="flex flex-col">
                  <div className='flex flex-col gap-1 p-1'>
                    {suggestions.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex items-center gap-4 p-2 rounded-sm hover:bg-accent"
                        onClick={closeAndClearSearch}
                      >
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-sm object-cover aspect-square"
                        />
                        <div className="flex-1 overflow-hidden">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-sm text-primary">${product.price.toFixed(2)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-1 border-t">
                    <Button variant="ghost" className="w-full justify-center" asChild>
                      <Link href={`/search?q=${encodeURIComponent(searchQuery.trim())}`}>
                        View all results for "{searchQuery}"
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
              {!isLoading && suggestions.length === 0 && searchQuery.length >= 2 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No results for "{searchQuery}"
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <CartDrawer />

          {isUserLoading && <Skeleton className="h-8 w-8 rounded-full" />}

          {!isUserLoading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!isUserLoading && !user && (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4">
                  <div className="mb-8">
                    <SheetClose asChild>
                      <Link href="/" aria-label="Back to homepage">
                        <Logo />
                      </Link>
                    </SheetClose>
                  </div>
                  
                  <form onSubmit={handleSearchSubmit} className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="query"
                      placeholder="Search..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      autoComplete="off"
                    />
                  </form>
                  {isSuggestionsVisible && searchQuery.length >= 2 && (
                     <div className="flex flex-col mb-4 -mt-2 border rounded-md">
                        {isLoading && (
                            <div className="p-4 text-center text-sm text-muted-foreground flex items-center justify-center">
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            Searching...
                            </div>
                        )}
                        {!isLoading && suggestions.length > 0 && (
                            <div className="flex flex-col">
                            <div className='flex flex-col gap-1 p-1'>
                                {suggestions.map((product) => (
                                <SheetClose asChild key={product.id}>
                                    <Link
                                    href={`/products/${product.id}`}
                                    className="flex items-center gap-4 p-2 rounded-sm hover:bg-accent"
                                    onClick={closeAndClearSearch}
                                    >
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={40}
                                        height={40}
                                        className="rounded-sm object-cover aspect-square"
                                    />
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-sm font-medium truncate">{product.name}</p>
                                        <p className="text-sm text-primary">${product.price.toFixed(2)}</p>
                                    </div>
                                    </Link>
                                </SheetClose>
                                ))}
                            </div>
                            <div className="p-1 border-t">
                                <SheetClose asChild>
                                <Button variant="ghost" className="w-full justify-center" asChild>
                                    <Link href={`/search?q=${encodeURIComponent(searchQuery.trim())}`}>
                                    View all results
                                    </Link>
                                </Button>
                                </SheetClose>
                            </div>
                            </div>
                        )}
                        {!isLoading && suggestions.length === 0 && searchQuery.length >= 2 && (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                            No results for "{searchQuery}"
                            </div>
                        )}
                    </div>
                  )}

                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => {
                      const isActive =
                        link.href === '/'
                          ? pathname === link.href
                          : pathname.startsWith(link.href);
                      return (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className={cn(
                              'text-lg font-medium transition-colors hover:text-primary',
                              isActive ? 'text-primary' : 'text-foreground'
                            )}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                    <div className="border-t pt-4 space-y-2">
                       {!isUserLoading && !user && (
                         <>
                          <SheetClose asChild>
                             <Link href="/login" className="block text-lg font-medium">Log In</Link>
                          </SheetClose>
                          <SheetClose asChild>
                             <Link href="/signup" className="block text-lg font-medium">Sign Up</Link>
                          </SheetClose>
                         </>
                       )}
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
