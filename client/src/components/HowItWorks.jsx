import React from "react";
import {
  Link2,
  Settings2,
  Share2,
  BarChart3,
  Copy,
  ExternalLink,
} from "lucide-react";

const HowItWorks = ({
  brand = "MernLy",
  ctaHref = "/create",
  className = "",
}) => {
  return (
    <section
      id="how-it-works"
      className={`relative overflow-hidden bg-base-200 py-16 sm:py-24 ${className}`}
    >
      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-24 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="badge badge-primary badge-outline mb-3">
            How it works
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Shorten in seconds
          </h2>
          <p className="mt-3 text-base-content/70">
            Paste a long URL, customize your slug, share anywhere, and track
            clicks — {brand} makes link management fast and simple.
          </p>
        </div>

        {/* Stepper */}
        <ul className="steps steps-vertical lg:steps-horizontal w-full mt-8">
          <li className="step step-primary">Paste URL</li>
          <li className="step step-primary">Customize & shorten</li>
          <li className="step step-primary">Share</li>
          <li className="step step-primary">Track analytics</li>
        </ul>

        {/* Steps grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="card bg-base-100 border border-base-200 shadow-sm min-w-0">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center">
                  <Link2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="card-title text-lg m-0">1. Paste your URL</h3>
              </div>
              <p className="text-base-content/70 mt-2">
                Drop in any long link. We’ll handle the rest.
              </p>

              {/* Micro UI */}
              <div className="mt-3 join w-full">
                <input
                  className="input input-bordered join-item w-full"
                  placeholder="https://example.com/super/long/link?utm=..."
                  readOnly
                />
                <button className="btn btn-primary join-item" disabled>
                  Shorten
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card bg-base-100 border border-base-200 shadow-sm min-w-0">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center">
                  <Settings2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="card-title text-lg m-0">
                  2. Customize your slug
                </h3>
              </div>
              <p className="text-base-content/70 mt-2">
                Optional: choose a custom slug that’s easy to remember.
              </p>

              {/* Micro UI */}
              <div className="mt-3 join w-full">
                <span className="join-item btn btn-ghost no-animation">
                  mern.ly/
                </span>
                <input
                  className="input input-bordered join-item w-full"
                  placeholder="your-slug"
                  readOnly
                />
                <button className="btn btn-primary join-item" disabled>
                  Create
                </button>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card bg-base-100 border border-base-200 shadow-sm min-w-0">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center">
                  <Share2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="card-title text-lg m-0">3. Share anywhere</h3>
              </div>
              <p className="text-base-content/70 mt-2">
                Post it on social, drop it in emails, or send in chats.
              </p>

              {/* Micro UI */}
              <div className="mt-3 flex items-center gap-2">
                <button className="btn btn-ghost btn-sm" disabled>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </button>
                <button className="btn btn-ghost btn-sm" disabled>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Open
                </button>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="card bg-base-100 border border-base-200 shadow-sm min-w-0">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="card-title text-lg m-0">4. Track analytics</h3>
              </div>
              <p className="text-base-content/70 mt-2">
                Monitor clicks and performance with built‑in analytics.
              </p>

              {/* Micro UI */}
              <div className="mt-3 stats bg-base-200 w-full">
                <div className="stat">
                  <div className="stat-title">Clicks</div>
                  <div className="stat-value text-primary">1.2K</div>
                  <div className="stat-desc">Last 30 days</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Top region</div>
                  <div className="stat-value text-secondary">US</div>
                  <div className="stat-desc">Realtime</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <span className="btn btn-primary">
            Get started — it’s free
          </span>
          <a href="#features" className="btn btn-ghost ml-2">
            Explore features
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;