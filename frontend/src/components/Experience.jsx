
import React, { useEffect, useState } from 'react';
import { portfolioAPI } from '../services/api';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBriefcase,
  FaArrowRight,
  FaBuilding,
} from 'react-icons/fa';
import { FiClock, FiRefreshCw } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await portfolioAPI.getExperience();

        if (isMounted) {
          setExperience(
            Array.isArray(response.data) ? response.data : []
          );
        }
      } catch (err) {
        console.error('Failed to fetch experience:', err);

        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchExperience();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return 'N/A';

    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const getDuration = (startDate, endDate, current) => {
    if (!startDate) return '';

    const start = new Date(startDate);
    const end = current ? new Date() : new Date(endDate);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return '';
    }

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() -
      start.getMonth();

    if (months < 0) return '';

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0 && remainingMonths === 0) {
      return 'Less than 1 month';
    }

    const parts = [];

    if (years > 0) {
      parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
    }

    if (remainingMonths > 0) {
      parts.push(
        `${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`
      );
    }

    return parts.join(' ');
  };

  if (loading) {
    return (
      <section
        id="experience"
        className="min-h-[60vh] flex items-center justify-center bg-slate-950 px-6"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/10">
            <AiOutlineLoading3Quarters
              size={25}
              className="animate-spin text-green-400"
            />
          </div>

          <p className="text-sm font-medium text-slate-400">
            Loading professional experience...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-slate-950 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-40 top-32 h-80 w-80 rounded-full bg-green-500/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-emerald-500/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-green-300">
            <FaBriefcase size={12} />
            Career journey
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Work{' '}
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            A look at my professional journey, the teams I have worked
            with, and the experience I continue to build in technology.
          </p>

          <div className="mx-auto mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-600" />
        </div>

        {/* Error state */}
        {error && (
          <div className="mx-auto max-w-xl rounded-2xl border border-red-400/20 bg-red-400/[0.05] p-8 text-center">
            <p className="font-semibold text-white">
              Unable to load experience
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Something went wrong while retrieving your experience.
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

        {/* Experience timeline */}
        {!error && experience.length > 0 && (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute bottom-8 left-[15px] top-8 hidden w-px bg-gradient-to-b from-green-400/70 via-slate-700 to-transparent sm:block md:left-[23px]" />

            <div className="space-y-7 sm:space-y-9">
              {experience.map((exp, index) => (
                <article
                  key={exp.id ?? `${exp.company}-${index}`}
                  className="group relative sm:pl-14 md:pl-16"
                  style={{
                    animation: 'experienceFadeIn 0.5s ease-out both',
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Timeline marker */}
                  <div className="absolute left-[7px] top-8 z-10 hidden h-[17px] w-[17px] items-center justify-center rounded-full border-4 border-slate-950 bg-green-400 shadow-[0_0_16px_rgba(74,222,128,0.3)] sm:flex md:left-[15px]" />

                  <div className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/70 p-5 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/25 hover:bg-slate-900 sm:p-7 md:p-8">
                    {/* Subtle card accent */}
                    <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-green-400/80 via-emerald-500/20 to-transparent opacity-60 transition-opacity group-hover:opacity-100" />

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        {/* Employment status */}
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          {exp.current && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs font-medium text-green-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                              Currently working
                            </span>
                          )}

                          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-xs font-medium text-slate-400">
                            <FaBriefcase size={10} />
                            Experience {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold leading-snug text-white transition-colors group-hover:text-green-300 sm:text-2xl">
                          {exp.position || 'Position not specified'}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-base font-medium text-green-300">
                          <FaBuilding
                            size={13}
                            className="shrink-0 text-green-400/70"
                          />
                          <span>
                            {exp.company || 'Company not specified'}
                          </span>
                        </div>

                        {/* Metadata */}
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt
                              size={13}
                              className="shrink-0 text-green-400/80"
                            />
                            <span>
                              {formatDate(exp.start_date)} –{' '}
                              {exp.current
                                ? 'Present'
                                : formatDate(exp.end_date)}
                            </span>
                          </div>

                          {exp.location && (
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt
                                size={13}
                                className="shrink-0 text-green-400/80"
                              />
                              <span>{exp.location}</span>
                            </div>
                          )}

                          {getDuration(
                            exp.start_date,
                            exp.end_date,
                            exp.current
                          ) && (
                            <div className="flex items-center gap-2">
                              <FiClock
                                size={14}
                                className="shrink-0 text-green-400/80"
                              />
                              <span>
                                {getDuration(
                                  exp.start_date,
                                  exp.end_date,
                                  exp.current
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Company logo */}
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center self-start overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800/80 p-3 transition-colors group-hover:border-green-400/20 sm:h-[76px] sm:w-[76px]">
                        {exp.company_logo ? (
                          <img
                            src={exp.company_logo}
                            alt={`${exp.company || 'Company'} logo`}
                            loading="lazy"
                            className="h-full w-full object-contain"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <FaBuilding
                            size={25}
                            className="text-slate-500"
                          />
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <div className="mt-7 border-t border-slate-800 pt-6">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Overview
                        </p>

                        <p className="whitespace-pre-line break-words text-sm leading-7 text-slate-300 sm:text-[15px]">
                          {exp.description}
                        </p>
                      </div>
                    )}

                    {/* Card footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
                      <span className="text-xs text-slate-500">
                        Professional journey
                      </span>

                      <FaArrowRight
                        size={13}
                        className="text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-400"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!error && experience.length === 0 && (
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800">
              <FaBriefcase size={22} className="text-green-400" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              Experience coming soon
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Professional experience and career milestones will appear
              here as they are added.
            </p>
          </div>
        )}

        {/* Closing note */}
        {!error && experience.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <span className="h-px w-10 bg-slate-700" />
            <p className="text-sm text-slate-500">
              Always learning. Always building. Always improving.
            </p>
            <span className="h-px w-10 bg-slate-700" />
          </div>
        )}
      </div>

      <style>{`
        @keyframes experienceFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          article {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Experience;
