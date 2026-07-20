import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Sparkles className="w-4 h-4" />
            <span>Générez votre CV en quelques secondes</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Créez un CV{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              professionnel
            </span>{' '}
            avec l&apos;IA
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Générez des CV ATS-friendly, exportez en JSON, utilisez l&apos;IA locale pour créer des descriptions d&apos;expériences percutantes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Link href="/builder">
              <Button size="lg" className="gap-2 text-base">
                Créer mon CV
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base">
              Voir la démo
            </Button>
          </div>
        </div>

        <div className="mt-16 relative animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="rounded-2xl border bg-card p-3 shadow-2xl">
              <div className="rounded-xl bg-background overflow-hidden">
                <svg viewBox="0 0 800 500" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Header */}
                  <rect width="800" height="500" fill="white" />
                  <text x="400" y="50" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#111827">Jean Dupont</text>
                  <text x="400" y="72" textAnchor="middle" fontSize="14" fill="#6b7280">Développeur Full Stack</text>
                  <line x1="40" y1="85" x2="760" y2="85" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Contact info */}
                  <text x="50" y="110" fontSize="11" fill="#6b7280">
                    <tspan fontWeight="bold" fill="#374151">email:</tspan> jean.dupont@email.com
                  </text>
                  <text x="50" y="128" fontSize="11" fill="#6b7280">
                    <tspan fontWeight="bold" fill="#374151">Tel:</tspan> 01 23 45 67 89
                  </text>
                  <text x="430" y="110" fontSize="11" fill="#6b7280">
                    <tspan fontWeight="bold" fill="#374151">Adresse:</tspan> Paris, France
                  </text>
                  <text x="430" y="128" fontSize="11" fill="#6b7280">
                    <tspan fontWeight="bold" fill="#374151">Portfolio:</tspan> jeandupont.dev
                  </text>

                  <line x1="40" y1="140" x2="760" y2="140" stroke="#e5e7eb" strokeWidth="1" />

                  {/* Summary */}
                  <text x="50" y="168" fontSize="13" fontWeight="bold" fill="#111827" letterSpacing="1">RÉSUMÉ</text>
                  <text x="50" y="190" fontSize="11" fill="#374151">Développeur Full Stack avec 5 ans d&apos;expérience, spécialisé dans React, Node.js et TypeScript.</text>
                  <text x="50" y="206" fontSize="11" fill="#374151">Passionné par la création d&apos;applications web performantes et accessibles.</text>

                  <line x1="40" y1="218" x2="760" y2="218" stroke="#e5e7eb" strokeWidth="1" />

                  {/* Skills */}
                  <text x="50" y="246" fontSize="13" fontWeight="bold" fill="#111827" letterSpacing="1">COMPÉTENCES TECHNIQUES</text>
                  
                  <text x="50" y="272" fontSize="11" fill="#374151">React</text>
                  <rect x="50" y="278" width="80" height="8" rx="4" fill="#111827" />
                  <rect x="130" y="278" width="20" height="8" rx="4" fill="#e5e7eb" />
                  
                  <text x="280" y="272" fontSize="11" fill="#374151">TypeScript</text>
                  <rect x="280" y="278" width="70" height="8" rx="4" fill="#111827" />
                  <rect x="350" y="278" width="30" height="8" rx="4" fill="#e5e7eb" />
                  
                  <text x="510" y="272" fontSize="11" fill="#374151">Node.js</text>
                  <rect x="510" y="278" width="60" height="8" rx="4" fill="#111827" />
                  <rect x="570" y="278" width="40" height="8" rx="4" fill="#e5e7eb" />

                  {/* Languages */}
                  <text x="50" y="318" fontSize="13" fontWeight="bold" fill="#111827" letterSpacing="1">LANGUES</text>
                  
                  <text x="50" y="344" fontSize="11" fill="#374151">Français</text>
                  <rect x="50" y="350" width="100" height="8" rx="4" fill="#111827" />
                  
                  <text x="280" y="344" fontSize="11" fill="#374151">Anglais</text>
                  <rect x="280" y="350" width="80" height="8" rx="4" fill="#111827" />
                  <rect x="360" y="350" width="20" height="8" rx="4" fill="#e5e7eb" />

                  <line x1="40" y1="370" x2="760" y2="370" stroke="#e5e7eb" strokeWidth="1" />

                  {/* Soft Skills badges */}
                  <text x="50" y="398" fontSize="13" fontWeight="bold" fill="#111827" letterSpacing="1">SOFT SKILLS</text>
                  <rect x="50" y="412" width="80" height="24" rx="6" fill="#1f2937" />
                  <text x="65" y="429" fontSize="10" fill="white">Leadership</text>
                  <rect x="140" y="412" width="90" height="24" rx="6" fill="#1f2937" />
                  <text x="158" y="429" fontSize="10" fill="white">Travail d'équipe</text>
                  <rect x="240" y="412" width="70" height="24" rx="6" fill="#1f2937" />
                  <text x="255" y="429" fontSize="10" fill="white">Autonomie</text>
                  <rect x="320" y="412" width="100" height="24" rx="6" fill="#1f2937" />
                  <text x="338" y="429" fontSize="10" fill="white">Communication</text>

                  <line x1="40" y1="448" x2="760" y2="448" stroke="#e5e7eb" strokeWidth="1" />

                  {/* Experience */}
                  <text x="50" y="476" fontSize="13" fontWeight="bold" fill="#111827" letterSpacing="1">EXPÉRIENCE PROFESSIONNELLE</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
