import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Code2, Cpu, Database, Users, ChevronDown, Download, Terminal } from 'lucide-react';
import Starfield from './components/Starfield';
import './index.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 backdrop-blur-md bg-black/50 border-b border-white/5' : 'py-6'}`}>
      <div className="container flex justify-between items-center">
        <a href="#" className="text-2xl font-bold flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xl">SM</span>
          </div>
          <span className="hidden sm:block">Shivangi Manna</span>
        </a>
        <div className="flex gap-8 text-sm font-medium">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const GlassCard = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`glass-panel p-8 ${className}`}
  >
    {children}
  </motion.div>
);

const Hero = () => (
  <section id="hero" className="relative overflow-hidden">
    <div className="container relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
          Available for Full-time Roles (2026)
        </span>
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
          Hi, I'm <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Shivangi Manna
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          A final-year B.Tech student in Computer Science (AI & ML) with a passion for building intelligent systems and solving complex problems through code.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#projects" className="px-8 py-4 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2">
            <Terminal size={20} /> View Projects
          </a>
          <a href="#contact" className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2">
            Contact Me
          </a>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="text-gray-500" />
      </motion.div>
    </div>
  </section>
);

const Skills = () => {
  const skills = [
    { title: 'Languages', icon: <Code2 className="text-cyan-400" />, items: ['Python', 'C++', 'SQL', 'HTML5', 'CSS3'] },
    { title: 'ML / DL', icon: <Cpu className="text-purple-400" />, items: ['CNN', 'TensorFlow', 'Keras', 'Supervised Learning', 'Transfer Learning'] },
    { title: 'Databases & Core', icon: <Database className="text-blue-400" />, items: ['MySQL', 'DBMS', 'DSA', 'OOPs', 'Computer Networks'] },
    { title: 'Soft Skills', icon: <Users className="text-pink-400" />, items: ['Communication', 'Time Management', 'Teamwork', 'Problem Solving'] }
  ];

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Technical Arsenal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, idx) => (
            <GlassCard key={idx} delay={idx * 0.1}>
              <div className="mb-4">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-4">{skill.title}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map(item => (
                  <span key={item} className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-sm text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Skin Disease Detection using CNN',
      desc: 'Developed a deep learning model to classify skin disease images with 97.6% precision using Transfer Learning.',
      tech: ['Python', 'TensorFlow', 'OpenCV'],
      link: '#'
    },
    {
      title: 'Snap Specs — Image Identifier',
      desc: 'A web-based visual search tool that identifies similar objects from databases using CV techniques.',
      tech: ['HTML5', 'CSS3', 'JS'],
      link: '#'
    }
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <GlassCard key={idx} delay={idx * 0.2}>
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-gray-400 mb-6">{project.desc}</p>
              <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-mono text-purple-400 bg-purple-400/5 px-2 py-1 rounded">{t}</span>
                  ))}
                </div>
                <a href={project.link} className="text-gray-500 hover:text-white transition-colors">
                  <ExternalLink size={20} />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact">
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <GlassCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
              <p className="text-gray-400 mb-8">
                I am actively seeking full-time opportunities starting in 2026. My inbox is always open!
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Mail />, text: 'shivangimanna.99@gmail.com', link: 'mailto:shivangimanna.99@gmail.com' },
                  { icon: <Linkedin />, text: 'linkedin.com/in/shivangimanna', link: 'https://linkedin.com/in/shivangimanna' },
                  { icon: <MapPin />, text: 'Kanpur, India', link: '#' }
                ].map((item, idx) => (
                  <a key={idx} href={item.link} className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/20">
                    <div className="text-cyan-400">{item.icon}</div>
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
            </div>
            <form className="space-y-4">
              <input type="text" placeholder="Name" className="w-full p-4 rounded-xl bg-black/30 border border-white/5 focus:border-cyan-400 outline-none transition-all" />
              <input type="email" placeholder="Email" className="w-full p-4 rounded-xl bg-black/30 border border-white/5 focus:border-cyan-400 outline-none transition-all" />
              <textarea placeholder="Message" rows="5" className="w-full p-4 rounded-xl bg-black/30 border border-white/5 focus:border-cyan-400 outline-none transition-all"></textarea>
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold hover:shadow-lg transition-all active:scale-95">
                Send Message
              </button>
            </form>
          </div>
        </GlassCard>
      </div>
    </div>
  </section>
);

const App = () => {
  return (
    <div className="relative">
      <Starfield />
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <footer className="py-10 text-center text-gray-500 text-sm border-t border-white/5 bg-black/30 backdrop-blur-sm">
        <p>&copy; 2026 Designed & Built with ❤️ by Shivangi Manna</p>
      </footer>
    </div>
  );
};

export default App;
