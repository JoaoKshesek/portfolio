/**
 * banner e logo de cada projeto, resolvidos pela convenção de pastas:
 * src/assets/projects/<pasta>/banner.* e src/assets/projects/<pasta>/logo.*
 */
const assetFiles = import.meta.glob("../assets/projects/*/*.{png,webp,jpg,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

/** pastas cujo nome difere do id do projeto em @/lib/projects */
const folderAliases: Record<string, string> = {
  loterica: "loterica-nova",
  lide: "lide-global",
};

function buildAssetMap(kind: "banner" | "logo"): Record<string, string> {
  const map: Record<string, string> = {};

  for (const [path, url] of Object.entries(assetFiles)) {
    const [, folder, fileName] = path.match(/projects\/([^/]+)\/([^/]+)$/) ?? [];
    if (!folder || fileName?.replace(/\.[^.]+$/, "") !== kind) continue;

    map[folderAliases[folder] ?? folder] = url;
  }

  return map;
}

const banners = buildAssetMap("banner");
const logos = buildAssetMap("logo");

export function projectBanner(projectId: string): string | undefined {
  return banners[projectId];
}

export function projectLogo(projectId: string): string | undefined {
  return logos[projectId];
}
