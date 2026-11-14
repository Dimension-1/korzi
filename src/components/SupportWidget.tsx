import { useState, useRef, useEffect } from 'react';

// Korzi Support Widget (v4): screen-based FAQ (Home -> Category -> Answer)
// with a WhatsApp CTA. All copy lives in FAQ below.
const FAQ = {
  phone: '+91 76250 69477',
  greeting: '',
  teaser: 'Hi I am Yogi, How can i help?',
  avatar: '/assets/yogi.jpg',
  categories: [
    {
      id: 'specs',
      label: 'What you get',
      icon: '<path d="M12 3.5L19.5 7.75V16.25L12 20.5L4.5 16.25V7.75L12 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M4.5 7.75L12 12L19.5 7.75" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 12V20.5" stroke="currentColor" stroke-width="1.5"/>',
      questions: [
        { q: "What's included in the box?", a: "Your Apex Drive K-01 comes with: the RC machine (1:16 scale, 4WD), a 2.4GHz anti-interference controller, a rechargeable Li-ion battery, a USB charging cable, a screwdriver, and a user manual." },
        { q: "What's the top speed?", a: "Up to 25 km/h — enough for real off-road fun without being unsafe for a first-time driver." },
        { q: "How big is it?", a: "29.8 × 17.7 × 12.5 cm, weighing 852.6g with the battery in — a solid, substantial 1:16 scale build, not a toy-sized micro RC." },
        { q: "How long does the battery last?", a: "About 25 minutes of run time per charge (varies with terrain and driving style), with a charge time of around 180 minutes. That's a deliberately slow charge — it's safer for the battery and for young drivers handling it." },
        { q: "What's the control range?", a: "50+ metres via 2.4GHz controller — enough to run it across a park, driveway, or terrace without losing signal." },
        { q: "Is it 4WD?", a: "Yes — full 4-wheel drive, so it handles mud, gravel, grass, and rough terrain, not just flat ground." },
        { q: "What age is it suitable for?", a: "Ages 6+, with adult supervision recommended." },
        { q: "Is it certified safe?", a: "Yes — BIS certified." },
      ],
    },
    {
      id: 'warranty',
      label: 'Warranty & support',
      icon: '<path d="M12 3.5L19 6.5V11.2C19 15.4 16.1 18.9 12 20.5C7.9 18.9 5 15.4 5 11.2V6.5L12 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.2 11.8L11.2 13.8L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
      questions: [
        { q: "Is my Apex Drive backed by service support?", a: "Yes — every Apex Drive K-01 is backed by Korzi Care, covering manufacturing defects and normal wear for 6 months from purchase. This includes motor & drivetrain issues, electronic component failures, and structural defects, with local service support across India.<br><br>Reach us: support@korzi.toys (12–24 hr response) · call <strong>+91 76250 69477</strong> · Workshop: JP Nagar, Bangalore · Real humans, 10am–6pm, Mon–Fri." },
        { q: "Are spare parts available separately?", a: "Yes — spare parts are available for all components of the Apex Drive K-01. Reach out via call (+91 76250 69477) or support@korzi.toys to order what you need." },
      ],
    },
    {
      id: 'delivery',
      label: 'Order & delivery',
      icon: '<path d="M3.5 7.5H13.5V16H3.5V7.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M13.5 10.5H17.5L20.5 13.5V16H13.5V10.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="7.2" cy="17.8" r="1.7" stroke="currentColor" stroke-width="1.5"/><circle cx="17.2" cy="17.8" r="1.7" stroke="currentColor" stroke-width="1.5"/>',
      questions: [
        { q: "When will my order arrive?", a: "Once your order is placed, it's dispatched via Shiprocket and typically delivered within 2–7 days depending on your location. You'll get tracking details by SMS/email as soon as it ships." },
        { q: "Can I change my delivery address?", a: "Yes — email team@korzi.toys within 6 hours of placing your order and we'll update it for free. After 6 hours, address changes cost an additional ₹599, since your order is already with our delivery partners at that point." },
        { q: "Can I order Cash on Delivery (COD)?", a: "Yes — COD is available. Pay ₹999 upfront online, and the remaining amount on delivery." },
      ],
    },
    {
      id: 'returns',
      label: 'Returns & exchange',
      icon: '<path d="M4.5 12C4.5 8.1 7.6 5 11.5 5C14.3 5 16.7 6.6 17.9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M19.5 12C19.5 15.9 16.4 19 12.5 19C9.7 19 7.3 17.4 6.1 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M18.2 5.2V9.2H14.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.8 18.8V14.8H9.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
      questions: [
        { q: "What's your return/exchange window?", a: "You can return or exchange your Apex Drive K-01 within 7 days of delivery, as long as it's unused, undamaged, and in its original packaging." },
        { q: "What if my Apex Drive arrives damaged?", a: "Email us at team@korzi.toys within 3 days of delivery with your Order ID, along with photos and a video of the damage. We'll arrange to take back the damaged unit and send you a replacement." },
        { q: "Can I exchange for a different color/variant?", a: "The Apex Drive K-01 currently comes in one colorway only, so there isn't a variant to exchange into." },
      ],
    },
  ],
};

const WIDGET_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&display=swap');

  #korzi-widget-root, #korzi-widget-root * { box-sizing: border-box; margin: 0; padding: 0; }
  #korzi-widget-root {
    --k-surface: #161616;
    --k-surface-hi: #202020;
    --k-line: #262626;
    --k-white: #ffffff;
    --k-dim: #6f6f6f;
    --k-green: #02ff00;
    font-family: 'DM Sans', system-ui, sans-serif;
    position: fixed;
    right: 16px;
    bottom: 104px; /* clears the floating Buy Now bar on mobile/tablet */
    z-index: 999999;
  }
  @media (min-width: 1024px) { #korzi-widget-root { right: 24px; bottom: 80px; } }

  /* Launcher */
  #korzi-launcher {
    width: 72px; height: 72px; border-radius: 50%;
    background: var(--k-green); border: none; padding: 3px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 26px rgba(0,0,0,0.45), 0 0 0 5px rgba(2,255,0,0.09);
    transition: transform 0.2s cubic-bezier(0.2,0.7,0.3,1), box-shadow 0.2s ease;
  }
  #korzi-launcher:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 0 7px rgba(2,255,0,0.14); }
  #korzi-launcher:active { transform: translateY(0) scale(0.97); }
  #korzi-launcher:focus-visible { outline: 2px solid var(--k-white); outline-offset: 4px; }
  #korzi-launcher img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }

  /* Teaser */
  #korzi-teaser {
    position: absolute; bottom: 86px; right: 2px;
    width: max-content; max-width: calc(100vw - 40px);
    background: var(--k-white);
    border-radius: 12px; border-bottom-right-radius: 3px;
    padding: 14px 20px;
    box-shadow: 0 14px 34px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15);
    cursor: pointer;
    animation: k-rise 0.28s cubic-bezier(0.2,0.7,0.3,1);
    transition: transform 0.18s cubic-bezier(0.2,0.7,0.3,1);
  }
  #korzi-teaser p { color: #0d0d0d; font-size: 16.5px; line-height: 1.7; font-weight: 500; }
  #korzi-teaser:hover { transform: translateY(-2px); }
  #korzi-teaser:focus-visible { outline: 2px solid var(--k-green); outline-offset: 3px; }
  @keyframes k-rise {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Panel */
  #korzi-panel {
    position: absolute; bottom: 86px; right: 0;
    width: 430px; max-width: calc(100vw - 28px);
    min-height: 280px; max-height: 70vh;
    background: linear-gradient(180deg, #121212 0%, #0d0d0d 100%);
    border-radius: 16px;
    display: flex; flex-direction: column; overflow: hidden;
    transform-origin: bottom right;
    box-shadow: 0 30px 70px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07);
    animation: k-panel-in 0.26s cubic-bezier(0.2,0.8,0.3,1);
  }
  @keyframes k-panel-in {
    from { opacity: 0; transform: scale(0.94) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* Header */
  #korzi-header { padding: 20px 22px 16px; display: flex; align-items: center; gap: 12px; flex-shrink: 0; position: relative; }
  #korzi-header::after {
    content: ''; position: absolute; left: 22px; right: 22px; bottom: 0; height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03));
  }
  #korzi-header .k-title-block { flex: 1; min-width: 0; }
  #korzi-header h2 {
    color: var(--k-white); font-family: 'Oswald', 'Bebas Neue', sans-serif; font-weight: 500;
    text-transform: uppercase; font-size: 20px; letter-spacing: 1.4px; line-height: 1.25;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  #korzi-widget-root #korzi-header p { color: var(--k-white); font-size: 15px; line-height: 1.5; letter-spacing: 0.4px; margin-top: 9px; opacity: 0.75; }
  #korzi-close {
    background: transparent; border: none; color: var(--k-white); cursor: pointer;
    width: 32px; height: 32px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
    border-radius: 50%; transition: background 0.14s ease, transform 0.14s ease;
  }
  #korzi-close svg { width: 17px; height: 17px; }
  #korzi-close:hover { background: rgba(255,255,255,0.08); transform: rotate(90deg); }
  #korzi-close:focus-visible { outline: 2px solid var(--k-green); outline-offset: 2px; }

  /* Body */
  #korzi-body { flex: 1; overflow-y: auto; padding: 20px 22px 12px; }
  #korzi-body::-webkit-scrollbar { width: 4px; }
  #korzi-body::-webkit-scrollbar-thumb { background: var(--k-line); border-radius: 2px; }

  #korzi-widget-root .k-screen { animation: k-enter 0.24s cubic-bezier(0.2,0.7,0.3,1); }
  #korzi-widget-root .k-screen.k-back { animation: k-enter-back 0.24s cubic-bezier(0.2,0.7,0.3,1); }
  @keyframes k-enter { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes k-enter-back { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }

  #korzi-widget-root .k-intro { color: var(--k-white); font-size: 18px; line-height: 1.7; margin-bottom: 30px; }
  #korzi-widget-root .k-eyebrow {
    color: var(--k-white); font-size: 13.5px; text-transform: uppercase; letter-spacing: 1.5px;
    font-weight: 700; line-height: 1.6; margin-bottom: 14px; opacity: 0.7;
  }

  /* List rows */
  #korzi-widget-root .k-list { display: flex; flex-direction: column; gap: 12px; }
  #korzi-widget-root .k-row {
    display: flex; align-items: center; gap: 14px; width: 100%;
    background: var(--k-surface); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px;
    padding: 14px 16px; cursor: pointer; text-align: left; color: var(--k-white);
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 1px 0 rgba(255,255,255,0.03) inset;
    transition: background 0.16s ease, border-color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease;
  }
  #korzi-widget-root .k-row:hover { background: var(--k-surface-hi); border-color: rgba(2,255,0,0.3); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,0.3); }
  #korzi-widget-root .k-row:active { transform: translateY(0); }
  #korzi-widget-root .k-row:focus-visible { outline: 2px solid var(--k-green); outline-offset: -2px; }
  #korzi-widget-root .k-icon-wrap {
    width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.16s ease;
  }
  #korzi-widget-root .k-row:hover .k-icon-wrap { background: rgba(2,255,0,0.12); }
  #korzi-widget-root .k-icon { width: 21px; height: 21px; color: var(--k-white); flex-shrink: 0; transition: color 0.16s ease; }
  #korzi-widget-root .k-row:hover .k-icon { color: var(--k-green); }
  #korzi-widget-root .k-label { flex: 1; font-size: 18px; font-weight: 500; line-height: 1.5; letter-spacing: 0.1px; color: var(--k-white); }
  #korzi-widget-root .k-arrow { width: 16px; height: 16px; color: var(--k-dim); flex-shrink: 0; transition: color 0.16s ease, transform 0.16s ease; }
  #korzi-widget-root .k-row:hover .k-arrow { color: var(--k-green); transform: translateX(2px); }

  /* Answer */
  #korzi-widget-root .k-answer-q {
    color: var(--k-white); font-family: 'Oswald', 'Bebas Neue', sans-serif; font-weight: 500;
    font-size: 27px; line-height: 1.4; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 18px;
  }
  #korzi-widget-root .k-answer-rule {
    width: 36px; height: 3px; border-radius: 2px; background: var(--k-green);
    box-shadow: 0 0 12px rgba(2,255,0,0.5); margin-bottom: 34px;
  }
  #korzi-widget-root .k-answer-a { color: var(--k-white); font-size: 18.5px; line-height: 1.95; letter-spacing: 0.15px; }
  #korzi-widget-root .k-answer-a strong { color: var(--k-white); font-weight: 700; }

  #korzi-widget-root .k-backlink {
    display: inline-flex; align-items: center; gap: 10px; background: transparent; border: none;
    color: var(--k-white); font-family: 'DM Sans', sans-serif; font-size: 17px; font-weight: 500; line-height: 1.6;
    cursor: pointer; padding: 14px 0; margin-top: 54px; border-radius: 4px; opacity: 0.8; transition: opacity 0.14s ease;
  }
  #korzi-widget-root .k-backlink:hover { opacity: 1; }
  #korzi-widget-root .k-backlink:focus-visible { outline: 2px solid var(--k-green); outline-offset: 2px; }
  #korzi-widget-root .k-backlink-arrow { width: 16px; height: 16px; flex-shrink: 0; transition: transform 0.14s ease; }
  #korzi-widget-root .k-backlink:hover .k-backlink-arrow { transform: translateX(-2px); }

  /* Footer */
  #korzi-footer { flex-shrink: 0; position: relative; padding: 14px 22px 16px; }
  #korzi-footer::before {
    content: ''; position: absolute; left: 22px; right: 22px; top: 0; height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.14));
  }
  #korzi-cta {
    width: 100%; display: flex; align-items: center; gap: 11px;
    background: var(--k-green); border: none; border-radius: 10px; color: #0d0d0d;
    padding: 15px 18px; font-family: 'DM Sans', sans-serif; font-size: 19.5px; line-height: 1.5; font-weight: 700;
    cursor: pointer; text-align: left; box-shadow: 0 6px 20px rgba(2,255,0,0.22);
    transition: filter 0.14s ease, transform 0.14s ease, box-shadow 0.14s ease;
  }
  #korzi-cta:hover { filter: brightness(0.94); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(2,255,0,0.3); }
  #korzi-cta:active { transform: translateY(0); }
  #korzi-cta:focus-visible { outline: 2px solid var(--k-white); outline-offset: 2px; }
  #korzi-cta svg { width: 21px; height: 21px; flex-shrink: 0; }
  #korzi-cta .k-cta-text { flex: 1; }
  #korzi-cta .k-cta-arrow { width: 18px; height: 18px; }

  @media (max-width: 420px) {
    #korzi-panel { width: calc(100vw - 32px); right: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    #korzi-panel, #korzi-teaser, #korzi-widget-root .k-screen, #korzi-widget-root .k-screen.k-back { animation: none; }
    #korzi-launcher { transition: none; }
  }
`;

type Screen = 'home' | 'category' | 'answer';

const Arrow = () => (
  <svg className="k-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const BackArrow = () => (
  <svg className="k-backlink-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>('home');
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [activeQIdx, setActiveQIdx] = useState<number | null>(null);
  const [animDir, setAnimDir] = useState<'fwd' | 'back'>('fwd');
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);

  useEffect(() => {
    if (open && bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [open, screen, activeCatId, activeQIdx]);

  // Move focus into the panel on open and back to the launcher on close
  useEffect(() => {
    if (open) {
      hasOpened.current = true;
      closeRef.current?.focus();
    } else if (hasOpened.current) {
      launcherRef.current?.focus();
    }
  }, [open]);

  const cat = FAQ.categories.find(c => c.id === activeCatId) ?? null;
  const question = cat && activeQIdx !== null ? cat.questions[activeQIdx] ?? null : null;

  const goHome = () => { setAnimDir('back'); setScreen('home'); setActiveCatId(null); setActiveQIdx(null); };
  const goCat = (id: string, dir: 'fwd' | 'back' = 'fwd') => { setAnimDir(dir); setActiveCatId(id); setActiveQIdx(null); setScreen('category'); };
  const goAnswer = (idx: number) => { setAnimDir('fwd'); setActiveQIdx(idx); setScreen('answer'); };

  const title = screen === 'home' ? 'Korzi Support' : cat?.label ?? 'Korzi Support';
  const subtitle = screen === 'category' ? 'Tap a question' : screen === 'answer' ? 'Answer' : '';

  const openWhatsApp = () => {
    const digits = FAQ.phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent('Hi Korzi, I have a question about the Apex Drive K-01.');
    window.open(`https://wa.me/${digits}?text=${msg}`, '_blank');
  };

  return (
    <div id="korzi-widget-root">
      <style>{WIDGET_CSS}</style>

      {!open && (
        <div
          id="korzi-teaser"
          role="button"
          tabIndex={0}
          aria-label="Open support"
          onClick={() => setOpen(true)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); }
          }}
        >
          <p>{FAQ.teaser}</p>
        </div>
      )}

      {open && (
        <div id="korzi-panel" role="dialog" aria-label="Korzi support">
          <div id="korzi-header">
            <div className="k-title-block">
              <h2>{title}</h2>
              {subtitle && <p>{subtitle}</p>}
            </div>
            <button id="korzi-close" ref={closeRef} aria-label="Close support" onClick={() => setOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
            </button>
          </div>

          <div id="korzi-body" ref={bodyRef}>
            <div
              key={`${screen}-${activeCatId}-${activeQIdx}`}
              className={`k-screen${animDir === 'back' ? ' k-back' : ''}`}
            >
              {screen === 'home' && (
                <>
                  {FAQ.greeting && <p className="k-intro">{FAQ.greeting}</p>}
                  <p className="k-eyebrow">Browse a topic</p>
                  <div className="k-list">
                    {FAQ.categories.map(c => (
                      <button key={c.id} className="k-row" onClick={() => goCat(c.id)}>
                        <span className="k-icon-wrap">
                          <svg className="k-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: c.icon }} />
                        </span>
                        <span className="k-label">{c.label}</span>
                        <Arrow />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {screen === 'category' && cat && (
                <>
                  <div className="k-list">
                    {cat.questions.map((item, idx) => (
                      <button key={idx} className="k-row" onClick={() => goAnswer(idx)}>
                        <span className="k-label">{item.q}</span>
                        <Arrow />
                      </button>
                    ))}
                  </div>
                  <button className="k-backlink" onClick={goHome}>
                    <BackArrow />
                    <span>Back to topics</span>
                  </button>
                </>
              )}

              {screen === 'answer' && cat && question && (
                <>
                  <p className="k-answer-q">{question.q}</p>
                  <div className="k-answer-rule" />
                  <div className="k-answer-a" dangerouslySetInnerHTML={{ __html: question.a }} />
                  <button className="k-backlink" onClick={() => goCat(cat.id, 'back')}>
                    <BackArrow />
                    <span>Back to {cat.label.toLowerCase()}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div id="korzi-footer">
            <button id="korzi-cta" onClick={openWhatsApp}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 3C7 3 3 7 3 12C3 13.7 3.4 15.3 4.2 16.7L3 21L7.5 19.8C8.8 20.6 10.4 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M8.3 8.4C8.5 8 8.9 7.9 9.2 7.9C9.4 7.9 9.6 7.9 9.7 7.9C9.9 8 10 8.1 10.1 8.4C10.3 8.8 10.7 9.8 10.7 9.9C10.8 10 10.8 10.1 10.7 10.3C10.6 10.4 10.6 10.5 10.5 10.6C10.4 10.7 10.2 10.9 10.1 11C10 11.1 9.9 11.2 10 11.4C10.1 11.6 10.6 12.4 11.3 13C12.2 13.8 12.9 14 13.1 14.1C13.3 14.2 13.4 14.2 13.5 14.1C13.6 14 14 13.5 14.1 13.3C14.3 13.1 14.4 13.1 14.6 13.2C14.8 13.3 15.8 13.8 16 13.9C16.2 14 16.4 14.1 16.4 14.2C16.5 14.4 16.5 14.9 16.3 15.4C16.1 15.9 15.2 16.4 14.8 16.4C14.4 16.5 14 16.5 13.1 16.2C11.5 15.7 10.4 14.6 10.3 14.5C10.2 14.4 9 12.8 9 11.2C9 9.6 9.8 8.8 8.3 8.4Z" fill="currentColor"/>
              </svg>
              <span className="k-cta-text">Drop a WhatsApp message</span>
              <svg className="k-cta-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      )}

      <button
        id="korzi-launcher"
        ref={launcherRef}
        aria-label={open ? 'Close support' : 'Open support'}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <img src={FAQ.avatar} alt="" />
      </button>
    </div>
  );
}
