import aws from "@/assets/icons/aws.png";
import azure from "@/assets/icons/azure.png";
import beekeeper from "@/assets/icons/bekeeper.png";
import csharp from "@/assets/icons/c-sharp.png";
import css from "@/assets/icons/css.svg";
import cypress from "@/assets/icons/cypress.svg";
import datadog from "@/assets/icons/datadog.png";
import docker from "@/assets/icons/docker.webp";
import express from "@/assets/icons/express.webp";
import git from "@/assets/icons/git.png";
import github from "@/assets/icons/github.png";
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

export interface Technology {
  id: string;
  icon: string;
  name: string;
  description: string;
  time: string;
}

export const technologies: Technology[] = [
  {
    id: "typescript",
    icon: typescript,
    name: "TypeScript",
    description: "JavaScript com tipagem estática e refactors seguros.",
    time: "5a",
  },
  {
    id: "javascript",
    icon: javascript,
    name: "JavaScript",
    description: "Linguagem base da web, no browser e no servidor.",
    time: "5a",
  },
  {
    id: "react",
    icon: react,
    name: "React",
    description: "Interfaces declarativas baseadas em componentes.",
    time: "5a",
  },
  {
    id: "nextjs",
    icon: nextjs,
    name: "Next.js",
    description: "Framework React com SSR, rotas e otimização de build.",
    time: "5a",
  },
  {
    id: "react-native",
    icon: reactNative,
    name: "React Native",
    description: "Apps mobile para iOS e Android com a stack React.",
    time: "5a",
  },
  {
    id: "html",
    icon: html,
    name: "HTML",
    description: "Marcação semântica e acessível como base das páginas.",
    time: "5a",
  },
  {
    id: "css",
    icon: css,
    name: "CSS",
    description: "Layout responsivo, animações e design system.",
    time: "5a",
  },
  {
    id: "mui",
    icon: mui,
    name: "Material UI",
    description: "Biblioteca de componentes React com tema customizável.",
    time: "5a",
  },
  {
    id: "vite",
    icon: vite,
    name: "Vite",
    description: "Dev server instantâneo e build otimizado para o front.",
    time: "5a",
  },
  {
    id: "node",
    icon: node,
    name: "Node.js",
    description: "Runtime JavaScript para APIs e serviços no back-end.",
    time: "5a",
  },
  {
    id: "express",
    icon: express,
    name: "Express",
    description: "Framework minimalista para APIs REST em Node.",
    time: "5a",
  },
  {
    id: "php",
    icon: php,
    name: "PHP",
    description: "Linguagem server-side em sistemas web e legados.",
    time: "5a",
  },
  {
    id: "laravel",
    icon: laravel,
    name: "Laravel",
    description: "Framework PHP com ORM, filas e autenticação prontos.",
    time: "5a",
  },
  {
    id: "csharp",
    icon: csharp,
    name: "C#",
    description: "Linguagem da plataforma .NET para APIs e serviços.",
    time: "5a",
  },
  {
    id: "mysql",
    icon: mysql,
    name: "MySQL",
    description: "Banco relacional: modelagem, queries e índices.",
    time: "5a",
  },
  {
    id: "mongodb",
    icon: mongodb,
    name: "MongoDB",
    description: "Banco NoSQL orientado a documentos e agregações.",
    time: "5a",
  },
  {
    id: "docker",
    icon: docker,
    name: "Docker",
    description: "Containers para padronizar ambientes e deploys.",
    time: "5a",
  },
  {
    id: "aws",
    icon: aws,
    name: "AWS",
    description: "Infra em nuvem: computação, storage e filas.",
    time: "5a",
  },
  {
    id: "azure",
    icon: azure,
    name: "Azure",
    description: "Nuvem da Microsoft para apps e pipelines .NET.",
    time: "5a",
  },
  {
    id: "datadog",
    icon: datadog,
    name: "Datadog",
    description: "Observabilidade com métricas, logs e alertas.",
    time: "5a",
  },
  {
    id: "git",
    icon: git,
    name: "Git",
    description: "Versionamento, branches e histórico de mudanças.",
    time: "5a",
  },
  {
    id: "github",
    icon: github,
    name: "GitHub",
    description: "Repositórios, code review e CI com Actions.",
    time: "5a",
  },
  {
    id: "jest",
    icon: jest,
    name: "Jest",
    description: "Testes unitários e de integração com cobertura.",
    time: "5a",
  },
  {
    id: "cypress",
    icon: cypress,
    name: "Cypress",
    description: "Testes end-to-end rodando no browser real.",
    time: "5a",
  },
  {
    id: "swagger",
    icon: swagger,
    name: "Swagger",
    description: "Documentação de APIs no padrão OpenAPI.",
    time: "5a",
  },
  {
    id: "postman",
    icon: postman,
    name: "Postman",
    description: "Coleções para testar e documentar endpoints.",
    time: "5a",
  },
  {
    id: "insomnia",
    icon: insomnia,
    name: "Insomnia",
    description: "Cliente REST e GraphQL para debug de requisições.",
    time: "5a",
  },
  {
    id: "beekeeper",
    icon: beekeeper,
    name: "Beekeeper Studio",
    description: "Cliente SQL para explorar e editar bases de dados.",
    time: "5a",
  },
  {
    id: "vscode",
    icon: vscode,
    name: "VS Code",
    description: "Editor do dia a dia — inclusive a inspiração deste site.",
    time: "5a",
  },
  {
    id: "visual-studio",
    icon: visualStudio,
    name: "Visual Studio",
    description: "IDE para desenvolvimento em C# e .NET.",
    time: "5a",
  },
];
