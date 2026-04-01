import { useEffect, useState } from 'react';
import { ChevronDown, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Cyberpunk Portfolio - Deep Dark Mode with Neon Purple Breathing Light
 * Design Philosophy: Apple minimalism + Cyberpunk aesthetics
 * Key Features: Glassmorphism, parallax scrolling, breathing light effects, Bento Box layout
 */

// Hero Background Image URL
const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663497771658/4y6MDy4t78pf3bg2RWQWqW/hero-background-ToHgsnBpMReodfbV9CpgYp.webp';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold glow-text">CZX</div>
          <div className="flex gap-6">
            <a href="#about" className="text-sm hover:text-primary transition">About</a>
            <a href="#experience" className="text-sm hover:text-primary transition">Experience</a>
            <a href="#projects" className="text-sm hover:text-primary transition">Projects</a>
            <a href="#contact" className="text-sm hover:text-primary transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background"></div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 glow-text">
            Chen Zexing
          </h1>
          <p className="text-xl md:text-2xl text-secondary-foreground mb-8">
            Student | Sales Professional | Organizer & Leader
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              className="bg-primary hover:bg-primary/80 text-primary-foreground breathing-border"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore My Work
            </Button>
            <Button
              variant="outline"
              className="border-primary/50 hover:border-primary breathing-border"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-primary" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div
            data-animate
            id="about-content"
            className={`max-w-3xl mx-auto transition-all duration-1000 ${
              isVisible('about-content')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-8 glow-text">About Me</h2>
            <div className="card-glass p-8 rounded-2xl">
              <p className="text-lg text-secondary-foreground leading-relaxed mb-6">
                I'm a student at Shenzhen University's School of Communication, with a passion for organization, leadership, and interpersonal communication. 
                With experience in sales and team coordination, I excel at building meaningful connections and driving collaborative success.
              </p>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                My journey has been shaped by a commitment to continuous growth, strong coordination abilities, and a genuine passion for bringing people together. 
                I thrive in dynamic environments where collaboration and communication create lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 glow-text">Experience</h2>
          <div className="grid gap-8 max-w-4xl">
            {[
              {
                id: 'exp-1',
                company: 'International Sales Company',
                position: 'Sales Representative',
                period: '2023 - Present',
                description: 'Gained comprehensive understanding of basic business operations and sales models. Developed strong client relationship management and negotiation skills.',
              },
              {
                id: 'exp-2',
                company: 'Class Leadership',
                position: 'Class Monitor (Multiple Years)',
                period: '2015 - 2023',
                description: 'Served as class monitor for several years, developing strong coordination and organizational skills. Managed class affairs and fostered team cohesion.',
              },
              {
                id: 'exp-3',
                company: 'Shenzhen University',
                position: 'Organization Department Member',
                period: '2024 - Present',
                description: 'Member of the Organization Department in the School of Communication. Contributing to event planning and organizational initiatives.',
              },
            ].map((exp, idx) => (
              <div
                key={exp.id}
                data-animate
                id={exp.id}
                className={`card-glass p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 transform ${
                  isVisible(exp.id)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{exp.position}</h3>
                    <p className="text-secondary-foreground">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-secondary-foreground">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 glow-text">Education</h2>
          <div className="grid gap-8 max-w-4xl">
            {[
              {
                id: 'edu-1',
                school: 'Shenzhen University',
                degree: 'Bachelor of Communication',
                year: '2024 - Present',
                description: 'Currently studying at the School of Communication. Member of the Organization Department in the School of Communication.',
              },
              {
                id: 'edu-2',
                school: 'Luohu High School, Shenzhen',
                degree: 'High School Diploma',
                year: '2006 - 2024',
                description: 'Graduated with top 5% ranking in the entire grade. Received District Outstanding Student Award and School Outstanding Student Award.',
              }
            ].map((edu, idx) => (
              <div
                key={edu.id}
                data-animate
                id={edu.id}
                className={`card-glass p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 transform ${
                  isVisible(edu.id)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{edu.degree}</h3>
                    <p className="text-secondary-foreground">{edu.school}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{edu.year}</span>
                </div>
                <p className="text-secondary-foreground">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 glow-text">Skills & Expertise</h2>
          <div
            data-animate
            id="skills-content"
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible('skills-content')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  category: 'Office & Design',
                  skills: ['Microsoft Office', 'Photoshop', 'Video Editing', 'Presentation Skills'],
                },
                {
                  category: 'Core Competencies',
                  skills: ['Leadership', 'Team Coordination', 'Communication', 'Organization'],
                },
                {
                  category: 'Professional Experience',
                  skills: ['Sales', 'Business Operations', 'Client Relations', 'Negotiation'],
                },
                {
                  category: 'Volunteer & Social',
                  skills: ['Volunteer Work (100+ Hours)', 'Event Organization', 'Community Engagement'],
                },
              ].map((skillGroup, idx) => (
                <div
                  key={idx}
                  className="card-glass p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <h3 className="text-xl font-bold text-primary mb-4">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/30 hover:border-primary/60 transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Bento Box Layout */}
      <section id="projects" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 glow-text">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Large Project Card */}
            <div
              data-animate
              id="project-1"
              className={`lg:col-span-2 lg:row-span-2 card-glass p-8 rounded-2xl border border-border hover:border-primary/50 breathing-border transition-all duration-500 group cursor-pointer ${
                isVisible('project-1')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-4">Leadership & Organization</h3>
                  <p className="text-secondary-foreground mb-6 text-lg">
                    Multi-year experience as class monitor with strong coordination and organizational abilities. Demonstrated excellence in team management, event coordination, and fostering collaborative environments. Currently contributing to organizational initiatives at Shenzhen University.
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Team Leadership', 'Organization', 'Coordination', 'Communication'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/80 group-hover:gap-2 flex items-center justify-center">
                    Learn More <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Medium Project Cards */}
            {[
              {
                id: 'project-2',
                title: 'Sales Experience',
                description: 'Comprehensive understanding of business operations and sales models from international company.',
                tech: ['Sales', 'Business', 'Operations'],
              },
              {
                id: 'project-3',
                title: 'Volunteer Work',
                description: 'Over 100 hours of volunteer service demonstrating commitment to community engagement.',
                tech: ['Community', 'Service', 'Engagement'],
              },
              {
                id: 'project-4',
                title: 'Academic Excellence',
                description: 'Top 5% ranking in entire grade with multiple academic and leadership awards.',
                tech: ['Excellence', 'Achievement', 'Recognition'],
              },
              {
                id: 'project-5',
                title: 'Communication Skills',
                description: 'Strong interpersonal communication and negotiation abilities developed through diverse experiences.',
                tech: ['Communication', 'Negotiation', 'Relations'],
              },
            ].map((project, idx) => (
              <div
                key={project.id}
                data-animate
                id={project.id}
                className={`card-glass p-6 rounded-2xl border border-border hover:border-primary/50 breathing-border transition-all duration-500 group cursor-pointer ${
                  isVisible(project.id)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-xl font-bold text-primary mb-3">{project.title}</h3>
                <p className="text-secondary-foreground mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <Button variant="ghost" className="w-full text-primary hover:bg-primary/10 group-hover:gap-2 flex items-center justify-center">
                  Learn More <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div
            data-animate
            id="contact-content"
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
              isVisible('contact-content')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-8 glow-text">Let's Connect</h2>
            <p className="text-xl text-secondary-foreground mb-12">
              I'm always interested in connecting with like-minded individuals and exploring new opportunities for collaboration and growth.
            </p>
            <div className="flex gap-6 justify-center mb-12">
              <a href="mailto:CZX_060115@QQ.COM" className="card-glass p-4 rounded-full hover:border-primary/50 transition">
                <Mail className="w-6 h-6 text-primary" />
              </a>
              <a href="#" className="card-glass p-4 rounded-full hover:border-primary/50 transition">
                <Github className="w-6 h-6 text-primary" />
              </a>
              <a href="#" className="card-glass p-4 rounded-full hover:border-primary/50 transition">
                <Linkedin className="w-6 h-6 text-primary" />
              </a>
            </div>
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-6 text-lg breathing-border">
              Send Me an Email
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border text-center text-secondary-foreground">
        <p>&copy; 2024 Chen Zexing Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}
