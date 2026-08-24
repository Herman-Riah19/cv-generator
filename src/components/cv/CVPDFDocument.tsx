import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { CVData } from "@/types/cv";
import { Language, TranslationKey } from "@/data/translations";
import { translations } from "@/data/translations";
import { iconComponents, RatingIconType } from "../pdf-icons";

Font.register({
  family: "Geist",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-400-normal.woff2",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-600-normal.woff2",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-700-normal.woff2",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    paddingVertical: 30,
    fontFamily: "Geist",
    fontSize: 20,
    color: "#111827",
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 4,
    color: "#111827",
  },
  title: {
    fontSize: 14,
    fontWeight: 400,
    textAlign: "center",
    color: "#111827",
    marginBottom: 4,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    marginVertical: 8,
  },
  contactGrid: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
  },
  contactColumn: {
    flex: 1,
    gap: 4,
  },
  contactItem: {
    fontSize: 10,
    color: "#111827",
  },
  contactLabel: {
    fontWeight: 600,
  },
  section: {
    marginVertical: 7,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
    color: "#111827",
  },
  summaryText: {
    fontSize: 11,
    color: "#111827",
    lineHeight: 1.5,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 4,
  },
  languageRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  languageRatingContainer: {
    flexDirection: "row",
    gap: 6,
  },
  filledIcon: {
    width: 8,
    height: 8,
  },
  emptyIcon: {
    width: 8,
    height: 8,
  },
  diplomaItem: {
    marginBottom: 6,
  },
  diplomaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  diplomaName: {
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
  },
  diplomaDate: {
    fontSize: 9,
    fontWeight: 400,
    color: "#111827",
  },
  diplomaInstitution: {
    fontSize: 10,
    color: "#111827",
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceHeader: {
    marginBottom: 4,
  },
  experienceHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  experiencePosition: {
    fontSize: 11,
    fontWeight: 700,
    color: "#111827",
  },
  experienceDate: {
    fontSize: 9,
    fontWeight: 400,
    color: "#111827",
  },
  experienceCompany: {
    fontSize: 10,
    fontWeight: 500,
    color: "#111827",
    marginBottom: 4,
  },
  descriptionList: {
    marginLeft: 4,
  },
  descriptionItem: {
    fontSize: 10,
    fontWeight: 400,
    color: "#111827",
    marginBottom: 2,
  },
  bulletPoint: {
    marginRight: 4,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  gridItem: {
    width: "50%",
    paddingRight: 20,
    marginBottom: 4,
  },
  skillItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  skillName: {
    flex: 1,
    fontSize: 10,
    color: "#111827",
    fontWeight: 500,
    marginRight: 4,
  },
  softSkillContainer: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 6,
    marginBottom: 8 
  },
  softSkillItem: {
    fontSize: 10,
    color: "#ffffff",
    backgroundColor: "#111827",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  }
});

interface CVPDFDocumentProps {
  data: CVData;
  language?: Language;
}

export function CVPDFDocument({
  data,
  language = "fr",
}: CVPDFDocumentProps) {
  const t = (key: TranslationKey) => translations[language][key];

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

  const renderRating = (
    level: number,
    iconType: "star" | "heart" | "circle" | "square" | "triangle" | "check",
  ) => {
    const IconComponent = iconComponents[iconType];
    return (
      <View style={styles.ratingContainer}>
        {Array.from({ length: 5 }, (_, i) => (
          <IconComponent key={i} filled={i < level} />
        ))}
      </View>
    );
  };

  const renderLanguageRating = (
    level: number,
    iconType: "star" | "heart" | "circle" | "square" | "triangle" | "check",
  ) => {
    const IconComponent = iconComponents[iconType];
    return (
      <View style={styles.languageRatingContainer}>
        {Array.from({ length: 5 }, (_, i) => (
          <IconComponent key={i} filled={i < level} />
        ))}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {data.personalInfo.poste || "Votre Poste Actuel"}
          </Text>
          <Text style={styles.title}>
            {data.personalInfo.name || "Votre Nom"}
          </Text>
          <View style={styles.separator} />

          <View style={styles.contactGrid}>
            <View style={styles.contactColumn}>
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>email:</Text>{" "}
                {data.personalInfo.email || "votre.email@example.com"}
              </Text>
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>Tel:</Text>{" "}
                {data.personalInfo.phone || "01234 567890"}
              </Text>
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>WhatsApp:</Text>{" "}
                {data.personalInfo.whatsApp || "Votre Numéro WhatsApp"}
              </Text>
            </View>
            <View style={styles.contactColumn}>
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>Adresse:</Text>{" "}
                {data.personalInfo.adresse || "Votre Adresse"}
              </Text>
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>Portfolio:</Text>{" "}
                {data.personalInfo.portfolio || ""}
              </Text>
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>LinkedIn:</Text>{" "}
                {data.personalInfo.linkedIn || "Votre Profil LinkedIn"}
              </Text>
            </View>
          </View>

          <View style={styles.separator} />

          {data.personalInfo.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t("summary")}</Text>
              <Text style={styles.summaryText}>
                {data.personalInfo.description}
              </Text>
            </View>
          )}
        </View>

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("technicalSkills")}</Text>
            <View style={styles.gridContainer}>
              {data.skills
                .filter((skill) => skill.name.trim())
                .map((skill) => (
                  <View key={skill.id} style={styles.gridItem}>
                    <View style={styles.skillItemContainer}>
                      <Text style={styles.skillName}>{skill.name}</Text>
                      {renderRating(skill.level, skill.iconType as RatingIconType || "star")}
                    </View>
                  </View>
                ))}
            </View>
          </View>
        )}

        <View style={styles.separator} />

        {data.diplomas.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("education")}</Text>
            {data.diplomas.map((diploma) => (
              <View key={diploma.id} style={styles.diplomaItem}>
                <View style={styles.diplomaHeader}>
                  <Text style={styles.diplomaName}>{diploma.name}</Text>
                  <Text style={styles.diplomaDate}>
                    {formatDate(diploma.startDate)} -{" "}
                    {formatDate(diploma.endDate as string) || t("present")}
                  </Text>
                </View>
                <Text style={styles.diplomaInstitution}>
                  {diploma.institution}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.separator} />

        {data.softSkills && data.softSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("softSkills")}</Text>
            <View style={styles.softSkillContainer}>
              {data.softSkills
                .filter((skill) => skill.name.trim())
                .map((skill) => (
                  <View key={skill.id}>
                    <Text style={styles.softSkillItem}>
                      {skill.name}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        )}

        <View style={styles.separator} />

        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("languages")}</Text>
            <View style={styles.gridContainer}>
              {data.languages
                .filter((lang) => lang.name.trim())
                .map((language) => (
                  <View key={language.id} style={styles.gridItem}>
                    <View style={styles.skillItemContainer}>
                      <Text style={styles.skillName}>{language.name}</Text>
                      {renderLanguageRating(language.level, language.iconType as RatingIconType || "star")}
                    </View>
                  </View>
                ))}
            </View>
          </View>
        )}

        <View />
        {data.experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("professionalExperience")}
            </Text>
            {data.experiences.map((exp, idx) => (
              <View key={idx} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={styles.experienceHeaderRow}>
                    <Text style={styles.experiencePosition}>
                      {exp.position}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {formatDate(exp.startDate)} -{" "}
                      {formatDate(exp.endDate as string) || t("present")}
                    </Text>
                  </View>
                  <Text style={styles.experienceCompany}>{exp.company}</Text>
                </View>
                {exp.description && (
                  <View style={styles.descriptionList}>
                    {exp.description.map((item, index) => (
                      <Text key={index} style={styles.descriptionItem}>
                        <Text style={styles.bulletPoint}>•</Text> {item}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
