import type { SalesPageData } from "@/types";

const cdn = `<script src="https://cdn.tailwindcss.com"></script>`;

function stars() {
  return Array(5).fill(`<svg class="w-4 h-4 text-yellow-400 fill-current inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`).join("");
}

function check(cls = "text-indigo-500") {
  return `<svg class="w-4 h-4 ${cls} shrink-0 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>`;
}

function wrap(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  ${cdn}
</head>
<body class="antialiased font-sans">${body}</body>
</html>`;
}

function modern(d: SalesPageData): string {
  const benefits = d.benefits.map(b => `
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div class="text-4xl mb-3">${b.icon}</div>
      <h3 class="font-bold text-slate-900 mb-2">${b.title}</h3>
      <p class="text-slate-500 text-sm leading-relaxed">${b.description}</p>
    </div>`).join("");

  const features = d.features.map(f => `
    <div class="flex gap-3 p-4 rounded-xl border border-slate-100">
      <div class="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white">${check("text-white")}</div>
      <div><p class="font-semibold text-slate-800">${f.name}</p><p class="text-slate-500 text-sm mt-0.5">${f.description}</p></div>
    </div>`).join("");

  const testimonials = (d.testimonials ?? []).map(t => `
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div class="mb-3">${stars()}</div>
      <p class="text-slate-600 text-sm leading-relaxed mb-4 italic">&ldquo;${t.quote}&rdquo;</p>
      <p class="font-semibold text-slate-900 text-sm">${t.name}</p>
      <p class="text-slate-400 text-xs">${t.role}${t.company ? `, ${t.company}` : ""}</p>
    </div>`).join("");

  const includes = d.pricing.includes.map(i => `
    <li class="flex items-center gap-2 text-sm text-slate-600">${check()} ${i}</li>`).join("");

  return `
  <section class="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-24 px-6 text-center">
    <div class="max-w-3xl mx-auto">
      ${d.hook ? `<div class="inline-block bg-indigo-500/40 text-indigo-100 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">${d.hook}</div>` : ""}
      <h1 class="text-5xl font-bold leading-tight mb-5">${d.headline}</h1>
      <p class="text-xl text-indigo-100 mb-10 leading-relaxed">${d.subheadline}</p>
      <button class="bg-white text-indigo-600 font-bold px-8 py-4 rounded-full text-lg shadow-lg">${d.cta_primary}</button>
    </div>
  </section>
  <section class="py-20 px-6 bg-white"><div class="max-w-3xl mx-auto text-center"><p class="text-lg text-slate-600 leading-loose">${d.overview}</p></div></section>
  <section class="py-20 px-6 bg-slate-50">
    <div class="max-w-5xl mx-auto"><h2 class="text-3xl font-bold text-slate-900 text-center mb-12">Why Choose Us</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${benefits}</div></div>
  </section>
  <section class="py-20 px-6 bg-white">
    <div class="max-w-4xl mx-auto"><h2 class="text-3xl font-bold text-slate-900 text-center mb-12">Everything You Need</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${features}</div></div>
  </section>
  ${testimonials ? `<section class="py-20 px-6 bg-slate-50"><div class="max-w-5xl mx-auto"><h2 class="text-3xl font-bold text-slate-900 text-center mb-12">What Our Customers Say</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6">${testimonials}</div></div></section>` : ""}
  <section class="py-20 px-6 bg-white">
    <div class="max-w-md mx-auto text-center">
      <h2 class="text-3xl font-bold text-slate-900 mb-10">Simple, Transparent Pricing</h2>
      <div class="bg-slate-50 rounded-2xl p-8 border border-slate-200">
        <p class="text-5xl font-bold text-indigo-600 mb-1">${d.pricing.price}</p>
        ${d.pricing.period ? `<p class="text-slate-500 mb-6">${d.pricing.period}</p>` : ""}
        <ul class="space-y-2.5 mb-8 text-left">${includes}</ul>
        <button class="w-full bg-indigo-600 text-white font-bold py-4 rounded-full text-lg">${d.cta_primary}</button>
        ${d.urgency ? `<p class="mt-4 text-xs text-slate-400">${d.urgency}</p>` : ""}
      </div>
    </div>
  </section>
  <section class="py-20 px-6 bg-indigo-600 text-white text-center">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p class="text-indigo-200 mb-8 text-lg">${d.subheadline}</p>
      <button class="bg-white text-indigo-600 font-bold px-10 py-4 rounded-full text-lg">${d.cta_primary}</button>
    </div>
  </section>`;
}

function minimal(d: SalesPageData): string {
  const benefits = d.benefits.map(b => `
    <div><div class="text-3xl mb-3">${b.icon}</div><h3 class="font-bold text-slate-900 mb-2">${b.title}</h3><p class="text-slate-400 text-sm leading-relaxed">${b.description}</p></div>`).join("");

  const features = d.features.map((f, i) => `
    <div class="flex gap-6 py-5 border-b border-slate-100">
      <span class="text-slate-200 font-mono text-sm shrink-0 w-8">${String(i + 1).padStart(2, "0")}</span>
      <div><p class="font-semibold text-slate-800">${f.name}</p><p class="text-slate-400 text-sm mt-0.5">${f.description}</p></div>
    </div>`).join("");

  const testimonials = (d.testimonials ?? []).map(t => `
    <div>
      <p class="text-slate-700 text-xl leading-relaxed italic">&ldquo;${t.quote}&rdquo;</p>
      <p class="mt-4 text-slate-400 text-sm">- ${t.name}, ${t.role}${t.company ? `, ${t.company}` : ""}</p>
    </div>`).join("");

  const includes = d.pricing.includes.map(i => `
    <li class="flex items-center gap-3 py-3 border-b border-slate-100 text-sm text-slate-600"><span class="text-slate-300">-</span>${i}</li>`).join("");

  return `
  <section class="max-w-3xl mx-auto px-6 pt-28 pb-24 text-center">
    ${d.hook ? `<p class="text-slate-400 text-xs tracking-widest uppercase mb-8">${d.hook}</p>` : ""}
    <h1 class="text-6xl font-black leading-tight mb-6">${d.headline}</h1>
    <p class="text-xl text-slate-500 leading-relaxed mb-12">${d.subheadline}</p>
    <button class="bg-slate-900 text-white font-semibold px-8 py-3.5 rounded-full">${d.cta_primary}</button>
  </section>
  <div class="max-w-4xl mx-auto px-6 border-t border-slate-100"></div>
  <section class="max-w-2xl mx-auto px-6 py-24"><p class="text-lg text-slate-500 leading-loose">${d.overview}</p></section>
  <div class="max-w-4xl mx-auto px-6 border-t border-slate-100"></div>
  <section class="max-w-4xl mx-auto px-6 py-24">
    <h2 class="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-12">Why it works</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">${benefits}</div>
  </section>
  <div class="max-w-4xl mx-auto px-6 border-t border-slate-100"></div>
  <section class="max-w-3xl mx-auto px-6 py-24">
    <h2 class="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">What's included</h2>
    ${features}
  </section>
  ${testimonials ? `<div class="max-w-4xl mx-auto px-6 border-t border-slate-100"></div><section class="max-w-3xl mx-auto px-6 py-24"><h2 class="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-12">What people say</h2><div class="space-y-10">${testimonials}</div></section>` : ""}
  <div class="max-w-4xl mx-auto px-6 border-t border-slate-100"></div>
  <section class="max-w-sm mx-auto px-6 py-24 text-center">
    <p class="text-4xl font-black text-slate-900 mb-1">${d.pricing.price}</p>
    ${d.pricing.period ? `<p class="text-slate-400 text-sm mb-10">${d.pricing.period}</p>` : "<div class='mb-10'></div>"}
    <ul class="text-left mb-10">${includes}</ul>
    <button class="w-full border-2 border-slate-900 text-slate-900 font-bold py-3.5 rounded-full">${d.cta_primary}</button>
    ${d.urgency ? `<p class="mt-4 text-xs text-slate-400">${d.urgency}</p>` : ""}
  </section>
  <div class="border-t border-slate-100">
    <section class="max-w-xl mx-auto px-6 py-24 text-center">
      <h2 class="text-3xl font-black mb-4">Start today.</h2>
      <p class="text-slate-400 mb-10">${d.subheadline}</p>
      <button class="bg-slate-900 text-white font-bold px-10 py-4 rounded-full">${d.cta_primary}</button>
    </section>
  </div>`;
}

function bold(d: SalesPageData): string {
  const benefits = d.benefits.map(b => `
    <div class="bg-slate-900 p-8 hover:bg-slate-800">
      <div class="text-4xl mb-4">${b.icon}</div>
      <h3 class="font-black text-yellow-400 text-lg mb-3 uppercase">${b.title}</h3>
      <p class="text-slate-400 text-sm leading-relaxed">${b.description}</p>
    </div>`).join("");

  const features = d.features.map((f, i) => `
    <div class="flex gap-5 p-5 bg-slate-50 border-l-4 border-yellow-400">
      <span class="font-black text-yellow-400 text-2xl shrink-0">${String(i + 1).padStart(2, "0")}</span>
      <div><p class="font-black text-slate-900 uppercase text-sm">${f.name}</p><p class="text-slate-500 text-sm mt-1">${f.description}</p></div>
    </div>`).join("");

  const testimonials = (d.testimonials ?? []).map(t => `
    <div class="bg-slate-800 p-6 border-t-4 border-yellow-400">
      <p class="text-slate-300 text-sm leading-relaxed mb-5">&ldquo;${t.quote}&rdquo;</p>
      <p class="font-black text-white text-sm uppercase">${t.name}</p>
      <p class="text-slate-500 text-xs">${t.role}${t.company ? `, ${t.company}` : ""}</p>
    </div>`).join("");

  const includes = d.pricing.includes.map(i => `
    <div class="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
      <span class="font-black text-yellow-400 text-lg">✓</span>
      <span class="text-slate-700 text-sm font-semibold">${i}</span>
    </div>`).join("");

  return `
  <section class="bg-slate-900 text-white px-6 py-28 text-center">
    <div class="max-w-4xl mx-auto">
      ${d.hook ? `<span class="inline-block bg-yellow-400 text-slate-900 text-xs font-black px-4 py-2 mb-8 uppercase tracking-widest">${d.hook}</span>` : ""}
      <h1 class="text-7xl font-black text-yellow-400 leading-none mb-6 uppercase">${d.headline}</h1>
      <p class="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">${d.subheadline}</p>
      <button class="bg-yellow-400 text-slate-900 font-black px-10 py-4 text-lg uppercase tracking-wider">${d.cta_primary}</button>
    </div>
  </section>
  <section class="bg-slate-800 px-6 py-16"><div class="max-w-3xl mx-auto"><p class="text-slate-300 text-lg leading-relaxed">${d.overview}</p></div></section>
  <section class="bg-slate-900 px-6 py-20">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12"><h2 class="text-4xl font-black text-white uppercase">The Advantage</h2><div class="w-20 h-1 bg-yellow-400 mx-auto mt-3"></div></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-700">${benefits}</div>
    </div>
  </section>
  <section class="bg-white px-6 py-20">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12"><h2 class="text-4xl font-black text-slate-900 uppercase">What You Get</h2><div class="w-20 h-1 bg-yellow-400 mx-auto mt-3"></div></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${features}</div>
    </div>
  </section>
  ${testimonials ? `<section class="bg-slate-900 px-6 py-20"><div class="max-w-5xl mx-auto"><div class="text-center mb-12"><h2 class="text-4xl font-black text-white uppercase">Real Results</h2><div class="w-20 h-1 bg-yellow-400 mx-auto mt-3"></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6">${testimonials}</div></div></section>` : ""}
  <section class="bg-yellow-400 px-6 py-20">
    <div class="max-w-lg mx-auto text-center">
      <h2 class="text-4xl font-black text-slate-900 uppercase mb-6">Get It Now</h2>
      <p class="text-6xl font-black text-slate-900 mb-1">${d.pricing.price}</p>
      ${d.pricing.period ? `<p class="text-slate-700 font-semibold mb-6">${d.pricing.period}</p>` : ""}
      <div class="bg-white p-6 mb-6 text-left">${includes}</div>
      <button class="w-full bg-slate-900 text-yellow-400 font-black py-5 text-xl uppercase tracking-wider">${d.cta_primary}</button>
      ${d.urgency ? `<p class="mt-4 text-slate-700 font-bold text-sm">${d.urgency}</p>` : ""}
    </div>
  </section>
  <section class="bg-slate-900 px-6 py-20 text-center">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-5xl font-black text-yellow-400 uppercase mb-4 leading-tight">Don't Wait.<br>Act Now.</h2>
      <p class="text-slate-400 mb-10 text-lg">${d.subheadline}</p>
      <button class="bg-yellow-400 text-slate-900 font-black px-12 py-5 text-xl uppercase tracking-wider">${d.cta_primary}</button>
    </div>
  </section>`;
}

export function generateHtml(data: SalesPageData, template: string): string {
  const body = template === "minimal" ? minimal(data) : template === "bold" ? bold(data) : modern(data);
  return wrap(data.headline, body);
}
