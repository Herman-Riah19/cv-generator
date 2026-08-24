"use client";

import { CVData } from "@/types/cv";
import { RatingIcon, RatingIconType } from "@/components/ui/rating-system";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { getTheme } from "@/themes";

interface CVPreviewProps {
  data: CVData;
}

export function CVPreview({ data }: CVPreviewProps) {
  const { t, language } = useLanguage();
  const theme = getTheme(data.theme || "default");

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const monthNames =
      language === "fr"
        ? [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
          ]
        : [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full mx-auto bg-white p-4 sm:p-10 shadow-none border-none">
      {/* Header - ATS Optimized */}
      <header className="mb-8">
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-2">
          {data.personalInfo.poste || "Votre Poste Actuel"}
        </h1>
        <h2 className="text-2xl text-center font-normal text-gray-600">
          {data.personalInfo.name || "Votre Nom"}
        </h2>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md p-2">
          <div className="flex flex-col gap-2">
            <span className=" text-gray-600">
              <strong>Email:</strong>{" "}
              {data.personalInfo.email || "votre.email@example.com"}
            </span>
            <span className="text-gray-600">
              <strong>Tel:</strong> {data.personalInfo.phone || "01234 567890"}
            </span>
            <span className="text-gray-600">
              <strong>WhatsApp:</strong>{" "}
              {data.personalInfo.whatsApp || "Votre Numéro WhatsApp"}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-600">
              <strong>Adresse:</strong>{" "}
              {data.personalInfo.adresse || "Votre Adresse"}
            </span>
            <span className="text-gray-600">
              <strong>Portfolio:</strong>{" "}
              <Link
                href={data.personalInfo.portfolio || ""}
                className="text-gray-600 "
              >
                {data.personalInfo.portfolio || ""}
              </Link>
            </span>
            <span className="text-gray-600">
              <strong>LinkedIn:</strong>{" "}
              {data.personalInfo.linkedIn || "Votre Profil LinkedIn"}
            </span>
          </div>
        </div>
        <Separator />

        {data.personalInfo.description && (
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              {t("summary")}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {data.personalInfo.description}
            </p>
          </div>
        )}
      </header>

      {/* Main Content Structure for ATS */}
      <main className="space-y-4">
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              {t("technicalSkills")}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {data.skills
                .filter((skill) => skill.name.trim())
                .map((skill, index) => (
                  <div key={skill.id} className="flex gap-4 py-1">
                    <span className="w-1/3 text-base text-gray-700 font-medium">
                      {skill.name}
                    </span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <RatingIcon
                          key={i}
                          type={(skill.iconType as RatingIconType) || "star"}
                          filled={i < skill.level}
                          size={16}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        <Separator />

        {data.diplomas.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              {t("education")}
            </h2>
            <div className="space-y-4">
              {data.diplomas &&
                data.diplomas.map((diploma) => (
                  <div key={diploma.id} className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <h3 className="text-lg text-gray-900 font-semibold">
                        {diploma.name}
                      </h3>
                      <p className="text-sm text-gray-600 italic sm:text-right shrink-0">
                        {formatDate(diploma.startDate)} -{" "}
                        {formatDate(diploma.endDate as string) || t("present")}
                      </p>
                    </div>
                    <p className="text-md text-gray-600 italic">
                      {diploma.institution}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}

        <Separator />

        {data.softSkills && data.softSkills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              {t("softSkills")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.softSkills
                .filter((skill) => skill.name.trim())
                .map((skill, index) => (
                  <div key={skill.id} className="flex gap-4 py-1">
                    <Badge
                      className={`gap-1 text-xl ${theme.preview.badge} border-0`}
                    >
                      {skill.name}
                    </Badge>
                  </div>
                ))}
            </div>
          </section>
        )}
        
        <Separator />

         {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              {t("languages")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {data.languages
                .filter((lang) => lang.name.trim())
                .map((language) => (
                  <div key={language.id} className="flex gap-4 py-1">
                    <span className="w-1/3 text-base text-gray-700 font-medium">
                      {language.name}
                    </span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <RatingIcon
                          key={i}
                          type={(language.iconType as RatingIconType) || "star"}
                          filled={i < language.level}
                          size={16}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        <Separator />
        
        {data.experiences.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              {t("professionalExperience")}
            </h2>
            <div className="space-y-6">
              {data.experiences &&
                data.experiences.map((exp, idx) => (
                  <article key={idx}>
                    <div className="mb-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                        <h3 className="text-xl text-gray-900 font-semibold">
                          {exp.position}
                        </h3>
                        <p className="text-sm text-gray-600 italic sm:text-right shrink-0">
                          {formatDate(exp.startDate)} -{" "}
                          {formatDate(exp.endDate as string) || t("present")}
                        </p>
                      </div>
                      <p className="text-lg text-gray-600 italic">
                        {exp.company}
                      </p>
                    </div>
                    {exp.description && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.description.map((item, index) => (
                          <li key={index} className="text-lg">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
