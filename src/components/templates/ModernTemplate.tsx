"use client";

import { SalesPageData } from "@/types";

const BG       = "#08080F";
const BG_CARD  = "rgba(255,255,255,0.03)";
const BORDER   = "rgba(255,255,255,0.08)";
const PURPLE   = "#7C3AED";
const PURPLE_L = "#C084FC";
const MUTED    = "#71717A";
const MUTED2   = "#A1A1AA";

const gradientText: React.CSSProperties = {
  background: `linear-gradient(135deg, ${PURPLE_L} 0%, #fff 60%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const glassCard: React.CSSProperties = {
  background: BG_CARD,
  border: `1px solid ${BORDER}`,
  backdropFilter: "blur(12px)",
  borderRadius: "16px",
  padding: "28px",
};

const purpleBorderCard: React.CSSProperties = {
  background: `linear-gradient(${BG}, ${BG}) padding-box, linear-gradient(135deg, ${PURPLE}, ${PURPLE_L}) border-box`,
  border: "1px solid transparent",
  backdropFilter: "blur(12px)",
  borderRadius: "16px",
  padding: "28px",
};

const gradientBtn: React.CSSProperties = {
  background: `linear-gradient(135deg, ${PURPLE} 0%, #9333EA 50%, ${PURPLE_L} 100%)`,
  color: "#fff",
  fontWeight: 700,
  padding: "14px 32px",
  borderRadius: "999px",
  border: "none",
  cursor: "pointer",
  fontSize: "15px",
  letterSpacing: "0.01em",
};

const outlineBtn: React.CSSProperties = {
  background: "transparent",
  color: MUTED2,
  fontWeight: 600,
  padding: "13px 32px",
  borderRadius: "999px",
  border: `1px solid ${BORDER}`,
  cursor: "pointer",
  fontSize: "15px",
};

const Stars = () => (
  <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#A855F7">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function ModernTemplate({ data }: { data: SalesPageData }) {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: BG, color: "#fff" }}>
      {/* Font */}
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');` }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "120px 24px 100px", textAlign: "center" }}>
        {/* Purple glow blob */}
        <div style={{
          position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)",
          width: "700px", height: "400px",
          background: `radial-gradient(ellipse at center, rgba(124,58,237,0.25) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto" }}>
          {/* Badge */}
          {data.hook && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "24px",
              padding: "6px 16px", borderRadius: "999px",
              background: "rgba(124,58,237,0.12)", border: `1px solid rgba(124,58,237,0.35)`,
              fontSize: "12px", fontWeight: 600, color: PURPLE_L, letterSpacing: "0.04em",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: PURPLE_L, display: "inline-block" }} />
              {data.hook}
            </div>
          )}

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.07,
            marginBottom: "20px", letterSpacing: "-0.03em", ...gradientText }}>
            {data.headline}
          </h1>

          {/* Sub-headline */}
          <p style={{ fontSize: "18px", lineHeight: 1.7, color: MUTED2, maxWidth: "520px",
            margin: "0 auto 40px", fontWeight: 400 }}>
            {data.subheadline}
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={gradientBtn}>{data.cta_primary}</button>
            {data.cta_secondary && (
              <button style={outlineBtn}>{data.cta_secondary}</button>
            )}
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: `linear-gradient(90deg, transparent, ${BORDER}, transparent)`,
        }} />
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "17px", lineHeight: 1.85, color: MUTED2, whiteSpace: "pre-line" }}>
          {data.overview}
        </p>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", maxWidth: "1040px", margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
          color: PURPLE_L, textTransform: "uppercase", marginBottom: "12px" }}>
          Why it works
        </p>
        <h2 style={{ textAlign: "center", fontSize: "36px", fontWeight: 800, letterSpacing: "-0.02em",
          marginBottom: "48px" }}>
          Everything you need to succeed
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {data.benefits.map((b, i) => (
            <div key={i} style={i === 1 ? purpleBorderCard : glassCard}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>{b.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "#fff" }}>
                {b.title}
              </h3>
              <p style={{ fontSize: "14px", color: MUTED, lineHeight: 1.7 }}>{b.description}</p>
              {i === 1 && (
                <div style={{ marginTop: "16px", display: "inline-block", fontSize: "11px",
                  fontWeight: 600, color: PURPLE_L, letterSpacing: "0.04em" }}>
                  Most popular ✦
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", maxWidth: "760px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
          color: PURPLE_L, textTransform: "uppercase", marginBottom: "12px" }}>
          Features
        </p>
        <h2 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "40px" }}>
          Built for the details
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {data.features.map((f, i) => (
            <div key={i} style={{
              display: "flex", gap: "20px", padding: "20px 0",
              borderBottom: `1px solid ${BORDER}`,
            }}>
              <div style={{
                width: "3px", borderRadius: "2px", flexShrink: 0,
                background: `linear-gradient(180deg, ${PURPLE} 0%, ${PURPLE_L} 100%)`,
                alignSelf: "stretch",
              }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px", color: "#fff" }}>
                  {f.name}
                </p>
                <p style={{ fontSize: "13px", color: MUTED, lineHeight: 1.6 }}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      {(data.testimonials?.length ?? 0) > 0 && (
        <section style={{ padding: "80px 24px", maxWidth: "1040px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
            color: PURPLE_L, textTransform: "uppercase", marginBottom: "12px" }}>
            Social proof
          </p>
          <h2 style={{ textAlign: "center", fontSize: "36px", fontWeight: 800,
            letterSpacing: "-0.02em", marginBottom: "48px" }}>
            Loved by builders worldwide
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {data.testimonials.map((t, i) => (
              <div key={i} style={glassCard}>
                <Stars />
                <p style={{ fontSize: "14px", color: MUTED2, lineHeight: 1.75,
                  marginBottom: "20px", fontStyle: "italic" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_L})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "14px", fontWeight: 700, color: "#fff",
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "13px", color: "#fff" }}>{t.name}</p>
                    <p style={{ fontSize: "12px", color: MUTED }}>
                      {t.role}{t.company ? `, ${t.company}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── PRICING ──────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
          color: PURPLE_L, textTransform: "uppercase", marginBottom: "12px" }}>
          Pricing
        </p>
        <h2 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "40px" }}>
          One simple plan
        </h2>

        <div style={{
          ...glassCard,
          boxShadow: `0 0 0 1px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.15)`,
          padding: "40px",
        }}>
          <p style={{ fontSize: "52px", fontWeight: 900, letterSpacing: "-0.03em", ...gradientText, marginBottom: "4px" }}>
            {data.pricing.price}
          </p>
          {data.pricing.period && (
            <p style={{ fontSize: "14px", color: MUTED, marginBottom: "28px" }}>{data.pricing.period}</p>
          )}

          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "24px", marginBottom: "28px" }}>
            {data.pricing.includes.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 0", borderBottom: i < data.pricing.includes.length - 1 ? `1px solid ${BORDER}` : "none",
                textAlign: "left",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PURPLE_L} strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ fontSize: "13px", color: MUTED2 }}>{item}</span>
              </div>
            ))}
          </div>

          <button style={{ ...gradientBtn, width: "100%", fontSize: "16px", padding: "16px 32px" }}>
            {data.cta_primary}
          </button>
          {data.urgency && (
            <p style={{ marginTop: "14px", fontSize: "12px", color: MUTED }}>{data.urgency}</p>
          )}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "100px 24px", textAlign: "center" }}>
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(192,132,252,0.08) 50%, transparent 100%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: `linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)`,
        }} />

        <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900,
            letterSpacing: "-0.03em", marginBottom: "16px", ...gradientText }}>
            Start building today.
          </h2>
          <p style={{ fontSize: "17px", color: MUTED2, marginBottom: "40px", lineHeight: 1.6 }}>
            {data.subheadline}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ ...gradientBtn, padding: "16px 40px", fontSize: "16px" }}>
              {data.cta_primary}
            </button>
            {data.cta_secondary && (
              <button style={outlineBtn}>{data.cta_secondary}</button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
