import React, { useState } from "react";

const HeroSection = ({
  onShorten,
  isLoading = false,
  defaultUrl = "",
  error = "",

  className = "",
}) => {
  const [url, setUrl] = useState(defaultUrl);
  const [localError, setLocalError] = useState("");

  const normalizeUrl = (value) => {
    let v = value.trim();
    if (!v) return "";
    // Auto-prepend https:// if protocol is missing
    if (!/^(https?:\/\/|ftp:\/\/|mailto:)/i.test(v)) {
      v = `https://${v}`;
    }
    return v;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    const candidate = normalizeUrl(url);
    if (!candidate) {
      setLocalError("Please paste a URL.");
      return;
    }

    try {
      // Validate URL
      new URL(candidate);
    } catch {
      setLocalError("Please enter a valid URL (e.g., https://example.com).");
      return;
    }

    onShorten?.(candidate);
  };

  return (
    <section
      className={`hero min-h-screen py-24 overflow-hidden ${className}`}
    >
      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
      />

      <div className="hero-content max-w-7xl w-full flex-col lg:flex-row gap-10 px-4">
        {/* Left: Copy + Form */}
        <div className="w-full lg:w-7/12">
          <div className="badge badge-primary badge-outline mb-4">MernLy</div>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Short links, big impact with{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MernLy
            </span>
            .
          </h1>

          <p className="mt-4 text-base-content/70 max-w-2xl">
            A smart, fast, privacy-friendly URL shortener built on the MERN
            stack. Track clicks, manage links, and share with confidence.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="form-control w-full">
              <label className="label" htmlFor="mernly-url-input">
                <span className="label-text mb-2">Paste your long URL</span>

              </label>

              <div className="join w-full flex">
                <input
                  id="mernly-url-input"
                  type="url"
                  className="input input-bordered join-item flex-1 min-w-0"
                  placeholder="https://example.com/my/really/long/link?utm_source=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  aria-label="Long URL"
                  autoComplete="url"
                />
                <button
                  type="submit"
                  className="btn btn-primary join-item shrink-0 whitespace-nowrap"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className="loading loading-spinner loading-sm mr-2" />
                  )}
                  {isLoading ? "Shortening..." : "Shorten URL"}
                </button>
              </div>
              <div className="label text-sm mt-2">
                {(error || localError) && (
                  <span
                    className="label-text-alt text-error"
                    role="alert"
                    aria-live="polite"
                  >
                    {error || localError}
                  </span>
                )}
              </div>
            </div>
          </form>


          {/* Secondary CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-primary" href="#features">
              Explore features
            </a>
            <a className="btn btn-ghost" href="#how-it-works">
              How it works
            </a>
          </div>
        </div>

        {/* Right: Preview Card */}
        <div className="w-full lg:w-5/12">
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="avatar placeholder">
                  <div className="bg-primary/15 text-primary rounded-full w-10">
                    <span className="text-sm font-bold">ML</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-base-content/60">Your link</div>
                  <div className="font-mono truncate">mern.ly/xyz123</div>
                </div>
                <button className="btn btn-ghost btn-xs">Copy</button>
              </div>

              <div className="divider my-3" />

              <div className="stats bg-base-200 shadow">
                <div className="stat">
                  <div className="stat-title">Clicks</div>
                  <div className="stat-value text-primary">1.2K</div>
                  <div className="stat-desc">Last 30 days</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Latency</div>
                  <div className="stat-value text-secondary">28ms</div>
                  <div className="stat-desc">Global edge</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Uptime</div>
                  <div className="stat-value">99.9%</div>
                  <div className="stat-desc">This month</div>
                </div>
              </div>

              <div className="mt-4 text-xs text-base-content/60">
                Built with MERN • Privacy-first • Custom slugs • Analytics
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection