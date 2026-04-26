import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import avatarUrl from '../avatar.png'
import revProfDashUrl from '../rev_prof_dash.PNG'
import trafConvDashUrl from '../traf_conv_dash.PNG'
import nusantaraPage1Preview1 from '../page1-preview1.PNG'
import nusantaraPage1Preview2 from '../page1-preview2.PNG'
import nusantaraPage2Preview1 from '../page2-preview1.PNG'
import nusantaraPage2Preview2 from '../page2-preview2.PNG'

const NUSANTARA_LIVE_URL =
  'https://datastudio.google.com/reporting/99c0eb71-0022-4c74-9aeb-090cac4ed16b'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] },
  },
}

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

function smoothScrollToY(targetY, duration = 1000) {
  const html = document.documentElement
  const prevBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'

  const startY = window.scrollY
  const distance = targetY - startY
  if (distance === 0) {
    html.style.scrollBehavior = prevBehavior
    return
  }

  const startTime = performance.now()
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  function step(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeInOutCubic(progress)
    window.scrollTo(0, startY + distance * eased)
    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      html.style.scrollBehavior = prevBehavior
    }
  }
  requestAnimationFrame(step)
}

function smoothScrollTo(targetId, duration = 1000) {
  const el = document.getElementById(targetId)
  if (!el) return
  const targetY = el.getBoundingClientRect().top + window.scrollY
  smoothScrollToY(targetY, duration)
}

function handleCtaScroll(e, targetId) {
  e.preventDefault()
  smoothScrollTo(targetId, 1000)
}

function LinkedInIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2.5" y="2.5" width="19" height="19" />
      <line x1="7" y1="10.5" x2="7" y2="17" />
      <circle cx="7" cy="7.4" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11 17v-6.5" />
      <path d="M11 14c0-1.9 1.25-3.5 3.2-3.5S17.4 12.1 17.4 14v3" />
    </svg>
  )
}

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span className="section-number">WK / {number}</span>
      <span className="section-rule" aria-hidden />
      <span className="section-title">{children}</span>
    </div>
  )
}

function Nav() {
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    if (onHome) {
      smoothScrollTo(sectionId, 1000)
    } else {
      navigate(`/#${sectionId}`)
    }
  }

  const handleMarkClick = (e) => {
    e.preventDefault()
    if (onHome) {
      smoothScrollToY(0, 1000)
    } else {
      navigate('/')
    }
  }

  const hrefFor = (id) => (onHome ? `#${id}` : `/#${id}`)

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href={onHome ? '#top' : '/'} onClick={handleMarkClick} className="nav-mark">
          <span className="mark-serif">WK<span className="accent-dot">.</span></span>
          <span className="mark-meta">Data Analyst · Jakarta</span>
        </a>
        <div className="nav-right">
          <nav className="nav-links" aria-label="Primary">
            <a href={hrefFor('about')} onClick={(e) => handleNavClick(e, 'about')}>About</a>
            <a href={hrefFor('work')} onClick={(e) => handleNavClick(e, 'work')}>Experience</a>
            <a href={hrefFor('portfolio')} onClick={(e) => handleNavClick(e, 'portfolio')}>Work</a>
            <a href={hrefFor('skills')} onClick={(e) => handleNavClick(e, 'skills')}>Skills</a>
            <a href={hrefFor('contact')} onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          </nav>
          <a
            href="https://linkedin.com/in/wahyukwan"
            target="_blank"
            rel="noreferrer"
            className="nav-social"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <motion.div
          className="hero-main"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p className="hero-meta" variants={fadeUp}>
            <span className="hero-meta-dot" aria-hidden />
            WK / 00 — Introduction
          </motion.p>
          <motion.h1 className="hero-headline" variants={fadeUp}>
            <span className="hero-line">Wahyu</span>
            <span className="hero-line hero-line-italic">
              Kwan<span className="accent-dot">.</span>
            </span>
          </motion.h1>
          <motion.p className="hero-sub" variants={fadeUp}>
            Data Analyst · E-commerce &amp; Sales Performance Dashboards
          </motion.p>
          <motion.p className="hero-lede" variants={fadeUp}>
            Turning raw business data into decisions that drive growth.
          </motion.p>
          <motion.div className="hero-ctas" variants={fadeUp}>
            <a
              href="#portfolio"
              onClick={(e) => handleCtaScroll(e, 'portfolio')}
              className="btn btn-primary"
            >
              View My Work
              <span className="btn-arrow" aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleCtaScroll(e, 'contact')}
              className="btn btn-ghost"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        <motion.aside
          className="hero-card"
          initial={{ opacity: 0, y: 40, rotate: -0.8 }}
          animate={{ opacity: 1, y: 0, rotate: -0.4 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="hero-card-head">
            <span className="mono-xs">Revenue · Monthly</span>
            <span className="mono-xs up">↑ 34.2%</span>
          </div>
          <div className="hero-card-value tabular">$ 2,184,906</div>
          <svg
            className="sparkline"
            viewBox="0 0 320 90"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#B33A1E" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#B33A1E" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g stroke="#D6CEBD" strokeWidth="0.5">
              <line x1="0" y1="22" x2="320" y2="22" />
              <line x1="0" y1="45" x2="320" y2="45" />
              <line x1="0" y1="68" x2="320" y2="68" />
            </g>
            <path
              d="M0,70 L20,66 L40,60 L60,52 L80,58 L100,46 L120,50 L140,34 L160,42 L180,28 L200,36 L220,22 L240,28 L260,14 L280,20 L300,10 L320,6 L320,90 L0,90 Z"
              fill="url(#sparkFill)"
            />
            <polyline
              points="0,70 20,66 40,60 60,52 80,58 100,46 120,50 140,34 160,42 180,28 200,36 220,22 240,28 260,14 280,20 300,10 320,6"
              fill="none"
              stroke="#B33A1E"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="hero-card-grid">
            <div>
              <span className="mono-xs">Conv. Rate</span>
              <span className="tabular-sm">4.82%</span>
            </div>
            <div>
              <span className="mono-xs">AOV</span>
              <span className="tabular-sm">$182.40</span>
            </div>
            <div>
              <span className="mono-xs">LTV / CAC</span>
              <span className="tabular-sm">3.1×</span>
            </div>
          </div>
          <div className="hero-card-footer mono-xs">
            Fig. 01 — Sample Dashboard · Read-only Preview
          </div>
        </motion.aside>
      </div>
      <motion.div
        className="hero-bottom container mono-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span>Jakarta / IDN</span>
        <span className="hero-bottom-rule" aria-hidden />
        <span>Available for 2026 engagements →</span>
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <motion.section
      id="about"
      className="about"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={stagger}
    >
      <div className="container about-grid">
        <motion.div className="about-col-left" variants={fadeUp}>
          <SectionLabel number="01">About</SectionLabel>
          <figure className="avatar-frame">
            <img id="avatar" src={avatarUrl} alt="Portrait of Wahyu Kwan" />
            <figcaption className="mono-xs">
              Portrait — Wahyu Kwan
            </figcaption>
          </figure>
        </motion.div>
        <motion.div className="about-col-right" variants={fadeUp}>
          <p className="about-body about-body-first">
            <span className="drop-cap">M</span>y background is in strategy and campaign operations at tech companies — the kind of role where spreadsheets pile up fast and the answer everyone needs is always one query away. Today I help e-commerce brands make sense of their data through clean, actionable dashboards that surface the few numbers that actually matter.
          </p>
          <p className="about-body">
            I'm a logical thinker, a fast learner, and business-minded first. My work sits at the intersection of analytics and decision-making — not charts for the sake of charts, but structured views that give operators, founders, and marketers confidence about where to invest the next dollar of growth.
          </p>
          <ul className="about-facts">
            <li>
              <span className="mono-xs">Focus</span>
              <span>E-commerce · Retail Analytics · Growth Reporting</span>
            </li>
            <li>
              <span className="mono-xs">Method</span>
              <span>Clean data models · Decision-first dashboards</span>
            </li>
            <li>
              <span className="mono-xs">Based in</span>
              <span>Jakarta, Indonesia · Working globally</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.section>
  )
}

function Experience() {
  return (
    <motion.section
      id="work"
      className="experience"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={stagger}
    >
      <div className="container">
        <motion.div variants={fadeUp}>
          <SectionLabel number="02">Previously At</SectionLabel>
        </motion.div>
        <motion.div className="experience-bar" variants={fadeUp}>
          <div className="experience-brand">
            <span className="brand-index mono-xs">01</span>
            <span className="brand-name">Grab</span>
          </div>
          <div className="experience-divider" aria-hidden />
          <div className="experience-brand">
            <span className="brand-index mono-xs">02</span>
            <span className="brand-name brand-italic">Moladin</span>
          </div>
        </motion.div>
        <motion.p className="experience-note mono-xs" variants={fadeUp}>
          — Strategy &amp; Campaign Operations across Southeast Asia tech
        </motion.p>
      </div>
    </motion.section>
  )
}

function VizSparkline() {
  return (
    <svg viewBox="0 0 320 140" preserveAspectRatio="none" className="viz" aria-hidden>
      <g stroke="#D6CEBD" strokeWidth="0.5">
        <line x1="0" y1="35" x2="320" y2="35" />
        <line x1="0" y1="70" x2="320" y2="70" />
        <line x1="0" y1="105" x2="320" y2="105" />
      </g>
      <defs>
        <linearGradient id="v1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#B33A1E" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#B33A1E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,110 L26,100 L52,92 L78,78 L104,82 L130,64 L156,70 L182,48 L208,54 L234,34 L260,40 L286,22 L312,14 L320,12 L320,140 L0,140 Z"
        fill="url(#v1)"
      />
      <polyline
        points="0,110 26,100 52,92 78,78 104,82 130,64 156,70 182,48 208,54 234,34 260,40 286,22 312,14"
        fill="none"
        stroke="#B33A1E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="312" cy="14" r="3" fill="#B33A1E" />
    </svg>
  )
}

function VizChannelBars() {
  // Heat-shaded horizontal channel ranking — five tiers descending.
  const bars = [
    { width: 296, opacity: 1 },
    { width: 248, opacity: 0.78 },
    { width: 184, opacity: 0.6 },
    { width: 110, opacity: 0.44 },
    { width: 54, opacity: 0.3 },
  ]
  const barHeight = 14
  const gap = 8
  const startY = 14
  return (
    <svg viewBox="0 0 320 140" preserveAspectRatio="none" className="viz" aria-hidden>
      <g stroke="#D6CEBD" strokeWidth="0.5">
        <line x1="80" y1="0" x2="80" y2="140" />
        <line x1="160" y1="0" x2="160" y2="140" />
        <line x1="240" y1="0" x2="240" y2="140" />
      </g>
      {bars.map((b, i) => (
        <rect
          key={i}
          x="0"
          y={startY + i * (barHeight + gap)}
          width={b.width}
          height={barHeight}
          fill="#B33A1E"
          opacity={b.opacity}
        />
      ))}
      <line
        x1="0"
        y1="138"
        x2="320"
        y2="138"
        stroke="#141414"
        strokeWidth="0.7"
        opacity="0.45"
      />
    </svg>
  )
}

function ProjectCard({ index, tool, title, description, viz, to }) {
  return (
    <motion.article className="project-card" variants={fadeUp}>
      <div className="project-viz-wrap">{viz}</div>
      <div className="project-body">
        <div className="project-head">
          <span className="mono-xs">Project / {index}</span>
          <span className="tool-chip mono-xs">{tool}</span>
        </div>
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>
        {to ? (
          <Link to={to} className="project-link">
            View Project <span aria-hidden>→</span>
          </Link>
        ) : (
          <a href="#contact" className="project-link">
            View Project <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </motion.article>
  )
}

function Portfolio() {
  return (
    <motion.section
      id="portfolio"
      className="portfolio"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger}
    >
      <div className="container">
        <span id="selected-work" aria-hidden />
        <motion.div variants={fadeUp}>
          <SectionLabel number="03">Selected Work</SectionLabel>
        </motion.div>
        <div className="project-grid project-grid-two">
          <ProjectCard
            index="01"
            tool="Tableau"
            title="Revenue & Traffic Analysis"
            description="Deep-dive diagnostic for Maven Fuzzy Factory that traced traffic origins across paid channels, surfaced a revenue-attribution bug, and rebuilt monthly performance views end-to-end."
            viz={<VizSparkline />}
            to="/projects/maven-fuzzy-factory"
          />
          <ProjectCard
            index="02"
            tool="Looker Studio"
            title="Nusantara Store · E-commerce Dashboard"
            description="A two-page Looker Studio dashboard for a fictional Indonesian e-commerce brand — covering revenue & operations on page one and product, geography, and customer behavior on page two."
            viz={<VizChannelBars />}
            to="/projects/nusantara-store"
          />
        </div>
        <motion.p className="portfolio-disclaimer mono-xs" variants={fadeUp}>
          — Case studies available upon request. Real projects in progress.
        </motion.p>
      </div>
    </motion.section>
  )
}

function Skills() {
  const skills = [
    { name: 'Tableau', note: 'Dashboarding & visual storytelling', kind: 'Tool' },
    { name: 'SQL', note: 'Query, model, transform', kind: 'Tool' },
    { name: 'Excel', note: 'Power queries & financial models', kind: 'Tool' },
    { name: 'Data Visualization', note: 'Chart craft & chart restraint', kind: 'Craft' },
    { name: 'Business Analysis', note: 'Strategy meets numbers', kind: 'Practice' },
    { name: 'Dashboard Design', note: 'Decision-first layouts', kind: 'Craft' },
  ]
  return (
    <motion.section
      id="skills"
      className="skills"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="container">
        <motion.div variants={fadeUp}>
          <SectionLabel number="04">Capabilities</SectionLabel>
        </motion.div>
        <motion.ul className="skill-grid" variants={stagger}>
          {skills.map((skill, i) => (
            <motion.li key={skill.name} className="skill-cell" variants={fadeUp}>
              <div className="skill-head">
                <span className="mono-xs skill-index">
                  WK / {String(i + 1).padStart(2, '0')}
                </span>
                <span className="skill-dot" aria-hidden />
              </div>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-note">{skill.note}</p>
              <div className="skill-foot">
                <span className="skill-rule" aria-hidden />
                <span className="mono-xs skill-kind">{skill.kind}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  )
}

function Contact() {
  return (
    <motion.section
      id="contact"
      className="contact"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="container contact-grid">
        <motion.div className="contact-col-left" variants={fadeUp}>
          <SectionLabel number="05">Get in Touch</SectionLabel>
          <h2 className="contact-headline">
            Let's turn your numbers into{' '}
            <span className="contact-italic">clarity</span>.
          </h2>
          <p className="contact-availability mono-xs">
            — Available for freelance projects and full-time opportunities.
          </p>
        </motion.div>
        <motion.div className="contact-details" variants={fadeUp}>
          <div className="contact-row">
            <span className="mono-xs">Email</span>
            <a href="mailto:wahyukwan@gmail.com" className="contact-value">
              wahyukwan@gmail.com
            </a>
          </div>
          <div className="contact-row">
            <span className="mono-xs">WhatsApp</span>
            <a
              href="https://wa.me/628129177777"
              target="_blank"
              rel="noreferrer"
              className="contact-value tabular"
            >
              +62 812 9177 777
            </a>
          </div>
          <div className="contact-row">
            <span className="mono-xs">LinkedIn</span>
            <a
              href="https://linkedin.com/in/wahyukwan"
              target="_blank"
              rel="noreferrer"
              className="contact-value contact-link-row"
            >
              <span>linkedin.com/in/wahyukwan</span>
              <LinkedInIcon className="contact-row-icon" />
            </a>
          </div>
          <a
            href="https://wa.me/628129177777"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary contact-cta"
          >
            Message on WhatsApp
            <span className="btn-arrow" aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner mono-xs">
        <span>© 2026 Wahyu Kwan</span>
        <span className="footer-rule" aria-hidden />
        <span>Designed &amp; built in Jakarta</span>
        <span className="footer-rule" aria-hidden />
        <span>WK / End</span>
      </div>
    </footer>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('top')
      const threshold = hero ? hero.offsetTop + hero.offsetHeight : 600
      setVisible(window.scrollY > threshold)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const handleClick = (e) => {
    e.preventDefault()
    smoothScrollToY(0, 1000)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`scroll-top${visible ? ' is-visible' : ''}`}
      aria-label="Scroll to top"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="6 11 12 5 18 11" />
      </svg>
    </button>
  )
}

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      // Wait a tick so sections are laid out before measuring.
      const raf = requestAnimationFrame(() => {
        smoothScrollTo(id, 1000)
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [location.hash, location.key])

  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Skills />
      <Contact />
    </main>
  )
}

function ScrollToTopOnNavigate() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return null
}

function ProjectMavenFuzzyFactory() {
  return (
    <main className="project-page">
      <motion.article
        className="project-detail container"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <Link to="/#selected-work" className="back-link">
            <span aria-hidden>←</span> Back to Selected Work
          </Link>
        </motion.div>

        <motion.header className="project-detail-header" variants={fadeUp}>
          <div className="project-detail-meta">
            <span className="mono-xs section-number">WK / Case Study</span>
            <span className="tool-chip mono-xs">Tableau</span>
          </div>
          <h1 className="project-detail-title">
            Revenue &amp; Traffic{' '}
            <span className="project-detail-italic">Analysis</span>
            <span className="accent-dot">.</span>
          </h1>
          <p className="project-detail-subtitle">
            A Maven Fuzzy Factory diagnostic — tracing paid traffic, uncovering an
            attribution bug, and rebuilding monthly performance views.
          </p>
        </motion.header>

        <motion.section className="project-section" variants={fadeUp}>
          <h2 className="project-h2">Overview</h2>
          <p className="project-p">
            Maven Fuzzy Factory is a fictional e-commerce company used in the Maven
            Analytics training environment. Over several weeks I worked through a
            structured case study that mirrors real analyst work: ingesting raw
            marketing and order data, framing business questions from a messy CEO
            brief, and then turning the findings into a monthly performance view
            leadership could actually read.
          </p>
          <p className="project-p">
            The scope centered on three questions the leadership team needed
            answered:
          </p>
          <ol className="project-questions">
            <li>Where is our traffic actually coming from — and which channels are pulling their weight?</li>
            <li>How do our conversion rates, session volume, and revenue trend month over month?</li>
            <li>Are the numbers we&apos;re reporting to the team accurate, or are we drawing conclusions from broken joins?</li>
          </ol>
        </motion.section>

        <motion.section className="project-section" variants={fadeUp}>
          <h2 className="project-h2">Key Findings</h2>
          <div className="findings-grid">
            <div className="finding-card">
              <span className="mono-xs finding-index">Finding / 01</span>
              <h3 className="finding-title">The product margin paradox</h3>
              <p className="finding-body">
                Mr. Fuzzy generates 62% of total revenue but has the <em>lowest</em> gross
                margin (58.6%). Birthday Bear is the inverse — smallest revenue contribution
                but highest margin (65.6%). A shift in marketing mix toward higher-margin
                products would lift blended profitability without needing a revenue increase.
              </p>
            </div>
            <div className="finding-card">
              <span className="mono-xs finding-index">Finding / 02</span>
              <h3 className="finding-title">Funnel drop-off concentrated at checkout entry</h3>
              <p className="finding-body">
                Product Detail → Cart is the single biggest leak: 55% of visitors who view a
                product page leave without adding to cart. Checkout CTA clarity, shipping-cost
                visibility, and pricing are the hypothesis-worthy levers.
              </p>
            </div>
            <div className="finding-card">
              <span className="mono-xs finding-index">Finding / 03</span>
              <h3 className="finding-title">Desktop converts 2.75× better than mobile</h3>
              <p className="finding-body">
                Desktop 8.50% CVR vs. mobile 3.09%. With mobile representing ~37% of traffic,
                this is a material opportunity — either mobile UX needs investment, or mobile
                ad spend is mis-targeted.
              </p>
            </div>
            <div className="finding-card">
              <span className="mono-xs finding-index">Finding / 04</span>
              <h3 className="finding-title">Seasonality is volume-driven, not margin-driven</h3>
              <p className="finding-body">
                The Mar–Apr revenue dip (~30%) is mirrored exactly by a proportional drop in
                COGS, indicating a demand-side story (post-Valentine&apos;s lull) rather than
                a cost-structure issue.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="project-callout" variants={fadeUp}>
          <span className="callout-label mono-xs">Technical Detail / The Fan-Out Bug</span>
          <h3 className="callout-title">
            Product revenue didn&apos;t reconcile —{' '}
            <span className="callout-italic">the grain was wrong</span>.
          </h3>
          <p className="project-p">
            Early in development, product-level revenue didn&apos;t reconcile to the top-line
            KPI — the Revenue-by-Product pie summed to $2.63M while the Gross Revenue card
            showed $1.94M.
          </p>
          <p className="project-p">
            <strong>Root cause:</strong> <code className="callout-code">orders.price_usd</code> was
            being aggregated while sliced by{' '}
            <code className="callout-code">products.product_name</code>, a dimension reachable
            only through <code className="callout-code">order_items</code>. Tableau&apos;s
            relationship engine replicated each order&apos;s revenue once per line item in
            that order, inflating the total by the average items-per-order ratio (~1.35×).
          </p>
          <p className="project-p">
            <strong>Fix:</strong> re-sourced all product-level revenue and profit measures
            from <code className="callout-code">order_items</code> directly, where each row is
            already at item grain. After the fix, grand totals matched KPIs exactly.
          </p>
          <p className="callout-quote">
            &ldquo;In multi-grain data models, always source the measure at the same grain
            as — or finer than — the dimension it will be sliced by.&rdquo;
          </p>
        </motion.section>

        <motion.section className="project-section" variants={fadeUp}>
          <h2 className="project-h2">Methodology</h2>
          <ul className="methodology-list">
            <li>
              <span className="mono-xs">Step / 01</span>
              <div>
                <strong>Ingest &amp; profile.</strong> Loaded the raw MySQL tables, profiled
                row counts and null distributions, and mapped the relationships between
                sessions, orders, and order items before writing a single analytical query.
              </div>
            </li>
            <li>
              <span className="mono-xs">Step / 02</span>
              <div>
                <strong>Model at the correct grain.</strong> Built intermediate views at the
                order grain and the session grain so downstream joins wouldn&apos;t silently
                fan out. Documented the grain of every table consumed.
              </div>
            </li>
            <li>
              <span className="mono-xs">Step / 03</span>
              <div>
                <strong>Question-driven querying.</strong> Wrote one query per CEO question
                rather than one catch-all monster query. Easier to review, easier to trust.
              </div>
            </li>
            <li>
              <span className="mono-xs">Step / 04</span>
              <div>
                <strong>Visualize for decisions.</strong> Built the Tableau views around the
                decisions leadership actually needed to make — not around what was easy to
                chart.
              </div>
            </li>
          </ul>
        </motion.section>

        <motion.section className="project-section" variants={fadeUp}>
          <h2 className="project-h2">What I&apos;d Do With More Time</h2>
          <ul className="future-list">
            <li>Cohort analysis on repeat vs. new purchasers.</li>
            <li>LTV model by acquisition channel.</li>
            <li>Experiment design for the Product Detail → Cart drop-off.</li>
          </ul>
        </motion.section>

        <motion.section className="project-section" variants={fadeUp}>
          <h2 className="project-h2">Dashboards</h2>
          <div className="screenshots screenshots-two">
            <figure className="screenshot">
              <a
                href={revProfDashUrl}
                target="_blank"
                rel="noreferrer"
                className="screenshot-frame screenshot-frame-img"
                aria-label="Open Revenue & Profitability dashboard full size"
              >
                <img src={revProfDashUrl} alt="Revenue & Profitability Tableau dashboard for Maven Fuzzy Factory" />
              </a>
              <figcaption className="mono-xs">Fig. 01 — Revenue &amp; Profitability · Tableau</figcaption>
            </figure>
            <figure className="screenshot">
              <a
                href={trafConvDashUrl}
                target="_blank"
                rel="noreferrer"
                className="screenshot-frame screenshot-frame-img"
                aria-label="Open Traffic & Conversion dashboard full size"
              >
                <img src={trafConvDashUrl} alt="Traffic & Conversion Tableau dashboard for Maven Fuzzy Factory" />
              </a>
              <figcaption className="mono-xs">Fig. 02 — Traffic &amp; Conversion · Tableau</figcaption>
            </figure>
          </div>
        </motion.section>

        <motion.div className="project-detail-foot" variants={fadeUp}>
          <Link to="/#selected-work" className="back-link">
            <span aria-hidden>←</span> Back to Selected Work
          </Link>
        </motion.div>
      </motion.article>
    </main>
  )
}

function ProjectNusantaraStore() {
  return (
    <main className="project-page">
      <motion.article
        className="project-detail container"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <Link to="/#selected-work" className="back-link">
            <span aria-hidden>←</span> Back to Selected Work
          </Link>
        </motion.div>

        <motion.header className="project-detail-header" variants={fadeUp}>
          <div className="project-detail-meta">
            <span className="mono-xs section-number">WK / Case Study</span>
            <span className="tool-chip mono-xs">Looker Studio</span>
          </div>
          <h1 className="project-detail-title">
            Nusantara{' '}
            <span className="project-detail-italic">Store</span>
            <span className="accent-dot">.</span>
          </h1>
          <p className="project-detail-subtitle">
            A two-page Looker Studio dashboard for a fictional Indonesian
            e-commerce brand — revenue &amp; operations on page one, product,
            geography, and customer behavior on page two.
          </p>
          <div className="project-detail-actions">
            <a
              href={NUSANTARA_LIVE_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              View Live Dashboard
              <span className="btn-arrow" aria-hidden>↗</span>
            </a>
            <span className="mono-xs project-detail-actions-note">
              — Opens in Looker Studio · view-only access
            </span>
          </div>
        </motion.header>

        <motion.section className="project-section" variants={fadeUp}>
          <h2 className="project-h2">Overview</h2>
          <p className="project-p">
            Nusantara Store is a synthetic retail dataset I built to practice
            end-to-end dashboard design in Looker Studio. The brief: an
            Indonesian-rupiah e-commerce business selling across Tokopedia,
            Shopee, TikTok Shop, Lazada, and a direct website, with FY 2024
            performance to surface for a leadership-style read.
          </p>
          <p className="project-p">
            The dashboard is split across two pages so each one answers a
            distinct question. <em>Revenue &amp; Operations</em> tells the
            top-line story — how much, from where, when. <em>Product &amp;
            Customer</em> goes underneath that — what people are buying, where
            they live, how they pay, and whether they come back.
          </p>
        </motion.section>

        <motion.section className="project-section" variants={fadeUp}>
          <h2 className="project-h2">Page 01 · Revenue &amp; Operations</h2>
          <p className="project-p">
            The headline view: four KPI tiles (gross revenue, net revenue, gross
            profit, AOV), a monthly revenue trajectory against an annual
            average, and channel-level revenue breakdown with campaign-level
            drill-down underneath.
          </p>
          <div className="screenshots screenshots-two">
            <figure className="screenshot">
              <a
                href={nusantaraPage1Preview1}
                target="_blank"
                rel="noreferrer"
                className="screenshot-frame screenshot-frame-img"
                aria-label="Open Nusantara Store page 1 — KPIs and monthly trajectory full size"
              >
                <img
                  src={nusantaraPage1Preview1}
                  alt="Nusantara Store dashboard — KPI tiles and monthly revenue trajectory"
                  loading="lazy"
                />
              </a>
              <figcaption className="mono-xs">Fig. 01 — KPI tiles &amp; monthly revenue trajectory</figcaption>
            </figure>
            <figure className="screenshot">
              <a
                href={nusantaraPage1Preview2}
                target="_blank"
                rel="noreferrer"
                className="screenshot-frame screenshot-frame-img"
                aria-label="Open Nusantara Store page 1 — channels and campaigns full size"
              >
                <img
                  src={nusantaraPage1Preview2}
                  alt="Nusantara Store dashboard — channel performance and top-performing campaigns"
                  loading="lazy"
                />
              </a>
              <figcaption className="mono-xs">Fig. 02 — Channel performance &amp; top campaigns</figcaption>
            </figure>
          </div>
        </motion.section>

        <motion.section className="project-section" variants={fadeUp}>
          <h2 className="project-h2">Page 02 · Product &amp; Customer</h2>
          <p className="project-p">
            The diagnostic view: revenue distributed geographically across
            Indonesian provinces and cities, category mix as a treemap,
            retention and return-rate gauges, and a payment-method ranking
            covering local rails like GoPay, OVO, ShopeePay, DANA, and
            Alfamart/Indomaret over-the-counter.
          </p>
          <div className="screenshots screenshots-two">
            <figure className="screenshot">
              <a
                href={nusantaraPage2Preview1}
                target="_blank"
                rel="noreferrer"
                className="screenshot-frame screenshot-frame-img"
                aria-label="Open Nusantara Store page 2 — geography full size"
              >
                <img
                  src={nusantaraPage2Preview1}
                  alt="Nusantara Store dashboard — revenue by province and city across Indonesia"
                  loading="lazy"
                />
              </a>
              <figcaption className="mono-xs">Fig. 03 — Revenue by province &amp; city</figcaption>
            </figure>
            <figure className="screenshot">
              <a
                href={nusantaraPage2Preview2}
                target="_blank"
                rel="noreferrer"
                className="screenshot-frame screenshot-frame-img"
                aria-label="Open Nusantara Store page 2 — category, retention, and payment methods full size"
              >
                <img
                  src={nusantaraPage2Preview2}
                  alt="Nusantara Store dashboard — category mix, retention rate, and payment-method ranking"
                  loading="lazy"
                />
              </a>
              <figcaption className="mono-xs">Fig. 04 — Category, retention &amp; payment methods</figcaption>
            </figure>
          </div>
        </motion.section>

        <motion.section className="project-section" variants={fadeUp}>
          <h2 className="project-h2">Design Notes</h2>
          <ul className="future-list">
            <li>Two-page split keeps each view single-purpose — operators land on revenue first, analysts drill into product and customer second.</li>
            <li>Heat-shaded tables (channels, campaigns, payment methods) make ranking visible without a chart, which keeps the page calm.</li>
            <li>Monthly trajectory is plotted against an annual average line so seasonality reads as deviation rather than absolute level.</li>
            <li>IDR-native currency formatting (Rp, M-suffix abbreviation) so the dashboard feels native to its market rather than dollar-translated.</li>
          </ul>
        </motion.section>

        <motion.section className="project-section" variants={fadeUp}>
          <h2 className="project-h2">What I&apos;d Do With More Time</h2>
          <ul className="future-list">
            <li>Add a date-range control so the dashboard can be re-scoped to a quarter or campaign window without rebuilding views.</li>
            <li>Layer in a cohort-retention chart that ties first-purchase month to repeat behavior — the current retention gauge is a single number, not a trend.</li>
            <li>Push the dataset behind a BigQuery table so the dashboard refreshes from a real warehouse rather than a static sheet.</li>
          </ul>
        </motion.section>

        <motion.div className="project-detail-foot" variants={fadeUp}>
          <Link to="/#selected-work" className="back-link">
            <span aria-hidden>←</span> Back to Selected Work
          </Link>
        </motion.div>
      </motion.article>
    </main>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTopOnNavigate />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/maven-fuzzy-factory" element={<ProjectMavenFuzzyFactory />} />
        <Route path="/projects/nusantara-store" element={<ProjectNusantaraStore />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  )
}
