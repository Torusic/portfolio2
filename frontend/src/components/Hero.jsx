
import React, { useEffect, useState } from "react";
import { portfolioAPI } from "../services/api";
import {
  FaChevronDown,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiCode,
  FiMail,
} from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Hero() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchProfile = async () => {
      try {
        const response = await portfolioAPI.getProfile();

        if (active) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-slate-950"
      >
        <div className="flex flex-col items-center gap-4 text-gray-300">
          <AiOutlineLoading3Quarters
            size={30}
            className="animate-spin text-green-400"
          />
          <span className="text-sm tracking-wide">
            Loading portfolio...
          </span>
        </div>
      </section>
    );
  }

  const name = profile?.name || "Simon Njuguna Muchuku";
  const title =
    profile?.title || "Full-Stack Developer";
  const bio =
    profile?.bio ||
    "I build modern web applications, reliable backend systems, and practical digital solutions.";

  const socialLinks = [
    {
      label: "GitHub",
      url: profile?.github,
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      url: profile?.linkedin,
      icon: FaLinkedinIn,
    },
    {
      label: "Twitter",
      url: profile?.twitter,
      icon: FaTwitter,
    },
  ].filter((item) => item.url);

  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-green-500/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-24 pt-28 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Main introduction */}
          <div className="animate-fade-in">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-green-400/20 bg-green-400/5 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>

              <span className="text-xs font-medium tracking-wide text-green-300 sm:text-sm">
                Software Development & Digital Solutions
              </span>
            </div>

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
              Hello, I'm
            </p>

            <h1 className="max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
              {name}
              <span className="mt-2 block bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300 bg-clip-text pb-2 text-transparent">
                {title}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              {bio}
            </p>

            {/* Technology highlights */}
            <div className="mt-7 flex flex-wrap gap-2">
              {["React", "Node.js", "Django REST Framework", "PostgreSQL"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-300 sm:text-sm"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            {/* Calls to action */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-green-500 px-7 py-4 font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/20"
              >
                Explore My Work
                <FiArrowUpRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-white/[0.07]"
              >
                <FiMail size={18} />
                Let's Talk
              </a>
            </div>

            {/* Social links */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                Connect
              </span>

              {socialLinks.map(({ label, url, icon: Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="rounded-lg border border-white/10 p-3 text-gray-400 transition-all duration-300 hover:border-green-400/40 hover:bg-green-400/10 hover:text-green-300"
                >
                  <Icon size={19} />
                </a>
              ))}

              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Send email"
                  title="Email"
                  className="rounded-lg border border-white/10 p-3 text-gray-400 transition-all duration-300 hover:border-green-400/40 hover:bg-green-400/10 hover:text-green-300"
                >
                  <FiMail size={19} />
                </a>
              )}
            </div>
          </div>

          {/* Developer visual */}
          <div className="relative mx-auto  w-full max-w-md lg:block">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-green-500/10 to-transparent blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>

                <span className="text-xs text-gray-500">
                  developer.js
                </span>

                <FiCode className="text-green-400" size={18} />
              </div>

              <div className="space-y-5 p-7 font-mono text-sm sm:p-9">
                <p className="text-gray-500">
                  // Turning ideas into software
                </p>

                <p>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-sky-300">developer</span>{" "}
                  <span className="text-gray-400">= {"{"}</span>
                </p>

                <div className="space-y-4 pl-5">
                  <p>
                    <span className="text-gray-400">name:</span>{" "}
                    <span className="text-green-300">
                      "{name}"
                    </span>
                    <span className="text-gray-400">,</span>
                  </p>

                  <p>
                    <span className="text-gray-400">focus:</span>{" "}
                    <span className="text-green-300">
                      "Full-Stack Development"
                    </span>
                    <span className="text-gray-400">,</span>
                  </p>

                  <p>
                    <span className="text-gray-400">frontend:</span>{" "}
                    <span className="text-yellow-300">"React"</span>
                    <span className="text-gray-400">,</span>
                  </p>

                  <p>
                    <span className="text-gray-400">backend:</span>{" "}
                    <span className="text-yellow-300">
                      "Node.js & DRF"
                    </span>
                    <span className="text-gray-400">,</span>
                  </p>

                  <p>
                    <span className="text-gray-400">database:</span>{" "}
                    <span className="text-yellow-300">
                      "PostgreSQL"
                    </span>
                  </p>
                </div>

                <p className="text-gray-400">{"}"}</p>

                <div className="border-t border-white/10 pt-5">
                  <p className="text-gray-500">
                    // Always learning. Always building.
                  </p>

                  <p className="mt-3">
                    <span className="text-purple-400">return</span>{" "}
                    <span className="text-green-300">
                      "Let's build something useful."
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-6 py-4">
                <span className="text-xs text-gray-500">
                  Open to opportunities
                </span>

                <span className="flex items-center gap-2 text-xs font-medium text-green-300">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Building solutions
                </span>
              </div>
            </div>

            {/* Floating project indicator */}
            <div className="absolute -bottom-7 -left-8 flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 shadow-xl">
              <div className="rounded-lg bg-green-400/10 p-2 text-green-400">
                <FiCode size={21} />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Practical solutions
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  From concept to deployment
                </p>
              </div>
            </div>

            <div className="absolute -right-4 -top-5 rounded-xl border border-green-400/20 bg-slate-900 p-3 text-green-300 shadow-lg">
              <FiArrowDownRight size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-500 transition-colors hover:text-green-300"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
          Scroll to explore
        </span>
        <FaChevronDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}

export default Hero;
