'use client';

import * as React from 'react';
import { useFont } from '@/components/providers/font-provider';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function FontToggle() {
  const { font, setFont } = useFont();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <span className="text-lg font-semibold">Aa</span>
          <span className="sr-only">Toggle font</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setFont('inter')}>
          Inter
        </DropdownMenuItem>
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