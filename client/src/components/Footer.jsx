import React, { useState } from "react";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

const navGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Docs", href: "#docs" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#blog" },
      { label: "Guides", href: "#guides" },
      { label: "API", href: "#api" },
      { label: "Status", href: "#status" },
    ],
  },
//   {
//     title: "Company",
//     links: [
//       { label: "About", href: "#about" },
//       { label: "Careers", href: "#careers" },
//       { label: "Contact", href: "#contact" },
//       { label: "Press", href: "#press" },
//     ],
//   },
//   {
//     title: "Legal",
//     links: [
//       { label: "Privacy", href: "#privacy" },
//       { label: "Terms", href: "#terms" },
//       { label: "Security", href: "#security" },
//       { label: "Cookies", href: "#cookies" },
//     ],
//   },
];

const Footer = ({ className = "", onSubscribe }) => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    onSubscribe?.(email);
    setEmail("");
  };

  const year = new Date().getFullYear();

  return (
    <footer className={`bg-base-200 text-base-content ${className}`}>
      <div className="container mx-auto">
        {/* Top */}
        <div className="footer py-12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              
                <div className="w-10 h-10 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center">
                  ML
                </div>
            
              <div>
                <div className="text-lg font-extrabold">MernLy</div>
                <p className="text-sm text-base-content/70">
                  Short links, big impact.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="btn btn-ghost btn-sm btn-circle"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter/X"
                className="btn btn-ghost btn-sm btn-circle"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="btn btn-ghost btn-sm btn-circle"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@mernly.app"
                aria-label="Email"
                className="btn btn-ghost btn-sm btn-circle"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <nav key={group.title}>
              <h6 className="footer-title">{group.title}</h6>
              {group.links.map((l) => (
                <a key={l.label} href={l.href} className="link link-hover">
                  {l.label}
                </a>
              ))}
            </nav>
          ))}

          {/* Newsletter */}
          <form onSubmit={handleSubscribe}>
            <h6 className="footer-title">Subscribe</h6>
            <p className="text-sm text-base-content/70 mb-3">
              Get product updates and best practices.
            </p>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="join w-full max-w-xs">
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@example.com"
                className="input input-bordered join-item flex-1 min-w-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <button type="submit" className="btn btn-primary join-item">
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-base-300 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs">
            © {year} MernLy. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-error" /> by Ankit Jha
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;