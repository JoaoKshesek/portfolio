import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.css";

type TechnologyCategory = "front" | "back" | "devops" | "tools";

export function Technologies() {
  const [activeTab, setActiveTab] = useState<TechnologyCategory>("front");

  const { t } = useTranslation();

  const technologies: Record<TechnologyCategory, { title: string; asset: string }[]> = {
    front: [
      { title: "Javascript", asset: "./assets/icons/javascript.svg" },
      { title: "Typescript", asset: "./assets/icons/typescript.svg" },
      { title: "HTML", asset: "./assets/icons/html.svg" },
      { title: "CSS", asset: "./assets/icons/css.svg" },
      { title: "React JS", asset: "./assets/icons/react.svg" },
      { title: "Material UI", asset: "./assets/icons/mui.svg" },
      { title: "Next JS", asset: "./assets/icons/nextjs.svg" },
      { title: "Vite", asset: "./assets/icons/vite.png" },
    ],
    back: [
      { title: "Node JS", asset: "./assets/icons/node.png" },
      { title: "Express", asset: "./assets/icons/express.webp" },
      { title: "C#", asset: "./assets/icons/c-sharp.png" },
      { title: "PHP", asset: "./assets/icons/php.png" },
      { title: "Laravel", asset: "./assets/icons/laravel.png" },
      { title: "Mongo DB", asset: "./assets/icons/mongodb.png" },
      { title: "MySQL", asset: "./assets/icons/mysql.png" },
    ],
    devops: [
      { title: "Docker", asset: "./assets/icons/docker.webp" },
      { title: "AWS", asset: "./assets/icons/aws.png" },
      { title: "Azure", asset: "./assets/icons/azure.png" },
      { title: "Datadog", asset: "./assets/icons/datadog.png" },
      { title: "Git", asset: "./assets/icons/git.png" },
      { title: "Github", asset: "./assets/icons/github.png" },
    ],
    tools: [
      { title: "Postman", asset: "./assets/icons/postman.svg" },
      { title: "Insomnia", asset: "./assets/icons/insomnia.png" },
      { title: "VS Code", asset: "./assets/icons/vscode.png" },
      { title: "Visual Studio", asset: "./assets/icons/visual-studio.png" },
      { title: "Swagger", asset: "./assets/icons/swagger.png" },
      { title: "Bekeeper", asset: "./assets/icons/bekeeper.png" },
      { title: "Cypress", asset: "./assets/icons/cypress.svg" },
      { title: "Jest", asset: "./assets/icons/jest.png" },
    ],
  };

  return (
    <div id="technologies">
      <div className="info">
        <h2>{t("technologies_title")}</h2>
      </div>
      <div className="content">
        <div className="menu">
          <div className="submenu">
            <p className={activeTab === "front" ? "active" : ""} onClick={() => setActiveTab("front")}>
              {t("technologies_stack_1")}
            </p>
            <p className={activeTab === "back" ? "active" : ""} onClick={() => setActiveTab("back")}>
              {t("technologies_stack_2")}
            </p>
          </div>
          <div className="submenu">
            <p className={activeTab === "devops" ? "active" : ""} onClick={() => setActiveTab("devops")}>
              {t("technologies_stack_3")}
            </p>
            <p className={activeTab === "tools" ? "active" : ""} onClick={() => setActiveTab("tools")}>
              {t("technologies_stack_4")}
            </p>
          </div>
        </div>
        <div className="cards">
          {technologies[activeTab].map((item, index) => (
            <div className="card" key={index}>
              <img src={item.asset} alt={item.title} width={50} />
              <div className="title">
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
