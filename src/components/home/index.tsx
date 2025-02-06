import { useTranslation } from "react-i18next";
import "./styles.css";

export function Home() {
  const { t } = useTranslation();

  const handleScroll = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      const offset = 100;
      const top = section.getBoundingClientRect().top - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div id="home">
      <div className="container">
        <div className="title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <h1>{t("home_title")}</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
        <p>{t("home_description")}</p>
        <button onClick={() => handleScroll("#about")}>{t("home_button")}</button>
      </div>
    </div>
  );
}
