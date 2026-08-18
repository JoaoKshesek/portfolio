import { Header, Navigation, Aside, Main, Footer } from "@/components/layout";
import "./App.css";
import { GlyphMatrix } from "./components/ui/glyph-matrix";

function App() {
  return (
    <div className="flex flex-col p-12 h-screen ">
      <GlyphMatrix
        glyphs="01·•+*/\<>="
        cellSize={16}
        mutationRate={0.04}
        interval={90}
        fadeBottom={0.6}
        color={"red"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <div className="flex flex-col h-full">
        <Header />

        <div className="flex flex-1 overflow-hidden h-[80%]">
          <Navigation />
          <Aside />
          <Main />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
