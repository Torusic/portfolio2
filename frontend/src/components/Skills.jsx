
import React, { useEffect, useState } from "react";
import { portfolioAPI } from "../services/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FiCode,
  FiDatabase,
  FiLayers,
  FiServer,
  FiTool,
  FiCpu,
  FiArrowUpRight,
} from "react-icons/fi";

const categoryIcons = [
  FiCode,
  FiServer,
  FiDatabase,
  FiLayers,
  FiTool,
  FiCpu,
];

function Skills() {
  const [skillByCategory, setSkillByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchSkills = async () => {
      try {
        const response = await portfolioAPI.getSkillsByCategory();

        if (active) {
          setSkillByCategory(response.data || {});
          setError(false);
        }
      } catch (err) {
        console.error("Error fetching skills:", err);

        if (active) {
          setError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchSkills();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <section
        id="skills"
        className="min-h-[60vh] flex items-center justify-center bg-slate-950"
      >
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <AiOutlineLoading3Quarters
            size={30}
            className="animate-spin text-green-400"
          />
          <p className="text-sm">Loading technical skills...</p>
        </div>
      </section>
    );
  }

  const categories = Object.entries(skillByCategory).filter(
    ([, skills]) => Array.isArray(skills) && skills.length > 0
  );

  const totalSkills = categories.reduce(
    (total, [, skills]) => total + skills.length,
    0
  );

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-slate-950 py-24 sm:py-28"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-green-500/[0.07] blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
            <FiCode size={14} />
            Technical expertise
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            My <span className="text-gradient">Skills</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Technologies and tools I use to build web applications,
            develop backend systems, manage data, and solve practical
            software engineering problems.
          </p>
        </div>

        {/* Overview */}
        {!error && categories.length > 0 && (
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 text-center">
              <p className="text-3xl font-bold text-white">
                {categories.length}
              </p>
              <p className="mt-2 text-xs font-medium text-gray-500 sm:text-sm">
                Skill categories
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 text-center">
              <p className="text-3xl font-bold text-green-400">
                {totalSkills}
              </p>
              <p className="mt-2 text-xs font-medium text-gray-500 sm:text-sm">
                Technologies & skills
              </p>
            </div>

            <div className="col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 text-center sm:col-span-1">
              <p className="text-3xl font-bold text-white">
                <FiLayers className="mx-auto text-green-400" size={30} />
              </p>
              <p className="mt-2 text-xs font-medium text-gray-500 sm:text-sm">
                Full-stack development
              </p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-center">
            <p className="font-semibold text-white">
              Unable to load skills
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Please try refreshing the page.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-green-400"
            >
              Retry
            </button>
          </div>
        )}

        {/* Skill categories */}
        {!error && categories.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(([category, skills], index) => {
              const CategoryIcon =
                categoryIcons[index % categoryIcons.length];

              return (
                <article
                  key={category}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/25 hover:bg-slate-900 hover:shadow-xl hover:shadow-green-950/20 sm:p-7"
                >
                  {/* Subtle top accent */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Category heading */}
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-green-400/15 bg-green-400/[0.07] text-green-400 transition-colors duration-300 group-hover:bg-green-400/15">
                        <CategoryIcon size={22} />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold leading-snug text-white">
                          {category}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {skills.length}{" "}
                          {skills.length === 1 ? "skill" : "skills"}
                        </p>
                      </div>
                    </div>

                    <FiArrowUpRight
                      size={18}
                      className="shrink-0 text-gray-600 transition-colors group-hover:text-green-400"
                    />
                  </div>

                  {/* Individual skills */}
                  <div className="space-y-6">
                    {skills.map((skill) => {
                      const proficiency = Math.min(
                        100,
                        Math.max(
                          0,
                          Number(skill.proficiency) || 0
                        )
                      );

                      return (
                        <div key={skill.id}>
                          <div className="mb-2.5 flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-gray-300">
                              {skill.name}
                            </span>

                            <span className="shrink-0 font-mono text-xs text-gray-500">
                              {proficiency}%
                            </span>
                          </div>

                          <div
                            className="h-1.5 overflow-hidden rounded-full bg-slate-800"
                            role="progressbar"
                            aria-label={`${skill.name} proficiency`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={proficiency}
                          >
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-300 transition-[width] duration-1000 ease-out"
                              style={{ width: `${proficiency}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!error && categories.length === 0 && (
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-12 text-center">
            <FiCode className="mx-auto text-green-400" size={32} />
            <h3 className="mt-4 text-lg font-semibold text-white">
              Skills coming soon
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Technical skills will appear here once they are available.
            </p>
          </div>
        )}

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-sm leading-6 text-gray-500">
            Continuously learning, improving, and exploring better ways
            to build reliable software.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Skills;
