import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles, Download, Palette, Zap, Shield } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 p-8 md:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Prêt à créer votre CV ?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Commencez dès maintenant à créer votre CV professionnel avec l&apos;aide de l&apos;IA. 
              Simple, rapide et efficace.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4 text-primary" />
                <span> Gratuit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span> IA Locale</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Download className="w-4 h-4 text-primary" />
                <span> PDF & JSON</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Palette className="w-4 h-4 text-primary" />
                <span> Multi-thèmes</span>
              </div>
            </div>
            
            <Link href="/builder">
              <Button size="lg" className="gap-2 text-base px-8">
                Aller au créateur de CV
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
