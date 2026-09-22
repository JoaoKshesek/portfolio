/**
 * banner e logo de cada projeto, resolvidos pela convenção de pastas:
 * src/assets/projects/<pasta>/banner.* e src/assets/projects/<pasta>/logo.*
 */
const assetFiles = import.meta.glob("../assets/projects/*/*.{png,webp,jpg,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

/** pastas cujo nome difere do id do projeto em @/lib/projects */
export const folderAliases: Record<string, string> = {
  loterica: "loterica-nova",
  lide: "lide-global",
};

function buildAssetMap(matches: (baseName: string, folder: string) => boolean): Record<string, string> {
  const map: Record<string, string> = {};

  for (const [path, url] of Object.entries(assetFiles)) {
    const [, folder, fileName] = path.match(/projects\/([^/]+)\/([^/]+)$/) ?? [];
    if (!folder || !fileName || !matches(fileName.replace(/\.[^.]+$/, ""), folder)) continue;

    map[folderAliases[folder] ?? folder] = url;
  }

  return map;
}

const banners = buildAssetMap((name) => name === "banner");
const logos = buildAssetMap((name) => name === "logo");
/** ícone do app (icon.* ou <pasta>.*), usado como logo quando não há logo.* */
const icons = buildAssetMap((name, folder) => name === "icon" || name === folder);

export function projectBanner(projectId: string): string | undefined {
  return banners[projectId];
}

export function projectLogo(projectId: string): string | undefined {
  return logos[projectId] ?? icons[projectId];
}
