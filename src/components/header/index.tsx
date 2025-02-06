import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import "./styles.css";

export function Header() {
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("language_portuguese");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageClick = (language: string) => {
    i18n.changeLanguage(language);
    setActiveLanguage(language);
    setIsOpen(false);
  };

  const handleScroll = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      const offset = 100;
      const top = (section as HTMLElement).offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector(".sidebar");
      if (isOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const languages = [
    { code: "language_portuguese", flag: "./assets/icons/brazil-flag.png", alt: "Brazil flag" },
    { code: "language_english", flag: "./assets/icons/usa-flag.png", alt: "USA flag" },
    { code: "language_spanish", flag: "./assets/icons/spain-flag.png", alt: "Spain flag" },
  ];

  return (
    <header>
      <div>
        <div className="flags">
          {languages.map(({ code, flag, alt }) => (
            <img
              key={code}
              className={`flag ${activeLanguage === code ? "active" : ""}`}
              src={flag}
              alt={alt}
              width={32}
              onClick={() => handleLanguageClick(code)}
            />
          ))}
        </div>
        <a
          href="https://api.whatsapp.com/send?phone=5541995531007&text=Ol%C3%A1%21%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20como%20inovar%20a%20minha%20empresa.%20Poderia%20me%20ajudar%3F"
          target="_blank"
        >
          {t("header_contact")}
        </a>
        <svg
          onClick={toggleSidebar}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-align-justify"
          style={{ cursor: "pointer" }}
        >
          <path d="M3 12h18" />
          <path d="M3 18h18" />
          <path d="M3 6h18" />
        </svg>
      </div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
            onClick={toggleSidebar}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <div className="content">
          <nav>
            <h3>{t("navbar_navigation")}</h3>
            <ul>
              <li onClick={() => handleScroll("#home")}>{t("navbar_home")}</li>
              <li onClick={() => handleScroll("#about")}>{t("navbar_about")}</li>
              <li onClick={() => handleScroll("#technologies")}>{t("navbar_technologies")}</li>
              <li onClick={() => handleScroll("#projects")}>{t("navbar_projects")}</li>
            </ul>
          </nav>
          <div className="flags-container">
            <h3>{t("navbar_language")}</h3>

            <div className="flags-mobile">
              {languages.map(({ code, flag, alt }) => (
                <img
                  key={code}
                  className={`flag ${activeLanguage === code ? "active" : ""}`}
                  src={flag}
                  alt={alt}
                  width={32}
                  onClick={() => handleLanguageClick(code)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="social-media">
          <a href="https://www.instagram.com/ksk_joao/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/joao-valter-kshesek/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href="https://github.com/JoaoKshesek" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
