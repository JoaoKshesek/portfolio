import { institutions } from "./education";
import { companies } from "./experience";
import {
  certificateIconSrc,
  companyFolderIcon,
  folderIcon,
  projectFolderIcon,
  type IconSpec,
} from "./icons";
import { projects } from "./projects";

export interface SiteContent {
  kind: "site";
  url: string;
  title?: string;
}

export interface EducationContent {
  kind: "education";
  institutionId: string;
  studyId: string;
}

export interface ExperienceContent {
  kind: "experience";
  companyId: string;
  roleId: string;
}

export interface ProfileContent {
  kind: "profile";
}

export type FileContent =
  | SiteContent
  | ProfileContent
  | ExperienceContent
  | EducationContent;

export interface TreeFile {
  type: "file";
  id: string;
  name: string;
  icon?: string;
  iconClass?: string;
  /** imagem usada como ícone, no lugar do codicon */
  image?: string;
  content?: FileContent;
}

export interface TreeFolder {
  type: "folder";
  id: string;
  name: string;
  icon?: string;
  iconClass?: string;
  defaultOpen?: boolean;
  children: TreeNode[];
}

export type TreeNode = TreeFile | TreeFolder;

export interface ExplorerRoot {
  name: string;
  children: TreeNode[];
}

export const readmeFile: TreeFile = {
  type: "file",
  id: "README.md",
  name: "README.md",
  icon: "info",
  iconClass: "text-sky-400",
  content: { kind: "profile" },
};

export function educationFile(
  institutionId: string,
  studyId: string,
): TreeFile {
  const study = institutions
    .find((institution) => institution.id === institutionId)
    ?.studies.find((item) => item.id === studyId);

  return {
    type: "file",
    id: `src/educacao/${institutionId}/${studyId}.md`,
    name: `${studyId}.md`,
    image: study?.kind === "certificado" ? certificateIconSrc : undefined,
    content: { kind: "education", institutionId, studyId },
  };
}

const educationFolder: TreeFolder = {
  type: "folder",
  id: "src/educacao",
  name: "educacao",
  children: institutions.map((institution) => ({
    type: "folder",
    id: `src/educacao/${institution.id}`,
    name: institution.id,
    children: institution.studies.map((study) =>
      educationFile(institution.id, study.id),
    ),
  })),
};

export function experienceFile(companyId: string, roleId: string): TreeFile {
  return {
    type: "file",
    id: `src/experiencia/${companyId}/${roleId}.md`,
    name: `${roleId}.md`,
    content: { kind: "experience", companyId, roleId },
  };
}

const experienceFolder: TreeFolder = {
  type: "folder",
  id: "src/experiencia",
  name: "experiencia",
  children: companies.map((company) => ({
    type: "folder",
    id: `src/experiencia/${company.id}`,
    name: company.id,
    children: company.roles.map((role) =>
      experienceFile(company.id, role.id),
    ),
  })),
};

const projectsFolder: TreeFolder = {
  type: "folder",
  id: "src/projetos",
  name: "projetos",
  defaultOpen: true,
  children: projects.map((project) => {
    const base = `src/projetos/${project.id}`;

    const description: TreeFile = {
      type: "file",
      id: `${base}/descricao.md`,
      name: "descricao.md",
    };

    const preview: TreeFile[] = project.url
      ? [
          {
            type: "file",
            id: `${base}/preview.png`,
            name: "preview.png",
            content: { kind: "site", url: project.url, title: project.name },
          },
        ]
      : [];

    return {
      type: "folder",
      id: base,
      name: project.id,
      children: [description, ...preview],
    };
  }),
};

export const explorerRoot: ExplorerRoot = {
  name: "portfolio",
  children: [
    {
      type: "folder",
      id: "src",
      name: "src",
      defaultOpen: true,
      children: [
        experienceFolder,
        projectsFolder,
        educationFolder,
      ],
    },
    readmeFile,
  ],
};

interface FileIcon {
  icon: string;
  iconClass: string;
}

const extensionIcons: Record<string, FileIcon> = {
  md: { icon: "markdown", iconClass: "text-sky-400" },
  json: { icon: "json", iconClass: "text-amber-400" },
  ts: { icon: "file-code", iconClass: "text-sky-400" },
  tsx: { icon: "file-code", iconClass: "text-sky-400" },
  js: { icon: "file-code", iconClass: "text-amber-400" },
  pdf: { icon: "file-pdf", iconClass: "text-red-400" },
  png: { icon: "file-media", iconClass: "text-purple-400" },
  jpg: { icon: "file-media", iconClass: "text-purple-400" },
  svg: { icon: "file-media", iconClass: "text-purple-400" },
  webp: { icon: "file-media", iconClass: "text-purple-400" },
};

const fallbackIcon: FileIcon = { icon: "file", iconClass: "text-ide-muted" };

export function nodeIcon(node: TreeNode, isOpen: boolean): IconSpec {
  if (node.type === "file" && node.image) {
    return { type: "image", src: node.image };
  }

  if (node.icon) {
    return { type: "codicon", name: node.icon, className: node.iconClass };
  }

  if (node.type === "folder") {
    if (node.id.startsWith("src/projetos/")) return projectFolderIcon(isOpen);
    if (node.id.startsWith("src/experiencia/")) return companyFolderIcon(isOpen);
    if (node.id.startsWith("src/educacao/")) return companyFolderIcon(isOpen);
    return folderIcon(node.name, isOpen);
  }

  const extension = node.name.split(".").pop()?.toLowerCase() ?? "";
  const { icon, iconClass } = extensionIcons[extension] ?? fallbackIcon;

  return { type: "codicon", name: icon, className: iconClass };
}

export function folderIds(nodes: TreeNode[], onlyDefaultOpen = false): string[] {
  return nodes.flatMap((node) => {
    if (node.type !== "folder") return [];

    const children = folderIds(node.children, onlyDefaultOpen);

    if (onlyDefaultOpen && !node.defaultOpen) return children;

    return [node.id, ...children];
  });
}

export function treeFiles(nodes: TreeNode[] = explorerRoot.children): TreeFile[] {
  return nodes.flatMap((node) =>
    node.type === "file" ? [node] : treeFiles(node.children),
  );
}
