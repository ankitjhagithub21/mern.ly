
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Link2,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_SERVER_URL;

const LinksPage = () => {
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest"); // newest | oldest | clicksDesc | clicksAsc
  const [copiedId, setCopiedId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null); // link object
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchUserLinks = async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`${API_BASE}/api/links`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data?.success) {
          setUserLinks(Array.isArray(data.data) ? data.data : []);
        } else {
          setErr(data?.message || "Failed to fetch links.");
        }
      } catch (error) {
        setErr("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserLinks();
  }, [refreshKey]);

  // Helpers
  const toFullShortUrl = (item) => {
    const s = item.shortUrl || item.slug || item.shortUrl;
    if (!s) return "";
    if (/^https?:\/\//i.test(s)) return s;
    const origin =
      import.meta.env.VITE_PUBLIC_WEB_ORIGIN || window.location.origin;
    return `${origin}/${s}`;
  };

  const hostFromLong = (url) => {
    try {
      return new URL(url).host;
    } catch {
      return url;
    }
  };

  const formatDate = (d) => {
    if (!d) return "-";
    try {
      return new Date(d).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return d;
    }
  };

  const copyShort = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {}
  };

  // Derived
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = [...userLinks];
    if (q) {
      list = list.filter((l) => {
        const shortU = toFullShortUrl(l).toLowerCase();
        const longU = (l.longUrl || "").toLowerCase();
        const slug = (l.slug || l.shortUrl || "").toLowerCase();
        return shortU.includes(q) || longU.includes(q) || slug.includes(q);
      });
    }
    switch (sort) {
      case "oldest":
        list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "clicksDesc":
        list.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
        break;
      case "clicksAsc":
        list.sort((a, b) => (a.clicks || 0) - (b.clicks || 0));
        break;
      default:
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list;
  }, [userLinks, query, sort]);

  const totals = useMemo(() => {
    const clicks = userLinks.reduce((sum, l) => sum + (l.clicks || 0), 0);
    return { links: userLinks.length, clicks };
  }, [userLinks]);

  // Delete handlers
  const openDelete = (item) => setDeleteTarget(item);
  const closeDelete = () => {
    if (!deleting) setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget?._id) return;
    setDeleting(true);
    setErr("");
    try {
      const res = await fetch(`${API_BASE}/api/links/${deleteTarget._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        setUserLinks((prev) => prev.filter((l) => l._id !== deleteTarget._id));
        setDeleteTarget(null);
      } else {
        setErr(data?.message || "Failed to delete link.");
      }
    } catch (e) {
      setErr("Network error while deleting. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
              Your Links
              <span className="badge badge-primary badge-outline">
                {totals.links}
              </span>
            </h1>
            <p className="mt-1 text-sm text-base-content/70">
              Manage and track your shortened URLs.
            </p>
          </div>
          <Link to="/" className="btn btn-primary hidden sm:inline-flex">
            Create link
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-6">
          <div className="stats bg-base-200 shadow w-full">
            <div className="stat">
              <div className="stat-title">Total Links</div>
              <div className="stat-value">{totals.links}</div>
              <div className="stat-desc">Across your account</div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Clicks</div>
              <div className="stat-value text-primary">{totals.clicks}</div>
              <div className="stat-desc">All-time</div>
            </div>
            <div className="stat">
              <div className="stat-title">Last Updated</div>
              <div className="stat-value text-secondary">
                {userLinks[0]?.createdAt ? formatDate(userLinks[0]?.createdAt) : "-"}
              </div>
              <div className="stat-desc">Newest link date</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="join w-full sm:max-w-md bg-base-200 rounded-full">
            <div className="join-item btn no-animation">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              className="outline-none w-full bg-transparent px-2"
              placeholder="Search by URL or slug..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              className="select select-bordered"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="clicksDesc">Most clicks</option>
              <option value="clicksAsc">Fewest clicks</option>
            </select>

            <button
              className="btn btn-ghost"
              onClick={() => setRefreshKey((k) => k + 1)}
              disabled={loading}
              aria-label="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link to="/create" className="btn btn-primary sm:hidden">
              Create
            </Link>
          </div>
        </div>

        {/* Error */}
        {err && (
          <div className="mt-6 alert alert-error">
            <span>{err}</span>
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div className="mt-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-16 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          // Empty state
          <div className="mt-10 py-10 hero bg-base-200 rounded-box">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <div className="text-6xl">🔗</div>
                <h2 className="text-2xl font-bold mt-2">No links yet</h2>
                <p className="mt-2 text-base-content/70">
                  Create your first short link to see it here.
                </p>
                <Link to="/" className="btn btn-primary mt-4">
                  Create link
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Table (md+) */}
            <div className="mt-6 hidden md:block overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="w-6"></th>
                    <th>Short URL</th>
                    <th>Destination</th>
                    <th className="text-center">Clicks</th>
                    <th>Created</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, idx) => {
                    const fullShort = toFullShortUrl(item);
                    const host = hostFromLong(item.longUrl);
                    const isCopied = copiedId === String(item._id);
                    return (
                      <tr key={item._id || idx}>
                        <td>
                          <div className="avatar">
                            <div className="w-6 rounded">
                              <img
                                alt={host}
                                src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="max-w-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <Link2 className="w-4 h-4 text-base-content/60 shrink-0" />
                            <a
                              href={fullShort}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link link-primary truncate"
                              title={fullShort}
                            >
                              {fullShort}
                            </a>
                          </div>
                        </td>
                        <td className="max-w-md">
                          <div className="truncate" title={item.longUrl}>
                            {item.longUrl}
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="badge">{item.clicks || 0}</div>
                        </td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>
                          <div className="flex items-center justify-end gap-2">
                            {/* Copy */}
                            <button
                              className={`btn btn-ghost btn-xs tooltip ${
                                isCopied ? "text-success" : ""
                              }`}
                              data-tip={isCopied ? "Copied!" : "Copy"}
                              onClick={() =>
                                copyShort(String(item._id), fullShort)
                              }
                            >
                              {isCopied ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            {/* Open */}
                            <a
                              className="btn btn-ghost btn-xs tooltip"
                              data-tip="Open"
                              href={item.longUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            {/* Delete */}
                            <button
                              className="btn btn-ghost btn-xs text-error tooltip"
                              data-tip="Delete"
                              onClick={() => openDelete(item)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Cards (mobile) */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:hidden">
              {filtered.map((item, idx) => {
                const fullShort = toFullShortUrl(item);
                const host = hostFromLong(item.longUrl);
                const isCopied = copiedId === String(item._id);
                return (
                  <div
                    key={item._id || idx}
                    className="card bg-base-100 border border-base-200 shadow-sm"
                  >
                    <div className="card-body">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-8 rounded">
                            <img
                              alt={host}
                              src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <a
                            href={fullShort}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link link-primary font-medium block truncate"
                            title={fullShort}
                          >
                            {fullShort}
                          </a>
                          <p
                            className="text-sm text-base-content/70 truncate"
                            title={item.longUrl}
                          >
                            {item.longUrl}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm">
                          <span className="badge mr-2">
                            {item.clicks || 0} clicks
                          </span>
                          <span className="text-base-content/60">
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Copy */}
                          <button
                            className={`btn btn-ghost btn-sm tooltip ${
                              isCopied ? "text-success" : ""
                            }`}
                            data-tip={isCopied ? "Copied!" : "Copy"}
                            onClick={() =>
                              copyShort(String(item._id), fullShort)
                            }
                          >
                            {isCopied ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          {/* Open */}
                          <a
                            className="btn btn-ghost btn-sm tooltip"
                            data-tip="Open"
                            href={item.longUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          {/* Delete */}
                          <button
                            className="btn btn-ghost btn-sm text-error tooltip"
                            data-tip="Delete"
                            onClick={() => openDelete(item)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Delete confirmation modal */}
      <div className={`modal ${deleteTarget ? "modal-open" : ""}`}>
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeDelete}
            aria-label="Close"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Delete link?</h3>
          <p className="py-2 text-base-content/70">
            Are you sure you want to delete this short link? This action cannot
            be undone.
          </p>
          {deleteTarget && (
            <div className="mt-2 p-3 bg-base-200 rounded-lg text-sm">
              <div className="font-mono truncate">
                {toFullShortUrl(deleteTarget)}
              </div>
              <div className="text-base-content/60 truncate">
                → {deleteTarget.longUrl}
              </div>
            </div>
          )}
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={closeDelete} disabled={deleting}>
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={confirmDelete}
              disabled={deleting}
            >
              {deleting && (
                <span className="loading loading-spinner loading-sm mr-2" />
              )}
              Delete
            </button>
          </div>
        </div>
        <div className="modal-backdrop bg-black/40" onClick={closeDelete} />
      </div>
    </section>
  );
};

export default LinksPage;
