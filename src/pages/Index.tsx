import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const TEACHER_PHOTO = "https://cdn.poehali.dev/projects/12b21a17-2320-4d9e-bae1-8668ef002a9a/files/b04f1d1a-efca-44ad-98bd-46f49592f3a9.jpg";

const LESSON_PRICE = 700;

const PROGRAMS = [
  {
    id: "start",
    title: "Старт в веб",
    level: "Начинающий",
    duration: "2 месяца",
    lessonsPerMonth: 8,
    modules: ["HTML & CSS основы", "Flexbox и Grid", "Адаптивный дизайн", "Первый сайт-портфолио"],
    desc: "Для тех, кто никогда не писал код. Создадите свой первый сайт с нуля."
  },
  {
    id: "pro",
    title: "Frontend Pro",
    level: "Средний",
    duration: "4 месяца",
    lessonsPerMonth: 8,
    popular: true,
    modules: ["JavaScript ES6+", "React & TypeScript", "REST API", "Git и деплой"],
    desc: "Для тех, кто знает HTML/CSS. Освоите современный стек и сможете работать в команде."
  },
  {
    id: "fullstack",
    title: "Fullstack Master",
    level: "Продвинутый",
    duration: "6 месяцев",
    lessonsPerMonth: 12,
    modules: ["Node.js & Python", "Базы данных", "Облачные сервисы", "Карьерный трекинг"],
    desc: "Полный путь от верстки до серверной части. Станете универсальным разработчиком."
  }
];

const PORTFOLIO = [
  { title: "Интернет-магазин", tech: "React + Node.js" },
  { title: "Корпоративный сайт", tech: "HTML/CSS/JS" },
  { title: "Лендинг стартапа", tech: "React + Tailwind" },
  { title: "Дашборд аналитики", tech: "TypeScript + API" },
  { title: "Мобильное приложение", tech: "React Native" },
  { title: "Блог платформа", tech: "Next.js + PostgreSQL" },
];

const SCHEDULE = [
  { day: "Пн / Ср", time: "19:00 – 21:00", label: "Основной поток" },
  { day: "Вт / Чт", time: "19:00 – 21:00", label: "Вечерний поток" },
  { day: "Суббота", time: "10:00 – 14:00", label: "Интенсив" },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function Index() {
  const [activeProgram, setActiveProgram] = useState("pro");
  const [payMode, setPayMode] = useState<"lesson" | "month">("month");
  const [formData, setFormData] = useState({ name: "", phone: "", program: "pro", schedule: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const aboutRef = useInView();
  const programsRef = useInView();
  const portfolioRef = useInView();
  const contactRef = useInView();

  const navLinks = [
    { href: "#about", label: "О преподавателе" },
    { href: "#programs", label: "Программы" },
    { href: "#portfolio", label: "Портфолио" },
    { href: "#contact", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f6] text-[#141414] font-body">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f8f8f6]/90 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-heading text-lg font-bold tracking-widest uppercase text-[#141414]">
            Webmaster
          </a>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm text-[#666] hover:text-[#141414] transition-colors duration-200 tracking-wide">
                {l.label}
              </a>
            ))}
          </div>
          <a href="#contact"
            className="hidden md:block text-sm font-semibold px-5 py-2.5 bg-[#141414] text-white hover:bg-[#333] transition-colors duration-200">
            Записаться
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#f8f8f6] pt-16 px-6 flex flex-col">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-5 text-lg border-b border-[#e5e5e5] text-[#141414] font-medium">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="mt-8 text-center py-4 bg-[#141414] text-white font-semibold text-sm">
            Записаться на курс
          </a>
        </div>
      )}

      {/* HERO */}
      <section className="pt-16 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full py-24 grid md:grid-cols-2 gap-16 items-center">
          <div style={{ animation: "fade-in-up 0.6s ease-out forwards" }}>
            <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-8">Школа веб-разработки · Онлайн и офлайн</p>
            <h1 className="font-heading text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight text-[#141414] mb-8">
              СОЗДАВАЙ<br />САЙТЫ<br />
              <span className="text-[#141414]">С НУЛЯ</span>
            </h1>
            <p className="text-[#666] text-lg leading-relaxed max-w-md mb-10">
              Практические курсы по веб-разработке. От первой строчки кода до портфолио и трудоустройства.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#programs"
                className="px-7 py-3.5 bg-[#141414] text-white text-sm font-semibold hover:bg-[#333] transition-colors duration-200">
                Выбрать программу
              </a>
              <a href="#about"
                className="px-7 py-3.5 border border-[#d0d0d0] text-[#141414] text-sm font-semibold hover:border-[#141414] transition-colors duration-200">
                О преподавателе
              </a>
            </div>

            <div className="mt-16 grid grid-cols-4 gap-6 pt-8 border-t border-[#e5e5e5]">
              {[
                { v: "500+", l: "Выпускников" },
                { v: "7 лет", l: "Опыт" },
                { v: "92%", l: "Работают в IT" },
                { v: "4.9", l: "Рейтинг" },
              ].map(s => (
                <div key={s.l}>
                  <div className="font-heading text-2xl font-bold text-[#141414]">{s.v}</div>
                  <div className="text-xs text-[#999] mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative" style={{ animation: "fade-in 0.7s ease-out 0.2s forwards", opacity: 0 }}>
            <div className="aspect-[4/5] overflow-hidden bg-[#ebebeb]">
              <img src={TEACHER_PHOTO} alt="Преподаватель" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-6 right-6 bg-white px-5 py-4 shadow-sm border border-[#e5e5e5]">
              <div className="text-xs text-[#999] mb-0.5">Следующий поток</div>
              <div className="font-heading font-bold text-[#141414]">1 мая 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 border-t border-[#e5e5e5]">
        <div ref={aboutRef.ref} className="max-w-6xl mx-auto px-6">
          <div className={`grid md:grid-cols-2 gap-20 transition-all duration-700 ${aboutRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-6">О преподавателе</p>
              <h2 className="font-heading text-5xl font-bold text-[#141414] leading-tight mb-8">
                АЛЕКСЕЙ<br />КОЗЛОВ
              </h2>
              <p className="text-[#555] leading-relaxed mb-5">
                Senior Frontend разработчик с 10-летним опытом. Работал в Яндекс, VK, Авито. Автор курсов с аудиторией более 50 000 человек.
              </p>
              <p className="text-[#555] leading-relaxed">
                Преподаю с 2017 года. Минимум теории, максимум практики — каждый студент получает персональную обратную связь и реальные проекты в портфолио.
              </p>
            </div>

            <div className="space-y-0">
              {[
                { label: "Опыт разработки", value: "10+ лет" },
                { label: "Выпускников", value: "500+" },
                { label: "Компании", value: "Яндекс, VK, Авито" },
                { label: "Рейтинг", value: "4.9 / 5.0" },
                { label: "Форматы", value: "Онлайн и офлайн" },
              ].map((item, i) => (
                <div key={item.label}
                  className="flex items-center justify-between py-5 border-b border-[#e5e5e5]"
                  style={{ transitionDelay: `${i * 0.05}s` }}>
                  <span className="text-sm text-[#999]">{item.label}</span>
                  <span className="text-sm font-semibold text-[#141414]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-28 bg-[#141414]">
        <div ref={programsRef.ref} className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-700 ${programsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#666] mb-4">Программы обучения</p>
                <h2 className="font-heading text-5xl font-bold text-white leading-tight">ВЫБЕРИ<br />ПРОГРАММУ</h2>
              </div>
              {/* Переключатель оплаты */}
              <div className="flex items-center gap-px border border-[#333] self-start md:self-auto">
                <button
                  onClick={() => setPayMode("lesson")}
                  className={`px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${payMode === "lesson" ? "bg-white text-[#141414]" : "bg-transparent text-[#666] hover:text-white"}`}>
                  За урок
                </button>
                <button
                  onClick={() => setPayMode("month")}
                  className={`px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${payMode === "month" ? "bg-white text-[#141414]" : "bg-transparent text-[#666] hover:text-white"}`}>
                  За месяц
                </button>
              </div>
            </div>

            {/* Пояснение к режиму */}
            <div className="mb-8 text-sm text-[#555]">
              {payMode === "lesson"
                ? <span>700 ₽ за урок · Занимайтесь в удобном темпе, без обязательств</span>
                : <span>От 4 уроков в месяц · Фиксированная цена, удобное планирование</span>
              }
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-[#2a2a2a]">
              {PROGRAMS.map((prog, i) => {
                const lessonPrice = LESSON_PRICE;
                const monthPrice = prog.lessonsPerMonth * LESSON_PRICE;
                const isActive = activeProgram === prog.id;
                return (
                  <div key={prog.id}
                    className={`p-8 cursor-pointer transition-all duration-300 ${isActive ? "bg-white" : "bg-[#1a1a1a] hover:bg-[#222]"}`}
                    style={{ transitionDelay: `${i * 0.05}s` }}
                    onClick={() => setActiveProgram(prog.id)}>
                    <div className="flex items-start justify-between mb-6">
                      <span className={`text-xs tracking-widest uppercase ${isActive ? "text-[#999]" : "text-[#555]"}`}>
                        {prog.level}
                      </span>
                      {prog.popular && (
                        <span className={`text-xs px-2 py-1 ${isActive ? "bg-[#141414] text-white" : "bg-white/10 text-white"}`}>
                          Хит
                        </span>
                      )}
                    </div>
                    <h3 className={`font-heading text-2xl font-bold mb-3 ${isActive ? "text-[#141414]" : "text-white"}`}>
                      {prog.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-6 ${isActive ? "text-[#666]" : "text-[#666]"}`}>
                      {prog.desc}
                    </p>
                    <div className="space-y-2 mb-8">
                      {prog.modules.map(m => (
                        <div key={m} className="flex items-center gap-2 text-sm">
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isActive ? "bg-[#141414]" : "bg-[#444]"}`} />
                          <span className={isActive ? "text-[#444]" : "text-[#777]"}>{m}</span>
                        </div>
                      ))}
                    </div>
                    <div className={`pt-6 border-t ${isActive ? "border-[#e5e5e5]" : "border-[#2a2a2a]"}`}>
                      {/* Цена */}
                      <div className="mb-4">
                        {payMode === "lesson" ? (
                          <div>
                            <div className={`text-xs mb-1 ${isActive ? "text-[#999]" : "text-[#555]"}`}>За 1 урок</div>
                            <div className={`font-heading text-3xl font-bold ${isActive ? "text-[#141414]" : "text-white"}`}>
                              {lessonPrice.toLocaleString("ru")} ₽
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className={`text-xs mb-1 ${isActive ? "text-[#999]" : "text-[#555]"}`}>
                              В месяц · {prog.lessonsPerMonth} уроков
                            </div>
                            <div className={`font-heading text-3xl font-bold ${isActive ? "text-[#141414]" : "text-white"}`}>
                              {monthPrice.toLocaleString("ru")} ₽
                            </div>
                            <div className={`text-xs mt-1 ${isActive ? "text-[#bbb]" : "text-[#555]"}`}>
                              {lessonPrice.toLocaleString("ru")} ₽ / урок · {prog.duration}
                            </div>
                          </div>
                        )}
                      </div>
                      <a href="#contact"
                        onClick={() => setFormData(f => ({ ...f, program: prog.id }))}
                        className={`block text-center text-xs font-semibold px-4 py-2.5 transition-colors ${isActive ? "bg-[#141414] text-white hover:bg-[#333]" : "border border-[#444] text-[#999] hover:border-white hover:text-white"}`}>
                        Записаться →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28 border-b border-[#e5e5e5]">
        <div ref={portfolioRef.ref} className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-700 ${portfolioRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-4">Работы студентов</p>
              <h2 className="font-heading text-5xl font-bold text-[#141414] leading-tight">ПОРТФОЛИО</h2>
            </div>
            <div className="space-y-0">
              {PORTFOLIO.map((item, i) => (
                <div key={item.title}
                  className="flex items-center justify-between py-5 border-b border-[#e5e5e5] group cursor-pointer hover:bg-[#f3f3f1] -mx-6 px-6 transition-colors duration-150"
                  style={{ transitionDelay: `${i * 0.04}s` }}>
                  <div className="flex items-center gap-8">
                    <span className="text-xs text-[#bbb] font-mono w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-heading text-xl font-bold text-[#141414] group-hover:translate-x-1 transition-transform duration-200">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="hidden md:block text-sm text-[#999]">{item.tech}</span>
                    <Icon name="ArrowRight" size={16} className="text-[#bbb] group-hover:text-[#141414] group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28">
        <div ref={contactRef.ref} className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-700 ${contactRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-4">Запись на обучение</p>
              <h2 className="font-heading text-5xl font-bold text-[#141414] leading-tight">НАЧНИ<br />СЕГОДНЯ</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-20">
              {/* Form */}
              <div>
                {submitted ? (
                  <div className="py-16 text-center space-y-4">
                    <Icon name="CheckCircle" size={40} className="mx-auto text-[#141414]" />
                    <h3 className="font-heading text-2xl font-bold text-[#141414]">Заявка отправлена</h3>
                    <p className="text-[#666] text-sm">Алексей свяжется с вами в течение часа.</p>
                    <button onClick={() => setSubmitted(false)}
                      className="mt-4 text-sm text-[#999] border-b border-[#ccc] hover:text-[#141414] hover:border-[#141414] transition-colors pb-0.5">
                      Отправить ещё одну
                    </button>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[#999] mb-2">Ваше имя</label>
                      <input type="text" required placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                        className="w-full bg-transparent border-b border-[#d0d0d0] py-3 text-[#141414] placeholder-[#ccc] outline-none focus:border-[#141414] transition-colors text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[#999] mb-2">Телефон</label>
                      <input type="tel" required placeholder="+7 (999) 000-00-00"
                        value={formData.phone}
                        onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                        className="w-full bg-transparent border-b border-[#d0d0d0] py-3 text-[#141414] placeholder-[#ccc] outline-none focus:border-[#141414] transition-colors text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[#999] mb-3">Программа обучения</label>
                      <div className="space-y-2">
                        {PROGRAMS.map(p => (
                          <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors ${formData.program === p.id ? "bg-[#141414] border-[#141414]" : "border-[#ccc] group-hover:border-[#999]"}`}>
                              {formData.program === p.id && <span className="w-1.5 h-1.5 bg-white block" />}
                            </div>
                            <input type="radio" name="program" value={p.id} className="sr-only"
                              checked={formData.program === p.id}
                              onChange={e => setFormData(f => ({ ...f, program: e.target.value }))} />
                            <span className="text-sm text-[#444]">{p.title}</span>
                            <span className="text-sm text-[#999] ml-auto">{p.price}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[#999] mb-3">Расписание</label>
                      <div className="space-y-2">
                        {SCHEDULE.map(s => (
                          <label key={s.day} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors ${formData.schedule === s.day ? "bg-[#141414] border-[#141414]" : "border-[#ccc] group-hover:border-[#999]"}`}>
                              {formData.schedule === s.day && <span className="w-1.5 h-1.5 bg-white block" />}
                            </div>
                            <input type="radio" name="schedule" value={s.day} className="sr-only"
                              checked={formData.schedule === s.day}
                              onChange={e => setFormData(f => ({ ...f, schedule: e.target.value }))} />
                            <span className="text-sm text-[#444]">{s.day}</span>
                            <span className="text-sm text-[#999] ml-auto">{s.time}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[#999] mb-2">Комментарий</label>
                      <textarea placeholder="Ваш уровень подготовки, вопросы..."
                        value={formData.comment}
                        onChange={e => setFormData(f => ({ ...f, comment: e.target.value }))}
                        rows={3}
                        className="w-full bg-transparent border-b border-[#d0d0d0] py-3 text-[#141414] placeholder-[#ccc] outline-none focus:border-[#141414] transition-colors text-sm resize-none" />
                    </div>
                    <button type="submit"
                      className="w-full py-4 bg-[#141414] text-white text-sm font-semibold hover:bg-[#333] transition-colors duration-200 mt-2">
                      Отправить заявку
                    </button>
                  </form>
                )}
              </div>

              {/* Contacts */}
              <div className="space-y-10">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#999] mb-6">Контакты</p>
                  <div className="space-y-0">
                    {[
                      { label: "Телефон", value: "+7 (999) 123-45-67" },
                      { label: "Email", value: "alex@webmaster.ru" },
                      { label: "Telegram", value: "@alex_webmaster" },
                      { label: "Локация", value: "Москва + онлайн" },
                    ].map(c => (
                      <div key={c.label} className="flex items-center justify-between py-4 border-b border-[#e5e5e5]">
                        <span className="text-sm text-[#999]">{c.label}</span>
                        <span className="text-sm font-medium text-[#141414]">{c.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#141414] p-8">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#666] mb-3">Бонус</p>
                  <h4 className="font-heading text-xl font-bold text-white mb-3">Первый урок бесплатно</h4>
                  <p className="text-sm text-[#888] leading-relaxed">
                    Познакомимся, оценим ваш уровень и подберём подходящую программу. Без обязательств.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e5e5e5] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-heading text-sm font-bold tracking-widest uppercase">Webmaster</span>
          <span className="text-xs text-[#bbb]">© 2026 Алексей Козлов</span>
          <div className="flex gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-xs text-[#bbb] hover:text-[#141414] transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}