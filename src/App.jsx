import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDownRight, ArrowUpRight, Bot, ChartNoAxesCombined, ChevronRight, CirclePlay,
  Command, Crosshair, Globe2, Instagram, Layers3, Linkedin, Menu, MousePointer2,
  Play, Search, Send, Sparkles, Target, X,
} from 'lucide-react'
import CustomCursor from './components/CustomCursor'
import NexusCanvas from './components/NexusCanvas'
import { Magnetic } from './components/Magnetic'
import TiltCard from './components/TiltCard'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { id: 'search', icon: Search, number: '01', title: 'SEO & Search\nDominance', blurb: 'Own the intent layer before your category knows it moved.', tags: ['Technical SEO', 'Demand capture', 'AI search'], details: 'A compounding search system that pairs technical precision with a content engine built to win conventional and AI-generated results.' },
  { id: 'ads', icon: Target, number: '02', title: 'Performance\nAdvertising', blurb: 'Every media dollar becomes a measurable growth signal.', tags: ['Paid social', 'Google / YouTube', 'Creative testing'], details: 'A full-funnel paid media operating system, engineered around rapid creative experimentation and profit—not just platform ROAS.' },
  { id: 'creative', icon: Layers3, number: '03', title: 'Content & Viral\nCreative', blurb: 'Make a brand impossible to scroll past.', tags: ['Social systems', 'Creator-led', 'Brand worlds'], details: 'Distinctive ideas, content formats and creator collaborations that make brands feel culturally present and commercially magnetic.' },
  { id: 'automation', icon: Bot, number: '04', title: 'AI Automation\n& Funnels', blurb: 'Build a growth machine that learns while you sleep.', tags: ['Lifecycle', 'AI agents', 'CRO'], details: 'Intelligent journeys that convert more of the demand you already earn, with AI-assisted operations that move at campaign speed.' },
]

const studies = [
  { client: 'LUMA / BEAUTY', category: 'DTC BEAUTY', value: '+327%', label: 'revenue in 90 days', accent: '#00f3ff', className: 'luma' },
  { client: 'ARCLIGHT', category: 'FINTECH', value: '14.2x', label: 'blended return on ad spend', accent: '#a77bff', className: 'arc' },
  { client: 'FORGE / LABS', category: 'PERFORMANCE WELLNESS', value: '2.8M', label: 'organic video views', accent: '#ff4fa3', className: 'forge' },
]

function Counter({ prefix = '', end, suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.55 })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return undefined
    const start = performance.now(); const duration = 1500
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(end * (1 - Math.pow(1 - progress, 4))))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    return undefined
  }, [end, inView])
  return <div ref={ref} className="metric"><strong>{prefix}{count}{suffix}</strong><span>{label}</span></div>
}

function SectionIntro({ eyebrow, title, copy, align = '' }) {
  return <div className={`section-intro ${align}`}>
    <p className="eyebrow"><span />{eyebrow}</p>
    <h2>{title}</h2>
    {copy && <p className="section-copy">{copy}</p>}
  </div>
}

function Header({ active, setActive }) {
  const [open, setOpen] = useState(false)
  const links = [['Home', 'top'], ['Capabilities', 'services'], ['Work', 'work'], ['Method', 'method']]
  return <header className="site-header">
    <nav className="nav-shell" aria-label="Main navigation">
      <a className="brand" href="#top" onClick={() => setActive('top')} aria-label="Nexus Digital home"><i><Command size={16} /></i>NEXUS<span>®</span></a>
      <div className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(([label, id]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => { setActive(id); setOpen(false) }}>{label}</a>)}
      </div>
      <Magnetic href="#contact" className="proposal-button"><span>Get proposal</span><ArrowUpRight size={15} /></Magnetic>
      <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
    </nav>
  </header>
}

function Hero() {
  return <section id="top" className="hero">
    <div className="canvas-wrap" aria-hidden="true"><NexusCanvas /></div>
    <div className="hero-grain" />
    <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
    <div className="hero-copy">
      <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}><span />INDEPENDENT GROWTH LAB / EST. 2024</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
        <span>WE AMPLIFY</span><span className="gradient-type text-distort">BRANDS BEYOND</span><span>THE 3RD DIMENSION<span className="period">.</span></span>
      </motion.h1>
      <motion.div className="hero-bottom" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}>
        <p>Growth marketing, AI-driven campaigns, and high-ROI brand systems for companies rewriting what their category can be.</p>
        <div className="hero-actions">
          <Magnetic href="#work" className="button button-primary">Explore our work <ArrowDownRight size={17} /></Magnetic>
          <Magnetic href="#contact" className="button button-ghost"><CirclePlay size={17} />Book a demo</Magnetic>
        </div>
      </motion.div>
    </div>
    <div className="hero-status"><span className="pulse" /> Currently accepting Q4 partners</div>
    <a className="scroll-cue" href="#metrics"><span>SCROLL TO EXPLORE</span><i><ArrowDownRight size={15} /></i></a>
    <div className="drag-cue"><MousePointer2 size={13} /> DRAG THE CORE</div>
  </section>
}

function Metrics() {
  return <section id="metrics" className="metrics-section section-pad">
    <div className="metrics-top"><p className="eyebrow"><span />SIGNAL, NOT NOISE</p><p>Numbers worth making some noise about.</p></div>
    <div className="metrics-grid">
      <Counter prefix="$" end={50} suffix="M+" label="Revenue generated" />
      <Counter end={450} suffix="%" label="Average ROI lift" />
      <Counter end={120} suffix="+" label="Brands scaled" />
      <div className="metric metric-note"><Sparkles size={21} /><span>Built for the<br />next version of now.</span></div>
    </div>
  </section>
}

function Services() {
  const [selected, setSelected] = useState(null)
  const activeService = services.find((service) => service.id === selected)
  return <section id="services" className="services-section section-pad">
    <SectionIntro eyebrow="THE NEXUS STACK" title={<>Systems for growth that<br /><em>doesn't look like everyone else's.</em></>} copy="We connect insight, imagination and execution into one relentlessly accountable growth engine." />
    <div className="services-grid">
      {services.map((service) => {
        const Icon = service.icon
        return <TiltCard key={service.id} className={`service-card ${selected === service.id ? 'selected' : ''}`} onClick={() => setSelected(selected === service.id ? null : service.id)}>
          <div className="service-top"><span className="service-number">{service.number}</span><div className="service-icon"><Icon size={24} strokeWidth={1.5} /></div></div>
          <h3>{service.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
          <p>{service.blurb}</p>
          <div className="service-bottom"><span>{selected === service.id ? 'Collapse intel' : 'Open intel'}</span><i><ChevronRight size={17} /></i></div>
        </TiltCard>
      })}
    </div>
    <AnimatePresence mode="wait">
      {activeService && <motion.div className="service-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
        <div><p className="eyebrow"><span />{activeService.number} / DEEP DIVE</p><p>{activeService.details}</p></div>
        <div className="service-tags">{activeService.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <Magnetic href="#contact" className="detail-link">Build this system <ArrowUpRight size={16} /></Magnetic>
      </motion.div>}
    </AnimatePresence>
  </section>
}

function Work() {
  const [active, setActive] = useState(0)
  const study = studies[active]
  return <section id="work" className="work-section section-pad">
    <SectionIntro eyebrow="SELECTED SIGNALS" title={<>Proof from the<br /><em>other side of bold.</em></>} align="split" />
    <div className="work-stage" style={{ '--accent': study.accent }}>
      <div className={`work-visual ${study.className}`}><div className="work-visual-core" /><div className="work-visual-rings" /><span className="visual-label">NEXUS / {String(active + 1).padStart(2, '0')}</span></div>
      <motion.div className="work-info" key={study.client} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
        <p className="eyebrow"><span />{study.category}</p><h3>{study.client}</h3><strong>{study.value}</strong><p className="work-label">{study.label}</p>
        <Magnetic className="view-case" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>View case study <ArrowUpRight size={16} /></Magnetic>
      </motion.div>
    </div>
    <div className="work-controls"><div className="study-tabs">{studies.map((item, index) => <button key={item.client} className={index === active ? 'active' : ''} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.client}</button>)}</div><div className="depth-control"><span>DEPTH</span><input aria-label="Case study depth" type="range" min="0" max="2" step="1" value={active} onChange={(event) => setActive(Number(event.target.value))} /></div></div>
  </section>
}

function Method() {
  const steps = [['01', 'Find the fracture', 'We locate the sharpest tension between where your brand is and where your buyers are headed.'], ['02', 'Design the signal', 'Strategy, creative and media become one precise, provocative expression.'], ['03', 'Compound the edge', 'We test, learn and accelerate—turning winners into growth loops.']]
  return <section id="method" className="method-section section-pad">
    <SectionIntro eyebrow="OUR OPERATING SYSTEM" title={<>Chaos, turned into<br /><em>commercial momentum.</em></>} />
    <div className="method-steps">{steps.map(([num, title, text], index) => <motion.div className="method-step" key={num} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}><span>{num}</span><h3>{title}</h3><p>{text}</p><i><ArrowDownRight size={18} /></i></motion.div>)}</div>
  </section>
}

function Contact() {
  const choices = ['$5k', '$10k', '$25k', '$50k+']
  const [budget, setBudget] = useState(2)
  const [sent, setSent] = useState(false)
  const submit = () => { setSent(true); window.setTimeout(() => setSent(false), 2600) }
  return <section id="contact" className="contact-section section-pad">
    <div className="contact-panel"><div className="contact-glow" /><div className="contact-copy"><p className="eyebrow"><span />BUILD YOUR NEXT DIMENSION</p><h2>Ready to become<br /><em>unignorable?</em></h2><p>Tell us where you're going. We'll show you the signal path.</p></div>
      <div className="funnel-card"><div className="funnel-title"><span>01 / INVESTMENT RANGE</span><strong>{choices[budget]} <small>/ month</small></strong></div><input className="budget-slider" aria-label="Monthly marketing budget" type="range" min="0" max="3" step="1" value={budget} onChange={(event) => setBudget(Number(event.target.value))} style={{ '--range': `${(budget / 3) * 100}%` }} /><div className="range-labels">{choices.map((choice, index) => <span className={index === budget ? 'active' : ''} key={choice}>{choice}</span>)}</div><button className={`submit-3d ${sent ? 'submitted' : ''}`} onClick={submit}><span>{sent ? 'Signal received' : 'Start the conversation'}</span>{sent ? <Sparkles size={17} /> : <Send size={17} />}</button><p className="privacy">No pitch decks. No pressure. Just a useful first conversation.</p></div>
    </div>
  </section>
}

function Footer() {
  return <footer className="footer"><div className="footer-top"><a className="footer-brand" href="#top">NEXUS<span>®</span></a><p>Growth, after dark.<br />Built from the future forward.</p><div className="socials"><Magnetic href="https://www.linkedin.com" className="social-link"><Linkedin size={17} /></Magnetic><Magnetic href="https://www.instagram.com" className="social-link"><Instagram size={17} /></Magnetic><Magnetic href="#top" className="social-link"><ArrowUpRight size={17} /></Magnetic></div></div><div className="footer-bottom"><span>© 2024 NEXUS DIGITAL. ALL RIGHTS RESERVED.</span><div><a href="#services">Capabilities</a><a href="#work">Work</a><a href="#contact">Contact</a></div><span>MADE FOR THE UNCOMFORTABLY AMBITIOUS</span></div></footer>
}

export default function App() {
  const scope = useRef(null)
  const [active, setActive] = useState('top')
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, smoothTouch: false, lerp: 0.08 })
    let frame
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [])
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.to('.orbit-one', { rotation: 180, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.to('.hero-copy', { y: -55, opacity: 0.25, scrollTrigger: { trigger: '.hero', start: '35% top', end: 'bottom top', scrub: 1 } })
      gsap.from('.metrics-grid .metric', { y: 25, opacity: 0, stagger: 0.08, duration: 0.55, scrollTrigger: { trigger: '.metrics-grid', start: 'top 80%' } })
    }, scope)
    return () => context.revert()
  }, [])
  return <main ref={scope}>
    <CustomCursor />
    <Header active={active} setActive={setActive} />
    <Hero /><Metrics /><Services /><Work /><Method /><Contact /><Footer />
  </main>
}
