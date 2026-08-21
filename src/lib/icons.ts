import certificate from "material-icon-theme/icons/certificate.svg";
import folderApp from "material-icon-theme/icons/folder-app.svg";
import folderAppOpen from "material-icon-theme/icons/folder-app-open.svg";
import folderBase from "material-icon-theme/icons/folder.svg";
import folderBaseOpen from "material-icon-theme/icons/folder-open.svg";
import folderClient from "material-icon-theme/icons/folder-client.svg";
import folderClientOpen from "material-icon-theme/icons/folder-client-open.svg";
import folderClass from "material-icon-theme/icons/folder-class.svg";
import folderClassOpen from "material-icon-theme/icons/folder-class-open.svg";
import folderJob from "material-icon-theme/icons/folder-job.svg";
import folderJobOpen from "material-icon-theme/icons/folder-job-open.svg";
import folderProject from "material-icon-theme/icons/folder-project.svg";
import folderProjectOpen from "material-icon-theme/icons/folder-project-open.svg";
import folderSrc from "material-icon-theme/icons/folder-src.svg";
import folderSrcOpen from "material-icon-theme/icons/folder-src-open.svg";

export type IconSpec =
  | { type: "codicon"; name: string; className?: string }
  | { type: "image"; src: string };

interface FolderIcon {
  closed: string;
  open: string;
}

/** pastas com ícone próprio no Material Icon Theme; o resto cai no padrão */
const folderIcons: Record<string, FolderIcon> = {
  src: { closed: folderSrc, open: folderSrcOpen },
  projetos: { closed: folderProject, open: folderProjectOpen },
  experiencia: { closed: folderJob, open: folderJobOpen },
  educacao: { closed: folderClass, open: folderClassOpen },
};

const defaultFolder: FolderIcon = { closed: folderBase, open: folderBaseOpen };
const projectFolder: FolderIcon = { closed: folderApp, open: folderAppOpen };
const companyFolder: FolderIcon = {
  closed: folderClient,
  open: folderClientOpen,
};

export function folderIcon(name: string, isOpen: boolean): IconSpec {
  const icon = folderIcons[name] ?? defaultFolder;
  return { type: "image", src: isOpen ? icon.open : icon.closed };
}

export function projectFolderIcon(isOpen: boolean): IconSpec {
  return {
    type: "image",
    src: isOpen ? projectFolder.open : projectFolder.closed,
  };
}

export function companyFolderIcon(isOpen: boolean): IconSpec {
  return {
    type: "image",
    src: isOpen ? companyFolder.open : companyFolder.closed,
  };
}

export const certificateIconSrc: string = certificate;
