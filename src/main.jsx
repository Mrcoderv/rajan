import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles.css'

const contentFiles = {
  profile: '/content/profile.json',
  certificates: '/content/certificate.json',
  education: '/content/education.json',
  contact: '/content/contact.json',
}

const portraitSlides = [
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rajannn-BMcnk5weQuyTKH2Tn4lLIxxewGXrEZ.png', alt: 'Rajan Aryal in a professional suit' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-e7dAC0VaPrdEYmjroddX3i9dWGMOXF.png', alt: 'Rajan Aryal seated outdoors' },
  { src: '/images/rajan-outdoor.png', alt: 'Rajan Aryal standing in a black jacket' },
  { src: '/images/rajan-mountain.png', alt: 'Rajan Aryal on a mountain bridge' },
]

function App() {
  const [content, setContent] = useState({ profile: null, certificates: [], education: [], contact: { socials: [] } })
  const [copied, setCopied] = useState(false)
  const [portraitIndex, setPortraitIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setPortraitIndex((current) => (current + 1) % portraitSlides.length), 4500)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    Promise.all(Object.values(contentFiles).map((file) => fetch(file).then((response) => response.json())))
      .then(([profile, certificates, education, contact]) => setContent({ profile, certificates, education, contact }))
      .catch((error) => console.error('[portfolio] Could not load editable content:', error))
  }, [])

  const profile = content.profile
  const copyEmail = async () => {
    if (!profile?.email) return
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  if (!profile) return <div className="loading" aria-live="polite">Loading portfolio…</div>

  return <div className="site-shell">
    <nav className="navbar" aria-label="Primary navigation">
      <a className="brand" href="#top"><span className="brand-mark">RA</span><span>{profile.name}</span></a>
      <div className="nav-links"><a href="#about">About</a><a href="#work">Certificates</a><a href="#education">Education</a><a href="#contact">Contact</a></div>
      <a className="nav-cv" href={profile.cv} download>Download CV <span>↗</span></a>
    </nav>

    <main id="top">
      <section className="hero section-grid" id="about">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot" />{profile.availability}</p><h1>Building professional growth with <em>clarity</em> and character.</h1><p className="hero-intro">{profile.intro}</p><div className="hero-actions"><a className="button button-primary" href="#contact">Let&apos;s work together <span>↗</span></a><a className="text-link" href="#work">Explore my credentials <span>↓</span></a></div></div>
        <div className="hero-visual"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="portrait-wrap"><img key={portraitSlides[portraitIndex].src} className="portrait-slide" src={portraitSlides[portraitIndex].src} alt={portraitSlides[portraitIndex].alt} /><span className="portrait-label">Professional<br /><strong>{String(portraitIndex + 1).padStart(2, '0')} / {String(portraitSlides.length).padStart(2, '0')}</strong></span><div className="portrait-controls" aria-label="Portrait slideshow controls"><button type="button" onClick={() => setPortraitIndex((portraitIndex - 1 + portraitSlides.length) % portraitSlides.length)} aria-label="Previous portrait">←</button>{portraitSlides.map((slide, index) => <button type="button" className={index === portraitIndex ? 'is-active' : ''} onClick={() => setPortraitIndex(index)} aria-label={`Show portrait ${index + 1}`} key={slide.src}><span /></button>)}<button type="button" onClick={() => setPortraitIndex((portraitIndex + 1) % portraitSlides.length)} aria-label="Next portrait">→</button></div></div><div className="visual-note">Curious by default.<br />Intentional by design.</div></div>
      </section>

      <section className="marquee" aria-label="Areas of expertise"><span>Sales &amp; marketing</span><i>✦</i><span>Accounts &amp; audit</span><i>✦</i><span>Communication</span><i>✦</i><span>Sales &amp; marketing</span></section>
      <section className="about-section section-grid"><div><p className="section-kicker">01 / About me</p><h2>Thoughtful work,<br /><em>made useful.</em></h2></div><div className="about-detail"><p>{profile.bio}</p><div className="skill-list">{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></section>
      <section className="content-section" id="work"><div className="section-heading"><div><p className="section-kicker">02 / Certifications</p><h2>Proof of <em>practice.</em></h2></div><p className="section-aside">A growing collection of credentials and milestones from my learning journey.</p></div><div className="certificate-grid">{content.certificates.map((certificate) => <article className="certificate" key={certificate.title}>{certificate.image && <img className="certificate-image" src={`/${certificate.image}`} alt={`${certificate.title} certificate`} />}<div><div className="certificate-top"><span>{certificate.issuer}</span><span>{certificate.date}</span></div><h3>{certificate.title}</h3>{certificate.credentialId && <p>Credential ID: {certificate.credentialId}</p>}</div>{certificate.url && <a className="credential" href={certificate.url} target="_blank" rel="noreferrer">View credential ↗</a>}</article>)}</div></section>
      <section className="content-section" id="education"><div className="section-heading"><div><p className="section-kicker">03 / Education</p><h2>Always <em>learning.</em></h2></div></div><div className="education-list">{content.education.map((item) => <article className="education-item" key={item.degree}><time>{item.period}</time><div><h3>{item.degree}</h3><p>{item.description}</p></div><span className="institution">{item.institution}</span></article>)}</div></section>
      <section className="contact-section" id="contact"><p className="section-kicker">04 / Get in touch</p><h2>Have a good idea?<br /><em>Let&apos;s make it real.</em></h2><div className="contact-row"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}</a><button className="copy-button" onClick={copyEmail}>{copied ? 'Copied' : 'Copy email'}</button></div><div className="social-links" aria-label="Social media links">{content.contact.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label} ↗</a>)}</div></section>
    </main>
    <footer><span>© 2024 {profile.name}</span><span>Designed &amp; built with intention.</span><a href="#top">Back to top ↑</a></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
