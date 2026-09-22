import "./App.css";
import { Aside } from "./components/layout/aside";
import { BootScreen } from "./components/organisms/boot-screen";
import { Footer } from "./components/layout/footer";
import { Header } from "./components/layout/header";
import { Main } from "./components/layout/main";
import { Navigation } from "./components/layout/navigation";
import { GlyphMatrix } from "./components/ui/glyph-matrix";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { useTranslation } from "react-i18next";

import { useActivityView } from "./lib/activity-view";
import { ActivityViewProvider } from "./lib/activity-view-provider";
import { EditorProvider } from "./lib/editor-provider";
import { useIsMobile } from "./lib/use-media-query";

/** desktop: painel lateral redimensionável ao lado do editor */
function DesktopWorkbench() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="min-w-0 flex-1">
      <ResizablePanel defaultSize={234} minSize={230} maxSize={480}>
        <Aside />
      </ResizablePanel>

      <ResizableHandle className="w-px bg-ide-border transition-colors after:w-2 hover:bg-ide-resize focus-visible:bg-ide-resize active:bg-ide-resize" />

      <ResizablePanel>
        <Main />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

/** mobile: só a barra de atividades fica fixa; o painel abre como gaveta sobre o editor */
function MobileWorkbench() {
  const { isAsideOpen, setAsideOpen } = useActivityView();
  const { t } = useTranslation();

  return (
    <div className="relative flex min-w-0 flex-1">
      <Main />

      {isAsideOpen && (
        <>
          <button
            type="button"
            aria-label={t("navigation.closePanel")}
            onClick={() => setAsideOpen(false)}
            className="absolute inset-0 z-30 bg-black/40"
          />
          <div className="absolute inset-y-0 left-0 z-40 flex w-[min(20rem,85vw)] border-r border-ide-border shadow-2xl">
            <Aside />
          </div>
        </>
      )}
    </div>
  );
}

function Workbench() {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-0 flex-1">
      <Navigation />
      {isMobile ? <MobileWorkbench /> : <DesktopWorkbench />}
    </div>
  );
}

function App() {
  return (
    <div className="flex h-dvh flex-col p-0 md:p-12">
      <BootScreen />

      <GlyphMatrix
        glyphs="01·•+*/\<>="
        cellSize={16}
        mutationRate={0.04}
        interval={90}
        fadeBottom={0.6}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <div className="relative flex h-full flex-col bg-ide-editor text-ide-fg shadow-2xl md:rounded-xl md:border md:border-ide-border">
        <Header />

        <ActivityViewProvider>
          <EditorProvider>
            <Workbench />
          </EditorProvider>
        </ActivityViewProvider>

        <Footer />
      </div>
    </div>
  );
}

export default App;
