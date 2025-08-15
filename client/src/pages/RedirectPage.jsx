import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/url`;

const RedirectPage = () => {
  const { shortId } = useParams();
  const [status, setStatus] = useState("loading"); // loading | redirecting | notfound | error
  const [message, setMessage] = useState("");
  const [dest, setDest] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!shortId) {
      setStatus("notfound");
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    const lookupAndRedirect = async () => {
      setStatus("loading");
      setMessage("");
      setDest("");

      try {
        const res = await fetch(`${baseUrl}/${shortId}`, {
          signal: controller.signal,
        });

        const data = await res.json().catch(() => ({}));

        // Expecting: { success: true, data: { longUrl: "https://..." } }
        if (res.ok && data?.success && data?.data?.longUrl) {
          const longUrl = data.data.longUrl;
          if (cancelled) return;
          setDest(longUrl);
          setStatus("redirecting");

          // Give the UI a tick to render the loader, then navigate.
          requestAnimationFrame(() => {
            if (!cancelled) window.location.replace(longUrl);
          });
          return;
        }

        // Not found or malformed response
        if (res.status === 404 || !data?.data?.longUrl) {
          if (!cancelled) {
            setStatus("notfound");
            setMessage(data?.message || "Short URL not found.");
          }
          return;
        }

        // Other server error
        if (!cancelled) {
          setStatus("error");
          setMessage(data?.message || "Unable to resolve the short link.");
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        if (!cancelled) {
          setStatus("error");
          setMessage("Network error. Check your connection and try again.");
        }
      }

      return () => controller.abort();
    };

    lookupAndRedirect();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [shortId, refresh]);

  if (status === "notfound") {
    return (
      <section className="hero min-h-[75svh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <div className="text-7xl font-extrabold text-base-content/20">404</div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold">Link not found</h1>
            <p className="mt-3 text-base-content/70">
              We couldn’t find a destination for
              <span className="font-mono mx-1">/{shortId}</span>.
              The link may have expired or never existed.
            </p>
            {message ? (
              <p className="mt-2 text-sm text-base-content/60">{message}</p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/" className="btn btn-primary">Go to Home</Link>
              <Link to="/" className="btn btn-ghost">Create a short link</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="hero min-h-[75svh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="alert alert-error shadow">
              <span>{message || "Something went wrong resolving the link."}</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button onClick={() => setRefresh((x) => x + 1)} className="btn btn-primary">
                Try again
              </button>
              <Link to="/" className="btn btn-ghost">Back to Home</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Loading + Redirecting views share the same "nice loader" UI
  const host = (() => {
    try {
      return dest ? new URL(dest).host : "";
    } catch {
      return "";
    }
  })();

  return (
    <section className="hero min-h-[75svh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md w-full">
          <div className="card bg-base-100 border border-base-200 shadow-lg">
            <div className="card-body items-center">
              <span className="loading loading-infinity loading-lg text-primary" aria-hidden="true"></span>
              <h2 className="card-title mt-2">
                {status === "redirecting" ? "Redirecting..." : "Finding your link..."}
              </h2>
              <p className="text-sm text-base-content/70">
                {status === "redirecting"
                  ? host
                    ? `Taking you to ${host}`
                    : "Taking you to your destination"
                  : "Please wait a moment."}
              </p>

              {/* Fallback: show an open button in case automatic redirect fails */}
              {dest && (
                <a
                  href={dest}
                  className="btn btn-primary btn-sm mt-3"
                  target="_self"
                  rel="noopener"
                >
                  Open now
                </a>
              )}

              <div className="mt-4 text-xs text-base-content/60">
                Do not close this tab. If nothing happens, use the button above.
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link to="/" className="link link-hover text-sm">
              Go back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedirectPage;