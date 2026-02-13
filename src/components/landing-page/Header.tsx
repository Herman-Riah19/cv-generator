import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export function Header() {
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
        
        <Link href="/builder">
          <Button size="sm">
            Commencer
          </Button>
        </Link>
      </div>
    </header>
  );
}
