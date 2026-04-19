"use client";

import { SalesPageData } from "@/types";

const NAVY   = "#0F172A";
const BLUE   = "#2563EB";
const BLUE_L = "#EFF6FF";
const GRAY   = "#64748B";
const GRAY_L = "#F8FAFC";
const BORDER = "#E2E8F0";

const solidBtn: React.CSSProperties = {
  background: NAVY,
  color: "#fff",
  fontWeight: 600,
  padding: "13px 28px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "15px",
  letterSpacing: "0.01em",
};

const outlineBtn: React.CSSProperties = {
  background: "transparent",
  color: NAVY,
  fontWeight: 600,
  padding: "12px 28px",
  borderRadius: "8px",
  border: `1.5px solid ${BORDER}`,
  cursor: "pointer",
  fontSize: "15px",
};

const divider: React.CSSProperties = {
  border: "none",
  borderTop: `1px solid ${BORDER}`,
  margin: 0,
};

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function MinimalTemplate({ data }: { data: SalesPageData }) {
  const featured = data.testimonials?.[0];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: NAVY }}>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');` }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "100px 24px 88px", textAlign: "center" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>

          {/* Trust badge */}
          {data.hook && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              marginBottom: "28px", padding: "6px 14px 6px 6px",
              background: BLUE_L, borderRadius: "999px",
              border: `1px solid #BFDBFE`,
            }}>
              <span style={{
                background: BLUE, color: "#fff", fontSize: "10px", fontWeight: 700,
                padding: "3px 8px", borderRadius: "999px", letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                Trusted
              </span>
              <span style={{ fontSize: "13px", fontWeight: 500, color: BLUE }}>
                {data.hook}
              </span>
            </div>
          )}

          {/* Headline — two-tone */}
          <h1 style={{
            fontSize: "clamp(38px, 5.5vw, 64px)", fontWeight: 900,
            lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "20px",
          }}>
            <span style={{ color: NAVY }}>{data.headline.split(" ").slice(0, Math.ceil(data.headline.split(" ").length / 2)).join(" ")}</span>
            {" "}
            <span style={{ color: BLUE }}>{data.headline.split(" ").slice(Math.ceil(data.headline.split(" ").length / 2)).join(" ")}</span>
          </h1>

          <p style={{
            fontSize: "18px", lineHeight: 1.7, color: GRAY,
            maxWidth: "520px", margin: "0 auto 40px", fontWeight: 400,
          }}>
            {data.subheadline}
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={solidBtn}>{data.cta_primary}</button>
            {data.cta_secondary && <button style={outlineBtn}>{data.cta_secondary}</button>}
          </div>
        </div>
      </section>

      <hr style={divider} />

      {/* ── OVERVIEW ─────────────────────────────────────── */}
      <section style={{ background: GRAY_L, padding: "72px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
            color: BLUE, textTransform: "uppercase", marginBottom: "16px",
          }}>
            About
          </p>
          <p style={{ fontSize: "17px", lineHeight: 1.85, color: GRAY, whiteSpace: "pre-line" }}>
            {data.overview}
          </p>
        </div>
      </section>

      <hr style={divider} />

      {/* ── BENEFITS ─────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
            color: BLUE, textTransform: "uppercase", marginBottom: "12px",
          }}>
            Benefits
          </p>
          <h2 style={{
            fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em",
            marginBottom: "40px", color: NAVY,
          }}>
            Why teams choose us
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {data.benefits.map((b, i) => (
              <div key={i} style={{
                display: "flex", gap: "20px", alignItems: "flex-start",
                padding: "24px", borderRadius: "12px",
                border: `1px solid ${BORDER}`,
                borderLeft: `3px solid ${i % 2 === 0 ? BLUE : NAVY}`,
                background: "#fff",
              }}>
                {/* Icon circle */}
                <div style={{
                  width: "44px", height: "44px", borderRadius: "10px", flexShrink: 0,
                  background: BLUE_L, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "22px",
                }}>
                  {b.icon}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "15px", color: NAVY, marginBottom: "6px" }}>
                    {b.title}
                  </p>
                  <p style={{ fontSize: "14px", color: GRAY, lineHeight: 1.65 }}>
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={divider} />

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section style={{ background: GRAY_L, padding: "80px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
            color: BLUE, textTransform: "uppercase", marginBottom: "12px",
          }}>
            Features
          </p>
          <h2 style={{
            fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em",
            marginBottom: "40px", color: NAVY,
          }}>
            Everything included
          </h2>

          {data.features.map((f, i) => (
            <div key={i}>
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", padding: "24px 0" }}>
                <span style={{
                  fontFamily: "monospace", fontSize: "13px", fontWeight: 700,
                  color: BLUE, flexShrink: 0, paddingTop: "2px", minWidth: "28px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "15px", color: NAVY, marginBottom: "5px" }}>
                    {f.name}
                  </p>
                  <p style={{ fontSize: "14px", color: GRAY, lineHeight: 1.65 }}>
                    {f.description}
                  </p>
                </div>
              </div>
              {i < data.features.length - 1 && <hr style={divider} />}
            </div>
          ))}
        </div>
      </section>

      <hr style={divider} />

      {/* ── SOCIAL PROOF ─────────────────────────────────── */}
      {featured && (
        <section style={{ background: "#fff", padding: "80px 24px" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <p style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
              color: BLUE, textTransform: "uppercase", marginBottom: "32px",
            }}>
              Customer story
            </p>

            <div style={{
              background: GRAY_L, borderRadius: "16px", padding: "40px",
              border: `1px solid ${BORDER}`,
            }}>
              {/* Stars */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill={BLUE}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontSize: "19px", lineHeight: 1.7, color: NAVY,
                fontWeight: 500, fontStyle: "italic", marginBottom: "28px",
              }}>
                &ldquo;{featured.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "50%", flexShrink: 0,
                  background: NAVY, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "#fff",
                }}>
                  {featured.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "14px", color: NAVY }}>{featured.name}</p>
                  <p style={{ fontSize: "13px", color: GRAY }}>
                    {featured.role}{featured.company ? `, ${featured.company}` : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Other testimonials — compact */}
            {data.testimonials.length > 1 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                {data.testimonials.slice(1).map((t, i) => (
                  <div key={i} style={{
                    padding: "20px", borderRadius: "12px",
                    border: `1px solid ${BORDER}`, background: "#fff",
                  }}>
                    <p style={{ fontSize: "13px", color: GRAY, lineHeight: 1.65,
                      fontStyle: "italic", marginBottom: "14px" }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: NAVY }}>{t.name}</p>
                    <p style={{ fontSize: "12px", color: GRAY }}>{t.role}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <hr style={divider} />

      {/* ── PRICING ──────────────────────────────────────── */}
      <section style={{ background: GRAY_L, padding: "80px 24px" }}>
        <div style={{ maxWidth: "440px", margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
            color: BLUE, textTransform: "uppercase", marginBottom: "12px",
          }}>
            Pricing
          </p>
          <h2 style={{
            fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em",
            marginBottom: "36px", color: NAVY,
          }}>
            Simple, transparent pricing
          </h2>

          <div style={{
            background: "#fff", borderRadius: "16px",
            border: `2px solid ${NAVY}`, padding: "36px",
            textAlign: "left",
          }}>
            <p style={{
              fontSize: "44px", fontWeight: 900, color: NAVY,
              letterSpacing: "-0.03em", marginBottom: "4px",
            }}>
              {data.pricing.price}
            </p>
            {data.pricing.period && (
              <p style={{ fontSize: "14px", color: GRAY, marginBottom: "24px" }}>
                {data.pricing.period}
              </p>
            )}

            <hr style={{ ...divider, marginBottom: "20px" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              {data.pricing.includes.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Check />
                  <span style={{ fontSize: "14px", color: GRAY }}>{item}</span>
                </div>
              ))}
            </div>

            <button style={{ ...solidBtn, width: "100%", textAlign: "center",
              padding: "15px 28px", borderRadius: "999px", fontSize: "15px" }}>
              {data.cta_primary}
            </button>

            {data.urgency && (
              <p style={{ marginTop: "14px", fontSize: "12px", color: GRAY, textAlign: "center" }}>
                {data.urgency}
              </p>
            )}
          </div>
        </div>
      </section>

      <hr style={divider} />

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section style={{ background: "#0F172A", padding: "96px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900,
            letterSpacing: "-0.03em", color: "#fff", marginBottom: "16px",
          }}>
            Ready to get started?
          </h2>
          <p style={{ fontSize: "17px", color: "#94A3B8", marginBottom: "36px", lineHeight: 1.6 }}>
            {data.subheadline}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: BLUE, color: "#fff", fontWeight: 600,
              padding: "14px 32px", borderRadius: "999px",
              border: "none", cursor: "pointer", fontSize: "15px",
            }}>
              {data.cta_primary}
            </button>
            {data.cta_secondary && (
              <button style={{
                background: "transparent", color: "#94A3B8", fontWeight: 500,
                padding: "13px 32px", borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontSize: "15px",
              }}>
                {data.cta_secondary}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
