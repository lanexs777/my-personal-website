'use client';

import * as React from 'react';
import { Type as FontType } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function FontToggle() {
  const { setTheme: setFont, theme: font } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <span className="font-mono">Aa</span>
          <span className="sr-only">Toggle font</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setFont('jetbrains')}>
          JetBrains Mono
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFont('consolas')}>
          Consolas
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFont('comic')}>
          Comic Mono
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}