import { useState, useCallback } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { Hero } from './sections/Hero';
import { Dashboard } from './sections/Dashboard';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Research } from './sections/Research';
import { Skills } from './sections/Skills';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';

function App() {
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    setTimeout(() => setRevealed(true), 100);
  }, []);

  return (
    <div className={`app-container ${revealed ? 'app--revealed' : ''}`}>
      {loading && (
        <LoadingScreen onComplete={handleLoadingComplete} minDuration={3200} />
      )}

      <Navbar />

      <main>
        <Hero revealed={revealed} />
        <Dashboard />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <footer className="footer">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} <span className="footer-brand">Priyanshu Doshi</span>. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
