import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTerminal,
  FaMicrochip,
  FaDatabase,
  FaCode,
  FaChevronDown,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaEnvelope,
  FaAward,
  FaBookOpen,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import Wormhole from './components/Wormhole';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="app-wrapper">
      <Wormhole />
      
      {/* Progress Bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Navbar */}
      <nav className="navbar glass-panel">
        <div className="container nav-content">
          <div className="logo">
            <div className="logo-icon">SM</div>
            <span>Shivangi Manna</span>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <div className="badge">AI/ML Engineer</div>
            <h1>Building the <br/><span>Future with Intelligence</span></h1>
            <p>Final-year B.Tech Computer Science student specializing in AI & ML. Passionate about solving complex problems through data-driven solutions.</p>
            <div className="cta-group">
              <a href="#projects" className="btn btn-primary">View Projects</a>
              <a href="#contact" className="btn btn-secondary">Contact Me</a>
            </div>
          </motion.div>
        </div>
        <div className="scroll-indicator">
          <FaChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="about-text glass-panel"
            >
              <h2 className="section-title">About Me</h2>
              <p>I am an ambitious Software Developer & AI/ML Engineer pursuing my B.Tech at <strong>Pranveer Singh Institute of Technology (PSIT), Kanpur</strong>.</p>
              <p>My expertise lies in Python, C++, and SQL, with a deep focus on machine learning concepts like CNNs and Transfer Learning. I'm driven by the potential of AI to transform industries and improve lives.</p>
              <div className="stats-grid">
                <div className="stat-item">
                  <h3>100+</h3>
                  <span>LeetCode Solved</span>
                </div>
                <div className="stat-item">
                  <h3>71.9%</h3>
                  <span>B.Tech Score</span>
                </div>
                <div className="stat-item">
                  <h3>2026</h3>
                  <span>Graduating</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="about-visual glass-panel"
            >
              <FaTerminal size={120} color="var(--accent-primary)" />
              <div className="visual-glow"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="container">
          <h2 className="section-title">Technical Arsenal</h2>
          <div className="skills-grid">
            {[
              { title: "Languages", icon: <FaCode />, tags: ["Python", "C++", "SQL", "HTML5", "CSS3"] },
              { title: "AI / ML", icon: <FaMicrochip />, tags: ["CNN", "TensorFlow", "Keras", "Transfer Learning", "Scikit-Learn"] },
              { title: "Data & Core", icon: <FaDatabase />, tags: ["MySQL", "DBMS", "DSA", "OOPs", "Computer Networks"] },
              { title: "Tools", icon: <FaTerminal />, tags: ["VS Code", "Git", "Google Cloud", "OpenCV"] }
            ].map((skill, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="skill-card glass-panel"
              >
                <div className="skill-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--accent-secondary)' }}>{skill.icon}</div>
                <h3>{skill.title}</h3>
                <div className="skill-tags">
                  {skill.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <motion.div className="project-card glass-panel" whileHover={{ y: -10 }}>
              <div className="project-header">
                <h3>Skin Disease Detection</h3>
                <FaExternalLinkAlt size={20} />
              </div>
              <p>CNN-based deep learning model for classifying skin images with 97.6% precision. Implemented Transfer Learning for optimized performance.</p>
              <div className="project-tags">
                <span>TensorFlow</span>
                <span>OpenCV</span>
                <span>Python</span>
              </div>
            </motion.div>
            <motion.div className="project-card glass-panel" whileHover={{ y: -10 }}>
              <div className="project-header">
                <h3>Snap Specs</h3>
                <FaGithub size={20} />
              </div>
              <p>Visual product identifier using computer vision to find similar items. Seamless frontend-backend integration.</p>
              <div className="project-tags">
                <span>React</span>
                <span>Node.js</span>
                <span>JavaScript</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="contact-card glass-panel">
            <h2 className="section-title">Let's Connect</h2>
            <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
            <div className="contact-links">
              <a href="mailto:shivangimanna.99@gmail.com" className="contact-item">
                <FaEnvelope />
                <span>shivangimanna.99@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/shivangimanna" target="_blank" className="contact-item">
                <FaLinkedin />
                <span>linkedin.com/in/shivangimanna</span>
              </a>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>Kanpur, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Built with ❤️ by Shivangi Manna &copy; 2026</p>
      </footer>
    </div>
  );
};

export default App;
