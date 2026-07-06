import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { CVData } from "@/types/cv";
import { Language, TranslationKey } from "@/data/translations";
import { translations } from "@/data/translations";

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
    padding: 20,
    fontFamily: "Geist",
    fontSize: 20,
    color: "#1f2937",
  },
  header: {
    marginBottom: 8,
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
    color: "#4b5563",
    marginBottom: 8,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    marginVertical: 5,
  },
  contactGrid: {
    flexDirection: "row",
    marginBottom: 8,
  },
  contactColumn: {
    flex: 1,
    gap: 4,
  },
  contactItem: {
    fontSize: 10,
    color: "#4b5563",
  },
  contactLabel: {
    fontWeight: 600,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    color: "#111827",
  },
  summaryText: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.5,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 4,
  },
  languageRow: {
    flexDirection: "row",
    marginBottom: 6,
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
    marginBottom: 10,
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
    color: "#6b7280",
  },
  diplomaInstitution: {
    fontSize: 10,
    color: "#4b5563",
  },
  experienceItem: {
    marginBottom: 12,
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
    fontWeight: 600,
    color: "#111827",
  },
  experienceDate: {
    fontSize: 9,
    color: "#6b7280",
  },
  experienceCompany: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 4,
  },
  descriptionList: {
    marginLeft: 8,
  },
  descriptionItem: {
    fontSize: 11,
    color: "#374151",
    marginBottom: 2,
  },
  bulletPoint: {
    marginRight: 4,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "33.33%",
    paddingRight: 8,
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
    color: "#374151",
    fontWeight: 500,
    marginRight: 4,
  },
});

interface CVPDFDocumentProps {
  data: CVData;
  skillsIconType: "star" | "heart" | "circle" | "square" | "triangle" | "check";
  languagesIconType:
  | "star"
  | "heart"
  | "circle"
  | "square"
  | "triangle"
  | "check";
  language?: Language;
}

const ICON_SIZE = 8;
const FILLED_COLOR = "#111827";
const EMPTY_COLOR = "#d1d5db";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={filled ? FILLED_COLOR : "none"}
      stroke={filled ? FILLED_COLOR : EMPTY_COLOR}
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </Svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={filled ? FILLED_COLOR : "none"}
      stroke={filled ? FILLED_COLOR : EMPTY_COLOR}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CircleIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    <Path
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      fill={filled ? FILLED_COLOR : "none"}
      stroke={filled ? FILLED_COLOR : EMPTY_COLOR}
      strokeWidth={2}
    />
  </Svg>
);

const SquareIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    <Path
      d="M3 3h18v18H3V3z"
      fill={filled ? FILLED_COLOR : "none"}
      stroke={filled ? FILLED_COLOR : EMPTY_COLOR}
      strokeWidth={2}
    />
  </Svg>
);

const TriangleIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    <Path
      d="M12 2L2 22h20L12 2z"
      fill={filled ? FILLED_COLOR : "none"}
      stroke={filled ? FILLED_COLOR : EMPTY_COLOR}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    {filled ? (
      <Path
        d="M20 6L9 17l-5-5"
        fill="none"
        stroke={FILLED_COLOR}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <Path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        fill="none"
        stroke={EMPTY_COLOR}
        strokeWidth={2}
      />
    )}
  </Svg>
);

const iconComponents = {
  star: StarIcon,
  heart: HeartIcon,
  circle: CircleIcon,
  square: SquareIcon,
  triangle: TriangleIcon,
  check: CheckIcon,
};

export function CVPDFDocument({
  data,
  skillsIconType,
  languagesIconType,
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
            {data.personalInfo.name || "Votre Nom"}
          </Text>
          <Text style={styles.title}>
            {data.personalInfo.poste || "Votre Poste Actuel"}
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
                      {renderRating(skill.level, skillsIconType)}
                    </View>
                  </View>
                ))}
            </View>
          </View>
        )}

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
                      {renderLanguageRating(language.level, languagesIconType)}
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
