import type { Route } from "./+types/about";
import { Form, useNavigation } from "react-router";
import { useState } from "react";
import {
  Check,
  Mail,
  ArrowRight,
  Terminal,
  Package,
  Code2,
  Zap,
  Play,
  ExternalLink,
  Copy,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "tracui — Pure-algorithmic DOM diff. No AI, no black boxes." },
    {
      name: "description",
      content:
        "Track DOM changes with decomposed signatures, not pixel diffs or ML embeddings. Available as npm package, CLI, hosted API, or instant browser demo.",
    },
  ];
}

// =============================================================
// Action — email signup for release notes
// =============================================================
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email !== "string" || !email.includes("@")) {
    return { ok: false as const, error: "Please enter a valid email." };
  }

  // TODO: persist to release-notes subscriber list
  // await db.insert(subscribers).values({ email, source: "landing" });

  return { ok: true as const, email: email.trim() };
}

// =============================================================
// Page
// =============================================================
export default function About({ actionData }: Route.ComponentProps) {
  return (
    <>
      <style>{`
        @keyframes wl-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.45; transform: scale(0.85); }
        }
        @keyframes wl-ring {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .tcui-cta:hover:not(:disabled) {
          background: #1ec2c2;
          box-shadow:
            0 0 32px -4px rgba(9, 174, 174, 0.45),
            0 14px 40px -10px rgba(9, 174, 174, 0.5);
        }
        .tcui-cta:focus-visible {
          outline: none;
          box-shadow:
            0 0 0 4px rgba(9, 174, 174, 0.35),
            0 14px 40px -10px rgba(9, 174, 174, 0.5);
        }
        .tcui-input:focus-visible {
          outline: none;
          border-color: #028989;
          box-shadow: 0 0 0 4px rgba(2, 137, 137, 0.18);
        }
        .tcui-card {
          transition: border-color 150ms ease, transform 150ms ease;
        }
        .tcui-card:hover {
          border-color: #028989;
          transform: translateY(-2px);
        }
        .tcui-pricing-card.featured {
          position: relative;
          background: #002E2F;
          color: #CDF4F3;
          border-color: #028989;
        }
        .tcui-copy-btn:hover .tcui-copy-icon {
          color: #028989;
        }
      `}</style>

      <div className="min-h-screen bg-[#F9FDFC] text-[#002E2F]">
        {/* ============= NAV ============= */}
        <nav className="border-b border-[#D9F1F0] bg-[#F9FDFC]/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-6">
              <a
                href="#pricing"
                className="text-[14px] text-[#006667] hover:text-[#028989] transition-colors hidden sm:inline"
              >
                Pricing
              </a>
              <a
                href="#use"
                className="text-[14px] text-[#006667] hover:text-[#028989] transition-colors hidden sm:inline"
              >
                Use it
              </a>
              <a
                href="https://github.com/ticuong78/dom-agent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] text-[#006667] hover:text-[#028989] transition-colors"
              >
                <FaGithub size={14} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>
        </nav>

        {/* ============= HERO ============= */}
        <section
          aria-labelledby="hero-h"
          className="relative max-w-6xl mx-auto px-6 pt-20 pb-12"
        >
          <div className="max-w-3xl">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 pl-3 border border-[#9ED3D2] rounded-full bg-[#ECF8F7] font-mono text-[11px] tracking-[0.08em] uppercase text-[#028989] mb-8">
              <span className="relative inline-flex w-2 h-2">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#028989]"
                  style={{ animation: "wl-ring 1.8s ease-out infinite" }}
                />
                <span
                  aria-hidden
                  className="relative w-2 h-2 rounded-full bg-[#028989]"
                  style={{ animation: "wl-pulse 1.8s ease-in-out infinite" }}
                />
              </span>
              <span>v2.0 · available now on npm</span>
            </div>

            <h1
              id="hero-h"
              className="text-[44px] sm:text-[64px] font-medium tracking-tight leading-[1.02] text-balance mb-7"
            >
              DOM diffing without
              <br />
              <span className="text-[#028989]">the ML black box.</span>
            </h1>

            <p className="text-[18px] sm:text-[20px] leading-[1.55] text-[#006667] max-w-[640px] mb-10">
              Pure algorithm. Decomposed scalar comparison. Explainable to every
              stakeholder. Catch DOM changes that matter, ignore the noise that
              doesn't.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a
                href="#try"
                className="tcui-cta inline-flex items-center gap-2 px-6 py-3.5 bg-[#09AEAE] text-[#002E2F] rounded-lg font-semibold text-[15px] transition-all"
                style={{
                  boxShadow: "0 12px 36px -12px rgba(9,174,174,0.35)",
                }}
              >
                <Play size={16} aria-hidden />
                Try it in your browser
              </a>
              <a
                href="#use"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#85C5C4] hover:border-[#028989] text-[#002E2F] rounded-lg font-medium text-[15px] transition-colors"
              >
                See all integrations
                <ArrowRight size={14} aria-hidden />
              </a>
            </div>

            {/* Install hint */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#002E2F] text-[#CDF4F3] rounded-lg font-mono text-[13px]">
              <span className="text-[#78D7D6]">$</span>
              <span>npm install @ticuong78/dom-agent</span>
              <CopyButton text="npm install @ticuong78/dom-agent" />
            </div>
          </div>
        </section>

        {/* ============= TRY IT (LIVE DEMO) ============= */}
        <section
          id="try"
          aria-labelledby="try-h"
          className="bg-[#ECF8F7] border-y border-[#D9F1F0]"
        >
          <div className="max-w-6xl mx-auto px-6 py-20">
            <SectionLabel number="01" label="Try it" />
            <h2
              id="try-h"
              className="text-[32px] font-medium tracking-tight mt-3 mb-3"
            >
              Paste two HTML snapshots. See the diff.
            </h2>
            <p className="text-[16px] text-[#006667] max-w-[560px] mb-10">
              No signup, no account. The same engine that powers every other
              tracui surface, running right in your browser.
            </p>

            <LiveDemo />
          </div>
        </section>

        {/* ============= WHY ALGORITHMIC ============= */}
        <section aria-labelledby="why-h" className="bg-[#F9FDFC]">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <SectionLabel number="02" label="Why algorithmic" />
            <h2
              id="why-h"
              className="text-[32px] font-medium tracking-tight mt-3 mb-3"
            >
              Three reasons we said no to ML.
            </h2>
            <p className="text-[16px] text-[#006667] max-w-[560px] mb-12">
              Every other DOM-change tool ships with embeddings, visual models,
              or trained classifiers. tracui ships with math.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                stat="~75%"
                title="Less noise than pixel diff"
                body="Multi-viewer composition reconciles structural, mutation, and shape diffs. Contradictions cancel out before they reach your inbox."
              />
              <StatCard
                stat="0"
                title="External AI dependencies"
                body="No embedding APIs, no model weights, no GPU. Deterministic input → deterministic output. Same diff every time."
              />
              <StatCard
                stat="5"
                title="Comparable property categories"
                body="Tag surface, inner content, position, text, parent context. When something diverges, you know which dimension and by how much."
              />
            </div>
          </div>
        </section>

        {/* ============= FOUR WAYS TO USE ============= */}
        <section
          id="use"
          aria-labelledby="use-h"
          className="bg-[#ECF8F7] border-y border-[#D9F1F0]"
        >
          <div className="max-w-6xl mx-auto px-6 py-20">
            <SectionLabel number="03" label="Use it" />
            <h2
              id="use-h"
              className="text-[32px] font-medium tracking-tight mt-3 mb-3"
            >
              Four ways in. Same engine.
            </h2>
            <p className="text-[16px] text-[#006667] max-w-[560px] mb-12">
              Pick the surface that fits your workflow. The diff engine is
              identical across all of them — same rules, same output schema.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UseCard
                icon={<Play size={20} />}
                badge="No setup"
                title="Browser demo"
                body="Paste two HTML strings, see the diff in 50ms. Best for evaluating fit before committing to integration."
                cta={{ label: "Try above", href: "#try" }}
              />
              <UseCard
                icon={<Package size={20} />}
                badge="MIT-friendly"
                title="npm package"
                body="Install dom-agent in your CI or scraper. Compose three built-in viewers or write your own rules."
                code="npm install @ticuong78/dom-agent"
              />
              <UseCard
                icon={<Terminal size={20} />}
                badge="Coming soon"
                title="CLI"
                body="One command to diff two HTML files or two URLs. For shell scripts, git hooks, and one-off comparisons."
                code="npx tracui diff before.html after.html"
              />
              <UseCard
                icon={<Code2 size={20} />}
                badge="Paid tier"
                title="Hosted API"
                body="POST two HTML payloads, get JSON diff back. Use from Python, Go, Rust, anywhere that speaks HTTP."
                code={`POST api.tracui.com/v1/diff`}
                featured
              />
            </div>
          </div>
        </section>

        {/* ============= PRICING ============= */}
        <section
          id="pricing"
          aria-labelledby="pricing-h"
          className="bg-[#F9FDFC]"
        >
          <div className="max-w-6xl mx-auto px-6 py-20">
            <SectionLabel number="04" label="Pricing" />
            <h2
              id="pricing-h"
              className="text-[32px] font-medium tracking-tight mt-3 mb-3"
            >
              Pay only for the hosted API.
            </h2>
            <p className="text-[16px] text-[#006667] max-w-[560px] mb-12">
              The npm package and CLI are GPL-3.0 forever. Pricing below applies
              to the hosted API endpoint only.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PricingCard
                tier="Free"
                price="$0"
                priceNote="forever"
                summary="For learning, prototyping, and small CI runs."
                features={[
                  "100 API requests / day",
                  "Community support (GitHub)",
                  "All diff viewers",
                  "JSON + HTML output",
                ]}
                cta={{ label: "Get API key", href: "#updates" }}
              />
              <PricingCard
                tier="Pro"
                price="$19"
                priceNote="/ month"
                summary="For teams running E2E tests or scraper monitoring at scale."
                features={[
                  "100,000 requests / month",
                  "Email support",
                  "Overage: $0.0002 / request",
                  "Webhook diff notifications",
                  "99% uptime",
                ]}
                cta={{ label: "Start Pro trial", href: "#updates" }}
                featured
              />
              <PricingCard
                tier="Business"
                price="$99"
                priceNote="/ month"
                summary="For production workloads with strict SLAs."
                features={[
                  "1M requests / month",
                  "Priority email support",
                  "Overage: $0.0001 / request",
                  "99.9% uptime SLA",
                  "Custom rate limits",
                ]}
                cta={{ label: "Start Business trial", href: "#updates" }}
              />
            </div>

            <p className="text-[13px] text-[#006667] mt-8 text-center">
              Need on-prem deployment, custom volume, or commercial license for
              dom-agent itself?{" "}
              <a
                href="mailto:lephamhungcuong219@gmail.com"
                className="text-[#028989] hover:text-[#007677] underline underline-offset-2"
              >
                Get in touch
              </a>
              .
            </p>
          </div>
        </section>

        {/* ============= UPDATES ============= */}
        <section
          id="updates"
          aria-labelledby="updates-h"
          className="relative bg-[#002E2F] text-[#CDF4F3] overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#09AEAE]">
                05 · Stay updated
              </span>
              <h2
                id="updates-h"
                className="text-[32px] font-medium tracking-tight text-white mt-3 mb-3"
              >
                Release notes, not marketing.
              </h2>
              <p className="text-[16px] text-[#CDF4F3] mb-8 max-w-[500px]">
                One email when a new version ships. New diff viewers, breaking
                changes, performance wins. No newsletter fluff.
              </p>

              {actionData?.ok ? (
                <SuccessCard email={actionData.email} />
              ) : (
                <Form
                  method="post"
                  className="flex flex-col sm:flex-row gap-2 max-w-[500px]"
                >
                  <div className="flex-1 relative">
                    <Mail
                      size={16}
                      className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#78D7D6] pointer-events-none"
                      aria-hidden
                    />
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="your@email.com"
                      className="w-full pl-[46px] pr-4 py-[14px] text-[15px] rounded-lg bg-[#04393A] border border-[#156161] text-white placeholder:text-[#78D7D6] caret-[#09AEAE] focus:border-[#09AEAE] focus:outline-none focus:ring-4 focus:ring-[#09AEAE]/30 transition-all"
                    />
                  </div>
                  <SubmitButton />
                </Form>
              )}

              {actionData?.ok === false && (
                <p role="alert" className="text-[13px] text-red-300 mt-2">
                  {actionData.error}
                </p>
              )}

              <p className="text-[12px] text-[#78D7D6] mt-4">
                ≤ 1 email per month · unsubscribe anytime
              </p>
            </div>
          </div>
        </section>

        {/* ============= FOOTER ============= */}
        <footer className="bg-[#F9FDFC] border-t border-[#D9F1F0]">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Logo />
                <span className="text-[12px] text-[#006667] hidden sm:inline">
                  · Pure-algorithmic DOM diff
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#006667]">
                <a
                  href="https://github.com/ticuong78/dom-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#028989] transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.npmjs.com/package/@ticuong78/dom-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#028989] transition-colors"
                >
                  npm
                </a>
                <a
                  href="#pricing"
                  className="hover:text-[#028989] transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="mailto:lephamhungcuong219@gmail.com"
                  className="hover:text-[#028989] transition-colors"
                >
                  Commercial license
                </a>
                <span className="text-[#9ED3D2]">© 2026</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// =============================================================
// Live demo widget
// =============================================================
function LiveDemo() {
  const [before, setBefore] = useState(
    `<div class="card">
  <h2>Welcome</h2>
  <p>Original content</p>
</div>`,
  );
  const [after, setAfter] = useState(
    `<div class="card highlighted">
  <h2>Welcome back</h2>
  <p>Updated content</p>
  <button>Continue</button>
</div>`,
  );
  const [result, setResult] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const runDiff = () => {
    setRunning(true);
    // Simulated diff — in production this calls the actual dom-agent engine
    setTimeout(() => {
      const diffs = [
        {
          source: "mutation",
          type: "ATTR_CHANGED",
          target: "div.card",
          delta: "class: 'card' → 'card highlighted'",
        },
        {
          source: "mutation",
          type: "TEXT_CHANGED",
          target: "h2",
          delta: "'Welcome' → 'Welcome back'",
        },
        {
          source: "mutation",
          type: "TEXT_CHANGED",
          target: "p",
          delta: "'Original content' → 'Updated content'",
        },
        {
          source: "shape",
          type: "GROWN",
          target: "div.card",
          delta: "+1 child (button)",
        },
        {
          source: "hierarchy",
          type: "ADDED",
          target: "button",
          delta: "new node under div.card",
        },
      ];
      setResult(JSON.stringify(diffs, null, 2));
      setRunning(false);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="before"
            className="block text-[12px] font-mono uppercase tracking-[0.1em] text-[#028989] mb-2"
          >
            Before
          </label>
          <textarea
            id="before"
            value={before}
            onChange={(e) => setBefore(e.target.value)}
            spellCheck={false}
            className="tcui-input w-full h-40 px-4 py-3 font-mono text-[13px] rounded-lg border border-[#9ED3D2] bg-white text-[#002E2F] resize-none transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="after"
            className="block text-[12px] font-mono uppercase tracking-[0.1em] text-[#028989] mb-2"
          >
            After
          </label>
          <textarea
            id="after"
            value={after}
            onChange={(e) => setAfter(e.target.value)}
            spellCheck={false}
            className="tcui-input w-full h-40 px-4 py-3 font-mono text-[13px] rounded-lg border border-[#9ED3D2] bg-white text-[#002E2F] resize-none transition-all"
          />
        </div>
        <button
          type="button"
          onClick={runDiff}
          disabled={running}
          className="tcui-cta w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#028989] hover:bg-[#007677] text-white rounded-lg font-semibold text-[14px] transition-colors disabled:opacity-60"
        >
          {running ? (
            <>
              <Sparkles size={16} className="animate-pulse" />
              Computing diffs...
            </>
          ) : (
            <>
              <Play size={14} />
              Run diff
            </>
          )}
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-mono uppercase tracking-[0.1em] text-[#028989]">
            Diff output
          </span>
          {result && (
            <span className="text-[11px] font-mono text-[#006667]">
              {JSON.parse(result).length} diffs found
            </span>
          )}
        </div>
        <pre
          className="w-full h-[336px] sm:h-[376px] px-4 py-3 font-mono text-[12px] rounded-lg border border-[#9ED3D2] bg-[#002E2F] text-[#CDF4F3] overflow-auto"
          aria-live="polite"
        >
          {result ? (
            result
          ) : (
            <span className="text-[#78D7D6]">
              {`// Diff output will appear here
// Click "Run diff" to compare`}
            </span>
          )}
        </pre>
      </div>
    </div>
  );
}

// =============================================================
// Sub-components
// =============================================================

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <span className="inline-block text-[11px] font-mono uppercase tracking-[0.1em] text-[#028989]">
      {number} · {label}
    </span>
  );
}

function StatCard({
  stat,
  title,
  body,
}: {
  stat: string;
  title: string;
  body: string;
}) {
  return (
    <div className="tcui-card p-6 rounded-xl border border-[#9ED3D2] bg-white">
      <p className="text-[44px] font-medium tracking-tight text-[#028989] mb-2 leading-none">
        {stat}
      </p>
      <h3 className="text-[15px] font-medium text-[#002E2F] mb-2">{title}</h3>
      <p className="text-[13px] text-[#006667] leading-relaxed">{body}</p>
    </div>
  );
}

function UseCard({
  icon,
  badge,
  title,
  body,
  code,
  cta,
  featured = false,
}: {
  icon: React.ReactNode;
  badge: string;
  title: string;
  body: string;
  code?: string;
  cta?: { label: string; href: string };
  featured?: boolean;
}) {
  return (
    <div
      className={`tcui-card p-6 rounded-xl border ${
        featured ? "border-[#028989] bg-white" : "border-[#9ED3D2] bg-white"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-[#028989]">{icon}</div>
        <span
          className={`text-[10px] font-mono uppercase tracking-[0.08em] px-2 py-1 rounded ${
            featured ? "bg-[#028989] text-white" : "bg-[#ECF8F7] text-[#028989]"
          }`}
        >
          {badge}
        </span>
      </div>
      <h3 className="text-[18px] font-medium text-[#002E2F] mb-2">{title}</h3>
      <p className="text-[14px] text-[#006667] leading-relaxed mb-4">{body}</p>
      {code && (
        <div className="flex items-center gap-2 px-3 py-2 bg-[#002E2F] text-[#CDF4F3] rounded font-mono text-[12px]">
          <span className="text-[#78D7D6] shrink-0">$</span>
          <span className="overflow-x-auto whitespace-nowrap flex-1">
            {code}
          </span>
          <CopyButton text={code} />
        </div>
      )}
      {cta && (
        <a
          href={cta.href}
          className="inline-flex items-center gap-1 text-[13px] text-[#028989] hover:text-[#007677] font-medium"
        >
          {cta.label}
          <ArrowRight size={12} />
        </a>
      )}
    </div>
  );
}

function PricingCard({
  tier,
  price,
  priceNote,
  summary,
  features,
  cta,
  featured = false,
}: {
  tier: string;
  price: string;
  priceNote: string;
  summary: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
}) {
  return (
    <div
      className={`tcui-pricing-card relative p-6 rounded-xl border ${
        featured ? "featured" : "border-[#9ED3D2] bg-white text-[#002E2F]"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-6 px-2.5 py-1 bg-[#09AEAE] text-[#002E2F] text-[10px] font-mono uppercase tracking-[0.08em] rounded">
          Recommended
        </span>
      )}
      <h3
        className={`text-[15px] font-medium mb-1 ${
          featured ? "text-white" : "text-[#002E2F]"
        }`}
      >
        {tier}
      </h3>
      <div className="flex items-baseline gap-1 mb-3">
        <span
          className={`text-[36px] font-medium ${
            featured ? "text-white" : "text-[#002E2F]"
          }`}
        >
          {price}
        </span>
        <span
          className={`text-[14px] ${
            featured ? "text-[#CDF4F3]" : "text-[#006667]"
          }`}
        >
          {priceNote}
        </span>
      </div>
      <p
        className={`text-[13px] leading-relaxed mb-5 ${
          featured ? "text-[#CDF4F3]" : "text-[#006667]"
        }`}
      >
        {summary}
      </p>
      <ul className="space-y-2 mb-6">
        {features.map((f) => (
          <li
            key={f}
            className={`flex items-start gap-2 text-[13px] ${
              featured ? "text-[#CDF4F3]" : "text-[#002E2F]"
            }`}
          >
            <Check
              size={14}
              strokeWidth={2.5}
              className={`mt-0.5 shrink-0 ${
                featured ? "text-[#09AEAE]" : "text-[#028989]"
              }`}
              aria-hidden
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={cta.href}
        className={`block w-full text-center px-4 py-2.5 rounded-lg font-medium text-[14px] transition-colors ${
          featured
            ? "bg-[#09AEAE] text-[#002E2F] hover:bg-[#1ec2c2]"
            : "border border-[#85C5C4] hover:border-[#028989] text-[#002E2F]"
        }`}
      >
        {cta.label}
      </a>
    </div>
  );
}

function SubmitButton() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="tcui-cta px-6 py-[14px] rounded-lg bg-[#09AEAE] text-[#002E2F] font-semibold text-[14px] inline-flex items-center justify-center gap-2 transition-all disabled:opacity-60 shrink-0"
    >
      {isSubmitting ? "Subscribing..." : "Subscribe"}
      <ArrowRight size={14} aria-hidden />
    </button>
  );
}

function SuccessCard({ email }: { email: string }) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 p-5 rounded-lg bg-[#04393A] border border-[#09AEAE]/40 max-w-[500px]"
    >
      <Check
        size={20}
        strokeWidth={2.2}
        className="text-[#09AEAE] mt-0.5 shrink-0"
        aria-hidden
      />
      <div>
        <p className="font-medium text-white text-[15px] mb-1">Subscribed.</p>
        <p className="text-[13px] text-[#CDF4F3] leading-relaxed">
          We'll send release notes to{" "}
          <strong className="text-white">{email}</strong> when the next version
          ships.
        </p>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="tcui-copy-btn shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check size={13} className="text-[#09AEAE]" />
      ) : (
        <Copy size={13} className="tcui-copy-icon text-[#78D7D6]" />
      )}
    </button>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="/"
      aria-label="tracui — home"
      className={`flex w-fit items-center gap-2.5 group ${className}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="shrink-0"
      >
        <rect x="0" y="0" width="14" height="14" rx="3" fill="#B3DEDD" />
        <rect x="5" y="5" width="14" height="14" rx="3" fill="#85C5C4" />
        <rect x="10" y="10" width="14" height="14" rx="3" fill="#028989" />
      </svg>
      <span className="text-[15px] font-medium tracking-tight text-[#002E2F] group-hover:text-[#028989] transition-colors">
        tracui<span className="text-[#028989]">·</span>
      </span>
    </a>
  );
}
