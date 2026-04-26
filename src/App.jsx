import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Cpu, 
  Database, 
  ExternalLink, 
  Terminal,
  ChevronDown,
  MapPin,
  Award,
  BookOpen
} from 'lucide-react';
import Starfield from './components/Starfield';

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="app-wrapper">
      <Starfield />
      
      {/* Progress Bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Navbar */}
      <nav className="navbar glass-panel">
        <div className="container nav-content">
          <div className="logo">
            <div className="logo-icon">SM</div>
            <span>Shivangi Manna</span>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
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
          <ChevronDown size={32} />
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
              <Terminal size={120} color="var(--accent-primary)" />
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
              { title: "Languages", icon: <Code2 />, tags: ["Python", "C++", "SQL", "HTML5", "CSS3"] },
              { title: "AI / ML", icon: <Cpu />, tags: ["CNN", "TensorFlow", "Keras", "Transfer Learning", "Scikit-Learn"] },
              { title: "Data & Core", icon: <Database />, tags: ["MySQL", "DBMS", "DSA", "OOPs", "Computer Networks"] },
              { title: "Tools", icon: <Terminal />, tags: ["VS Code", "Git", "Google Cloud", "OpenCV"] }
            ].map((skill, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="skill-card glass-panel"
              >
                <div className="skill-icon">{skill.icon}</div>
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
            <motion.div className="project-card glass-panel">
              <div className="project-header">
                <h3>Skin Disease Detection</h3>
                <ExternalLink size={20} />
              </div>
              <p>CNN-based deep learning model for classifying skin images with 97.6% precision. Implemented Transfer Learning for optimized performance.</p>
              <div className="project-tags">
                <span>TensorFlow</span>
                <span>OpenCV</span>
                <span>Python</span>
              </div>
            </motion.div>
            <motion.div className="project-card glass-panel">
              <div className="project-header">
                <h3>Snap Specs</h3>
                <Github size={20} />
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
                <Mail />
                <span>shivangimanna.99@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/shivangimanna" target="_blank" className="contact-item">
                <Linkedin />
                <span>linkedin.com/in/shivangimanna</span>
              </a>
              <div className="contact-item">
                <MapPin />
                <span>Kanpur, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Built with ❤️ by Shivangi Manna &copy; 2026</p>
      </footer>

      <style jsx="true">{`
        .navbar {
          position: fixed;
          top: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1000px;
          z-index: 1000;
          padding: 1rem 2rem;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 700;
          font-size: 1.2rem;
        }
        .logo-icon {
          width: 35px;
          height: 35px;
          background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.9rem;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition-smooth);
        }
        .nav-links a:hover {
          color: var(--accent-primary);
        }
        .hero {
          text-align: center;
          padding-top: 12rem;
        }
        .hero h1 {
          font-size: 5rem;
          line-height: 1.1;
          margin: 1.5rem 0;
        }
        .hero h1 span {
          background: linear-gradient(to right, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero p {
          max-width: 600px;
          margin: 0 auto 3rem;
          font-size: 1.2rem;
          color: var(--text-muted);
        }
        .badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: rgba(0, 210, 255, 0.1);
          color: var(--accent-primary);
          border-radius: 50px;
          border: 1px solid rgba(0, 210, 255, 0.2);
          font-weight: 600;
        }
        .cta-group {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }
        .btn {
          padding: 1rem 2.5rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          transition: var(--transition-smooth);
        }
        .btn-primary {
          background: var(--accent-primary);
          color: black;
        }
        .btn-secondary {
          border: 1px solid var(--border-glass);
          color: white;
        }
        .btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
        }
        .about-text, .about-visual {
          padding: 3rem;
        }
        .about-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .visual-glow {
          position: absolute;
          width: 200px;
          height: 200px;
          background: var(--accent-primary);
          filter: blur(80px);
          opacity: 0.2;
          z-index: -1;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }
        .stat-item h3 {
          font-size: 2rem;
          color: var(--accent-primary);
        }
        .stat-item span {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .skill-card {
          padding: 2.5rem;
          text-align: center;
        }
        .skill-icon {
          margin-bottom: 1.5rem;
          color: var(--accent-secondary);
        }
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .skill-tags span {
          padding: 0.3rem 0.8rem;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
          font-size: 0.8rem;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
        }
        .project-card {
          padding: 2.5rem;
        }
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .project-tags {
          display: flex;
          gap: 0.8rem;
          margin-top: 1.5rem;
        }
        .project-tags span {
          color: var(--accent-primary);
          font-size: 0.8rem;
          font-weight: 600;
        }
        .contact-card {
          text-align: center;
          padding: 5rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 3rem;
          align-items: center;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          color: white;
          font-size: 1.1rem;
          transition: var(--transition-smooth);
        }
        .contact-item:hover {
          color: var(--accent-primary);
          transform: translateX(10px);
        }
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--accent-primary);
          transform-origin: 0%;
          z-index: 1001;
        }
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
          color: var(--text-muted);
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
          40% {transform: translateY(-10px) translateX(-50%);}
          60% {transform: translateY(-5px) translateX(-50%);}
        }
        footer {
          text-align: center;
          padding: 4rem 0;
          color: var(--text-muted);
          border-top: 1px solid var(--border-glass);
        }
        @media (max-width: 768px) {
          .hero h1 { font-size: 3rem; }
          .about-grid { grid-template-columns: 1fr; }
          .hero-content { padding: 0 1rem; }
        }
      `}</style>
    </div>
  );
};

export default App;
