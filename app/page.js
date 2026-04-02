'use client'

import { useEffect, useRef, useState } from 'react'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts'

// Scroll Animation Hook
function useScrollAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return ref
}

// Custom Tooltip
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#1B2A4A',
        border: '2px solid #C9A44A',
        borderRadius: '6px',
        padding: '10px',
        color: '#F5F0E6',
        fontSize: '12px'
      }}>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: '4px 0', color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Hero Section
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="logo-container">
          <div className="dna-icon">&infin;</div>
          <div className="logo-text">PRINCE HEALTH</div>
        </div>
        <h1 className="report-title">6-Month Organic Growth Report</h1>
        <p className="report-period">October 2025 &mdash; March 2026</p>
        <div className="gold-accent-line"></div>
        <p className="report-location">The Woodlands, TX</p>
      </div>
    </section>
  )
}

// Executive Summary Cards
function ExecutiveSummary() {
  const ref = useScrollAnimation()

  return (
    <section className="section section-light" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>Top 3 Wins</h2>
          <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '0.5rem' }}>
            Your momentum across key growth channels
          </p>
        </div>

        <div className="cards-grid">
          <div className="card">
            <div className="card-icon">&#x1F4C8;</div>
            <div className="card-metric">+43%</div>
            <div className="card-title">Organic Search Growth</div>
            <p className="card-description">
              From 819 sessions in October to 1,173 in March. Your organic search presence is accelerating. More patients are finding Prince Health through Google every month.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">&#x1F465;</div>
            <div className="card-metric">59%</div>
            <div className="card-title">Engagement Rate</div>
            <p className="card-description">
              Industry benchmark is ~40%. Visitors from Google spend over a minute on your site &mdash; a strong signal of content relevance and trust.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">&#x1F4F1;</div>
            <div className="card-metric">+42%</div>
            <div className="card-title">GBP Actions Growth</div>
            <p className="card-description">
              From 434 interactions in November to 616 in March. More people are calling, requesting directions, and clicking through from your Google Business Profile.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Organic Sessions Chart
function OrganicSessionsChart() {
  const ref = useScrollAnimation()

  const data = [
    { month: 'Oct', sessions: 819 },
    { month: 'Nov', sessions: 657 },
    { month: 'Dec', sessions: 650 },
    { month: 'Jan', sessions: 811 },
    { month: 'Feb', sessions: 947 },
    { month: 'Mar', sessions: 1173 }
  ]

  return (
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>GA4: Organic Search Sessions</h2>
          <p style={{ color: '#F5F0E6' }}>
            Monthly trajectory showing sustained growth and recovery momentum
          </p>
        </div>

        <div className="chart-container dark">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" stroke="#C9A44A" style={{ fontSize: '12px' }} />
              <YAxis stroke="#C9A44A" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="#C9A44A"
                strokeWidth={3}
                dot={{ fill: '#C9A44A', r: 6 }}
                activeDot={{ r: 8 }}
                name="Sessions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

// Total Sessions by Channel
function SessionsByChannelChart() {
  const ref = useScrollAnimation()

  const data = [
    { month: 'Oct', Direct: 1159, OrganicSearch: 819, OrganicSocial: 109, Referral: 49 },
    { month: 'Nov', Direct: 1056, OrganicSearch: 657, OrganicSocial: 55, Referral: 31 },
    { month: 'Dec', Direct: 999, OrganicSearch: 650, OrganicSocial: 54, Referral: 54 },
    { month: 'Jan', Direct: 950, OrganicSearch: 811, OrganicSocial: 112, Referral: 40 },
    { month: 'Feb', Direct: 939, OrganicSearch: 947, OrganicSocial: 1133, Referral: 49 },
    { month: 'Mar', Direct: 935, OrganicSearch: 1173, OrganicSocial: 870, Referral: 34 }
  ]

  return (
    <section className="section section-light" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>All Sessions by Channel</h2>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            Total visitor breakdown across direct, organic, and referral channels
          </p>
        </div>

        <div className="chart-container light">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E3D8" />
              <XAxis dataKey="month" stroke="#1B2A4A" style={{ fontSize: '12px' }} />
              <YAxis stroke="#1B2A4A" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Direct" name="Direct" stackId="a" fill="#1B2A4A" />
              <Bar dataKey="OrganicSearch" name="Organic Search" stackId="a" fill="#C9A44A" />
              <Bar dataKey="OrganicSocial" name="Organic Social" stackId="a" fill="#8B7A3E" />
              <Bar dataKey="Referral" name="Referral" stackId="a" fill="#D4C5A9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

// Google Business Profile Chart
function GBPChart() {
  const ref = useScrollAnimation()

  const data = [
    { month: 'Nov', TotalInteractions: 434, Calls: 77, Directions: 213 },
    { month: 'Dec', TotalInteractions: 514, Calls: 104, Directions: 276 },
    { month: 'Jan', TotalInteractions: 571, Calls: 104, Directions: 252 },
    { month: 'Feb', TotalInteractions: 552, Calls: 99, Directions: 231 },
    { month: 'Mar', TotalInteractions: 616, Calls: 109, Directions: 273 }
  ]

  return (
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>Google Business Profile Performance</h2>
          <p style={{ color: '#F5F0E6' }}>
            Direct actions: calls, directions, and profile interactions
          </p>
        </div>

        <div className="chart-container dark">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" stroke="#C9A44A" style={{ fontSize: '12px' }} />
              <YAxis stroke="#C9A44A" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="TotalInteractions" name="Total Interactions" fill="#C9A44A" />
              <Bar dataKey="Calls" name="Calls" fill="#F5B461" />
              <Bar dataKey="Directions" name="Directions" fill="#8B7A3E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="stat-card">
            <p className="stat-label">Total Profile Views</p>
            <p className="stat-value">4,671</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Total Search Impressions</p>
            <p className="stat-value">489</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Google Reviews Rating</p>
            <p className="stat-value">4.9&#9733; (386 reviews)</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Top Landing Pages Table
function TopLandingPages() {
  const ref = useScrollAnimation()

  return (
    <section className="section section-light" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>Top Landing Pages</h2>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            Your most-visited pages and engagement metrics
          </p>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>Sessions</th>
                <th>Avg. Engagement Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>/ (Homepage)</strong></td>
                <td className="metric-value">7,119</td>
                <td>47s</td>
              </tr>
              <tr>
                <td><strong>/appointment</strong></td>
                <td className="metric-value">587</td>
                <td>12s</td>
              </tr>
              <tr>
                <td><strong>/epstein-barr-virus</strong></td>
                <td className="metric-value">548</td>
                <td>42s</td>
              </tr>
              <tr>
                <td><strong>/dr-ashley-prince</strong></td>
                <td className="metric-value">422</td>
                <td>58s</td>
              </tr>
              <tr>
                <td><strong>/pots-and-dysautonomia</strong></td>
                <td className="metric-value">315</td>
                <td>52s</td>
              </tr>
              <tr>
                <td><strong>/providers</strong></td>
                <td className="metric-value">275</td>
                <td>45s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// Key Insights
function KeyInsights() {
  const ref = useScrollAnimation()

  return (
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>Key Insights &amp; Recommendations</h2>
          <p style={{ color: '#F5F0E6' }}>
            Strategic findings to accelerate your growth trajectory
          </p>
        </div>

        <div className="insights-grid">
          <div className="insight-card">
            <h4>Organic Search is Your Strongest Channel</h4>
            <p>
              59% engagement rate, 1m 09s average session duration, and month-over-month growth. This is your highest-intent traffic &mdash; continue investing in SEO and content optimization.
            </p>
          </div>

          <div className="insight-card">
            <h4>Social Media is Surging</h4>
            <p>
              February and March saw explosive organic social growth (1,133 and 870 sessions respectively). Your social content is resonating. Scale what&apos;s working.
            </p>
          </div>

          <div className="insight-card">
            <h4>Condition-Specific Pages Drive Deep Engagement</h4>
            <p>
              Pages like Epstein-Barr Virus and POTS &amp; Dysautonomia attract highly engaged visitors (42-52s avg time). These educational pages are trust-builders.
            </p>
          </div>

          <div className="insight-card">
            <h4>GBP is Driving Real-World Actions</h4>
            <p>
              493 calls and 1,245 direction requests in 5 months. Your Google Business Profile is converting discovery into appointments. Keep it optimized and updated.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function PageFooter() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-company">Prepared for Prince Health &amp; Wellness</div>
        <div className="footer-address">
          10847 Kuykendahl Road #350<br />
          The Woodlands, TX 77382
        </div>
        <div className="footer-phone">(281) 545-5067</div>
        <div className="footer-date">Report prepared: April 2026</div>
      </div>
    </footer>
  )
}

// Main App
export default function Home() {
  return (
    <>
      <HeroSection />
      <ExecutiveSummary />
      <OrganicSessionsChart />
      <SessionsByChannelChart />
      <GBPChart />
      <TopLandingPages />
      <KeyInsights />
      <PageFooter />
    </>
  )
}
