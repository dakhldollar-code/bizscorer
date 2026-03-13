import { useState } from "react";
// zidly.ai/free-tools — Zero-cost tools that drive organic traffic
// Each tool works standalone, captures emails, funnels to BizScorer
const T = "#0D9488", TD = "#0F766E", TL = "#14B8A6";
// Tool 1: Google Review Link Generator
function ReviewLinkGen() {
  const [name, setName] = useState(""); const [result, setResult] = useState("");
  const generate = () => {
    if (!name.trim()) return;
    // In production: use Google Places Autocomplete to get place_id
    // Then construct: https://search.google.com/local/writereview?placeid=XXXXX
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(name.trim())}`;
    setResult(searchUrl);
  };
  return <div>
    <p style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>Generate a direct link to your Google review page. Share it with customers via text, email, or QR code.</p>
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your business name + city" style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none" }} onKeyDown={e => e.key === "Enter" && generate()} />
      <button onClick={generate} style={{ padding: "10px 18px", background: T, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Generate</button>
    </div>
    {result && <div style={{ padding: 14, background: "#F0FDF4", borderRadius: 10, border: "1px solid #BBF7D0" }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: "#166534", marginBottom: 6 }}>Your review link:</p>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input value={result} readOnly style={{ flex: 1, padding: "8px 12px", border: "1px solid #BBF7D0", borderRadius: 6, fontSize: 12, fontFamily: "monospace", background: "#fff" }} />
        <button onClick={() => navigator.clipboard?.writeText(result)} style={{ padding: "8px 14px", background: T, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Copy</button>
      </div>
      <p style={{ fontSize: 11, color: "#64748B", marginTop: 8 }}>Tip: For a direct write-review link, search your business on Google Maps → click "Write a review" → copy that URL. It's more direct than a search link.</p>
    </div>}
  </div>;
}
// Tool 2: Email Signature Generator
function EmailSigGen() {
  const [name, setName] = useState(""); const [title, setTitle] = useState(""); const [biz, setBiz] = useState("");
  const [phone, setPhone] = useState(""); const [email, setEmail] = useState(""); const [url, setUrl] = useState("");
  const [color, setColor] = useState(T); const [generated, setGenerated] = useState(false);
  const sigHtml = `<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:13px;color:#333"><tr><td style="border-right:2px solid ${color};padding-right:14px;vertical-align:top"><strong style="font-size:14px;color:${color}">${name || "Your Name"}</strong><br><span style="color:#666;font-size:12px">${title || "Title"} · ${biz || "Business"}</span></td><td style="padding-left:14px;vertical-align:top;font-size:12px;color:#666">${phone ? `<div>📞 ${phone}</div>` : ""}${email ? `<div>✉️ ${email}</div>` : ""}${url ? `<div>🌐 <a href="${url}" style="color:${color};text-decoration:none">${url.replace(/https?:\/\//, "")}</a></div>` : ""}</td></tr></table>`;
  return <div>
    <p style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>Create a professional email signature. Copy-paste into Gmail, Outlook, or any email client.</p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title (e.g. Owner)" style={inputStyle} />
      <input value={biz} onChange={e => setBiz(e.target.value)} placeholder="Business name" style={inputStyle} />
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" style={inputStyle} />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Website" style={inputStyle} />
    </div>
    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
      {["#0D9488","#2563EB","#7C3AED","#DC2626","#EA580C","#0F172A"].map(c =>
        <div key={c} onClick={() => setColor(c)} style={{ width: 28, height: 28, borderRadius: 6, background: c, cursor: "pointer", border: color === c ? "3px solid #0F172A" : "3px solid transparent" }} />
      )}
    </div>
    <div style={{ padding: 20, background: "#fff", borderRadius: 10, border: "1px solid #E2E8F0", marginBottom: 12 }}>
      <p style={{ fontSize: 11, color: "#94A3B8", marginBottom: 8 }}>PREVIEW</p>
      <div dangerouslySetInnerHTML={{ __html: sigHtml }} />
    </div>
    <button onClick={() => navigator.clipboard?.writeText(sigHtml)} style={{ padding: "10px 18px", background: T, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Copy HTML</button>
  </div>;
}
const inputStyle = { padding: "9px 12px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none" };
// Tool 3: Open Graph Preview
function OGPreview() {
  const [url, setUrl] = useState(""); const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const check = async () => {
    if (!url.trim()) return;
    setLoading(true); setData(null);
    // In production: serverless function fetches the URL and parses OG tags
    // In demo: show explanation
    setTimeout(() => {
      setData({ hasOG: false, preview: "Enter a URL to preview how it appears when shared on Facebook, Twitter, and LinkedIn." });
      setLoading(false);
    }, 1000);
  };
  return <div>
    <p style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>See how your website looks when shared on social media. Missing Open Graph tags? Your links look broken when shared.</p>
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://yourwebsite.com" style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none" }} />
      <button onClick={check} disabled={loading} style={{ padding: "10px 18px", background: T, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", opacity: loading ? 0.6 : 1 }}>{loading ? "..." : "Preview"}</button>
    </div>
    {data && <div style={{ padding: 16, background: "#FEF9C3", borderRadius: 10, border: "1px solid #FDE68A" }}>
      <p style={{ fontSize: 13, color: "#854D0E", lineHeight: 1.6 }}>In production, this tool fetches your URL and shows exactly how it appears on Facebook, Twitter, and LinkedIn. Missing og:title, og:description, or og:image tags make your shared links look broken and unprofessional.</p>
      <p style={{ fontSize: 12, color: "#92400E", marginTop: 8, fontWeight: 600 }}>Zidly's SEO Scanner checks Open Graph tags automatically as part of your findability audit.</p>
    </div>}
  </div>;
}
// Tool 4: Response Time Calculator
function ResponseCalc() {
  const [avgTime, setAvgTime] = useState(""); const [leadsPerMonth, setLeadsPerMonth] = useState("");
  const [result, setResult] = useState(null);
  const calc = () => {
    const time = parseInt(avgTime) || 60; const leads = parseInt(leadsPerMonth) || 20;
    const lostPct = time <= 5 ? 0.02 : time <= 15 ? 0.08 : time <= 30 ? 0.15 : time <= 60 ? 0.25 : time <= 240 ? 0.40 : 0.60;
    const lostLeads = Math.round(leads * lostPct);
    const lostRevenue = lostLeads * 350; // avg ticket
    setResult({ time, leads, lostPct: Math.round(lostPct * 100), lostLeads, lostRevenue,
      withBot: { lostPct: 2, lostLeads: Math.round(leads * 0.02), lostRevenue: Math.round(leads * 0.02 * 350) } });
  };
  return <div>
    <p style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>Harvard Business Review found that companies responding within 5 minutes are 100x more likely to convert. See how much your response time costs.</p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
      <div><label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>Avg response time (minutes)</label><input value={avgTime} onChange={e => setAvgTime(e.target.value)} placeholder="e.g. 60" type="number" style={inputStyle} /></div>
      <div><label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>Leads per month</label><input value={leadsPerMonth} onChange={e => setLeadsPerMonth(e.target.value)} placeholder="e.g. 30" type="number" style={inputStyle} /></div>
    </div>
    <button onClick={calc} style={{ padding: "10px 18px", background: T, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", width: "100%" }}>Calculate Lost Revenue</button>
    {result && <div style={{ marginTop: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div style={{ padding: 16, background: "#FEF2F2", borderRadius: 10, textAlign: "center", border: "1px solid #FECACA" }}>
          <div style={{ fontSize: 11, color: "#991B1B", fontWeight: 600 }}>WITHOUT AI CHATBOT</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#DC2626", marginTop: 4 }}>${result.lostRevenue.toLocaleString()}/mo</div>
          <div style={{ fontSize: 12, color: "#B91C1C" }}>{result.lostLeads} leads lost ({result.lostPct}% drop-off)</div>
        </div>
        <div style={{ padding: 16, background: "#F0FDF4", borderRadius: 10, textAlign: "center", border: "1px solid #BBF7D0" }}>
          <div style={{ fontSize: 11, color: "#166534", fontWeight: 600 }}>WITH ZIDLY CHATBOT</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#22C55E", marginTop: 4 }}>${result.withBot.lostRevenue.toLocaleString()}/mo</div>
          <div style={{ fontSize: 12, color: "#15803D" }}>{result.withBot.lostLeads} leads lost (instant response)</div>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: 12, background: `${T}08`, borderRadius: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: T }}>You'd save ${(result.lostRevenue - result.withBot.lostRevenue).toLocaleString()}/month</span>
        <span style={{ fontSize: 12, color: "#64748B" }}> with instant AI response</span>
      </div>
    </div>}
  </div>;
}
// Tool 5: Review QR Code Generator (simplified from main platform)
function ReviewQR() {
  const [link, setLink] = useState(""); const [bizName, setBizName] = useState(""); const [qr, setQr] = useState(null);
  const gen = () => { if (!link.trim()) return; setQr(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(link.trim())}&color=0D9488`); };
  return <div>
    <p style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>Generate a QR code for your Google review link. Print it, put it at your front desk, on receipts, or business cards.</p>
    <input value={bizName} onChange={e => setBizName(e.target.value)} placeholder="Business name" style={{ ...inputStyle, width: "100%", marginBottom: 8 }} />
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <input value={link} onChange={e => setLink(e.target.value)} placeholder="Google review link" style={{ ...inputStyle, flex: 1 }} />
      <button onClick={gen} style={{ padding: "10px 18px", background: T, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Generate</button>
    </div>
    {qr && <div style={{ textAlign: "center", padding: 20, background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0" }}>
      <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{bizName || "Your Business"}</p>
      <p style={{ fontSize: 12, color: "#64748B", marginBottom: 14 }}>Scan to leave a review</p>
      <img src={qr} alt="QR" style={{ width: 180, height: 180 }} />
      <div style={{ marginTop: 12 }}><button onClick={() => window.open(qr, "_blank")} style={{ padding: "8px 16px", background: T, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Download</button></div>
    </div>}
  </div>;
}
// ===== MAIN PAGE =====
const TOOLS = [
  { id: "review-link", name: "Google Review Link Generator", icon: "⭐", desc: "Get a direct link to your Google review page", component: ReviewLinkGen, seo: "review link generator" },
  { id: "email-sig", name: "Email Signature Generator", icon: "✉️", desc: "Professional email signature in 30 seconds", component: EmailSigGen, seo: "email signature generator" },
  { id: "response-calc", name: "Response Time Calculator", icon: "⏱️", desc: "See how much slow responses cost you", component: ResponseCalc, seo: "lead response time cost" },
  { id: "review-qr", name: "Review QR Code Generator", icon: "📱", desc: "Printable QR code for Google reviews", component: ReviewQR, seo: "review qr code generator" },
  { id: "og-preview", name: "Social Share Preview", icon: "🔗", desc: "See how your site looks when shared", component: OGPreview, seo: "open graph preview tool" },
];
export default function FreeToolsPage() {
  const [active, setActive] = useState("review-link");
  const ActiveTool = TOOLS.find(t => t.id === active)?.component || ReviewLinkGen;
  return <div style={{ fontFamily: "'Outfit', system-ui, sans-serif", color: "#0F172A", background: "#fff" }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } @media (max-width: 768px) { .ft-grid { grid-template-columns: 1fr !important; } .ft-tabs { flex-wrap: wrap; } }`}</style>
    <section style={{ padding: "80px 24px 40px", textAlign: "center" }}>
      <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1, marginBottom: 12 }}>Free Tools for Local Businesses</h1>
      <p style={{ fontSize: 16, color: "#64748B", maxWidth: 500, margin: "0 auto" }}>No signup. No credit card. No catch. Use these tools right now.</p>
    </section>
    <section style={{ padding: "0 24px 60px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Tool tabs */}
        <div className="ft-tabs" style={{ display: "flex", gap: 6, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
          {TOOLS.map(t => <button key={t.id} onClick={() => setActive(t.id)} style={{ padding: "10px 16px", background: active === t.id ? T : "transparent", color: active === t.id ? "#fff" : "#64748B", border: `1.5px solid ${active === t.id ? T : "#E2E8F0"}`, borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}>
            <span>{t.icon}</span> {t.name}
          </button>)}
        </div>
        {/* Active tool */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <ActiveTool />
        </div>
        {/* BizScorer CTA */}
        <div style={{ marginTop: 32, padding: 28, background: `linear-gradient(135deg, ${TD}08, ${TL}05)`, borderRadius: 16, border: `1px solid ${T}18`, textAlign: "center" }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Want the full picture?</h3>
          <p style={{ fontSize: 14, color: "#64748B", marginBottom: 16 }}>Run a free BizScore audit — scores your reputation, SEO, conversion, marketing, and competitive position in 60 seconds.</p>
          <a href="/dentists" style={{ display: "inline-block", padding: "14px 32px", background: `linear-gradient(135deg, ${TD}, ${TL})`, color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Run Free BizScore →</a>
        </div>
      </div>
    </section>
  </div>;
}
