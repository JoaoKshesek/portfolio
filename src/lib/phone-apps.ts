export interface PhoneApp {
  id: string;
  name: string;
  icon: string;
  /** telas exibidas ao abrir o app, na ordem dos arquivos splash_* */
  splashes: string[];
}

const appNames: Record<string, string> = {
  adenpay: "AdenPay",
  bolsozen: "Bolsozen",
  helpmeup: "Help Me Up",
  humu: "Humu",
  i3pics: "i3Pics",
  lide: "Lide",
  lugpay: "LugPay",
  orbit: "Orbit",
  porti: "Porti",
  way: "Way",
};

/**
 * cada pasta em src/assets/projects/<app>/ vira um app do celular:
 * o ícone é o arquivo `icon.*` (ou `<app>.*`) e as telas são os `splash_*`
 */
const assetFiles = import.meta.glob("../assets/projects/*/*.{png,webp,jpg,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function buildPhoneApps(): PhoneApp[] {
  const apps = new Map<string, { icon?: string; splashes: string[] }>();

  for (const [path, url] of Object.entries(assetFiles)) {
    const [, appId, fileName] = path.match(/projects\/([^/]+)\/([^/]+)$/) ?? [];
    if (!appId || !fileName) continue;

    const app = apps.get(appId) ?? { splashes: [] };
    const baseName = fileName.replace(/\.[^.]+$/, "");

    if (baseName === "icon" || baseName === appId) {
      app.icon = url;
    } else if (baseName.startsWith("splash")) {
      app.splashes.push(url);
    }

    apps.set(appId, app);
  }

  return [...apps.entries()]
    .filter(([, app]) => app.icon)
    .map(([id, app]) => ({
      id,
      name: appNames[id] ?? id,
      icon: app.icon!,
      splashes: app.splashes.sort(),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export const phoneApps: PhoneApp[] = buildPhoneApps();
