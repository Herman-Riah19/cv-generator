import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const themes = [
  {
    name: "Default",
    description: "ATS-Friendly - Format classique",
    gradient: "from-gray-100 to-gray-200",
  },
  {
    name: "Even",
    description: "Moderne avec modes clair/sombre",
    gradient: "from-blue-50 to-indigo-100",
  },
  {
    name: "Class",
    description: "Professionnel et épuré",
    gradient: "from-slate-100 to-zinc-200",
  },
  {
    name: "Compact",
    description: "Format compact optimisé",
    gradient: "from-emerald-50 to-teal-100",
  },
];

export function ThemesSection() {
  return (
    <section id="themes" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Thèmes JSON Resume
          </h2>
          <p className="text-muted-foreground text-lg">
            Exportez votre CV avec différents thèmes standards JSON Resume
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme) => (
            <Card 
              key={theme.name}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-muted overflow-hidden"
            >
              <div className={`aspect-[3/4] bg-gradient-to-br ${theme.gradient} p-4 flex flex-col`}>
                <div className="bg-white/90 rounded-lg shadow-sm p-3 flex-1">
                  <div className="h-3 w-20 bg-gray-300 rounded mb-3"></div>
                  <div className="h-2 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 w-3/4 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-gray-200 rounded"></div>
                    <div className="h-1.5 w-full bg-gray-200 rounded"></div>
                    <div className="h-1.5 w-2/3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              <CardHeader className="pt-4">
                <CardTitle className="text-base">{theme.name}</CardTitle>
                <CardDescription className="text-xs">{theme.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
