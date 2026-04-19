"use client";

import { SalesPageData } from "@/types";

const ORANGE     = "#FF6B35";
const ORANGE_MID = "#F7931E";
const YELLOW     = "#FFD23F";
const SLATE_DARK = "#1E293B";
const SLATE      = "#334155";
const SLATE_MID  = "#475569";
const AMBER_BG   = "#FFF7ED";
const AMBER_BDR  = "#FED7AA";

const heroGrad = `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_MID} 50%, ${YELLOW} 100%)`;
const ctaGrad  = `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_MID} 100%)`;

const CARD_COLORS = [
  { bg: "#FFFBEB", border: "#FDE68A", accent: "#D97706" },
  { bg: "#FFF1F2", border: "#FECDD3", accent: "#E11D48" },
  { bg: "#F0FDF4", border: "#BBF7D0", accent: "#16A34A" },
  { bg: "#F5F3FF", border: "#DDD6FE", accent: "#7C3AED" },
];

const Stars = ({ color = "#F59E0B" }: { color?: string }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill={color}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function BoldTemplate({ data }: { data: SalesPageData }) {
  const words    = data.headline.split(" ");
  const mid      = Math.ceil(words.length / 2);
  const line1    = words.slice(0, mid).join(" ");
  const line2    = words.slice(mid).join(" ");
  const featured = data.testimonials?.[0];

  return (
    <div style={{ fontFamily: "'Inter', 'system-ui', sans-serif", background: "#fff", color: SLATE_DARK }}>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');` }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ background: heroGrad, padding: "80px 24px 88px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Texture overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,1) 40px, rgba(0,0,0,1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,1) 40px, rgba(0,0,0,1) 41px)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto" }}>
          {/* LIMITED OFFER badge */}
          <div style={{ marginBottom: "24px" }}>
            <span style={{
              display: "inline-block", background: "rgba(0,0,0,0.2)",
              color: "#fff", fontSize: "11px", fontWeight: 800,
              padding: "6px 16px", borderRadius: "999px",
              letterSpacing: "0.12em", textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.3)",
            }}>
              🔥 Limited Offer — Act Now
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(40px, 6.5vw, 72px)", fontWeight: 900,
            lineHeight: 1.05, letterSpacing: "-0.025em",
            color: "#fff", marginBottom: "20px",
            textShadow: "0 2px 20px rgba(0,0,0,0.15)",
          }}>
            {line1}
            <br />
            <span style={{ color: "rgba(255,255,255,0.9)" }}>{line2}</span>
          </h1>

          <p style={{
            fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,0.9)",
            maxWidth: "520px", margin: "0 auto 36px", fontWeight: 400,
          }}>
            {data.subheadline}
          </p>

          {/* Hook below sub */}
          {data.hook && (
            <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.75)",
              marginBottom: "28px", letterSpacing: "0.01em" }}>
              ✓ {data.hook}
            </p>
          )}

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: "#fff", color: ORANGE, fontWeight: 800,
              padding: "16px 36px", borderRadius: "8px", border: "none",
              cursor: "pointer", fontSize: "16px", letterSpacing: "0.01em",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            }}>
              {data.cta_primary} →
            </button>
            {data.cta_secondary && (
              <button style={{
                background: "transparent", color: "#fff", fontWeight: 600,
                padding: "15px 28px", borderRadius: "8px",
                border: "2px solid rgba(255,255,255,0.5)",
                cursor: "pointer", fontSize: "15px",
              }}>
                {data.cta_secondary}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW (2-col) ─────────────────────────────── */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
            <div>
              <p style={{
                fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em",
                color: ORANGE, textTransform: "uppercase", marginBottom: "12px",
              }}>
                What is it?
              </p>
              <h2 style={{
                fontSize: "28px", fontWeight: 800, letterSpacing: "-0.02em",
                color: SLATE_DARK, lineHeight: 1.25, marginBottom: "0",
              }}>
                {data.headline}
              </h2>
            </div>
            <div>
              <p style={{ fontSize: "16px", color: SLATE_MID, lineHeight: 1.8 }}>
                {data.overview.split("\n")[0]}
              </p>
            </div>
          </div>
          {data.overview.split("\n").length > 1 && (
            <p style={{ fontSize: "15px", color: SLATE_MID, lineHeight: 1.8,
              marginTop: "24px", paddingTop: "24px",
              borderTop: "1px solid #F1F5F9" }}>
              {data.overview.split("\n").slice(1).join(" ")}
            </p>
          )}
        </div>
      </section>

      {/* ── BENEFITS (2×2 grid) ──────────────────────────── */}
      <section style={{ background: "#F8FAFC", padding: "72px 24px" }}>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <p style={{
            fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em",
            color: ORANGE, textTransform: "uppercase", marginBottom: "12px",
            textAlign: "center",
          }}>
            Why it works
          </p>
          <h2 style={{
            fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em",
            color: SLATE_DARK, textAlign: "center", marginBottom: "40px",
          }}>
            The unfair advantages
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {data.benefits.slice(0, 4).map((b, i) => {
              const c = CARD_COLORS[i % CARD_COLORS.length];
              return (
                <div key={i} style={{
                  background: c.bg, borderRadius: "12px",
                  border: `2px solid ${c.border}`,
                  padding: "28px",
                }}>
                  <div style={{
                    fontSize: "32px", marginBottom: "14px",
                    width: "52px", height: "52px", borderRadius: "12px",
                    background: "#fff", display: "flex", alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 0 1px ${c.border}`,
                  }}>
                    {b.icon}
                  </div>
                  <p style={{ fontWeight: 800, fontSize: "15px", color: c.accent, marginBottom: "8px" }}>
                    {b.title}
                  </p>
                  <p style={{ fontSize: "13px", color: SLATE_MID, lineHeight: 1.65 }}>
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES (dark) ──────────────────────────────── */}
      <section style={{ background: SLATE_DARK, padding: "72px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{
            fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em",
            color: YELLOW, textTransform: "uppercase", marginBottom: "12px",
          }}>
            Everything you get
          </p>
          <h2 style={{
            fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em",
            color: "#fff", marginBottom: "40px",
          }}>
            Packed with features
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {data.features.map((f, i) => (
              <div key={i} style={{
                display: "flex", gap: "20px", alignItems: "flex-start",
                padding: "20px 0",
                borderBottom: i < data.features.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <span style={{
                  fontFamily: "monospace", fontWeight: 800, fontSize: "13px",
                  color: ORANGE, flexShrink: 0, paddingTop: "2px", minWidth: "28px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "15px", color: "#fff", marginBottom: "4px" }}>
                    {f.name}
                  </p>
                  <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.65 }}>
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────── */}
      {featured && (
        <section style={{ background: AMBER_BG, padding: "72px 24px", borderTop: `1px solid ${AMBER_BDR}` }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <p style={{
              fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em",
              color: ORANGE, textTransform: "uppercase", marginBottom: "20px",
            }}>
              Real results
            </p>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Stars />
            </div>

            <p style={{
              fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 600,
              lineHeight: 1.55, color: SLATE_DARK, fontStyle: "italic",
              marginBottom: "28px", letterSpacing: "-0.01em",
            }}>
              &ldquo;{featured.quote}&rdquo;
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "50%",
                background: ctaGrad, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "16px", fontWeight: 800, color: "#fff",
              }}>
                {featured.name.charAt(0)}
              </div>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontWeight: 800, fontSize: "15px", color: SLATE_DARK }}>
                  {featured.name}
                </p>
                <p style={{ fontSize: "13px", color: SLATE_MID }}>
                  {featured.role}{featured.company ? `, ${featured.company}` : ""}
                </p>
              </div>
            </div>

            {/* Other reviews compact */}
            {data.testimonials.length > 1 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "32px" }}>
                {data.testimonials.slice(1).map((t, i) => (
                  <div key={i} style={{
                    background: "#fff", borderRadius: "10px",
                    border: `1px solid ${AMBER_BDR}`, padding: "16px",
                    textAlign: "left",
                  }}>
                    <div style={{ marginBottom: "8px" }}>
                      <Stars color="#F59E0B" />
                    </div>
                    <p style={{ fontSize: "12px", color: SLATE_MID, lineHeight: 1.65,
                      fontStyle: "italic", marginBottom: "10px" }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: SLATE_DARK }}>{t.name}</p>
                    <p style={{ fontSize: "11px", color: SLATE_MID }}>{t.role}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── PRICING ──────────────────────────────────────── */}
      <section style={{ background: heroGrad, padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,1) 20px, rgba(0,0,0,1) 21px)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "480px", margin: "0 auto" }}>
          <p style={{
            fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "12px",
          }}>
            💥 Special pricing
          </p>

          <div style={{ marginBottom: "8px" }}>
            <span style={{
              fontSize: "16px", color: "rgba(255,255,255,0.6)", fontWeight: 500,
              textDecoration: "line-through", marginRight: "8px",
            }}>
              Regular price
            </span>
          </div>

          <p style={{
            fontSize: "clamp(52px, 8vw, 80px)", fontWeight: 900,
            color: "#fff", lineHeight: 1, letterSpacing: "-0.04em",
            marginBottom: "8px", textShadow: "0 2px 20px rgba(0,0,0,0.15)",
          }}>
            {data.pricing.price}
          </p>

          {data.pricing.period && (
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>
              {data.pricing.period}
            </p>
          )}

          {data.urgency && (
            <div style={{
              display: "inline-block", background: "rgba(0,0,0,0.2)",
              color: "#fff", fontSize: "12px", fontWeight: 700,
              padding: "5px 14px", borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.25)",
              marginBottom: "28px", letterSpacing: "0.04em",
            }}>
              ⏰ {data.urgency}
            </div>
          )}

          {/* Includes list */}
          <div style={{
            background: "rgba(255,255,255,0.15)", borderRadius: "12px",
            padding: "20px 24px", marginBottom: "28px",
            backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)",
            textAlign: "left",
          }}>
            {data.pricing.includes.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "8px 0",
                borderBottom: i < data.pricing.includes.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
              }}>
                <span style={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>

          <button style={{
            background: "#fff", color: ORANGE, fontWeight: 800,
            padding: "18px 48px", borderRadius: "8px", border: "none",
            cursor: "pointer", fontSize: "17px", width: "100%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            letterSpacing: "0.01em",
          }}>
            {data.cta_primary} →
          </button>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section style={{ background: SLATE_DARK, padding: "88px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900,
            letterSpacing: "-0.025em", lineHeight: 1.1,
            color: "#fff", marginBottom: "16px",
          }}>
            Don&apos;t miss this.{" "}
            <span style={{ color: YELLOW }}>Get it now.</span>
          </h2>
          <p style={{
            fontSize: "16px", color: "#94A3B8", marginBottom: "12px", lineHeight: 1.6,
          }}>
            {data.subheadline}
          </p>
          {data.urgency && (
            <p style={{ fontSize: "13px", color: ORANGE, fontWeight: 700, marginBottom: "32px" }}>
              ⚡ {data.urgency}
            </p>
          )}
          <button style={{
            background: ctaGrad, color: "#fff", fontWeight: 800,
            padding: "16px 44px", borderRadius: "8px", border: "none",
            cursor: "pointer", fontSize: "17px",
            boxShadow: `0 8px 32px rgba(255,107,53,0.4)`,
          }}>
            {data.cta_primary} →
          </button>
        </div>
      </section>
    </div>
  );
}
