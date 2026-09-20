import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles.css'

const contentFiles = {
  profile: '/content/profile.json',
  certificates: '/content/certificate.json',
  education: '/content/education.json',
  contact: '/content/contact.json',
  experience: '/content/experience.json',
  creation: '/content/creation.json',
}

const portraitSlides = [
  { src: '/images/rajan-outdoor.png', alt: 'Rajan Aryal standing in a black jacket outdoors' },
  { src: '/images/rajan-mountain.png', alt: 'Rajan Aryal on a mountain bridge' },
  { src: '/images/rajan-yellow.png', alt: 'Rajan Aryal smiling in front of a yellow background' },
  { src: '/images/rajan-formal.png', alt: 'Rajan Aryal wearing a black suit and tie' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20241003_172854_183.jpg-OKdwxs40Q0u96jrWLzopr7t6MHZl0w.jpeg', alt: 'Rajan Aryal wearing sunglasses beside a waterfall' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-NibkiHVNkwkjqYZQuDWAYRhuukoS0Q.jpeg', alt: 'Rajan Aryal standing beside a river and forested hills' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2024-10-03%2017_18_17.jpg-E1tlm3muxXoKk58IWqON0JqQdZ4ErZ.jpeg', alt: 'Rajan Aryal facing a waterfall with his arms outstretched' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2300~2.jpg-KJDGr1P0pbPuW8qQ3ALIOoNeD8VDKw.jpeg', alt: 'Rajan Aryal smiling in a forest beside colorful tires' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260913_220241_890.jpg.jpeg-NUB3WCYW6JtC3ylphItTpFkc4TYWHf.webp', alt: 'Rajan Aryal wearing sunglasses in front of mountain scenery' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260913_220242_262.jpg.jpeg-wtt20X7R9EgtE3Gwt7pzX66JKrxMdG.webp', alt: 'Rajan Aryal smiling in a white jacket' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20260124_205834_Instagram.jpg-LZHhf5RyNokTgfbGyiQtKx8hQmKDlJ.jpeg', alt: 'Rajan Aryal wearing a light blue blazer in a garden' },
]

function FacebookEmbed() {
  const profileUrl = 'https://www.facebook.com/profile.php?id=61590286482292'
  const embedUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(profileUrl)}&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`

  return <div className="feed-frame facebook-frame"><iframe src={embedUrl} loading="lazy" title="Facebook profile timeline" /></div>
}

function App() {
  const [content, setContent] = useState({ profile: null, certificates: [], education: [], experience: [], creation: { channels: [], instagramPosts: [], skills: [] }, contact: { socials: [] } })
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [copied, setCopied] = useState(false)
  const [portraitIndex, setPortraitIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setPortraitIndex((current) => (current + 1) % portraitSlides.length), 4500)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    Promise.all(Object.values(contentFiles).map((file) => fetch(file).then((response) => response.json())))
      .then(([profile, certificates, education, contact, experience, creation]) => setContent({ profile, certificates, education, experience, creation, contact }))
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
      <div className="nav-links"><a href="#about">About</a><a href="#work">Certificates</a><a href="#education">Education</a><a href="#experience">Experience</a><a href="#content">Content</a><a href="#contact">Contact</a></div>
      <a className="nav-cv" href={profile.cv} download>Download CV <span>↗</span></a>
    </nav>

    <main id="top">
      <section className="hero section-grid" id="about">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot" />{profile.availability}</p><h1>Building professional growth with <em>clarity</em> and character.</h1><p className="hero-intro">{profile.intro}</p><div className="hero-actions"><a className="button button-primary" href="#contact">Let&apos;s work together <span>↗</span></a><a className="text-link" href="#work">Explore my credentials <span>↓</span></a></div></div>
        <div className="hero-visual"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="portrait-wrap" aria-label="Professional portrait slideshow"><img key={portraitSlides[portraitIndex].src} className="portrait-slide" src={`${portraitSlides[portraitIndex].src}?v=3`} alt={portraitSlides[portraitIndex].alt} /><span className="portrait-label">Professional<br /><strong>{String(portraitIndex + 1).padStart(2, '0')} / {String(portraitSlides.length).padStart(2, '0')}</strong></span><div className="portrait-controls" aria-label="Portrait slideshow controls"><button type="button" onClick={() => setPortraitIndex((portraitIndex - 1 + portraitSlides.length) % portraitSlides.length)} aria-label="Previous portrait">←</button>{portraitSlides.map((slide, index) => <button type="button" className={index === portraitIndex ? 'is-active' : ''} onClick={() => setPortraitIndex(index)} aria-label={`Show portrait ${index + 1}`} key={slide.src}><span /></button>)}<button type="button" onClick={() => setPortraitIndex((portraitIndex + 1) % portraitSlides.length)} aria-label="Next portrait">→</button></div></div><div className="visual-note">Curious by default.<br />Intentional by design.</div></div>
      </section>

      <section className="marquee" aria-label="Areas of expertise"><span>Sales &amp; marketing</span><i>✦</i><span>Accounts &amp; audit</span><i>✦</i><span>Communication</span><i>✦</i><span>Sales &amp; marketing</span></section>
      <section className="about-section section-grid"><div><p className="section-kicker">01 / About me</p><h2>Thoughtful work,<br /><em>made useful.</em></h2></div><div className="about-detail"><p>{profile.bio}</p><div className="skill-list">{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></section>
      <section className="content-section" id="work"><div className="section-heading"><div><p className="section-kicker">02 / Certifications</p><h2>Proof of <em>practice.</em></h2></div><p className="section-aside">A growing collection of credentials and milestones from my learning journey.</p></div><div className="certificate-grid">{content.certificates.map((certificate) => <article className="certificate" key={certificate.title}>{certificate.image && <button className="certificate-image-link" type="button" onClick={() => setSelectedCertificate(certificate)} aria-label={`View ${certificate.title} certificate`}><img className="certificate-image" loading="lazy" src={certificate.image} alt={certificate.title} /></button>}<div><div className="certificate-top"><span>{certificate.issuer}</span><span>{certificate.date}</span></div>{certificate.issuerDetail && <p className="issuer-detail">{certificate.issuerDetail}</p>}<h3>{certificate.title}</h3>{certificate.credentialId && <p>Credential ID: {certificate.credentialId}</p>}</div>{certificate.image && <button className="credential" type="button" onClick={() => setSelectedCertificate(certificate)}>View certificate ↗</button>}{certificate.url && <a className="credential" href={certificate.url} target="_blank" rel="noreferrer">View credential ↗</a>}</article>)}</div></section>
      <section className="content-section" id="education"><div className="section-heading"><div><p className="section-kicker">03 / Education</p><h2>Always <em>learning.</em></h2></div></div><div className="education-list">{content.education.map((item) => <article className="education-item" key={item.degree}><time>{item.period}</time><div><h3>{item.degree}</h3><p>{item.description}</p></div><span className="institution">{item.institution}</span></article>)}</div></section>
      <section className="content-section" id="experience"><div className="section-heading"><div><p className="section-kicker">04 / Experience</p><h2>Work with <em>purpose.</em></h2></div><p className="section-aside">Practical experience across accounts, audit, marketing, procurement, and business support.</p></div><div className="education-list experience-list">{content.experience.map((item) => <article className="education-item experience-item" key={`${item.role}-${item.company}`}><time>{item.period}</time><div><h3>{item.role}</h3><p>{item.description}</p></div><span className="institution">{item.company}<br />{item.location}</span></article>)}</div></section>
      <section className="content-section creation-section" id="content"><div className="section-heading"><div><p className="section-kicker">05 / Content creation</p><h2>Made to <em>connect.</em></h2></div><p className="section-aside">Stories, edits, and visual experiments shaped for the platforms where people spend time.</p></div><div className="channel-grid">{content.creation.channels.map((channel) => <a className="channel-card" href={channel.url} target="_blank" rel="noreferrer" key={channel.platform}><div><span className="channel-platform">{channel.platform}</span><h3>{channel.handle}</h3><p>{channel.description}</p></div><span className="channel-arrow">View channel ↗</span></a>)}</div><div className="feed-grid"><div className="feed-column"><span className="feed-label">TikTok feed</span><div className="feed-frame tiktok-frame"><iframe src="https://www.tiktok.com/embed/@rjn.vibe" loading="lazy" title="TikTok feed of @rjn.vibe" /></div></div><div className="feed-column"><span className="feed-label">Facebook profile</span><FacebookEmbed /></div></div><div className="skill-list creation-skills">{content.creation.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="collaboration-email"><span className="feed-label">Business &amp; Collaborations</span><a href="mailto:rjnvibe@gmail.com">rjnvibe@gmail.com</a></div></section>
      <section className="contact-section" id="contact"><p className="section-kicker">06 / Get in touch</p><h2>Have a good idea?<br /><em>Let&apos;s make it real.</em></h2><div className="contact-row"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}</a><button className="copy-button" onClick={copyEmail}>{copied ? 'Copied' : 'Copy email'}</button></div><div className="social-links" aria-label="Social media links">{content.contact.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label} ↗</a>)}</div></section>
    </main>
    {selectedCertificate && <div className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title" onClick={() => setSelectedCertificate(null)}><div className="certificate-modal-card" onClick={(event) => event.stopPropagation()}><div className="certificate-modal-header"><div><p className="section-kicker">Certificate preview</p><h2 id="certificate-modal-title">{selectedCertificate.title}</h2></div><button className="modal-close" type="button" onClick={() => setSelectedCertificate(null)} aria-label="Close certificate preview">×</button></div><img className="certificate-modal-image" src={selectedCertificate.image} alt={`${selectedCertificate.title} full certificate`} /></div></div>}
    <footer><span>© 2024 {profile.name}</span><span>Designed &amp; built with intention.</span><a href="https://github.com/Mrcoderv" target="_blank" rel="noreferrer">github.com/Mrcoderv</a><a href="#top">Back to top ↑</a></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
