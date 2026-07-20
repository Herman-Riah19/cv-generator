import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getTheme } from "@/themes";

const themes = [
  {
    id: "default",
    name: "Classic",
    description: "ATS-Friendly - Format classique",
  },
  {
    id: "modern",
    name: "Moderne",
    description: "Design contemporain avec accents bleus",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Épuré et élégant",
  },
  {
    id: "elegant",
    name: "Élégant",
    description: "Accents roses sophistiqués",
  },
];

function ThemePreview({ themeId }: { themeId: string }) {
  const theme = getTheme(themeId);
  return (
    <svg viewBox="0 0 200 260" className="w-full h-auto">
      <rect width="200" height="260" fill="#fafafa" rx="4" />
      
      {/* Header bar */}
      <rect x="0" y="0" width="200" height="8" fill={theme.pdf.badgeBg} rx="0" />
      
      {/* Name placeholder */}
      <rect x="20" y="20" width="100" height="6" rx="3" fill={theme.pdf.headingColor} />
      <rect x="20" y="30" width="70" height="4" rx="2" fill={theme.pdf.mutedColor} />
      
      {/* Separator */}
      <line x1="20" y1="44" x2="180" y2="44" stroke={theme.pdf.separatorColor} strokeWidth="1" />
      
      {/* Section title */}
      <rect x="20" y="54" width="60" height="4" rx="2" fill={theme.pdf.headingColor} />
      
      {/* Skills */}
      <rect x="20" y="66" width="70" height="4" rx="2" fill={theme.pdf.textColor} />
      <rect x="20" y="74" width="50" height="4" rx="2" fill={theme.pdf.textColor} />
      <rect x="20" y="82" width="60" height="4" rx="2" fill={theme.pdf.textColor} />
      
      {/* Separator */}
      <line x1="20" y1="96" x2="180" y2="96" stroke={theme.pdf.separatorColor} strokeWidth="1" />
      
      {/* Section title */}
      <rect x="20" y="106" width="40" height="4" rx="2" fill={theme.pdf.headingColor} />
      
      {/* Language bars */}
      <rect x="20" y="118" width="30" height="4" rx="2" fill={theme.pdf.textColor} />
      <rect x="60" y="118" width="40" height="4" rx="2" fill={theme.pdf.primaryColor} />
      <rect x="20" y="128" width="30" height="4" rx="2" fill={theme.pdf.textColor} />
      <rect x="60" y="128" width="30" height="4" rx="2" fill={theme.pdf.primaryColor} />
      
      {/* Badge-style tags */}
      <rect x="20" y="146" width="50" height="18" rx="4" fill={theme.pdf.badgeBg} />
      <rect x="76" y="146" width="55" height="18" rx="4" fill={theme.pdf.badgeBg} />
      <rect x="20" y="168" width="45" height="18" rx="4" fill={theme.pdf.badgeBg} />
      <rect x="71" y="168" width="60" height="18" rx="4" fill={theme.pdf.badgeBg} />
      
      {/* Experience items */}
      <line x1="20" y1="200" x2="180" y2="200" stroke={theme.pdf.separatorColor} strokeWidth="1" />
      <rect x="20" y="210" width="50" height="4" rx="2" fill={theme.pdf.headingColor} />
      <rect x="20" y="220" width="40" height="3" rx="1.5" fill={theme.pdf.mutedColor} />
      <rect x="20" y="230" width="80" height="3" rx="1.5" fill={theme.pdf.textColor} />
      <rect x="20" y="238" width="60" height="3" rx="1.5" fill={theme.pdf.textColor} />
    </svg>
  );
}

export function ThemesSection() {
  return (
    <section id="themes" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Thèmes disponibles
          </h2>
          <p className="text-muted-foreground text-lg">
            Personnalisez l&apos;apparence de votre CV avec différents thèmes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((t) => (
            <Card 
              key={t.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-muted overflow-hidden"
            >
              <div className="p-2 bg-muted/30">
                <ThemePreview themeId={t.id} />
              </div>
              <CardHeader className="pt-4">
                <CardTitle className="text-base">{t.name}</CardTitle>
                <CardDescription className="text-xs">{t.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
