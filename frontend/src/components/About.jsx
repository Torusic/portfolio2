
import React, { useEffect, useState } from "react";
import { portfolioAPI } from "../services/api";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiDownload,
  FiArrowUpRight,
  FiUser,
  FiCode,
} from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function About() {
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

  const initials =
    profile?.name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "SM";

  if (loading) {
    return (
      <section
        id="about"
        className="min-h-[60vh] flex items-center justify-center bg-slate-900"
      >
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <AiOutlineLoading3Quarters
            size={28}
            className="animate-spin text-green-400"
          />
          <span className="text-sm">Loading profile...</span>
        </div>
      </section>
    );
  }

  const contactItems = [
    {
      label: "Email",
      value: profile?.email,
      icon: FiMail,
      href: profile?.email
        ? `mailto:${profile.email}`
        : undefined,
    },
    {
      label: "Phone",
      value: profile?.phone,
      icon: FiPhone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : undefined,
    },
    {
      label: "Location",
      value: profile?.location,
      icon: FiMapPin,
      href: profile?.location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            profile.location
          )}`
        : undefined,
    },
  ].filter((item) => item.value);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-900 py-24 sm:py-28"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-green-500/[0.07] blur-[100px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
            <FiUser size={14} />
            Get to know me
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            About <span className="text-gradient">Me</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
            A little about my background, what I do, and the kind
            of solutions I enjoy building.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Profile panel */}
          <div className="mx-auto w-full max-w-md">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-green-500/15 via-transparent to-emerald-400/10 blur-xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-3 shadow-2xl shadow-black/20">
                <div className="relative aspect-[4/4.3] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950">
                  {profile?.profile_image ? (
                    <img
                      src={profile.profile_image}
                      alt={`${profile?.name || "Profile"} portrait`}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center">
                      <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-green-400/30 bg-green-400/10 text-5xl font-bold text-green-300 shadow-xl shadow-green-950/30">
                        {initials}
                      </div>

                      <p className="mt-5 text-sm text-gray-500">
                        {profile?.name || "Developer"}
                      </p>
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-6 pt-20">
                    <p className="text-xl font-bold text-white sm:text-2xl">
                      {profile?.name || "Your Name"}
                    </p>

                    <p className="mt-2 text-sm text-green-300">
                      {profile?.title || "Full-Stack Developer"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-400/20 bg-green-400/10 text-green-400">
                    <FiCode size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Development mindset
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Learning, building, and solving real problems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 top-8 hidden rounded-xl border border-white/10 bg-slate-900 p-3 text-green-400 shadow-xl sm:block">
                <FiCode size={22} />
              </div>
            </div>
          </div>

          {/* Biography and contact */}
          <div className="animate-slide-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
              My introduction
            </p>

            <h3 className="mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl">
              Building useful digital experiences through code.
            </h3>

            <div className="mt-6">
              <p className="whitespace-pre-line text-base leading-8 text-gray-400 sm:text-lg">
                {profile?.bio ||
                  "I'm a software developer passionate about building practical web applications, reliable backend systems, and user-focused digital solutions."}
              </p>
            </div>

            {/* Contact information */}
            {contactItems.length > 0 && (
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {contactItems.map(
                  ({ label, value, icon: Icon, href }) => {
                    const content = (
                      <>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-green-400/15 bg-green-400/[0.07] text-green-400 transition-colors group-hover:bg-green-400/15">
                          <Icon size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-gray-500">
                            {label}
                          </p>
                          <p className="mt-1 break-words text-sm font-medium text-gray-200 transition-colors group-hover:text-green-300">
                            {value}
                          </p>
                        </div>

                        {label === "Location" && (
                          <FiArrowUpRight
                            size={16}
                            className="shrink-0 text-gray-500"
                          />
                        )}
                      </>
                    );

                    return href ? (
                      <a
                        key={label}
                        href={href}
                        target={
                          label === "Location" ? "_blank" : undefined
                        }
                        rel={
                          label === "Location"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:border-green-400/25 hover:bg-white/[0.04]"
                      >
                        {content}
                      </a>
                    ) : (
                      <div
                        key={label}
                        className="flex min-w-0 items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
                      >
                        {content}
                      </div>
                    );
                  }
                )}
              </div>
            )}

            {/* Resume and contact actions */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              {profile?.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-green-500 px-6 py-4 font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/20"
                >
                  <FiDownload size={19} />
                  Download Resume
                  <FiArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-4 font-semibold text-white transition-all duration-300 hover:border-green-400/40 hover:bg-green-400/[0.06]"
              >
                Get in Touch
                <FiArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
