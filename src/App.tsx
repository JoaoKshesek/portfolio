import "../src/translations/i18n.js";
import { Container, Main, Particles, Section, Header, Projects, Footer, About, Home, Technologies } from "./components";
import "./styles/global.css";

function App() {
  return (
    <Main>
      <Container>
        <Header />
        <Section>
          <Home />
        </Section>
        <Section>
          <About />
        </Section>
        <Section>
          <Technologies />
        </Section>
        <Section>
          <Projects />
        </Section>
        <Footer />
      </Container>
      <Particles id="tsparticles" />
    </Main>
  );
}

export default App;
