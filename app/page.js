'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const organicData = [
  { month: 'Oct', sessions: 819 },
  { month: 'Nov', sessions: 657 },
  { month: 'Dec', sessions: 650 },
  { month: 'Jan', sessions: 811 },
  { month: 'Feb', sessions: 947 },
  { month: 'Mar', sessions: 1173 },
]

const channelData = [
  { month: 'Oct', Direct: 1159, 'Organic Search': 819, 'Organic Social': 109, Referral: 49 },
  { month: 'Nov', Direct: 1056, 'Organic Search': 657, 'Organic Social': 55, Referral: 31 },
  { month: 'Dec', Direct: 999, 'Organic Search': 650, 'Organic Social': 54, Referral: 54 },
  { month: 'Jan', Direct: 950, 'Organic Search': 811, 'Organic Social': 112, Referral: 40 },
  { month: 'Feb', Direct: 939, 'Organic Search': 947, 'Organic Social': 1133, Referral: 49 },
  { month: 'Mar', Direct: 935, 'Organic Search': 1173, 'Organic Social': 870, Referral: 34 },
]

const gbpData = [
  { month: 'Nov', interactions: 434, calls: 92, directions: 200 },
  { month: 'Dec', interactions: 471, calls: 88, directions: 243 },
  { month: 'Jan', interactions: 550, calls: 111, directions: 270 },
  { month: 'Feb', interactions: 578, calls: 102, directions: 277 },
  { month: 'Mar', interactions: 616, calls: 100, directions: 256 },
]

const landingPages = [
  { page: '/ (Homepage)', sessions: '7,119', engagement: '47s' },
  { page: '/appointment', sessions: '587', engagement: '12s' },
  { page: '/epstein-barr-virus', sessions: '548', engagement: '42s' },
  { page: '/dr-ashley-prince', sessions: '422', engagement: '56s' },
  { page: '/pots-and-dysautonomia', sessions: '315', engagement: '52s' },
  { page: '/providers', sessions: '275', engagement: '45s' },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); io.unobserve(el) } },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function useCountUp(target, duration = 1800) {
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); io.unobserve(el) } },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration])

  return { ref, val }
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload) return null
  return (
    <div style={{
      background: 'rgba(11,22,35,0.95)',
      border: '1px solid rgba(201,164,74,0.25)',
      borderRadius: 10,
      padding: '12px 16px',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      <div style={{ color: '#C9A44A', fontWeight: 600, fontSize: '0.82rem', marginBottom: 6, letterSpacing: '0.08em' }}>{label}</div>
      {payload.map((e, i) => (
        <div key={i} style={{ color: '#ECE7DA', fontSize: '0.85rem', lineHeight: 1.7 }}>
          <span style={{ color: e.color, marginRight: 6 }}>{String.fromCharCode(9679)}</span>
          {e.name}: <strong>{e.value.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-line" />
      <div className="hero-line" style={{ left: 'auto', right: '12%' }} />
      <div className="hero-logo">
        <img src="https://onecdn.io/media/e0657cb6-254c-4c94-bd62-41a08395c050/md2x" alt="Prince Health" className="hero-logo-img" />
      </div>
      <h1>6-Month Organic<br /><em>Growth Report</em></h1>
      <p className="hero-period">October 2025 -- March 2026</p>
      <hr className="hero-rule" />
      <p className="hero-location">The Woodlands, TX</p>
      <div className="scroll-cue">
        <span>Scroll</span>
        <div className="scroll-cue-line" />
      </div>
    </section>
  )
}

function Overview() {
  const r = useReveal()
  return (
    <section className="overview" ref={r}>
      <div className="overview-inner">
        <div className="overview-label">-- Strategic Overview --</div>
        <p className="overview-text">
          Over the past six months, Prince Health & Wellness has achieved a significant inflection point in organic visibility. Organic search sessions have climbed 43% -- rising from 819 to 1,173 monthly sessions -- signaling that the content and SEO foundation is translating into real patient discovery. Equally impressive, site engagement sits at 59%, well above the ~40% healthcare industry benchmark, which tells us visitors aren't just arriving -- they're staying, reading, and exploring treatment options. Google Business Profile actions are up 42%, meaning more prospective patients are calling, requesting directions, and clicking through to book. The compounding trajectory across all three channels indicates Prince Health is entering a sustained growth phase, and the data strongly supports continued investment in organic content, local SEO, and conversion-focused landing pages heading into Q3 and beyond.
        </p>
      </div>
    </section>
  )
}

function Wins() {
  const r1 = useReveal()
  const c1 = useCountUp(43)
  const c2 = useCountUp(59)
  const c3 = useCountUp(42)

  const cards = [
    { icon: '\u{1F4C8}', ref: c1.ref, val: '+' + c1.val + '%', title: 'Organic Search Growth', desc: 'From 819 sessions in October to 1,173 in March. Your organic search presence is accelerating \u2014 more patients are finding Prince Health through Google every month.' },
    { icon: '\u{1F465}', ref: c2.ref, val: c2.val + '%', title: 'Engagement Rate', desc: 'Industry benchmark is ~40%. Visitors from Google spend over a minute on your site \u2014 a strong signal of content relevance and trust.' },
    { icon: '\u{1F4F2}', ref: c3.ref, val: '+' + c3.val + '%', title: 'GBP Actions Growth', desc: 'From 434 interactions in November to 616 in March. More people are calling, requesting directions, and clicking through from your Google Business Profile.' },
  ]

  return (
    <div className="section">
      <div className="section-header reveal" ref={r1}>
        <span className="section-tag">Executive Summary</span>
        <h2>Top 3 Wins</h2>
        <p>Your momentum across key growth channels</p>
      </div>
      <div className="wins-grid">
        {cards.map((c, i) => (
          <div className="win-card reveal visible" key={i} ref={c.ref} style={{ transitionDelay: `${i * 0.12}s` }}>
            <span className="win-icon">{c.icon}</span>
            <div className="win-value">{c.val}</div>
            <div className="win-title">{c.title}</div>
            <div className="win-desc">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const axisStyle = { fontSize: 12, fill: '#7E8FA0' }
const gridStyle = { stroke: 'rgba(255,255,255,0.04)' }

function OrganicChart() {
  const r = useReveal()
  return (
    <div className="section-dark">
      <div className="section" style={{ padding: '0 2rem' }}>
        <div className="section-header reveal" ref={r}>
          <span className="section-tag">GA4 Data</span>
          <h2>Organic Search Sessions</h2>
          <p>Monthly trajectory showing sustained growth and recovery momentum</p>
        </div>
        <div className="chart-card reveal visible">
          <div className="chart-area">
            <ResponsiveContainer>
              <LineChart data={organicData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" {...gridStyle} />
                <XAxis dataKey="month" tick={axisStyle} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="sessions" name="Organic Sessions" stroke="#C9A44A" strokeWidth={3} dot={{ r: 6, fill: '#C9A44A', stroke: '#0B1623', strokeWidth: 3 }} activeDot={{ r: 8, fill: '#E2C76E', stroke: '#C9A44A', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChannelChart() {
  const r = useReveal()
  return (
    <div className="section">
      <div className="section-header reveal" ref={r}>
        <span className="section-tag">Traffic Breakdown</span>
        <h2>All Sessions by Channel</h2>
        <p>Total visitor breakdown across direct, organic, and referral channels</p>
      </div>
      <div className="chart-card reveal visible">
        <div className="chart-area">
          <ResponsiveContainer>
            <BarChart data={channelData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" {...gridStyle} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: '0.82rem', paddingTop: 12 }} formatter={(v) => <span style={{ color: '#ECE7DA' }}>{v}</span>} />
              <Bar dataKey="Direct" stackId="a" fill="rgba(236,231,218,0.45)" radius={[0,0,0,0]} />
              <Bar dataKey="Organic Search" stackId="a" fill="#C9A44A" />
              <Bar dataKey="Organic Social" stackId="a" fill="#3A5A78" />
              <Bar dataKey="Referral" stackId="a" fill="rgba(201,164,74,0.55)" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function GBPSection() {
  const r = useReveal()
  return (
    <div className="section-dark">
      <div className="section" style={{ padding: '0 2rem' }}>
        <div className="section-header reveal" ref={r}>
          <span className="section-tag">Google Business Profile</span>
          <h2>GBP Performance</h2>
          <p>Direct actions: calls, directions, and profile interactions</p>
        </div>
        <div className="chart-card reveal visible">
          <div className="chart-area">
            <ResponsiveContainer>
              <BarChart data={gbpData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" {...gridStyle} />
                <XAxis dataKey="month" tick={axisStyle} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: '0.82rem', paddingTop: 12 }} formatter={(v) => <span style={{ color: '#ECE7DA' }}>{v}</span>} />
                <Bar dataKey="interactions" name="Total Interactions" fill="#C9A44A" radius={[3,3,0,0]} />
                <Bar dataKey="calls" name="Calls" fill="#3A5A78" radius={[3,3,0,0]} />
                <Bar dataKey="directions" name="Directions" fill="rgba(201,164,74,0.55)" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="stat-row" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
          {[
            { label: 'Total Profile Views', value: '4,671' },
            { label: 'Total Search Impressions', value: '489' },
            { label: 'Google Reviews Rating', value: '4.9\u2605 (386)' },
          ].map((s, i) => (
            <div className="stat-pill" key={i}>
              <div className="stat-pill-label">{s.label}</div>
              <div className="stat-pill-value">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LandingPages() {
  const r = useReveal()
  return (
    <div className="section">
      <div className="section-header reveal" ref={r}>
        <span className="section-tag">Page Performance</span>
        <h2>Top Landing Pages</h2>
        <p>Your most-visited pages and engagement metrics</p>
      </div>
      <div className="table-wrap reveal visible">
        <table className="data-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Sessions</th>
              <th>Avg. Engagement Time</th>
            </tr>
          </thead>
          <tbody>
            {landingPages.map((p, i) => (
              <tr key={i}>
                <td className="cell-page">{p.page}</td>
                <td className="cell-bold">{p.sessions}</td>
                <td>{p.engagement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Insights() {
  const r = useReveal()
  const items = [
    { title: 'Organic Search Is Your Strongest Channel', body: '59% engagement rate, 1m 09s average session duration, and month-over-month growth. This is your highest-intent traffic \u2014 continue investing in SEO and content optimization.' },
    { title: 'Social Media Is Surging', body: 'February and March saw explosive organic social growth (1,133 and 870 sessions respectively). Your social content is resonating. Scale what\u2019s working.' },
    { title: 'Condition-Specific Pages Drive Deep Engagement', body: 'Pages like Epstein-Barr Virus and POTS & Dysautonomia attract highly engaged visitors (42-52s avg time). These educational pages are trust-builders.' },
    { title: 'GBP Is Driving Real-World Actions', body: '493 calls and 1,246 direction requests in 5 months. Your Google Business Profile is converting discovery into appointments. Keep it optimized and updated.' },
  ]

  return (
    <div className="section-dark">
      <div className="section" style={{ padding: '0 2rem' }}>
        <div className="section-header reveal" ref={r}>
          <span className="section-tag">Strategic Findings</span>
          <h2>Key Insights & Recommendations</h2>
          <p>Strategic findings to accelerate your growth trajectory</p>
        </div>
        <div className="insights-grid">
          {items.map((item, i) => (
            <div className="insight-card reveal visible" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="insight-idx">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PageFooter() {
  return (
    <footer className="footer">
      <div className="footer-brand">Prepared for Prince Health & Wellness</div>
      <p>
        10847 Kuykendahl Road #350<br />
        The Woodlands, TX 77382<br />
        (936) 321-3333
      </p>
      <p style={{ marginTop: '1rem', fontSize: '0.75rem', opacity: 0.5 }}>
        Report generated April 2026
      </p>
    </footer>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Overview />
      <Wins />
      <OrganicChart />
      <div className="section-divider" />
      <ChannelChart />
      <GBPSection />
      <div className="section-divider" />
      <LandingPages />
      <Insights />
      <PageFooter />
    </main>
  )
}
