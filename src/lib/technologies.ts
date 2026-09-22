import i18n from "i18next";

import aws from "@/assets/icons/aws.png";
import azure from "@/assets/icons/azure.png";
import beekeeper from "@/assets/icons/bekeeper.png";
import csharp from "@/assets/icons/c-sharp.png";
import css from "@/assets/icons/css.svg";
import cypress from "@/assets/icons/cypress.svg";
import datadog from "@/assets/icons/datadog.png";
import docker from "@/assets/icons/docker.webp";
import express from "@/assets/icons/express.webp";
import fastify from "@/assets/icons/fastify.svg";
import git from "@/assets/icons/git.png";
import github from "@/assets/icons/github.png";
import grafana from "@/assets/icons/grafana.svg";
import graphql from "@/assets/icons/graphql.svg";
import html from "@/assets/icons/html.svg";
import insomnia from "@/assets/icons/insomnia.png";
import javascript from "@/assets/icons/javascript.svg";
import jest from "@/assets/icons/jest.png";
import laravel from "@/assets/icons/laravel.png";
import mongodb from "@/assets/icons/mongodb.png";
import mui from "@/assets/icons/mui.svg";
import mysql from "@/assets/icons/mysql.png";
import reactNative from "@/assets/icons/native.svg";
import nextjs from "@/assets/icons/nextjs.svg";
import node from "@/assets/icons/node.png";
import php from "@/assets/icons/php.png";
import postman from "@/assets/icons/postman.svg";
import react from "@/assets/icons/react.svg";
import swagger from "@/assets/icons/swagger.png";
import typescript from "@/assets/icons/typescript.svg";
import visualStudio from "@/assets/icons/visual-studio.png";
import vite from "@/assets/icons/vite.png";
import vscode from "@/assets/icons/vscode.png";

export type TechnologyCategory = "ferramentas" | "frontend" | "backend" | "infraestrutura";

export const technologyCategories: TechnologyCategory[] = [
  "ferramentas",
  "frontend",
  "backend",
  "infraestrutura",
];

export function categoryLabel(category: TechnologyCategory): string {
  return i18n.t(`ui:technology.categories.${category}`);
}

/** "6a" / "6y", conforme o idioma */
export function yearsLabel(years: number): string {
  return i18n.t("ui:technology.years", { count: years });
}

/** dados fixos da tecnologia; a descrição vem de src/locales/<lang>/technologies.json */
interface TechnologyData {
  id: string;
  icon: string;
  name: string;
  /** anos de uso */
  years: number;
  category: TechnologyCategory;
}

export interface Technology extends TechnologyData {
  description: string;
  /** anos de uso já formatados no idioma atual */
  time: string;
}

const technologyData: TechnologyData[] = [
  {
    id: "typescript",
    icon: typescript,
    name: "TypeScript",
    years: 6,
    category: "frontend",
  },
  {
    id: "javascript",
    icon: javascript,
    name: "JavaScript",
    years: 6,
    category: "frontend",
  },
  {
    id: "react",
    icon: react,
    name: "React",
    years: 6,
    category: "frontend",
  },
  {
    id: "nextjs",
    icon: nextjs,
    name: "Next.js",
    years: 5,
    category: "frontend",
  },
  {
    id: "react-native",
    icon: reactNative,
    name: "React Native",
    years: 5,
    category: "frontend",
  },
  {
    id: "html",
    icon: html,
    name: "HTML",
    years: 6,
    category: "frontend",
  },
  {
    id: "css",
    icon: css,
    name: "CSS",
    years: 6,
    category: "frontend",
  },
  {
    id: "mui",
    icon: mui,
    name: "Material UI",
    years: 5,
    category: "frontend",
  },
  {
    id: "vite",
    icon: vite,
    name: "Vite",
    years: 6,
    category: "ferramentas",
  },
  {
    id: "node",
    icon: node,
    name: "Node.js",
    years: 5,
    category: "backend",
  },
  {
    id: "express",
    icon: express,
    name: "Express",
    years: 4,
    category: "backend",
  },
  {
    id: "fastify",
    icon: fastify,
    name: "Fastify",
    years: 2,
    category: "backend",
  },
  {
    id: "graphql",
    icon: graphql,
    name: "GraphQL",
    years: 2,
    category: "backend",
  },
  {
    id: "php",
    icon: php,
    name: "PHP",
    years: 6,
    category: "backend",
  },
  {
    id: "laravel",
    icon: laravel,
    name: "Laravel",
    years: 5,
    category: "backend",
  },
  {
    id: "csharp",
    icon: csharp,
    name: "C#",
    years: 3,
    category: "backend",
  },
  {
    id: "mysql",
    icon: mysql,
    name: "MySQL",
    years: 6,
    category: "infraestrutura",
  },
  {
    id: "mongodb",
    icon: mongodb,
    name: "MongoDB",
    years: 5,
    category: "infraestrutura",
  },
  {
    id: "docker",
    icon: docker,
    name: "Docker",
    years: 4,
    category: "infraestrutura",
  },
  {
    id: "aws",
    icon: aws,
    name: "AWS",
    years: 2,
    category: "infraestrutura",
  },
  {
    id: "azure",
    icon: azure,
    name: "Azure",
    years: 2,
    category: "infraestrutura",
  },
  {
    id: "grafana",
    icon: grafana,
    name: "Grafana",
    years: 2,
    category: "infraestrutura",
  },
  {
    id: "datadog",
    icon: datadog,
    name: "Datadog",
    years: 2,
    category: "infraestrutura",
  },
  {
    id: "git",
    icon: git,
    name: "Git",
    years: 6,
    category: "ferramentas",
  },
  {
    id: "github",
    icon: github,
    name: "GitHub",
    years: 6,
    category: "ferramentas",
  },
  {
    id: "jest",
    icon: jest,
    name: "Jest",
    years: 6,
    category: "ferramentas",
  },
  {
    id: "cypress",
    icon: cypress,
    name: "Cypress",
    years: 3,
    category: "ferramentas",
  },
  {
    id: "swagger",
    icon: swagger,
    name: "Swagger",
    years: 4,
    category: "ferramentas",
  },
  {
    id: "postman",
    icon: postman,
    name: "Postman",
    years: 6,
    category: "ferramentas",
  },
  {
    id: "insomnia",
    icon: insomnia,
    name: "Insomnia",
    years: 6,
    category: "ferramentas",
  },
  {
    id: "beekeeper",
    icon: beekeeper,
    name: "Beekeeper Studio",
    years: 4,
    category: "ferramentas",
  },
  {
    id: "vscode",
    icon: vscode,
    name: "VS Code",
    years: 6,
    category: "ferramentas",
  },
  {
    id: "visual-studio",
    icon: visualStudio,
    name: "Visual Studio",
    years: 3,
    category: "ferramentas",
  },
];

function translate(data: TechnologyData): Technology {
  return {
    ...data,
    description: i18n.t(`technologies:${data.id}`, { defaultValue: "" }),
    time: yearsLabel(data.years),
  };
}

/** todas as tecnologias, com descrição no idioma atual */
export function getTechnologies(): Technology[] {
  return technologyData.map(translate);
}

export function technologyById(id: string): Technology | undefined {
  const data = technologyData.find((technology) => technology.id === id);
  return data ? translate(data) : undefined;
}

export function technologiesByIds(ids: string[]): Technology[] {
  return ids
    .map((id) => technologyById(id))
    .filter((technology) => technology !== undefined);
}
