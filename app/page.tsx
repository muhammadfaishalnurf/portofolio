"use client";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Braces,
  Code2,
  Coffee,
  Command,
  Figma,
  Github,
  Globe2,
  Layers3,
  Menu,
  Palette,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = ["Home", "About", "Portfolio", "Blog"] as const;
type SectionName = (typeof navItems)[number];
const githubUrl = "https://github.com/muhammadfaishalnurf";
const roles = ["Web Developer", "Full-stack Engineer", "Frontend Developer"];

const techStack = [
  { name: "HTML", level: "Advanced", icon: Code2, color: "text-orange-300" },
  { name: "CSS", level: "Advanced", icon: Palette, color: "text-blue-300" },
  { name: "JavaScript", level: "Advanced", icon: Braces, color: "text-yellow-300" },
  { name: "Laravel", level: "Intermediate", icon: Layers3, color: "text-red-300" },
  { name: "Vue.js", level: "Intermediate", icon: Atom, color: "text-emerald-300" },
  { name: "React", level: "Advanced", icon: Atom, color: "text-cyan-300" },
  { name: "Tailwind CSS", level: "Advanced", icon: Sparkles, color: "text-sky-300" },
  { name: "Node.js", level: "Intermediate", icon: Terminal, color: "text-lime-300" },
];

const tools = [
  { name: "Git & GitHub", icon: Github },
  { name: "VS Code", icon: Code2 },
  { name: "Figma", icon: Figma },
  { name: "Terminal", icon: Terminal },
];

const projects = [
  {
    number: "01",
    name: "RuangKarya",
    type: "Creative marketplace",
    description:
      "Marketplace yang mempertemukan talenta kreatif dengan bisnis yang mencari karya istimewa.",
    stack: ["Next.js", "Tailwind", "TypeScript"],
    visual: "marketplace",
    label: "Temukan karya, temukan inspirasi.",
  },
  {
    number: "02",
    name: "Kopi Pagi",
    type: "Digital experience",
    description:
      "Pengalaman digital yang hangat untuk brand kopi lokal dengan cerita di setiap cangkir.",
    stack: ["Vue.js", "Laravel", "MySQL"],
    visual: "coffee",
    label: "Awali hari dengan cerita.",
  },
  {
    number: "03",
    name: "Nusa Finance",
    type: "Fintech dashboard",
    description:
      "Dashboard keuangan yang membantu bisnis kecil memahami angka tanpa kehilangan fokus.",
    stack: ["React", "Node.js", "Charts"],
    visual: "finance",
    label: "Keuangan, lebih sederhana.",
  },
];

const articles = [
  {
    date: "12 JUN 2024",
    category: "Development",
    title: "Membangun antarmuka yang terasa cepat",
    description:
      "Performa bukan cuma soal angka. Ini tentang bagaimana sebuah produk terasa saat digunakan.",
    color: "article-yellow",
    icon: "01",
  },
  {
    date: "28 MEI 2024",
    category: "Design & code",
    title: "Dari desain ke kode, tanpa kehilangan detail",
    description:
      "Catatan kecil untuk menjaga karakter sebuah desain tetap hidup saat diimplementasikan.",
    color: "article-lilac",
    icon: "02",
  },
  {
    date: "09 APR 2024",
    category: "Developer life",
    title: "Belajar konsisten di tengah banyaknya tools",
    description:
      "Cara sederhana untuk tetap bertumbuh tanpa merasa harus mengejar semua hal sekaligus.",
    color: "article-blue",
    icon: "03",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionName>("Home");
  const [activeTab, setActiveTab] = useState<"Tech Stack" | "Tools">("Tech Stack");
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    let characterIndex = 0;
    let timer: number;

    const eraseRole = () => {
      characterIndex -= 1;
      setDisplayedRole(role.slice(0, characterIndex));
      if (characterIndex > 0) {
        timer = window.setTimeout(eraseRole, 45);
      } else {
        setRoleIndex((current) => (current + 1) % roles.length);
      }
    };

    const typeRole = () => {
      characterIndex += 1;
      setDisplayedRole(role.slice(0, characterIndex));
      if (characterIndex < role.length) {
        timer = window.setTimeout(typeRole, 85);
      } else {
        timer = window.setTimeout(eraseRole, 1750);
      }
    };

    timer = window.setTimeout(typeRole, 300);
    return () => window.clearTimeout(timer);
  }, [roleIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const section = visible.target.id as SectionName;
          if (navItems.includes(section)) setActiveSection(section);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    navItems.forEach((item) => {
      const section = document.getElementById(item);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const navigateTo = (item: SectionName) => {
    setActiveSection(item);
    setMobileMenuOpen(false);
    document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#Home" onClick={() => navigateTo("Home")}>
            faishalnur<span>()</span>
          </a>

          <nav aria-label="Navigasi utama" className="desktop-nav">
            {navItems.map((item) => (
              <button
                aria-current={activeSection === item ? "page" : undefined}
                className={`nav-link ${activeSection === item ? "active" : ""}`}
                key={item}
                onClick={() => navigateTo(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              aria-label="GitHub Muhammad Faishal"
              className="github-link"
              href={githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Github size={17} strokeWidth={1.8} />
              <span>GitHub</span>
              <ArrowUpRight size={13} />
            </a>
            <button
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              type="button"
            >
              {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav aria-label="Navigasi seluler" className="mobile-nav">
            {navItems.map((item) => (
              <button
                className={activeSection === item ? "active" : ""}
                key={item}
                onClick={() => navigateTo(item)}
                type="button"
              >
                {item}
                <ArrowUpRight size={15} />
              </button>
            ))}
          </nav>
        )}
      </header>

      <div className="page-wrap">
        <section aria-labelledby="hero-title" className="hero section-anchor" id="Home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              OPEN FOR OPPORTUNITIES
            </div>
            <p className="hello-line">Hello World, I&apos;m</p>
            <h1 id="hero-title">
              Muhammad
              <br />
              Faishal Nur
              <br />
              <span>Firdaus.</span>
            </h1>
            <div aria-live="polite" className="role-line">
              <span className="role-prompt">&gt;</span>
              <span className="role-text">{displayedRole}</span>
              <span className="typing-cursor" />
            </div>
            <p className="hero-intro">Welcome to my personal website. 👋</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => navigateTo("Portfolio")} type="button">
                Lihat karya saya <ArrowDownRight size={16} />
              </button>
              <a className="button button-quiet" href={githubUrl} rel="noreferrer" target="_blank">
                Hubungi saya <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="hero-footnote">
              <span>BASED IN INDONESIA</span>
              <span className="footnote-line" />
              <span>AVAILABLE WORLDWIDE</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Ilustrasi profil Muhammad Faishal Nur Firdaus">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="avatar-frame">
              <Image
                alt="Ilustrasi avatar bergaya 3D dengan latar gelap"
                className="avatar-image"
                height={440}
                src="/fyss.png"
                width={440}
              />
            </div>
            <div className="float-card float-card-code">
              <span className="float-card-icon"><Code2 size={15} /></span>
              <span><strong>Clean code</strong><small>with purpose</small></span>
            </div>
            <div className="float-card float-card-coffee">
              <Coffee size={16} />
              <span>Powered by coffee</span>
              <span className="coffee-heart">♥</span>
            </div>
            <span className="art-sparkle sparkle-one">✳</span>
            <span className="art-sparkle sparkle-two">✳</span>
          </div>
          <a className="scroll-cue" href="#About" onClick={() => setActiveSection("About")}>
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={14} />
          </a>
          <span className="hero-index">01 / 04</span>
        </section>

        <section aria-labelledby="about-title" className="section-block about-section section-anchor" id="About">
          <div className="section-heading">
            <div>
              <p className="section-kicker"><span>01</span> A LITTLE ABOUT ME</p>
              <h2 id="about-title">The person behind<br />the <span>pixels.</span></h2>
            </div>
            <p className="section-aside">
              Perpaduan antara rasa ingin tahu, kopi, dan baris kode yang penuh makna.
            </p>
          </div>

          <div className="about-grid">
            <article className="about-card">
              <div className="about-card-top">
                <span className="mini-icon"><Sparkles size={16} /></span>
                <span className="card-label">MY STORY</span>
                <span className="card-count">01 — 03</span>
              </div>
              <h3>Building digital<br />things, <span>with heart.</span></h3>
              <p>
                Saya Muhammad Faishal Nur Firdaus, seorang web developer yang suka
                mengubah ide menjadi produk digital yang terasa sederhana, cepat,
                dan menyenangkan untuk digunakan.
              </p>
              <p>
                Dari antarmuka yang detail sampai logika di balik layar, saya senang
                berada di seluruh proses pembuatan produk. Selalu belajar, selalu
                penasaran, dan selalu mencari cara yang lebih baik.
              </p>
              <div className="about-card-bottom">
                <span><span className="status-dot" /> CURRENTLY AVAILABLE</span>
                <Globe2 size={16} />
              </div>
            </article>

            <div className="skills-panel">
              <div className="skills-topline">
                <div>
                  <p className="card-label">THINGS I WORK WITH</p>
                  <h3>My toolkit<span>.</span></h3>
                </div>
                <Command className="toolkit-icon" size={20} />
              </div>
              <div aria-label="Kategori keahlian" className="skill-tabs" role="tablist">
                {(["Tech Stack", "Tools"] as const).map((tab) => (
                  <button
                    aria-selected={activeTab === tab}
                    className={`skill-tab ${activeTab === tab ? "selected" : ""}`}
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    role="tab"
                    type="button"
                  >
                    {tab}
                    {tab === "Tech Stack" && <span>08</span>}
                    {tab === "Tools" && <span>04</span>}
                  </button>
                ))}
              </div>
              <div className="skills-grid" key={activeTab} role="tabpanel">
                {activeTab === "Tech Stack"
                  ? techStack.map(({ name, level, icon: Icon, color }) => (
                      <div className="skill-card" key={name}>
                        <div className={`skill-icon ${color}`}><Icon size={18} strokeWidth={1.8} /></div>
                        <div className="skill-name">{name}</div>
                        <div className="skill-level"><span />{level}</div>
                      </div>
                    ))
                  : tools.map(({ name, icon: Icon }) => (
                      <div className="skill-card tool-card" key={name}>
                        <div className="skill-icon text-amber"><Icon size={18} strokeWidth={1.8} /></div>
                        <div className="skill-name">{name}</div>
                        <div className="skill-level"><span />DAILY DRIVER</div>
                      </div>
                    ))}
              </div>
              <div className="skills-footer">
                <span>ALWAYS LEARNING SOMETHING NEW</span>
                <span className="learning-mark">✳</span>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="portfolio-title" className="section-block portfolio-section section-anchor" id="Portfolio">
          <div className="section-heading">
            <div>
              <p className="section-kicker"><span>02</span> SELECTED WORKS</p>
              <h2 id="portfolio-title">Past project<br /><span>experience.</span></h2>
            </div>
            <a className="text-link" href={githubUrl} rel="noreferrer" target="_blank">
              More on GitHub <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className={`project-visual ${project.visual}`}>
                  <div className="project-window">
                    <div className="window-bar">
                      <span /><span /><span />
                      <div className="window-address" />
                    </div>
                    <div className="window-content">
                      <div className="mock-nav"><span className="mock-logo">{project.name}</span><span /><span /><span className="mock-button" /></div>
                      <div className="mock-body">
                        <span className="mock-caption">{project.type}</span>
                        <strong>{project.label}</strong>
                        <span className="mock-line" />
                        <span className="mock-cta" />
                      </div>
                      {project.visual === "marketplace" && <div className="mock-images"><span /><span /><span /></div>}
                      {project.visual === "coffee" && <div className="coffee-cup">☕</div>}
                      {project.visual === "finance" && <div className="finance-chart"><i /><i /><i /><i /><i /><i /><i /></div>}
                    </div>
                  </div>
                  <span className="project-number">{project.number}</span>
                  <span className="project-open"><ArrowUpRight size={17} /></span>
                </div>
                <div className="project-info">
                  <div className="project-title-row">
                    <div>
                      <span className="project-type">{project.type}</span>
                      <h3>{project.name}</h3>
                    </div>
                    <ArrowUpRight className="project-arrow" size={19} />
                  </div>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="portfolio-note">
            <span className="note-star">✳</span>
            <span>Good work takes curiosity, care, and a little bit of courage.</span>
            <span className="note-author">— A NOTE TO MYSELF</span>
          </div>
        </section>

        <section aria-labelledby="blog-title" className="section-block blog-section section-anchor" id="Blog">
          <div className="section-heading blog-heading">
            <div>
              <p className="section-kicker"><span>03</span> THOUGHTS & NOTES</p>
              <h2 id="blog-title">Words worth<br /><span>sharing.</span></h2>
            </div>
            <div className="blog-side-note">
              <span className="side-note-line" />
              <p>Sedikit catatan dari proses<br />belajar dan membangun.</p>
            </div>
          </div>

          <div className="blog-layout">
            <div className="article-list">
              {articles.map((article) => (
                <article className="article-card" key={article.icon}>
                  <div className={`article-thumb ${article.color}`}>
                    <span className="article-thumb-number">{article.icon}</span>
                    <span className="article-thumb-mark"><Code2 size={22} /></span>
                    <ArrowUpRight className="article-thumb-arrow" size={16} />
                  </div>
                  <div className="article-content">
                    <div className="article-meta"><span>{article.date}</span><span className="meta-dot">·</span><span>{article.category}</span></div>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                  </div>
                  <ArrowRight className="article-arrow" size={17} />
                </article>
              ))}
            </div>
            <aside className="blog-sidebar">
              <div className="sidebar-top"><span className="card-label">BROWSE BY TOPIC</span><ArrowDownRight size={16} /></div>
              <a href="#Blog"><span>01</span> Development <ArrowUpRight size={14} /></a>
              <a href="#Blog"><span>02</span> Design & code <ArrowUpRight size={14} /></a>
              <a href="#Blog"><span>03</span> Developer life <ArrowUpRight size={14} /></a>
              <div className="sidebar-bottom">
                <span className="sidebar-star">✳</span>
                <p>Curiosity never<br />goes out of style.</p>
              </div>
            </aside>
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-cta">
            <div>
              <p className="section-kicker"><span>04</span> HAVE A GOOD ONE IN MIND?</p>
              <h2>Let&apos;s make<br />something <span>matter.</span></h2>
            </div>
            <a className="footer-contact" href={githubUrl} rel="noreferrer" target="_blank">
              <span>SAY HELLO</span>
              <ArrowUpRight size={20} />
            </a>
          </div>
          <div className="footer-bottom">
            <a className="brand" href="#Home" onClick={() => navigateTo("Home")}>faishalnur<span>()</span></a>
            <span className="copyright">DESIGNED & BUILT WITH <span>♥</span> BY FAISHAL · © 2024</span>
            <div className="footer-socials">
              <a aria-label="GitHub" href={githubUrl} rel="noreferrer" target="_blank"><Github size={17} /></a>
            </div>
          </div>
          <div className="footer-endline"><span>MADE WITH INTENTION</span><span>INDONESIA · {new Date().getFullYear()}</span></div>
        </footer>
      </div>
    </main>
  );
}
