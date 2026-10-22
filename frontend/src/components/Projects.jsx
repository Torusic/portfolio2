
import React, { useEffect, useState } from 'react';
import { portfolioAPI } from '../services/api';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
  FiX,
  FiGithub,
  FiExternalLink,
  FiArrowUpRight,
  FiLayers,
  FiCode,
  FiRefreshCw,
  FiFolder,
} from 'react-icons/fi';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await portfolioAPI.getProjects();

        if (mounted) {
          setProjects(
            Array.isArray(response.data) ? response.data : []
          );
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);

        if (mounted) {
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const getTechnologies = (technologies) => {
    if (Array.isArray(technologies)) {
      return technologies.filter(Boolean);
    }

    if (typeof technologies === 'string') {
      return technologies
        .split(',')
        .map((technology) => technology.trim())
        .filter(Boolean);
    }

    return [];
  };

  if (loading) {
    return (
      <section
        id="projects"
        className="flex min-h-[60vh] items-center justify-center bg-slate-950 px-5"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/[0.08]">
            <AiOutlineLoading3Quarters
              size={24}
              className="animate-spin text-green-400"
            />
          </div>

          <p className="text-sm font-medium text-slate-400">
            Loading selected projects...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-slate-950 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-green-500/[0.05] blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-emerald-500/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-green-300">
            <FiLayers size={13} />
            Selected work
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Projects built with{' '}
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              purpose
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            A selection of applications and systems showcasing my
            approach to solving problems through thoughtful design,
            reliable backends, and practical technology.
          </p>

          <div className="mx-auto mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-600" />
        </div>

        {/* Project summary */}
        {!error && projects.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-400/10 text-green-400">
                <FiFolder size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Project portfolio
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Applications, platforms and development work
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-2">
              <span className="text-lg font-bold text-green-300">
                {String(projects.length).padStart(2, '0')}
              </span>
              <span className="ml-2 text-xs text-slate-400">
                {projects.length === 1 ? 'Project' : 'Projects'}
              </span>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mx-auto max-w-xl rounded-2xl border border-red-400/20 bg-red-400/[0.04] p-8 text-center">
            <h3 className="font-semibold text-white">
              Projects could not be loaded
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              There was a problem connecting to the portfolio API.
              Please try again.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-green-300"
            >
              <FiRefreshCw size={15} />
              Try again
            </button>
          </div>
        )}

        {/* Projects grid */}
        {!error && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {projects.map((project, index) => {
              const technologies = getTechnologies(
                project.technologies
              );

              return (
                <button
                  key={project.id ?? `${project.title}-${index}`}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View details for ${project.title}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 text-left shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-slate-900 hover:shadow-xl hover:shadow-green-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  style={{
                    animation: 'projectFadeIn 0.5s ease-out both',
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  {/* Project image */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-800 to-slate-900">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/[0.07] text-green-300 transition-transform duration-300 group-hover:scale-105">
                          <FiCode size={34} />
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/10" />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                        Project {String(index + 1).padStart(2, '0')}
                      </span>

                      {project.featured && (
                        <span className="rounded-full border border-green-300/25 bg-slate-950/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-green-300 backdrop-blur-md">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project information */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-green-300 sm:text-xl">
                        {project.title}
                      </h3>

                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-all group-hover:border-green-400/30 group-hover:bg-green-400/10 group-hover:text-green-300">
                        <FiArrowUpRight size={17} />
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">
                      {project.description ||
                        'Explore the details of this project and the technologies behind it.'}
                    </p>

                    {/* Technology previews */}
                    {technologies.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {technologies.slice(0, 3).map((technology, techIndex) => (
                          <span
                            key={`${technology}-${techIndex}`}
                            className="rounded-lg border border-slate-700/80 bg-slate-800/70 px-2.5 py-1.5 text-[11px] font-medium text-slate-300"
                          >
                            {technology}
                          </span>
                        ))}

                        {technologies.length > 3 && (
                          <span className="rounded-lg border border-slate-700/80 bg-slate-800/70 px-2.5 py-1.5 text-[11px] font-medium text-slate-400">
                            +{technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
                      <span className="text-xs font-medium text-slate-500 transition-colors group-hover:text-green-300">
                        Explore project
                      </span>

                      <FiArrowUpRight
                        size={15}
                        className="text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-300"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!error && projects.length === 0 && (
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-green-400">
              <FiFolder size={23} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              Projects coming soon
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
              New projects will appear here as they are added to the
              portfolio.
            </p>
          </div>
        )}
      </div>

      {/* Project details modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-3 backdrop-blur-md sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="hide-scrollbar relative max-h-[92vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl shadow-black/40 sm:rounded-3xl"
          >
            {/* Modal header image */}
            <div className="relative overflow-hidden border-b border-slate-800 bg-slate-800">
              {selectedProject.image ? (
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.title} preview`}
                  className="max-h-[360px] min-h-40 w-full object-cover"
                />
              ) : (
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 sm:h-56">
                  <FiCode size={48} className="text-green-400" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-950/30" />

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-950/75 text-white backdrop-blur-md transition hover:border-red-400/30 hover:bg-red-500/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              >
                <FiX size={20} />
              </button>

              {selectedProject.featured && (
                <span className="absolute bottom-4 left-5 rounded-full border border-green-300/20 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-green-300 backdrop-blur-md sm:left-8">
                  Featured project
                </span>
              )}
            </div>

            {/* Modal content */}
            <div className="p-5 sm:p-8 md:p-9">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
                Project overview
              </p>

              <h2
                id="project-modal-title"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                {selectedProject.title}
              </h2>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-white">
                  About this project
                </h3>

                <p className="mt-3 whitespace-pre-line break-words text-sm leading-7 text-slate-300 sm:text-base">
                  {selectedProject.description ||
                    'No project description has been provided yet.'}
                </p>
              </div>

              {/* Technologies */}
              {getTechnologies(selectedProject.technologies).length > 0 && (
                <div className="mt-8">
                  <div className="mb-3 flex items-center gap-2">
                    <FiLayers className="text-green-400" size={16} />
                    <h3 className="text-sm font-semibold text-white">
                      Technologies used
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {getTechnologies(selectedProject.technologies).map(
                      (technology, index) => (
                        <span
                          key={`${technology}-${index}`}
                          className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-200 sm:text-sm"
                        >
                          {technology}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Project links */}
              {(selectedProject.github_url || selectedProject.live_url) && (
                <div className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row">
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3.5 text-sm font-semibold text-white transition hover:border-slate-600 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                    >
                      <FiGithub size={18} />
                      View source code
                      <FiArrowUpRight size={15} />
                    </a>
                  )}

                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                      <FiExternalLink size={17} />
                      View live project
                      <FiArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes projectFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
          .hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Projects;
