import { useEffect, useState } from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";

export function Projects() {
  const { t } = useTranslation();

  const [activeProject, setActiveProject] = useState(0);
  const [automaticSlider, setAutomaticSlider] = useState(true);

  const handleClickProject = (index: number) => {
    setActiveProject(index);
    setAutomaticSlider(false);
  };

  const projectsData = [
    {
      backgroundUrl: "assets/projects/cinemark.png",
      title: "project_title_1",
      description: "project_description_1",
      link: "https://www.cinemark.com.br/",
    },
    {
      backgroundUrl: "assets/projects/blocos.png",
      title: "project_title_2",
      description: "project_description_2",
      link: "https://blocosdinamicos.com.br/",
    },
    {
      backgroundUrl: "assets/projects/lide.jpg",
      title: "project_title_3",
      description: "project_description_3",
      link: "https://apps.apple.com/us/app/lide-paran%C3%A1/id6451423565?l=pt-BR",
    },
    {
      backgroundUrl: "assets/projects/lide-admin.png",
      title: "project_title_4",
      description: "project_description_4",
      link: null,
    },
    {
      backgroundUrl: "assets/projects/manakai.png",
      title: "project_title_5",
      description: "project_description_5",
      link: "https://manakai.signo.dev.br/",
    },
    {
      backgroundUrl: "assets/projects/busca-global.png",
      title: "project_title_6",
      description: "project_description_6",
      link: "https://busca.global/",
    },
    {
      backgroundUrl: "assets/projects/medguias.jpg",
      title: "project_title_7",
      description: "project_description_7",
      link: "https://www.medguias.com.br/",
    },
    {
      backgroundUrl: "assets/projects/sebrae.png",
      title: "project_title_8",
      description: "project_description_8",
      link: "https://hub.sebraeingresse.com.br/",
    },
  ];

  useEffect(() => {
    if (automaticSlider) {
      const intervalId = setInterval(() => {
        setActiveProject((prevIndex) => (prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1));
      }, 8000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [automaticSlider, setActiveProject]);

  return (
    <div id="projects">
      <div className="info">
        <h2>{t("projects_title")}</h2>
        <p>{t("projects_description")}</p>
      </div>
      <div className="cards">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className={`card ${index === activeProject ? "active" : ""}`}
            onClick={() => handleClickProject(index)}
            style={{
              background: `url(${project.backgroundUrl})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="shadow"></div>
            <div className={`card-info ${index === activeProject ? "active" : ""}`}>
              <h3>{t(project.title)}</h3>
              <div className="description">
                <p>{t(project.description)}</p>
                {project.link !== null && (
                  <a href={project.link} target="_blank">
                    {t("project_button")}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
