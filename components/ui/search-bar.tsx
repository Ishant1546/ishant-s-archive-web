'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  placeholder?: string;
  size?: 'default' | 'large';
  className?: string;
}

export default function SearchBar({ 
  placeholder = "Search for games, apps, tools...", 
  size = 'default',
  className = '' 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const inputSize = size === 'large' ? 'h-14 text-lg' : 'h-12';
  const buttonSize = size === 'large' ? 'h-14 px-8' : 'h-12 px-6';

  return (
    <form onSubmit={handleSearch} className={`flex w-full max-w-2xl mx-auto ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`pl-12 pr-4 rounded-r-none border-r-0 ${inputSize}`}
        />
      </div>
      <Button type="submit" className={`rounded-l-none ${buttonSize}`}>
        Search
      </Button>
    </form>
  );
}