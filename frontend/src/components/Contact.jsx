
import { useState } from "react";
import { portfolioAPI } from "../services/api";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setFeedback("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.subject.length > 20) {
      nextErrors.subject = "Subject must be 20 characters or fewer.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please enter a message.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setStatus("loading");
    setFeedback("");

    try {
      const response = await portfolioAPI.sendMessage(form)

      setStatus("success");
      setFeedback(
        response?.message || "Your message has been sent successfully."
      );
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      setStatus("error");

      const data = error?.response?.data;

      if (data && typeof data === "object") {
        const fieldErrors = {};
        const knownFields = ["name", "email", "subject", "message"];

        knownFields.forEach((field) => {
          if (data[field]) {
            fieldErrors[field] = Array.isArray(data[field])
              ? data[field][0]
              : data[field];
          }
        });

        if (Object.keys(fieldErrors).length) {
          setErrors(fieldErrors);
          setFeedback("Please check the highlighted fields.");
        } else {
          setFeedback(
            data.detail ||
              data.message ||
              "We couldn't send your message. Please try again."
          );
        }
      } else {
        setFeedback(
          "Unable to reach the server. Check your connection and try again."
        );
      }
    } finally {
      setStatus("idle");
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-slate-950/60 px-4 py-3.5 text-sm text-slate-100
    placeholder:text-slate-500 outline-none transition duration-200
    focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
    ${
      errors[field]
        ? "border-red-500/70"
        : "border-slate-700/80 hover:border-slate-600"
    }`;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-950 px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Contact
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Have a project in mind?
            <span className="mt-2 block text-emerald-400">
              Let's talk.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
            Have an opportunity, an idea, or a project you'd like to discuss?
            Send me a message and I'll get back to you.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-black/20 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact information */}
          <aside className="relative flex flex-col justify-between border-b border-slate-800 bg-slate-900 p-7 sm:p-10 lg:border-b-0 lg:border-r">
            <div>
              <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                Available for opportunities
              </span>

              <h3 className="mt-8 text-2xl font-semibold text-white">
                Let's build something meaningful.
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                I enjoy building practical digital solutions, developing web
                applications, and collaborating with people who have good
                ideas.
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Email
                </p>
                <a
                  href="mailto:smuchuku7@gmail.com"
                  className="mt-2 inline-block break-all text-sm text-slate-200 transition hover:text-emerald-400"
                >
                  smuchuku7@gmail.com
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  GitHub
                </p>
                <a
                  href="https://github.com/Torusic"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm text-slate-200 transition hover:text-emerald-400"
                >
                  github.com/Torusic
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Typical response
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  I'll respond as soon as I can.
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-800 pt-6">
              <p className="text-xs leading-6 text-slate-500">
                Based in Kenya · Open to meaningful collaborations
              </p>
            </div>
          </aside>

          {/* Contact form */}
          <div className="p-6 sm:p-10">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white">
                Send a message
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Fill in the details below and I'll receive your message.
              </p>
            </div>

            {feedback && (
              <div
                role="status"
                aria-live="polite"
                className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
                  status === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/30 bg-red-500/10 text-red-300"
                }`}
              >
                {feedback}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Full name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={200}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={254}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Subject <span className="text-slate-500">(optional)</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  maxLength={20}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={
                    errors.subject ? "subject-error" : undefined
                  }
                  className={inputClass("subject")}
                />
                <div className="mt-2 flex items-center justify-between gap-3">
                  {errors.subject ? (
                    <p id="subject-error" className="text-xs text-red-400">
                      {errors.subject}
                    </p>
                  ) : (
                    <span className="text-xs text-slate-500">
                      Keep it short and clear.
                    </span>
                  )}
                  <span className="shrink-0 text-xs text-slate-500">
                    {form.subject.length}/20
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Message <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me a little about your project or enquiry..."
                  rows={6}
                  maxLength={5000}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={`${inputClass("message")} min-h-40 resize-y`}
                />
                <div className="mt-2 flex items-center justify-between gap-3">
                  {errors.message ? (
                    <p id="message-error" className="text-xs text-red-400">
                      {errors.message}
                    </p>
                  ) : (
                    <span className="text-xs text-slate-500">
                      Share the details that matter.
                    </span>
                  )}
                  <span className="shrink-0 text-xs text-slate-500">
                    {form.message.length}/5000
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 px-6 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
              >
                {status === "loading" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                    Sending message...
                  </>
                ) : (
                  <>
                    Send message
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>

              <p className="text-xs leading-5 text-slate-500">
                Your details will be used to respond to your enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
