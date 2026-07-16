import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { Hero } from './sections/Hero';
import { MarqueeStrip } from './sections/MarqueeStrip';
import { StatsStrip } from './sections/StatsStrip';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Research } from './sections/Research';
import { GitHub } from './sections/GitHub';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';
import { Chat } from './pages/Chat';
import { ProjectPage } from './pages/ProjectPage';
import { ProjectsIndex } from './pages/ProjectsIndex';

function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    setTimeout(() => setRevealed(true), 100);
  }, []);

  return (
    <div className="app-container">
      {loading && (
        <LoadingScreen onComplete={handleLoadingComplete} minDuration={2400} />
      )}

      <Navbar />

      <main>
        <Hero revealed={revealed} />
        <MarqueeStrip />
        <StatsStrip />
        <About />
        <Projects />
        <Skills />
        <Research />
        <GitHub />
        <Achievements />
        <Contact />
      </main>

      <footer className="footer">
        <p>PRIYANSHU DOSHI</p>
        <p>{new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/projects" element={<ProjectsIndex />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
