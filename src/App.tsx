
import "./App.css";
import { Aside } from "./components/layout/aside";
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
import { ActivityViewProvider } from "./lib/activity-view-provider";

function App() {
  return (
    <div className="flex flex-col p-12 h-screen ">
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

      <div className="relative flex h-full flex-col rounded-xl border border-ide-border bg-ide-editor text-ide-fg shadow-2xl">
        <Header />

        <ActivityViewProvider>
          <div className="flex min-h-0 flex-1">
            <Navigation />

            <ResizablePanelGroup
              orientation="horizontal"
              className="min-w-0 flex-1"
            >
              <ResizablePanel defaultSize={224} minSize={160} maxSize={480}>
                <Aside />
              </ResizablePanel>

              <ResizableHandle className="w-px bg-ide-border transition-colors after:w-2 hover:bg-ide-resize focus-visible:bg-ide-resize active:bg-ide-resize" />

              <ResizablePanel>
                <Main />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ActivityViewProvider>

        <Footer />
      </div>
    </div>
  );
}

export default App;
