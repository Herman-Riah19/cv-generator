"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">CV Generator</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#features" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Fonctionnalités
          </a>
          <a 
            href="#ai" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            IA
          </a>
          <a 
            href="#themes" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Thèmes
          </a>
        </nav>
        
        <div className="flex items-center gap-2">
          <Link href="/builder" className="hidden md:inline-flex">
            <Button size="sm">
              Commencer
            </Button>
          </Link>
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-3">
          <a
            href="#features"
            className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Fonctionnalités
          </a>
          <a
            href="#ai"
            className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsOpen(false)}
          >
            IA
          </a>
          <a
            href="#themes"
            className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Thèmes
          </a>
          <Link href="/builder" onClick={() => setIsOpen(false)}>
            <Button size="sm" className="w-full">
              Commencer
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
