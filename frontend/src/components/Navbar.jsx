
import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
  ];

  useEffect(() => {
    let ticking = false;

    const updateNavigation = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);

        const sections = [
          'home',
          'about',
          'skills',
          'projects',
          'experience',
          'contact',
        ];

        let currentSection = 'home';

        for (const id of sections) {
          const section = document.getElementById(id);

          if (section) {
            const rect = section.getBoundingClientRect();

            if (rect.top <= 150) {
              currentSection = id;
            }
          }
        }

        setActiveSection(currentSection);
        ticking = false;
      });
    };

    updateNavigation();

    window.addEventListener('scroll', updateNavigation, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', updateNavigation);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavigation = (href) => {
    setIsOpen(false);
    setActiveSection(href.replace('#', ''));
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-800/80 bg-slate-950/90 shadow-lg shadow-black/10 backdrop-blur-xl'
            : 'border-b border-transparent bg-slate-950/40 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex h-[76px] items-center justify-between">
            {/* Brand */}
            <a
              href="#home"
              onClick={() => handleNavigation('#home')}
              aria-label="Portfolio home"
              className="group flex shrink-0 items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-400/20 bg-green-400/10 text-green-400 transition-all duration-300 group-hover:border-green-400/40 group-hover:bg-green-400/15">
                <Code2 size={21} strokeWidth={2.2} />
              </span>

              <span className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white sm:text-lg">
                  Simon<span className="text-green-400">.</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  Developer Portfolio
                </span>
              </span>
            </a>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavigation(link.href)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors duration-200 lg:px-4 ${
                      isActive
                        ? 'text-green-300'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.name}

                    <span
                      className={`absolute bottom-1 left-3 right-3 h-[2px] origin-center rounded-full bg-green-400 transition-transform duration-200 lg:left-4 lg:right-4 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={() => handleNavigation('#contact')}
                className="group inline-flex items-center gap-2 rounded-xl border border-green-400/30 bg-green-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:border-green-300 hover:bg-green-300 hover:shadow-lg hover:shadow-green-500/10"
              >
                Let's Talk
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsOpen((previous) => !previous)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-200 transition-colors hover:border-green-400/30 hover:text-green-300 md:hidden"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile navigation panel */}
      <div
        id="mobile-navigation"
        className={`fixed inset-x-0 top-[76px] z-40 border-b border-slate-800 bg-slate-950/98 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-3 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="mx-auto max-w-7xl px-5 pb-6 pt-4 sm:px-8">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Navigation
          </p>

          <div className="space-y-1">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.slice(1);

              return (
                <a
                  key={link.name}
                  href={link.href}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => handleNavigation(link.href)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-green-400/15 bg-green-400/[0.07] text-green-300'
                      : 'border-transparent text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                  style={{ transitionDelay: isOpen ? `${index * 25}ms` : '0ms' }}
                >
                  <span>{link.name}</span>

                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  )}
                </a>
              );
            })}
          </div>

          <a
            href="#contact"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => handleNavigation('#contact')}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-green-300"
          >
            Let's Talk
            <ArrowUpRight size={17} />
          </a>

          <p className="mt-5 text-center text-xs text-slate-600">
            Building useful digital experiences.
          </p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
