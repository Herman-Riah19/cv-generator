"use client";

import { CVData } from "@/types/cv";
import { RatingIcon } from "@/components/ui/rating-system";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

interface CVPreviewProps {
  data: CVData;
  skillsIconType: "star" | "heart" | "circle" | "square" | "triangle" | "check";
  languagesIconType:
    | "star"
    | "heart"
    | "circle"
    | "square"
    | "triangle"
    | "check";
}

export function CVPreview({
  data,
  skillsIconType,
  languagesIconType,
}: CVPreviewProps) {
  const { t, language } = useLanguage();

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
    <div className="w-full mx-auto bg-white p-10 shadow-none border-none">
      {/* Header - ATS Optimized */}
      <header className="mb-8">
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-2">
          {data.personalInfo.name || "Votre Nom"}
        </h1>
        <h2 className="text-2xl text-center font-normal text-gray-600">
          {data.personalInfo.poste || "Votre Poste Actuel"}
        </h2>

        <Separator />

        <div className="grid grid-cols-2 gap-4 text-md p-2">
          <div className="flex flex-col gap-2">
            <span className=" text-gray-600">
              <strong>email:</strong>{" "}
              {data.personalInfo.email || "votre.email@example.com"}
            </span>
            <span className="text-gray-600">
              <strong>Tel:</strong> {data.personalInfo.phone || "01234 567890"}
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
            <div className="grid grid-cols-3 gap-2">
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
                          type={skillsIconType}
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

        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              {t("languages")}
            </h2>
            <div className="grid grid-cols-3 gap-2">
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
                          type={languagesIconType}
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

        {/* Diplomas Section */}
        {data.diplomas.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              {t("education")}
            </h2>
            <div className="space-y-4">
              {data.diplomas &&
                data.diplomas.map((diploma) => (
                  <div key={diploma.id} className="mb-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg text-gray-900 font-semibold">
                        {diploma.name}
                      </h3>
                      <p className="text-sm text-gray-600 italic">
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

        {/* Experience Section */}
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
                      <div className="flex justify-between">
                        <h3 className="text-xl text-gray-900 font-semibold">
                          {exp.position}
                        </h3>
                        <p className="text-sm text-gray-600 italic">
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
