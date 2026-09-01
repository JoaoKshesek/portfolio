import { useState } from "react";

import { Iphone } from "@/components/ui/iphone";
import { phoneApps, type PhoneApp } from "@/lib/phone-apps";

interface PhonePreviewProps {
  className?: string;
}

export function PhonePreview({ className }: PhonePreviewProps) {
  const [openApp, setOpenApp] = useState<PhoneApp | null>(null);
  const [splashIndex, setSplashIndex] = useState(0);

  const openSplashes = (app: PhoneApp) => {
    if (app.splashes.length === 0) return;
    setOpenApp(app);
    setSplashIndex(0);
  };

  const nextSplash = () => {
    if (!openApp) return;
    setSplashIndex((index) => (index + 1) % openApp.splashes.length);
  };

  return (
    <Iphone className={className}>
      <div className="@container relative size-full select-none overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
        {openApp ? (
          <button
            type="button"
            onClick={nextSplash}
            aria-label="Próxima tela do app"
            className="absolute inset-0 cursor-pointer"
          >
            <img
              src={openApp.splashes[splashIndex]}
              alt={`Tela ${splashIndex + 1} do app ${openApp.name}`}
              className="size-full object-cover object-top"
            />
          </button>
        ) : (
          <div className="flex size-full flex-col">
            <div className="flex items-center justify-between px-[9cqw] pt-[4cqw] text-[3.8cqw] font-semibold text-white">
              <span>9:41</span>
              <span>5G</span>
            </div>

            <div className="grid grid-cols-4 gap-x-[2cqw] gap-y-[5cqw] px-[5cqw] pt-[11cqw]">
              {phoneApps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  title={app.name}
                  onClick={() => openSplashes(app)}
                  className={`flex flex-col items-center gap-[1.5cqw] ${
                    app.splashes.length > 0 ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <img
                    src={app.icon}
                    alt=""
                    aria-hidden
                    className="size-[18cqw] rounded-[4cqw] object-cover shadow-md"
                  />
                  <span className="w-full truncate text-center text-[3.4cqw] text-white/90">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* indicadores de tela do app aberto */}
        {openApp && openApp.splashes.length > 1 && (
          <div className="absolute bottom-[7cqw] left-1/2 flex -translate-x-1/2 gap-[1.5cqw]">
            {openApp.splashes.map((splash, index) => (
              <span
                key={splash}
                className={`size-[1.5cqw] rounded-full ${
                  index === splashIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* barra de home: volta para a tela inicial */}
        <button
          type="button"
          aria-label="Voltar para a tela inicial"
          onClick={() => setOpenApp(null)}
          className={`absolute bottom-0 left-1/2 flex h-4 w-1/2 -translate-x-1/2 items-end justify-center pb-1 ${
            openApp ? "cursor-pointer" : "cursor-default"
          }`}
        >
          <span className="block h-1 w-full rounded-full bg-white/80 shadow" />
        </button>
      </div>
    </Iphone>
  );
}
