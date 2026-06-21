import type { Route } from "./+types/about";
import { Form, useNavigation } from "react-router";
import {
  Layers,
  Database,
  Cloud,
  Zap,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Play,
  ExternalLink,
  ShieldCheck,
  Clock,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Giới thiệu — Tên dự án của bạn" },
    {
      name: "description",
      content: "Mô tả ngắn 150 ký tự cho SEO và social share.",
    },
  ];
}

// Server-side action xử lý form submit
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email !== "string" || !email.includes("@")) {
    return { ok: false as const, error: "Email không hợp lệ" };
  }

  // TODO: persist email — DB insert hoặc API call
  // await db.insert(notifications).values({ email });

  return { ok: true as const, email };
}

export default function About({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className="bg-teal-1 text-teal-12">
      {/* ============================================================ */}
      {/* HERO — brand moment, dark teal background                    */}
      {/* ============================================================ */}
      <section
        aria-labelledby="hero-heading"
        className="relative bg-teal-12 text-teal-2 overflow-hidden"
      >
        {/* Subtle grid pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 pt-24 pb-28">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-9/20 text-teal-3 text-xs font-mono tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-9 animate-pulse" />
            v0.1 · preview
          </span>

          <h1
            id="hero-heading"
            className="text-5xl sm:text-6xl font-medium tracking-tight text-white mb-5 leading-[1.05]"
          >
            Báo cáo theo ngày,
            <br />
            <span className="text-teal-9">không phải theo phút.</span>
          </h1>

          <p className="text-lg text-teal-3 max-w-lg mb-8 leading-relaxed">
            Công cụ phân tích dữ liệu cho team data-driven. Mở report nhanh
            trong 200ms, không phải 5 giây.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#notify"
              className="inline-flex items-center gap-2 px-5 py-3 bg-teal-9 hover:bg-teal-10 text-teal-12 rounded-lg font-medium transition-colors"
            >
              Nhận thông báo
              <ArrowRight size={16} aria-hidden />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-5 py-3 text-teal-3 hover:text-white transition-colors"
            >
              Xem demo
              <Play size={14} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ABOUT — light section                                        */}
      {/* ============================================================ */}
      <section aria-labelledby="about-heading" className="bg-teal-1">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <SectionLabel number="01" label="Về dự án" />
          <h2
            id="about-heading"
            className="text-3xl font-medium tracking-tight text-teal-12 mt-3 mb-6"
          >
            Tại sao chúng tôi xây cái này
          </h2>
          <div className="space-y-4 text-teal-11 leading-relaxed">
            <p>
              Các tool báo cáo hiện tại mất 3–5 giây để load một report theo
              ngày đơn giản. Với analyst phải nhảy giữa 50 ngày một buổi sáng,
              đó là 4 phút mỗi ngày bị mất.
            </p>
            <p>
              Chúng tôi xây lại từ đầu với loader pattern, prefetch thông minh,
              và caching tầng client. Mục tiêu: chuyển ngày = instant.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TECH STACK — tinted section                                  */}
      {/* ============================================================ */}
      <section
        aria-labelledby="tech-heading"
        className="bg-teal-2 border-t border-teal-3"
      >
        <div className="max-w-3xl mx-auto px-6 py-20">
          <SectionLabel number="02" label="Công nghệ" />
          <h2
            id="tech-heading"
            className="text-3xl font-medium tracking-tight text-teal-12 mt-3 mb-2"
          >
            Stack
          </h2>
          <p className="text-teal-11 mb-8">Những thứ làm nên tốc độ.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TechCard
              icon={<Layers size={18} />}
              category="Frontend"
              items={[
                "React Router v7",
                "Tailwind v4",
                "Lucide",
                "TanStack Query",
              ]}
            />
            <TechCard
              icon={<Database size={18} />}
              category="Backend"
              items={["PostgreSQL", "Drizzle ORM", "Node.js"]}
            />
            <TechCard
              icon={<Cloud size={18} />}
              category="Infrastructure"
              items={["Cloudflare", "Fly.io", "GitHub Actions"]}
            />
            <TechCard
              icon={<Zap size={18} />}
              category="Observability"
              items={["Sentry", "PostHog", "Grafana"]}
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DEMO — light section                                         */}
      {/* ============================================================ */}
      <section id="demo" aria-labelledby="demo-heading" className="bg-teal-1">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <SectionLabel number="03" label="Demo" />
          <h2
            id="demo-heading"
            className="text-3xl font-medium tracking-tight text-teal-12 mt-3 mb-6"
          >
            Xem thử
          </h2>

          <div className="relative aspect-video rounded-xl overflow-hidden border border-teal-11 bg-gradient-to-b from-teal-12 to-teal-11">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative w-full h-full flex flex-col items-center justify-center text-teal-3">
              <Play size={36} className="text-teal-9 mb-2" aria-hidden />
              <span className="font-mono text-xs">[demo.mp4]</span>
            </div>
          </div>

          <a
            href="https://demo.your-app.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-teal-9 hover:text-teal-10 font-medium transition-colors"
          >
            Mở live demo
            <ExternalLink size={14} aria-hidden />
          </a>
        </div>
      </section>

      {/* ============================================================ */}
      {/* NOTIFY — dark CTA section, brand moment #2                   */}
      {/* ============================================================ */}
      <section
        id="notify"
        aria-labelledby="notify-heading"
        className="relative bg-teal-12 text-teal-2 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 py-24">
          <span className="text-xs font-mono uppercase tracking-[0.08em] text-teal-9">
            04 · Đăng ký
          </span>
          <h2
            id="notify-heading"
            className="text-3xl sm:text-4xl font-medium tracking-tight text-white mt-3 mb-3"
          >
            Nhận thông báo khi ra mắt
          </h2>
          <p className="text-teal-3 max-w-lg mb-8 leading-relaxed">
            Để lại email, chúng tôi sẽ gửi thông báo khi sản phẩm chính thức ra
            mắt. Không spam, hủy đăng ký bất cứ lúc nào.
          </p>

          {actionData?.ok ? (
            <div className="flex items-start gap-3 max-w-lg p-4 rounded-lg bg-teal-11/30 border border-teal-9/40">
              <CheckCircle2
                size={20}
                className="text-teal-9 mt-0.5 shrink-0"
                aria-hidden
              />
              <div>
                <p className="font-medium text-white">Đã ghi nhận!</p>
                <p className="text-sm text-teal-3 mt-1">
                  Chúng tôi sẽ gửi thông báo tới{" "}
                  <strong className="text-white">{actionData.email}</strong>.
                </p>
              </div>
            </div>
          ) : (
            <Form
              method="post"
              className="flex flex-col sm:flex-row gap-2 max-w-lg"
            >
              <div className="flex-1 relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-9 z-10"
                  aria-hidden
                />
                <label htmlFor="email" className="sr-only">
                  Email của bạn
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="ban@email.com"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-teal-11 bg-teal-12 text-white placeholder:text-teal-9/60 focus:border-teal-9 focus:outline-none focus:ring-2 focus:ring-teal-9/30 disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg bg-teal-9 hover:bg-teal-10 text-teal-12 font-medium disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? "Đang gửi..." : "Đăng ký"}
              </button>
            </Form>
          )}

          {actionData?.ok === false && (
            <div
              role="alert"
              className="flex items-center gap-2 mt-3 text-sm text-red-300"
            >
              <AlertCircle size={14} aria-hidden />
              {actionData.error}
            </div>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-xs text-teal-9">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={14} aria-hidden />
              Không chia sẻ email
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden />
              Ra mắt Q3 2026
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                        */}
      {/* ============================================================ */}
      <footer className="bg-teal-1 border-t border-teal-3">
        <div className="max-w-3xl mx-auto px-6 py-10 text-sm text-teal-11 flex flex-wrap items-center justify-between gap-3">
          <span>© 2026 Tên của bạn</span>
          <a
            href="https://github.com/you"
            className="hover:text-teal-9 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}

/* ============================================================ */
/* Sub-components                                                */
/* ============================================================ */

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <span className="inline-block text-xs font-mono uppercase tracking-[0.08em] text-teal-9">
      {number} · {label}
    </span>
  );
}

function TechCard({
  icon,
  category,
  items,
}: {
  icon: React.ReactNode;
  category: string;
  items: string[];
}) {
  return (
    <div className="p-4 rounded-lg border border-teal-6 bg-teal-1 hover:border-teal-9 transition-colors">
      <div className="flex items-center gap-2 mb-3 text-teal-9">
        {icon}
        <h3 className="font-medium text-teal-12">{category}</h3>
      </div>
      <ul className="space-y-1 text-sm text-teal-11">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
