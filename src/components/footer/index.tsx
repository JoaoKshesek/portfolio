import { useTranslation } from "react-i18next";
import "./styles.css";

export function Footer() {
  const { t } = useTranslation();

  function getCurrentYear() {
    return new Date().getFullYear();
  }

  return (
    <footer>
      <p>© {getCurrentYear()} • {t("footer_copyright")}</p>
    </footer>
  );
}
