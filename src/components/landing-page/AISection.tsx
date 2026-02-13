import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Check, Server } from "lucide-react";

export function AISection() {
  return (
    <section id="ai" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <Card className="max-w-5xl mx-auto overflow-hidden shadow-xl">
          <div className="grid lg:grid-cols-2">
            <CardHeader className="p-8 pb-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                <Sparkles className="w-4 h-4" />
                <span>IA Locale</span>
              </div>
              <CardTitle className="text-2xl md:text-3xl mb-4">
                Générez vos descriptions avec LM Studio
              </CardTitle>
              <CardDescription className="text-base">
                Utilisez votre propre modèle IA installé localement pour générer des descriptions d&apos;expériences professionnelles uniques et percutantes.
              </CardDescription>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-sm">100% privé - données locales</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-sm">Pas de frais d&apos;API</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-sm">Personnalisable</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-sm">Rapide et hors ligne</span>
                </div>
              </div>
            </CardHeader>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex flex-col items-center justify-center text-white lg:rounded-l-none">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <Server className="w-10 h-10 text-primary" />
              </div>
              
              <h4 className="text-lg font-semibold mb-2">LM Studio</h4>
              <p className="text-gray-400 text-center text-sm mb-6 max-w-xs">
                Lancez LM Studio et chargez un modèle IA pour générer vos descriptions
              </p>
              
              <div className="bg-black/30 rounded-lg px-4 py-3 font-mono text-sm">
                <span className="text-gray-500">localhost:</span>
                <span className="text-primary font-semibold">1234</span>
              </div>
              
              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>API Compatible OpenAI</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
