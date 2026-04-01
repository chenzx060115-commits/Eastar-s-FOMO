import { useEffect, useState } from 'react';
import { ChevronDown, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useI18n } from '@/contexts/I18nContext';

/**
 * Cyberpunk Portfolio - Deep Dark Mode with Neon Purple Breathing Light
 * Design Philosophy: Apple minimalism + Cyberpunk aesthetics
 * Key Features: Glassmorphism, parallax scrolling, breathing light effects, Bento Box layout
 * Multi-language Support: Simplified Chinese, Traditional Chinese, English
 */

// Hero Background Image URL
const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663497771658/4y6MDy4t78pf3bg2RWQWqW/hero-background-ToHgsnBpMReodfbV9CpgYp.webp';

export default function Home() {
  const { t } = useI18n();
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
          <div className="text-xl font-bold glow-text">Eastar</div>
          <div className="flex gap-6 items-center">
            <a href="#about" className="text-sm hover:text-primary transition">
              {t('nav.about')}
            </a>
            <a href="#experience" className="text-sm hover:text-primary transition">
              {t('nav.experience')}
            </a>
            <a href="#projects" className="text-sm hover:text-primary transition">
              {t('nav.projects')}
            </a>
            <a href="#contact" className="text-sm hover:text-primary transition">
              {t('nav.contact')}
            </a>
            <LanguageSwitcher />
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
          <h1 className="text-6xl md:text-7xl font-bold mb-6 glow-text">{t('hero.name')}</h1>
          <p className="text-xl md:text-2xl text-secondary-foreground mb-8">{t('hero.title')}</p>
          <div className="flex gap-4 justify-center">
            <Button
              className="bg-primary hover:bg-primary/80 text-primary-foreground breathing-border"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta1')}
            </Button>
            <Button
              variant="outline"
              className="border-primary/50 hover:border-primary breathing-border"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta2')}
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
              isVisible('about-content') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-8 glow-text">{t('about.title')}</h2>
            <div className="card-glass p-8 rounded-2xl">
              <p className="text-lg text-secondary-foreground leading-relaxed mb-6">{t('about.description1')}</p>
              <p className="text-lg text-secondary-foreground leading-relaxed">{t('about.description2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 glow-text">{t('experience.title')}</h2>
          <div className="grid gap-8 max-w-4xl">
            {((t('experience.items') as unknown) as any[]).map((exp: any, idx: number) => (
              <div
                key={idx}
                data-animate
                id={`exp-${idx}`}
                className={`card-glass p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 transform ${
                  isVisible(`exp-${idx}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
          <h2 className="text-4xl font-bold mb-16 glow-text">{t('education.title')}</h2>
          <div className="grid gap-8 max-w-4xl">
            {((t('education.items') as unknown) as any[]).map((edu: any, idx: number) => (
              <div
                key={idx}
                data-animate
                id={`edu-${idx}`}
                className={`card-glass p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 transform ${
                  isVisible(`edu-${idx}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
          <h2 className="text-4xl font-bold mb-16 glow-text">{t('skills.title')}</h2>
          <div
            data-animate
            id="skills-content"
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible('skills-content') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {((t('skills.categories') as unknown) as any[]).map((skillGroup: any, idx: number) => (
                <div
                  key={idx}
                  className="card-glass p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <h3 className="text-xl font-bold text-primary mb-4">{skillGroup.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill: string) => (
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
          <h2 className="text-4xl font-bold mb-16 glow-text">{t('projects.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Large Project Card */}
            <div
              data-animate
              id="project-featured"
              className={`lg:col-span-2 lg:row-span-2 card-glass p-8 rounded-2xl border border-border hover:border-primary/50 breathing-border transition-all duration-500 group cursor-pointer ${
                isVisible('project-featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-4">
                    {(t('projects.featured') as any).title}
                  </h3>
                  <p className="text-secondary-foreground mb-6 text-lg">
                    {(t('projects.featured') as any).description}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {((t('projects.featured') as any).skills as string[]).map((skill) => (
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
            {((t('projects.items') as unknown) as any[]).map((project: any, idx: number) => (
              <div
                key={idx}
                data-animate
                id={`project-${idx}`}
                className={`card-glass p-6 rounded-2xl border border-border hover:border-primary/50 breathing-border transition-all duration-500 group cursor-pointer ${
                  isVisible(`project-${idx}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-xl font-bold text-primary mb-3">{project.title}</h3>
                <p className="text-secondary-foreground mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech: string) => (
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
              isVisible('contact-content') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-8 glow-text">{t('contact.title')}</h2>
            <p className="text-xl text-secondary-foreground mb-12">{t('contact.description')}</p>
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
              {t('contact.cta')}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border text-center text-secondary-foreground">
        <p>{t('footer.copyright')}</p>
      </footer>
    </div>
  );
}
