import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TEACHER_PHOTO = "https://cdn.poehali.dev/projects/12b21a17-2320-4d9e-bae1-8668ef002a9a/files/b04f1d1a-efca-44ad-98bd-46f49592f3a9.jpg";

const PROGRAMS = [
  {
    id: "start",
    title: "Старт в веб",
    level: "Начинающий",
    duration: "2 месяца",
    price: "15 000 ₽",
    color: "#00D4FF",
    icon: "Zap",
    modules: ["HTML & CSS основы", "Flexbox и Grid", "Адаптивный дизайн", "Первый сайт-портфолио"],
    desc: "Идеально для тех, кто никогда не писал код. Создадите свой первый сайт с нуля."
  },
  {
    id: "pro",
    title: "Frontend Pro",
    level: "Средний",
    duration: "4 месяца",
    price: "28 000 ₽",
    color: "#8B5CF6",
    icon: "Code2",
    popular: true,
    modules: ["JavaScript ES6+", "React & TypeScript", "REST API", "Git и деплой"],
    desc: "Для тех, кто знает HTML/CSS. Освоите современный стек и сможете работать в команде."
  },
  {
    id: "fullstack",
    title: "Fullstack Master",
    level: "Продвинутый",
    duration: "6 месяцев",
    price: "45 000 ₽",
    color: "#FF006E",
    icon: "Layers",
    modules: ["Node.js & Python", "Базы данных", "Облачные сервисы", "Карьерный трекинг"],
    desc: "Полный путь от верстки до серверной части. Станете универсальным разработчиком."
  }
];

const PORTFOLIO = [
  { title: "Интернет-магазин", category: "React + Node.js", color: "#00D4FF" },
  { title: "Корпоративный сайт", category: "HTML/CSS/JS", color: "#8B5CF6" },
  { title: "Лендинг стартапа", category: "React + Tailwind", color: "#FF006E" },
  { title: "Дашборд аналитики", category: "TypeScript + API", color: "#00FF88" },
  { title: "Мобильное приложение", category: "React Native", color: "#FFB800" },
  { title: "Блог платформа", category: "Next.js + PostgreSQL", color: "#00D4FF" },
];

const SCHEDULE = [
  { day: "Понедельник / Среда", time: "19:00 – 21:00", type: "Основной поток" },
  { day: "Вторник / Четверг", time: "19:00 – 21:00", type: "Вечерний поток" },
  { day: "Суббота", time: "10:00 – 14:00", type: "Интенсив" },
];

const STATS = [
  { value: "500+", label: "Выпускников" },
  { value: "7 лет", label: "Опыта" },
  { value: "92%", label: "Трудоустроились" },
  { value: "4.9 ★", label: "Рейтинг" },
];

function TypeWriter({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const current = texts[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => { setDisplay(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1); }, 60);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => { setDisplay(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }, 30);
      } else {
        setDeleting(false);
        setIndex(i => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index, texts]);

  return (
    <span>
      <span className="gradient-text">{display}</span>
      <span style={{ animation: "text-blink 1s step-end infinite", color: "#00D4FF" }}>|</span>
    </span>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Index() {
  const [activeProgram, setActiveProgram] = useState("pro");
  const [formData, setFormData] = useState({ name: "", phone: "", program: "pro", schedule: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const aboutSection = useInView();
  const programsSection = useInView();
  const portfolioSection = useInView();
  const contactSection = useInView();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const navLinks = [
    { href: "#about", label: "О преподавателе" },
    { href: "#programs", label: "Программы" },
    { href: "#portfolio", label: "Портфолио" },
    { href: "#contact", label: "Записаться" },
  ];

  return (
    <div className="min-h-screen font-body overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 flex items-center justify-between"
        style={{ background: "rgba(8, 12, 28, 0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <a href="#" className="font-heading text-xl font-bold tracking-wider">
          <span className="neon-text">WEB</span><span className="text-white">MASTER</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-gray-300 hover:text-[#00D4FF] transition-colors duration-300 tracking-wide">
              {l.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="hidden md:block btn-primary text-sm py-2 px-5">Записаться на курс</a>
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-16 px-6 flex flex-col gap-6"
          style={{ background: "rgba(8, 12, 28, 0.97)", backdropFilter: "blur(20px)" }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              className="text-xl text-gray-200 hover:text-[#00D4FF] font-heading tracking-wider py-3 border-b border-white/10"
              onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" className="btn-primary text-center mt-4" onClick={() => setMobileMenuOpen(false)}>
            Записаться на курс
          </a>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #00D4FF, transparent)", filter: "blur(60px)" }} />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #8B5CF6, transparent)", filter: "blur(60px)" }} />
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="section-tag" style={{ animation: "fade-in-up 0.6s ease-out forwards" }}>
              <span>⚡</span> Школа веб-разработки
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-none tracking-tight text-white"
              style={{ animation: "fade-in-up 0.6s ease-out 0.2s forwards", opacity: 0 }}>
              НАУЧИСЬ<br />СОЗДАВАТЬ<br />
              <TypeWriter texts={["САЙТЫ", "ПРИЛОЖЕНИЯ", "БУДУЩЕЕ"]} />
            </h1>
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed"
              style={{ animation: "fade-in-up 0.6s ease-out 0.4s forwards", opacity: 0 }}>
              Практические курсы по веб-разработке. От первой строчки кода до трудоустройства — с персональным наставником.
            </p>
            <div className="flex flex-wrap gap-4" style={{ animation: "fade-in-up 0.6s ease-out 0.6s forwards", opacity: 0 }}>
              <a href="#programs" className="btn-primary">Выбрать программу</a>
              <a href="#about" className="btn-outline">О преподавателе</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
              style={{ animation: "fade-in-up 0.6s ease-out 0.8s forwards", opacity: 0 }}>
              {STATS.map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-heading text-2xl font-bold neon-text">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center"
            style={{ animation: "fade-in 0.8s ease-out 0.3s forwards", opacity: 0 }}>
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-2xl"
                style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(139,92,246,0.2))", animation: "glow-pulse 3s ease-in-out infinite" }} />
              <img src={TEACHER_PHOTO} alt="Преподаватель"
                className="relative z-10 w-full h-full object-cover rounded-2xl"
                style={{ border: "1px solid rgba(0,212,255,0.3)" }} />
              <div className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-3 z-20"
                style={{ border: "1px solid rgba(0,212,255,0.2)", animation: "float 3s ease-in-out infinite" }}>
                <div className="text-xs text-gray-400">Следующий поток</div>
                <div className="font-heading text-[#00D4FF] font-bold">1 мая 2026</div>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-3 z-20"
                style={{ border: "1px solid rgba(139,92,246,0.3)", animation: "float 3s ease-in-out 0.5s infinite" }}>
                <div className="text-xs text-gray-400">Мест осталось</div>
                <div className="font-heading text-[#8B5CF6] font-bold">3 из 12</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: "float 2s ease-in-out infinite" }}>
          <span className="text-xs text-gray-500 tracking-widest uppercase">Прокрути вниз</span>
          <Icon name="ChevronDown" size={20} className="text-[#00D4FF]" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div ref={aboutSection.ref} className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className={`space-y-6 transition-all duration-700 ${aboutSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="section-tag">👨‍💻 О преподавателе</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
              АЛЕКСЕЙ <span className="gradient-text">КОЗЛОВ</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Senior Frontend разработчик с 10-летним опытом в IT. Работал в крупных компаниях — Яндекс, VK, Авито.
              Автор курсов с аудиторией более 50 000 человек.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Преподаю веб-разработку с 2017 года. Мой подход — минимум теории, максимум практики.
              Каждый студент получает персональную обратную связь и реальные проекты в портфолио.
            </p>
            <div className="space-y-3">
              {[
                { icon: "Award", text: "10+ лет коммерческой разработки" },
                { icon: "Users", text: "500+ выпускников по всей России" },
                { icon: "Briefcase", text: "Опыт в Яндекс, VK, Авито" },
                { icon: "Star", text: "Рейтинг 4.9/5 на всех платформах" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                    <Icon name={item.icon} size={16} className="text-[#00D4FF]" />
                  </div>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${aboutSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            {[
              { icon: "Monitor", title: "Frontend", desc: "React, TypeScript, Vue, Next.js", color: "#00D4FF" },
              { icon: "Server", title: "Backend", desc: "Node.js, Python, PostgreSQL", color: "#8B5CF6" },
              { icon: "Smartphone", title: "Mobile", desc: "React Native, PWA", color: "#FF006E" },
              { icon: "Cloud", title: "DevOps", desc: "Docker, CI/CD, AWS, Vercel", color: "#00FF88" },
            ].map(skill => (
              <div key={skill.title} className="glass-card neon-border rounded-xl p-5 cursor-default"
                style={{ borderColor: `${skill.color}30` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${skill.color}15` }}>
                  <Icon name={skill.icon} size={20} style={{ color: skill.color }} />
                </div>
                <div className="font-heading font-bold text-white text-lg">{skill.title}</div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">{skill.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-24 px-6" style={{ background: "rgba(0,0,0,0.2)" }}>
        <div ref={programsSection.ref} className="container mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${programsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="section-tag mb-4 mx-auto">📚 Программы обучения</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
              ВЫБЕРИ СВОЙ <span className="gradient-text">ПУТЬ</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">Три уровня подготовки — от нуля до профессионального разработчика</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map((prog, i) => (
              <div key={prog.id}
                className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-500 ${programsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  background: activeProgram === prog.id ? `linear-gradient(135deg, ${prog.color}15, ${prog.color}05)` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${activeProgram === prog.id ? prog.color + "50" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: activeProgram === prog.id ? `0 0 30px ${prog.color}20` : "none",
                }}
                onClick={() => setActiveProgram(prog.id)}>
                {prog.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ background: prog.color, color: "#0a0f1e" }}>
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${prog.color}15`, border: `1px solid ${prog.color}30` }}>
                    <Icon name={prog.icon} size={24} style={{ color: prog.color }} />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full"
                    style={{ background: `${prog.color}15`, color: prog.color, border: `1px solid ${prog.color}30` }}>
                    {prog.level}
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-2">{prog.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{prog.desc}</p>
                <div className="space-y-2 mb-6">
                  {prog.modules.map(m => (
                    <div key={m} className="flex items-center gap-2 text-sm text-gray-300">
                      <Icon name="CheckCircle" size={14} style={{ color: prog.color, flexShrink: 0 }} />
                      {m}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${prog.color}20` }}>
                  <div>
                    <div className="text-xs text-gray-500">Длительность</div>
                    <div className="text-sm font-semibold text-white">{prog.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Стоимость</div>
                    <div className="font-heading text-xl font-bold" style={{ color: prog.color }}>{prog.price}</div>
                  </div>
                </div>
                <a href="#contact" className="block w-full mt-4 text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                  onClick={() => setFormData(f => ({ ...f, program: prog.id }))}
                  style={{
                    background: activeProgram === prog.id ? prog.color : "transparent",
                    color: activeProgram === prog.id ? "#0a0f1e" : prog.color,
                    border: `1px solid ${prog.color}50`
                  }}>
                  Записаться
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6">
        <div ref={portfolioSection.ref} className="container mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${portfolioSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="section-tag mb-4 mx-auto">🎨 Работы студентов</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
              ПОРТФОЛИО <span className="gradient-text">ВЫПУСКНИКОВ</span>
            </h2>
            <p className="text-gray-400 mt-4">Реальные проекты, созданные студентами в процессе обучения</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PORTFOLIO.map((item, i) => (
              <div key={item.title}
                className={`relative group rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${portfolioSection.inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                style={{ transitionDelay: `${i * 0.07}s`, aspectRatio: "16/10" }}>
                <div className="absolute inset-0 transition-all duration-300 group-hover:opacity-150"
                  style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)`, border: `1px solid ${item.color}20` }} />
                <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-10 font-heading font-bold select-none"
                  style={{ color: item.color }}>{"</>"}</div>
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="text-xs mb-1 font-mono" style={{ color: item.color }}>{item.category}</div>
                  <div className="font-heading text-white font-bold text-lg leading-tight">{item.title}</div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <Icon name="ExternalLink" size={18} style={{ color: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div ref={contactSection.ref} className="container mx-auto max-w-5xl">
          <div className={`text-center mb-16 transition-all duration-700 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="section-tag mb-4 mx-auto">📩 Запись на обучение</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
              НАЧНИ <span className="gradient-text">СЕГОДНЯ</span>
            </h2>
            <p className="text-gray-400 mt-4">Заполни форму — и я свяжусь с тобой в течение часа</p>
          </div>

          <div className={`grid md:grid-cols-2 gap-12 transition-all duration-700 delay-200 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="glass-card rounded-2xl p-8" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                    style={{ background: "rgba(0,255,136,0.15)", border: "2px solid #00FF88" }}>
                    <Icon name="CheckCircle" size={40} className="text-[#00FF88]" />
                  </div>
                  <h3 className="font-heading text-2xl text-white font-bold">ЗАЯВКА ОТПРАВЛЕНА!</h3>
                  <p className="text-gray-400">Алексей свяжется с тобой в течение часа для уточнения деталей.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline text-sm mt-4">Отправить ещё одну</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Ваше имя</label>
                    <input type="text" required placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all"
                      style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.03)" }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Телефон</label>
                    <input type="tel" required placeholder="+7 (999) 000-00-00"
                      value={formData.phone}
                      onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all"
                      style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.03)" }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Программа обучения</label>
                    <select value={formData.program}
                      onChange={e => setFormData(f => ({ ...f, program: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 outline-none transition-all appearance-none cursor-pointer"
                      style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(8,12,28,0.95)", color: "white" }}>
                      <option value="start">Старт в веб — 15 000 ₽</option>
                      <option value="pro">Frontend Pro — 28 000 ₽</option>
                      <option value="fullstack">Fullstack Master — 45 000 ₽</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Удобное расписание</label>
                    <div className="grid gap-2">
                      {SCHEDULE.map(s => (
                        <label key={s.day} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-all"
                          style={{
                            border: `1px solid ${formData.schedule === s.day ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                            background: formData.schedule === s.day ? "rgba(0,212,255,0.08)" : "transparent"
                          }}>
                          <input type="radio" name="schedule" value={s.day}
                            checked={formData.schedule === s.day}
                            onChange={e => setFormData(f => ({ ...f, schedule: e.target.value }))}
                            className="accent-[#00D4FF]" />
                          <div>
                            <div className="text-sm text-white">{s.day}</div>
                            <div className="text-xs text-gray-500">{s.time} · {s.type}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Комментарий (необязательно)</label>
                    <textarea placeholder="Расскажи немного о своём опыте..."
                      value={formData.comment}
                      onChange={e => setFormData(f => ({ ...f, comment: e.target.value }))}
                      rows={3}
                      className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-all resize-none"
                      style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.03)" }} />
                  </div>
                  <button type="submit" className="btn-primary w-full text-base">Отправить заявку →</button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <h3 className="font-heading text-2xl text-white font-bold">КОНТАКТЫ</h3>
              <p className="text-gray-400 leading-relaxed">
                Есть вопросы перед записью? Напиши или позвони — отвечу лично!
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67", color: "#00D4FF" },
                  { icon: "Mail", label: "Email", value: "alex@webmaster.ru", color: "#8B5CF6" },
                  { icon: "MessageCircle", label: "Telegram", value: "@alex_webmaster", color: "#00D4FF" },
                  { icon: "MapPin", label: "Локация", value: "Москва (и онлайн по всей России)", color: "#FF006E" },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-4 glass-card rounded-xl p-4"
                    style={{ border: `1px solid ${c.color}20` }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${c.color}15` }}>
                      <Icon name={c.icon} size={20} style={{ color: c.color }} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">{c.label}</div>
                      <div className="text-white font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-2xl p-6"
                style={{ border: "1px solid rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.03)" }}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <div className="font-heading text-white font-bold mb-1">БЕСПЛАТНЫЙ УРОК</div>
                    <div className="text-sm text-gray-400 leading-relaxed">
                      Первое занятие для новых студентов — бесплатно! Познакомимся, оценим твой уровень и подберём программу.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-heading text-lg font-bold">
            <span className="neon-text">WEB</span><span className="text-white">MASTER</span>
          </div>
          <div className="text-sm text-gray-500">© 2026 Алексей Козлов. Все права защищены.</div>
          <div className="flex items-center gap-6">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-xs text-gray-500 hover:text-[#00D4FF] transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
