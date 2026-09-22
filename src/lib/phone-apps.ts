import { folderAliases } from "./project-assets";
import { projectById } from "./projects";

export interface PhoneApp {
  id: string;
  name: string;
  icon: string;
  /** telas exibidas ao abrir o app, na ordem dos arquivos splash_* */
  splashes: string[];
}

/**
 * cada pasta em src/assets/projects/<app>/ pode virar um app do celular:
 * o ícone é o arquivo `icon.*` (ou `<app>.*`) e as telas são os `splash_*`.
 * Só entram projetos do tipo "app" em @/lib/projects; os demais têm ícone
 * apenas para as listas do site.
 */
const assetFiles = import.meta.glob("../assets/projects/*/*.{png,webp,jpg,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function buildPhoneApps(): PhoneApp[] {
  const apps = new Map<string, { icon?: string; splashes: string[] }>();

  for (const [path, url] of Object.entries(assetFiles)) {
    const [, folder, fileName] = path.match(/projects\/([^/]+)\/([^/]+)$/) ?? [];
    if (!folder || !fileName) continue;

    const app = apps.get(folder) ?? { splashes: [] };
    const baseName = fileName.replace(/\.[^.]+$/, "");

    if (baseName === "icon" || baseName === folder) {
      app.icon = url;
    } else if (baseName.startsWith("splash")) {
      app.splashes.push(url);
    }

    apps.set(folder, app);
  }

  return [...apps.entries()]
    .flatMap(([folder, app]) => {
      const project = projectById(folderAliases[folder] ?? folder);
      if (!app.icon || !project?.types.includes("app")) return [];

      return [
        {
          id: project.id,
          name: project.name,
          icon: app.icon,
          splashes: app.splashes.sort(),
        },
      ];
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const phoneApps: PhoneApp[] = buildPhoneApps();
