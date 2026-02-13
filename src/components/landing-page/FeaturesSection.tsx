import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, Sparkles, Download, Palette, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Éditeur complet",
    description: "Remplissez vos informations personnelles, expériences, formations, compétences et langues.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Génération IA",
    description: "Laissez l'IA locale (LM Studio) générer des descriptions d'expériences professionnelles percutantes.",
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Export PDF",
    description: "Téléchargez votre CV en format PDF prêt à être envoyé aux recruteurs.",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Thèmes JSON Resume",
    description: "Choisissez parmi plusieurs thèmes standards JSON Resume pour votre CV.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Export JSON",
    description: "Exportez vos données au format JSON Resume validé et conforme aux standards.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "ATS-Friendly",
    description: "Les CV générés sont optimisés pour les systèmes de suivi des candidats.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-muted-foreground text-lg">
            Un outil complet pour créer, personnaliser et exporter votre CV professionnel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-muted"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
