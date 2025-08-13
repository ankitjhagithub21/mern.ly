
import {
  Zap,
  Link2,
  Lock,
  BarChart3,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const defaultFeatures = [
  {
    title: "Easy",
    desc: "ShortURL is easy and fast, enter the long link to get your shortened link",
    icon: Zap,
  },
  {
    title: "Shortened",
    desc: "Use any link, no matter what size, ShortURL always shortens",
    icon: Link2,
  },
  {
    title: "Secure",
    desc: "It is fast and secure, our service has HTTPS protocol and data encryption",
    icon: Lock,
  },
  {
    title: "Statistics",
    desc: "Check the number of clicks that your shortened URL received",
    icon: BarChart3,
  },
  {
    title: "Reliable",
    desc: "All links that try to disseminate spam, viruses and malware are deleted",
    icon: ShieldCheck,
  },
  {
    title: "Devices",
    desc: "Compatible with smartphones, tablets and desktop",
    icon: Smartphone,
  },
];

const FeaturesSection = ({
  className = "",
  title = "Shorten, share and track",
  description = `Your shortened URLs can be used in publications, documents, advertisements, blogs, forums, instant messages, and other locations. Track statistics for your business and projects by monitoring the number of hits from your URL with our click counter.`,
  items = defaultFeatures,
}) => {
  return (
    <section id="features" className={`py-16 sm:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 relative">
          <div

          className="pointer-events-none absolute -bottom-24  h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
        ></div>
        <div className="text-center max-w-3xl mx-auto">
          <div className="badge badge-primary badge-outline mb-3">Features</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">{title}</h2>
          <p className="mt-4 text-base-content/70">{description}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-lg transition-all duration-200 h-full"
            >
              <div className="card-body">
                <div className="flex items-center gap-3">
                  
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                
                  <h3 className="card-title text-lg">{title}</h3>
                </div>
                <p className="mt-2 text-sm text-base-content/70">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;